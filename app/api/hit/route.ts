import { NextRequest } from "next/server";
import { ALLOWED_KEYS, countHit } from "@/lib/stats";

const BOTS = /bot|crawl|spider|slurp|preview|headless|lighthouse|facebookexternalhit|whatsapp/i;
const WINDOW_MS = 60 * 1000;
const MAX_PER_WINDOW = 120;

// Limits one source's rate; the address stays in memory for a minute and is never written down
const recent = new Map<string, { count: number; until: number }>();

function allowed(source: string) {
  const now = Date.now();
  if (recent.size > 5000) recent.clear();
  const entry = recent.get(source);
  if (!entry || entry.until < now) {
    recent.set(source, { count: 1, until: now + WINDOW_MS });
    return true;
  }
  entry.count += 1;
  return entry.count <= MAX_PER_WINDOW;
}

export async function POST(request: NextRequest) {
  const done = new Response(null, { status: 204 });
  const origin = request.headers.get("origin");
  if (origin && new URL(origin).host !== request.headers.get("host") && new URL(origin).host !== request.headers.get("x-forwarded-host")) return done;
  if (BOTS.test(request.headers.get("user-agent") ?? "")) return done;
  if (!allowed(request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "yerel")) return done;

  const key = await request.text().catch(() => "");
  if (ALLOWED_KEYS.has(key)) await countHit(key);
  return done;
}

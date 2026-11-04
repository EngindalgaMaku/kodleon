import "server-only";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { APPS, NEXT_SECTORS } from "@/lib/apps";

// A plain counter instead of an analytics service: no cookies, no IP addresses, no visitor
// identity. Only "how many times, on which day" is stored. It lives in a file, so it needs a
// persistent volume at STATS_DIR or it starts over with each deployment.

type Day = Record<string, number>;
type Stats = Record<string, Day>;

const FILE = path.join(path.resolve(process.env.STATS_DIR || "storage/stats"), "stats.json");
const KEEP_DAYS = 400;
const FLUSH_MS = 5000;

/** Anything else is refused, so nobody can fill the file with made-up names */
export const ALLOWED_KEYS = new Set([
  "view:/",
  "view:/gizlilik",
  "view:/sektorler",
  "click:talep:diger",
  "click:whatsapp",
  ...APPS.flatMap((a) => [`view:/uygulamalar/${a.slug}`, `click:demo:${a.slug}`, `click:kayit:${a.slug}`, `click:apk:${a.slug}`]),
  ...NEXT_SECTORS.map((s) => `click:talep:${s.slug}`),
  ...APPS.filter((a) => a.soon).map((a) => `click:talep:${a.slug}`),
]);

let cache: Stats | null = null;
let timer: NodeJS.Timeout | null = null;

async function load() {
  if (cache) return cache;
  cache = await readFile(FILE, "utf8")
    .then((text) => JSON.parse(text) as Stats)
    .catch(() => ({}));
  return cache;
}

async function flush() {
  timer = null;
  if (!cache) return;
  await mkdir(path.dirname(FILE), { recursive: true });
  await writeFile(`${FILE}.tmp`, JSON.stringify(cache));
  await rename(`${FILE}.tmp`, FILE);
}

export const dayKey = (at = new Date()) => at.toLocaleDateString("sv-SE", { timeZone: "Europe/Istanbul" });

export async function countHit(key: string) {
  const stats = await load();
  const day = (stats[dayKey()] ??= {});
  day[key] = (day[key] ?? 0) + 1;
  for (const old of Object.keys(stats).sort().slice(0, -KEEP_DAYS)) delete stats[old];
  timer ??= setTimeout(() => void flush().catch((e) => console.error("[stats] yazılamadı", e)), FLUSH_MS);
}

export const readStats = load;

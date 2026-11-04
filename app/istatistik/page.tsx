import { timingSafeEqual } from "node:crypto";
import { notFound } from "next/navigation";
import { APPS, NEXT_SECTORS } from "@/lib/apps";
import { dayKey, readStats } from "@/lib/stats";

export const metadata = { title: "İstatistik", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

const DAYS = 30;

function keyMatches(given: string | undefined) {
  const real = process.env.STATS_KEY;
  if (!real || !given) return false;
  const a = Buffer.from(given);
  const b = Buffer.from(real);
  return a.length === b.length && timingSafeEqual(a, b);
}

const LABELS: Record<string, string> = {
  "view:/": "Ana sayfa",
  "view:/gizlilik": "Gizlilik",
  "view:/sektorler": "Sektörler",
  "click:deneme:genel": "1 ay ücretsiz (genel)",
  "click:talep:diger": "Talep: listede olmayan sektör",
  ...Object.fromEntries(NEXT_SECTORS.map((s) => [`click:talep:${s.slug}`, `Talep: ${s.name}`])),
  "click:whatsapp": "WhatsApp düğmesi",
  ...Object.fromEntries(
    APPS.flatMap((a) => [
      [`view:/uygulamalar/${a.slug}`, `${a.name} sayfası`],
      [`click:demo:${a.slug}`, `${a.name}: demo`],
      [`click:kayit:${a.slug}`, `${a.name}: kayıt`],
      [`click:apk:${a.slug}`, `${a.name}: APK`],
      [`click:deneme:${a.slug}`, `${a.name}: 1 ay ücretsiz`],
    ])
  ),
};

function Table({ title, rows }: { title: string; rows: Array<[string, number]> }) {
  return (
    <div>
      <h2 className="font-display text-2xl font-bold">{title}</h2>
      {rows.length === 0 ? (
        <p className="mt-3 text-muted">Henüz kayıt yok.</p>
      ) : (
        <ul className="mt-3 divide-y divide-line border-y border-line">
          {rows.map(([k, n]) => (
            <li key={k} className="flex justify-between gap-4 py-2.5">
              <span>{LABELS[k] ?? k}</span>
              <span className="font-semibold tabular-nums">{n}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/** Private page: /istatistik?key=<STATS_KEY>. Without the key it does not exist */
export default async function StatsPage({ searchParams }: { searchParams: Promise<{ key?: string }> }) {
  if (!keyMatches((await searchParams).key)) notFound();

  const stats = await readStats();
  const days = Array.from({ length: DAYS }, (_, i) => dayKey(new Date(Date.now() - i * 864e5)));
  const totals: Record<string, number> = {};
  for (const d of days) for (const [k, n] of Object.entries(stats[d] ?? {})) totals[k] = (totals[k] ?? 0) + n;
  const pick = (prefix: string) => Object.entries(totals).filter(([k]) => k.startsWith(prefix)).sort((a, b) => b[1] - a[1]);
  const views = (d: string) => Object.entries(stats[d] ?? {}).reduce((s, [k, n]) => (k.startsWith("view:") ? s + n : s), 0);
  const peak = Math.max(1, ...days.map(views));

  return (
    <section className="mx-auto max-w-4xl px-5 py-14">
      <h1 className="font-display text-5xl font-bold tracking-tight">İstatistik</h1>
      <p className="mt-2 text-muted">Son {DAYS} gün. Sayfa açılışı ve düğme basışı sayılır; kişi sayısı değildir, robotlar elenir.</p>
      <div className="mt-8 flex h-28 items-end gap-1" role="img" aria-label="Günlere göre sayfa açılışı">
        {[...days].reverse().map((d) => (
          <div key={d} title={`${d}: ${views(d)}`} className="min-w-0 flex-1 rounded-t bg-ember" style={{ height: `${Math.max(2, (views(d) / peak) * 100)}%`, opacity: views(d) ? 1 : 0.2 }} />
        ))}
      </div>
      <div className="mt-10 grid gap-10 md:grid-cols-2">
        <Table title="Sayfalar" rows={pick("view:")} />
        <Table title="Düğmeler" rows={pick("click:")} />
      </div>
    </section>
  );
}

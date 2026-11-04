import type { Metadata } from "next";
import Link from "next/link";
import { WhatsAppIcon } from "@/components/chrome";
import { SectorRequests } from "@/components/sector-requests";
import { TrialSteps } from "@/components/trial-steps";
import { APPS } from "@/lib/apps";
import { trialLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sektörler",
  description: "Hazır uygulamalar ve sıradaki sektörler. Demoyu inceleyin, bir ay ücretsiz kullanın ya da kendi sektörünüz için WhatsApp'tan talepte bulunun.",
  alternates: { canonical: "/sektorler" },
};

export default function SectorsPage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-5 pb-14 pt-12 lg:px-8 lg:pb-20 lg:pt-16">
        <h1 className="rise max-w-3xl font-display text-5xl font-bold tracking-tight sm:text-6xl">Sektörünüze özel çözümler</h1>
        <p className="mt-4 max-w-xl text-lg text-muted">Hazır olanların demosunu hemen inceleyin. Sizin işiniz henüz yoksa talep edin.</p>
        <h2 className="mt-12 font-display text-3xl font-bold tracking-tight">Hazır</h2>
        <ul className="mt-5 grid gap-5 md:grid-cols-2">
          {APPS.map((app) => (
            <li key={app.slug} data-testid={`sector-${app.slug}`} style={{ background: app.theme.bg, color: app.theme.text }} className="flex flex-col rounded-[2rem] p-7 sm:p-9">
              <p style={{ color: app.theme.muted }} className="text-sm font-medium">{app.sector}</p>
              <h3 className="mt-2 font-display text-4xl font-bold tracking-tight">{app.name}</h3>
              <p className="mt-3 flex-1 text-lg leading-snug">{app.headline}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={app.links.demo} style={{ background: app.theme.accent, color: app.theme.accentText }} className="inline-flex min-h-12 items-center rounded-full px-6 font-semibold transition hover:opacity-90">
                  Demoyu dene
                </a>
                <a href={trialLink(app.name)} data-hit={`deneme:${app.slug}`} target="_blank" rel="noreferrer" style={{ borderColor: app.theme.line }} className="inline-flex min-h-12 items-center gap-2 rounded-full border px-5 font-semibold transition hover:bg-white/10">
                  <WhatsAppIcon />
                  1 ay ücretsiz iste
                </a>
              </div>
              <Link href={`/uygulamalar/${app.slug}`} style={{ color: app.theme.muted }} className="mt-3 inline-flex min-h-11 items-center self-start font-medium underline-offset-4 hover:underline">
                {app.name} sayfası
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <SectorRequests />
      <TrialSteps />
    </>
  );
}

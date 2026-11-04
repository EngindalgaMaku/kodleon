import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { LedgerStory } from "@/components/ledger-story";
import { Phone } from "@/components/phone";
import { ProductTour } from "@/components/product-tour";
import { SectorRequests } from "@/components/sector-requests";
import { TrialSteps } from "@/components/trial-steps";
import { APPS, shotSrc, type AppEntry } from "@/lib/apps";
import { SITE_URL } from "@/lib/site";

const SHARED = [
  { title: "Sektörünüzün diliyle", text: "Halı yıkamada rota ve etiket, detailingde plaka ve hasar şeması. Ekranlar genel bir programdan uyarlanmaz, o işe göre kurulur." },
  { title: "Müşteri takip eder, telefon susar", text: "Müşteri üye olmadan bağlantıdan işinin durumunu görür. Bağlantıyı WhatsApp'tan tek dokunuşla gönderirsiniz." },
  { title: "Telefonda da, bilgisayarda da", text: "Tarayıcıdan açılır, Android uygulaması olarak kurulur. Ofis ve saha aynı bilgiyi görür." },
  { title: "Kasa içinde", text: "Tahsilat, gider ve net tek yerde. Gün sonunda defter tutmaya gerek kalmaz." },
];

function AppShowcase({ app, index }: { app: AppEntry; index: number }) {
  const { theme } = app;
  return (
    <article
      data-testid={`app-${app.slug}`}
      style={{ background: theme.bg, color: theme.text }}
      className="relative grid overflow-hidden rounded-[2rem] lg:grid-cols-2"
    >
      <div className={`flex flex-col justify-center p-7 sm:p-12 ${index % 2 ? "lg:order-2" : ""}`}>
        <p style={{ color: theme.muted }} className="text-sm font-medium">{app.sector}</p>
        <h3 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">{app.name}</h3>
        <p className="mt-4 max-w-md font-display text-xl font-medium leading-snug sm:text-2xl">{app.headline}</p>
        <ul className="mt-6 space-y-2.5">
          {app.highlights.map((h) => (
            <li key={h} style={{ color: theme.muted }} className="flex items-start gap-2.5 text-[15px]">
              <span style={{ background: theme.accent }} className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" aria-hidden="true" />
              {h}
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={app.links.demo} style={{ background: theme.accent, color: theme.accentText }} className="inline-flex min-h-12 items-center rounded-full px-6 font-semibold transition hover:opacity-90">
            Demoyu dene
          </a>
          <Link href={`/uygulamalar/${app.slug}`} style={{ borderColor: theme.line }} className="inline-flex min-h-12 items-center rounded-full border px-6 font-semibold transition hover:bg-white/10">
            {app.name} sayfası
          </Link>
        </div>
      </div>
      <div className={`relative flex h-[400px] justify-center gap-4 overflow-hidden px-6 pt-4 sm:h-[520px] lg:h-[600px] lg:pt-14 ${index % 2 ? "lg:order-1" : ""}`}>
        <Phone src={shotSrc(app, app.shots[0].file)} alt={`${app.name}: ${app.shots[0].title}`} className="w-[210px] shrink-0 sm:w-[260px]" sizes="260px" />
        <Phone src={shotSrc(app, app.shots[1].file)} alt={`${app.name}: ${app.shots[1].title}`} className="mt-16 hidden w-[260px] shrink-0 sm:block" sizes="260px" />
      </div>
    </article>
  );
}

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            { "@type": "Organization", name: "Kodleon", url: SITE_URL, logo: `${SITE_URL}/icon.svg` },
            { "@type": "WebSite", name: "Kodleon", url: SITE_URL, inLanguage: "tr" },
          ],
        }}
      />
      <LedgerStory />
      <TrialSteps />

      {/* Apps */}
      <section id="uygulamalar" className="mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-20">
        <h2 className="max-w-2xl font-display text-4xl font-bold tracking-tight sm:text-5xl">Sektörünüze özel çözümler</h2>
        <p className="mt-3 max-w-xl text-lg text-muted">Her biri kendi sektörüne göre yapıldı. Demo hesapları örnek verilerle dolu, tek dokunuşla açılır.</p>
        <div className="mt-10 space-y-6">
          {APPS.map((app, i) => (
            <AppShowcase key={app.slug} app={app} index={i} />
          ))}
        </div>
      </section>

      {/* Tour */}
      <section id="tur" className="border-t border-line bg-[#ece7dc]">
        <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-20">
          <h2 className="max-w-2xl font-display text-4xl font-bold tracking-tight sm:text-5xl">Bir iş günü nasıl geçer?</h2>
          <p className="mt-3 max-w-xl text-lg text-muted">Gerçek ekranlarla, adım adım.</p>
          <ProductTour />
        </div>
      </section>

      {/* Shared strengths */}
      <section className="border-y border-line bg-card">
        <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-20">
          <h2 className="max-w-2xl font-display text-4xl font-bold tracking-tight sm:text-5xl">Hepsinde ortak olan</h2>
          <div className="mt-10 grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
            {SHARED.map((s) => (
              <div key={s.title} className="border-t-2 border-ink pt-4">
                <h3 className="font-display text-xl font-semibold leading-snug">{s.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectorRequests>
        <p className="mt-4">
          <Link href="/sektorler" className="inline-flex min-h-11 items-center font-semibold underline underline-offset-4">Tüm sektörler</Link>
        </p>
      </SectorRequests>
    </>
  );
}

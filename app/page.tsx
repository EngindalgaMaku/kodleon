import Link from "next/link";
import { WhatsAppIcon } from "@/components/chrome";
import { Phone } from "@/components/phone";
import { APPS, NEXT_SECTORS, shotSrc, type AppEntry } from "@/lib/apps";
import { whatsappLink } from "@/lib/site";

const SHARED = [
  { title: "Sektörünüzün diliyle", text: "Halı yıkamada rota ve etiket, detailingde plaka ve hasar şeması. Ekranlar genel bir programdan uyarlanmaz, o işe göre kurulur." },
  { title: "Müşteri takip eder, telefon susar", text: "Müşteri üye olmadan bağlantıdan işinin durumunu görür. Bağlantıyı WhatsApp'tan tek dokunuşla gönderirsiniz." },
  { title: "Telefonda da, bilgisayarda da", text: "Tarayıcıdan açılır, Android uygulaması olarak kurulur. Ofis ve saha aynı bilgiyi görür." },
  { title: "Kasa içinde", text: "Tahsilat, gider ve net tek yerde. Gün sonunda defter tutmaya gerek kalmaz." },
];

const STEPS = [
  { title: "Demoyu açın", text: "Örnek verilerle dolu hesaba tek dokunuşla girin. Kayıt ve kart bilgisi istemez." },
  { title: "İşletmenizi kaydedin", text: "Beğendiyseniz kendi işletmenizi açın, fiyatlarınızı ve ekibinizi girin." },
  { title: "Telefona kurun", text: "Android uygulamasını indirin, sahadaki ekip de aynı sistemle çalışsın." },
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
  const [first, second] = APPS;
  return (
    <>
      {/* Hero */}
      <section className="overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 pb-6 pt-12 lg:grid-cols-[1.1fr_1fr] lg:px-8 lg:pb-16 lg:pt-20">
          <div className="rise">
            <h1 className="font-display text-[3.4rem] font-bold leading-[0.98] tracking-tight sm:text-7xl xl:text-[5.6rem]">
              Her işin kendi <span className="text-ember">uygulaması.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
              Halı yıkamadan oto detailinge, işletmelerin günlük işine göre yapılan web ve Android uygulamaları. Anlatmak yerine gösterelim: demoyu açın, hemen deneyin.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="#uygulamalar" className="inline-flex min-h-13 items-center rounded-full bg-ink px-7 text-[17px] font-semibold text-paper transition hover:bg-ink/85">
                Uygulamaları gör
              </Link>
              <a
                href={whatsappLink("Merhaba, işletmem için uygulamalarınız hakkında bilgi almak istiyorum.")}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-13 items-center gap-2 rounded-full border border-ink/20 bg-card px-7 text-[17px] font-semibold transition hover:border-ink/50"
              >
                <WhatsAppIcon />
                WhatsApp'tan sorun
              </a>
            </div>
          </div>
          <div className="rise relative mx-auto h-[420px] w-full max-w-[520px] sm:h-[560px]" style={{ animationDelay: "120ms" }}>
            <div className="absolute inset-x-6 bottom-0 top-16 rounded-[2.5rem] bg-[#ece7dc]" aria-hidden="true" />
            <Phone src={shotSrc(second, second.shots[0].file)} alt={`${second.name} ana ekranı`} priority sizes="262px" className="absolute left-[4%] top-14 w-[46%] -rotate-[5deg] sm:w-[262px]" />
            <Phone src={shotSrc(first, first.shots[0].file)} alt={`${first.name} Bugün ekranı`} priority sizes="272px" className="absolute right-[4%] top-0 w-[48%] rotate-[4deg] sm:w-[272px]" />
          </div>
        </div>
      </section>

      {/* Apps */}
      <section id="uygulamalar" className="mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-20">
        <h2 className="max-w-2xl font-display text-4xl font-bold tracking-tight sm:text-5xl">Hazır uygulamalar</h2>
        <p className="mt-3 max-w-xl text-lg text-muted">Her biri kendi sektörüne göre yapıldı. Demo hesapları örnek verilerle dolu, tek dokunuşla açılır.</p>
        <div className="mt-10 space-y-6">
          {APPS.map((app, i) => (
            <AppShowcase key={app.slug} app={app} index={i} />
          ))}
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

      {/* How */}
      <section id="nasil" className="mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-20">
        <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">Üç adımda başlayın</h2>
        <ol className="mt-10 grid gap-5 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <li key={s.title} className="rounded-3xl bg-[#ece7dc] p-7">
              <span className="font-display text-5xl font-bold text-ember">{i + 1}</span>
              <h3 className="mt-5 font-display text-2xl font-semibold">{s.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Next sectors */}
      <section id="sirada" className="bg-ink text-paper">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 lg:grid-cols-2 lg:px-8 lg:py-20">
          <div>
            <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">Sizin sektörünüz listede yok mu?</h2>
            <p className="mt-4 max-w-md text-lg text-paper/70">Yeni uygulamalar üzerinde çalışıyoruz. Ne iş yaptığınızı yazın; sırayı işletmelerden gelen ihtiyaçlar belirlesin.</p>
            <a
              href={whatsappLink("Merhaba, sektörüm için uygulama yapıyor musunuz? İşim: ")}
              target="_blank"
              rel="noreferrer"
              className="mt-7 inline-flex min-h-13 items-center gap-2 rounded-full bg-paper px-7 text-[17px] font-semibold text-ink transition hover:bg-white"
            >
              <WhatsAppIcon />
              Sektörünüzü yazın
            </a>
          </div>
          <ul className="divide-y divide-paper/15 border-y border-paper/15">
            {NEXT_SECTORS.map((s) => (
              <li key={s.name} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-5">
                <span className="font-display text-2xl font-semibold">{s.name}</span>
                <span className="text-paper/60">{s.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

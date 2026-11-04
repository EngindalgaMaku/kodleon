import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { WhatsAppIcon } from "@/components/chrome";
import { JsonLd } from "@/components/json-ld";
import { Phone } from "@/components/phone";
import { APPS, findApp, shotSrc } from "@/lib/apps";
import { SoonBadge } from "@/components/soon-badge";
import { notifyLink, SITE_URL, whatsappLink } from "@/lib/site";

interface Props {
  params: Promise<{ slug: string }>;
}

export const generateStaticParams = () => APPS.map((a) => ({ slug: a.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const app = findApp((await params).slug);
  if (!app) return {};
  return {
    title: `${app.searchName}: ${app.name}`,
    description: app.summary,
    alternates: { canonical: `/uygulamalar/${app.slug}` },
    openGraph: { title: `${app.searchName}: ${app.name}`, description: app.summary, images: [{ url: `/og/${app.slug}.jpg`, width: 1200, height: 630 }] },
  };
}

export default async function AppPage({ params }: Props) {
  const app = findApp((await params).slug);
  if (!app) notFound();
  const { theme } = app;
  const others = APPS.filter((a) => a.slug !== app.slug);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: app.name,
          description: app.summary,
          applicationCategory: "BusinessApplication",
          operatingSystem: app.soon ? "Web" : "Web, Android",
          url: `${SITE_URL}/uygulamalar/${app.slug}`,
          image: `${SITE_URL}${shotSrc(app, app.shots[0].file)}`,
          publisher: { "@type": "Organization", name: "Kodleon", url: SITE_URL },
        }}
      />
      <section style={{ background: theme.bg, color: theme.text }} className="overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 pt-12 lg:grid-cols-2 lg:px-8 lg:pt-16">
          <div className="rise pb-2 lg:pb-16">
            <p style={{ color: theme.muted }} className="flex flex-wrap items-center gap-2 font-medium">
              {app.searchName}
              {app.soon && <SoonBadge theme={theme} />}
            </p>
            <h1 className="mt-3 font-display text-6xl font-bold tracking-tight sm:text-7xl">{app.name}</h1>
            <p className="mt-5 max-w-xl font-display text-2xl font-medium leading-snug sm:text-3xl">{app.headline}</p>
            <p style={{ color: theme.muted }} className="mt-5 max-w-xl text-lg leading-relaxed">{app.summary}</p>
            {app.soon ? (
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={notifyLink(app.name)} data-hit={`talep:${app.slug}`} target="_blank" rel="noreferrer" style={{ background: theme.accent, color: theme.accentText }} className="inline-flex min-h-13 items-center gap-2 rounded-full px-7 text-[17px] font-semibold transition hover:opacity-90">
                  <WhatsAppIcon />
                  Çıkınca haber verin
                </a>
              </div>
            ) : (
              <>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={app.links.demo} style={{ background: theme.accent, color: theme.accentText }} className="inline-flex min-h-13 items-center rounded-full px-7 text-[17px] font-semibold transition hover:opacity-90">
                Demoyu dene
              </a>
              <a href={app.links.signUp} style={{ borderColor: theme.line }} className="inline-flex min-h-13 items-center rounded-full border px-7 text-[17px] font-semibold transition hover:bg-white/10">
                Kaydolun, 1 ay ücretsiz
              </a>
            </div>
            <div style={{ color: theme.muted }} className="mt-4 flex flex-wrap gap-x-6 text-[15px] font-medium">
              <a href={app.links.apk} className="inline-flex min-h-11 items-center underline-offset-4 hover:underline">Android APK indir</a>
              <a href={whatsappLink(`Merhaba, ${app.name} hakkında bilgi almak istiyorum.`)} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 underline-offset-4 hover:underline">
                <WhatsAppIcon className="h-4 w-4" />
                WhatsApp'tan sorun
              </a>
            </div>
              </>
            )}
          </div>
          <div className="rise flex h-[380px] justify-center gap-5 overflow-hidden sm:h-[520px] lg:h-[620px]" style={{ animationDelay: "120ms" }}>
            <Phone src={shotSrc(app, app.shots[0].file)} alt={`${app.name}: ${app.shots[0].title}`} priority className="w-[220px] shrink-0 sm:w-[270px]" sizes="270px" />
            <Phone src={shotSrc(app, app.shots[1].file)} alt={`${app.name}: ${app.shots[1].title}`} className="mt-14 hidden w-[270px] shrink-0 sm:block" sizes="270px" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-20">
        <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">Neler yapar</h2>
        <div className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {app.features.map((f) => (
            <div key={f.title} className="border-t border-line pt-4">
              <h3 className="font-display text-xl font-semibold">{f.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-card">
        <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-20">
          <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">Gerçek ekranlar</h2>
          <p className="mt-3 text-lg text-muted">Uygulamanın demo verisiyle alınmış görüntüleri.</p>
          <ul className="mt-10 grid grid-cols-2 gap-x-5 gap-y-9 md:grid-cols-3 lg:grid-cols-6">
            {app.shots.map((s) => (
              <li key={s.file}>
                <Phone src={shotSrc(app, s.file)} alt={`${app.name}: ${s.title}`} sizes="(min-width:1024px) 200px, 45vw" />
                <p className="mt-3 font-display font-semibold">{s.title}</p>
                <p className="text-sm text-muted">{s.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-14 lg:py-20">
        {app.guide.map((g) => (
          <div key={g.title} className="mt-12 first:mt-0">
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">{g.title}</h2>
            {g.text.map((p) => (
              <p key={p.slice(0, 40)} className="mt-4 text-lg leading-relaxed text-muted">{p}</p>
            ))}
          </div>
        ))}
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 pb-14 lg:grid-cols-2 lg:px-8 lg:pb-20">
        <div>
          <h2 className="font-display text-4xl font-bold tracking-tight">Kimler için</h2>
          <ul className="mt-6 flex flex-wrap gap-2.5">
            {app.audience.map((a) => (
              <li key={a} className="rounded-full border border-line bg-card px-4 py-2 font-medium">{a}</li>
            ))}
          </ul>
        </div>
        <div style={{ background: theme.bg, color: theme.text }} className="rounded-[2rem] p-8 sm:p-10">
          {app.soon ? (
            <>
              <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Yakında geliyor</h2>
              <p style={{ color: theme.muted }} className="mt-3 text-lg">Hazır olduğunda demosunu açacağız. Haber almak isterseniz yazın.</p>
              <a href={notifyLink(app.name)} data-hit={`talep:${app.slug}`} target="_blank" rel="noreferrer" style={{ background: theme.accent, color: theme.accentText }} className="mt-6 inline-flex min-h-13 items-center gap-2 rounded-full px-7 text-[17px] font-semibold transition hover:opacity-90">
                <WhatsAppIcon />
                Çıkınca haber verin
              </a>
            </>
          ) : (
            <>
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Önce deneyin</h2>
          <p style={{ color: theme.muted }} className="mt-3 text-lg">Demoyu inceleyin, kaydolup bir ay ücretsiz kullanın. Beğenirseniz aylık düşük bir ücretle devam edin.</p>
          <a href={app.links.demo} style={{ background: theme.accent, color: theme.accentText }} className="mt-6 mr-3 inline-flex min-h-13 items-center rounded-full px-7 text-[17px] font-semibold transition hover:opacity-90">
            Demoyu dene
          </a>
          <a href={app.links.signUp} style={{ borderColor: theme.line }} className="mt-6 inline-flex min-h-13 items-center rounded-full border px-7 text-[17px] font-semibold transition hover:bg-white/10">
            Kaydolun, 1 ay ücretsiz
          </a>
            </>
          )}
        </div>
      </section>

      <section className="border-t border-line bg-card">
        <div className="mx-auto max-w-3xl px-5 py-14 lg:py-20">
          <h2 className="font-display text-4xl font-bold tracking-tight">Sık sorulanlar</h2>
          <dl className="mt-8 space-y-7">
            {(app.soon
              ? [
                  ["Ne zaman çıkacak?", "Tarih vermiyoruz. Çıktığında haber almak isterseniz WhatsApp'tan yazın."],
                  ["Kurulum gerekecek mi?", `Hayır. ${app.name} tarayıcıdan açılacak, bilgisayara program kurmanız gerekmeyecek.`],
                  ["Birden fazla kişi kullanabilecek mi?", "Evet. Sahibi ve çalışanları kendi hesabıyla girecek, herkes aynı bilgiyi görecek."],
                ]
              : [
              ["Kurulum gerekiyor mu?", `Hayır. ${app.name} tarayıcıdan açılır, bilgisayara program kurmanız gerekmez. Android telefonlara uygulama olarak da kurulabilir.`],
              ["Demoyu denemek için kayıt olmam gerekir mi?", "Hayır. Demo hesabı örnek verilerle dolu, dokununca açılır. Demoya girilen veriler her gece silinir, gerçek bilgi girmeyin."],
              ["Kendi işletmemde nasıl denerim?", "Kaydolun, bir ay bütün özelliklerle ücretsiz kullanın. Kart bilgisi istemiyoruz. Süre bitince hesabınız kapanmaz, kısıtlı moda geçer. Beğenirseniz aylık düşük bir ücretle tam kullanıma devam edersiniz, beğenmezseniz hiçbir şey ödemezsiniz."],
              ["iPhone'da çalışır mı?", "Telefonun tarayıcısından kullanılabilir. Mağazadan kurulan ayrı bir iPhone uygulaması şimdilik yok."],
              ["Birden fazla kişi kullanabilir mi?", "Evet. Sahibi, çalışanları ve sahadaki ekibi kendi hesabıyla girer, herkes aynı bilgiyi görür."],
              ]
            ).map(([q, a]) => (
              <div key={q}>
                <dt className="font-display text-xl font-semibold">{q}</dt>
                <dd className="mt-1.5 leading-relaxed text-muted">{a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {others.length > 0 && (
        <section className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
          <h2 className="font-display text-2xl font-bold">Diğer uygulamalar</h2>
          <ul className="mt-4 flex flex-wrap gap-3">
            {others.map((o) => (
              <li key={o.slug}>
                <Link href={`/uygulamalar/${o.slug}`} className="inline-flex min-h-12 items-center gap-2 rounded-full border border-line bg-card px-5 font-semibold transition hover:border-ink/40">
                  {o.name}
                  <span className="font-normal text-muted">{o.sector}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}

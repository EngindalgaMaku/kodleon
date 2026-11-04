import Link from "next/link";

const STEPS = [
  { title: "Demoyu inceleyin", text: "Örnek verilerle dolu hesaba tek dokunuşla girin. Üyelik gerekmez." },
  { title: "Kaydolun, bir ay ücretsiz kullanın", text: "Kendi işletmenizi açın, bütün özellikler açık olsun. Kart bilgisi istemiyoruz." },
  { title: "Beğenirseniz devam edin", text: "İşinize yaradıysa aylık düşük bir ücretle kullanmaya devam edin. Beğenmezseniz hiçbir şey ödemezsiniz; hesabınız kısıtlı moda geçer." },
];

export function TrialSteps({ pickSector = true }: { pickSector?: boolean }) {
  return (
    <section id="nasil" className="mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-20">
      <h2 className="max-w-2xl font-display text-4xl font-bold tracking-tight sm:text-5xl">Önce deneyin, sonra karar verin</h2>
      <ol className="mt-10 grid gap-5 md:grid-cols-3">
        {STEPS.map((s, i) => (
          <li key={s.title} className="rounded-3xl bg-[#ece7dc] p-7">
            <span className="font-display text-5xl font-bold text-ember">{i + 1}</span>
            <h3 className="mt-5 font-display text-2xl font-semibold">{s.title}</h3>
            <p className="mt-2 leading-relaxed text-muted">{s.text}</p>
          </li>
        ))}
      </ol>
      {pickSector && (
        <Link href="/sektorler" className="mt-8 inline-flex min-h-13 items-center rounded-full bg-ink px-7 text-[17px] font-semibold text-paper transition hover:bg-ink/85">
          Sektörünüzü seçin
        </Link>
      )}
    </section>
  );
}

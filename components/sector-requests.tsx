import { WhatsAppIcon } from "@/components/chrome";
import { NEXT_SECTORS } from "@/lib/apps";
import { whatsappLink } from "@/lib/site";

/** Planned sectors. Each button is counted, so the requests can decide which app comes next */
export function SectorRequests({ children }: { children?: React.ReactNode }) {
  return (
    <section id="sirada" className="bg-ink text-paper">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 lg:grid-cols-[1fr_1.2fr] lg:px-8 lg:py-20">
        <div>
          <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">Sıradaki sektörler</h2>
          <p className="mt-4 max-w-md text-lg text-paper/70">
            Sırayı işletmelerden gelen talepler belirliyor. Sizin işiniz listedeyse yazın; yoksa ne iş yaptığınızı anlatın.
          </p>
          <a
            href={whatsappLink("Merhaba, sektörüm için uygulama yapıyor musunuz? İşim: ")}
            data-hit="talep:diger"
            target="_blank"
            rel="noreferrer"
            className="mt-7 inline-flex min-h-13 items-center gap-2 rounded-full bg-paper px-7 text-[17px] font-semibold text-ink transition hover:bg-white"
          >
            <WhatsAppIcon />
            Sektörüm listede yok
          </a>
          {children}
        </div>
        <ul className="divide-y divide-paper/15 border-y border-paper/15">
          {NEXT_SECTORS.map((s) => (
            <li key={s.slug} className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3 py-4">
              <span className="min-w-0">
                <span className="block font-display text-2xl font-semibold">{s.name}</span>
                <span className="text-paper/60">{s.text}</span>
              </span>
              <a
                href={whatsappLink(`Merhaba, ${s.name} programı için talepte bulunmak istiyorum. İşletmem: `)}
                data-hit={`talep:${s.slug}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border border-paper/30 px-4 text-[15px] font-semibold transition hover:bg-paper/10"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Bu programı istiyorum
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { WhatsAppIcon } from "@/components/chrome";
import { NEXT_SECTORS } from "@/lib/apps";
import { whatsappLink } from "@/lib/site";

const OTHER = "diger";

/** Planned sectors. The button counts the chosen one, so requests can decide which app comes next */
export function SectorRequests() {
  const [chosen, setChosen] = useState<string | null>(null);
  const sector = NEXT_SECTORS.find((s) => s.slug === chosen);
  const message = sector ? `Merhaba, ${sector.name} programı için talepte bulunmak istiyorum. İşletmem: ` : "Merhaba, işim için bir program yapıyor musunuz? İşim: ";

  const chip = (slug: string, label: string) => (
    <button
      key={slug}
      type="button"
      aria-pressed={chosen === slug}
      onClick={() => setChosen(chosen === slug ? null : slug)}
      className={`min-h-12 rounded-full border px-5 font-semibold transition ${
        chosen === slug ? "border-paper bg-paper text-ink" : "border-paper/30 hover:border-paper/70"
      }`}
    >
      {label}
    </button>
  );

  return (
    <section id="sirada" data-testid="sector-requests" className="bg-ink text-paper">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-14 lg:grid-cols-[1fr_1.2fr] lg:px-8 lg:py-20">
        <div>
          <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">Sizin işiniz için de yapalım</h2>
          <p className="mt-4 max-w-md text-lg text-paper/70">Hangi sektörden talep gelirse önce onu yapıyoruz.</p>
        </div>
        <div>
          <div role="group" aria-label="Sektörünüz" className="flex flex-wrap gap-2.5">
            {NEXT_SECTORS.map((s) => chip(s.slug, s.name))}
            {chip(OTHER, "Başka bir iş")}
          </div>
          <a
            href={whatsappLink(message)}
            data-hit={`talep:${sector?.slug ?? OTHER}`}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex min-h-13 items-center gap-2 rounded-full bg-paper px-7 text-[17px] font-semibold text-ink transition hover:bg-white"
          >
            <WhatsAppIcon />
            WhatsApp&apos;tan talep edin
          </a>
        </div>
      </div>
    </section>
  );
}

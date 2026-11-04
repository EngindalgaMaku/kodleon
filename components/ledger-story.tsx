"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Phone } from "@/components/phone";
import { WhatsAppIcon } from "@/components/chrome";
import { APPS, shotSrc } from "@/lib/apps";
import { notifyLink } from "@/lib/site";

// The opening of the home page. A notebook page turns into the app's records, one line at a
// time, and the visitor picks their own trade. The notes are made-up examples; every card
// names something the app really does, and the phone shows a real screen.

/** Steps of the animation: 0 the page alone, 1–3 a line each, 4 the app */
const LAST_STEP = 4;
const STEP_MS = [1400, 1500, 1500, 1500, 6000];

export function LedgerStory() {
  const [slug, setSlug] = useState(APPS[0].slug);
  const [step, setStep] = useState(0);
  const [still, setStill] = useState(false);
  const [visible, setVisible] = useState(true);
  const stage = useRef<HTMLDivElement>(null);
  const app = APPS.find((a) => a.slug === slug) ?? APPS[0];

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStill(true);
      setStep(LAST_STEP);
    }
    // On phones the stage sits below the first screen: the story starts when it comes into view
    const seen = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting);
      if (entry.isIntersecting && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) setStep(0);
    }, { threshold: 0.4 });
    if (stage.current) seen.observe(stage.current);
    return () => seen.disconnect();
  }, []);

  useEffect(() => {
    if (still || !visible) return;
    const timer = setTimeout(() => setStep((s) => (s + 1) % (LAST_STEP + 1)), STEP_MS[step]);
    return () => clearTimeout(timer);
  }, [step, still, visible]);

  const choose = (next: string) => {
    setSlug(next);
    if (!still) setStep(0);
  };

  return (
    <section className="overflow-hidden">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 pb-8 pt-10 lg:grid-cols-[1.05fr_1fr] lg:px-8 lg:pb-16 lg:pt-16">
        <div className="rise min-w-0">
          <p className="font-medium text-muted">İşletmeniz için yazılım çözümleri</p>
          <h1 className="mt-3 font-display text-[2.4rem] font-bold leading-[1.05] tracking-tight sm:text-7xl xl:text-[5rem]">
            Hâlâ <span className="text-ember">defterle</span> mi çalışıyorsunuz?
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
            Sektörünüze özel programı önce inceleyin, kaydolup bir ay ücretsiz kullanın, sonra karar verin.
          </p>

          <div className="mt-7">
            <p className="font-display text-lg font-semibold">İşiniz ne?</p>
            <div role="group" aria-label="İşiniz ne?" className="mt-2.5 flex flex-wrap gap-2">
              {APPS.map((a) => (
                <button
                  key={a.slug}
                  type="button"
                  aria-pressed={a.slug === slug}
                  onClick={() => choose(a.slug)}
                  className={`min-h-11 rounded-full border px-4 font-semibold transition ${
                    a.slug === slug ? "border-ink bg-ink text-paper" : "border-ink/20 bg-card hover:border-ink/50"
                  }`}
                >
                  {a.story.choice}
                </button>
              ))}
              <Link href="/sektorler" className="inline-flex min-h-11 items-center rounded-full border border-ink/20 bg-card px-4 font-semibold transition hover:border-ink/50">
                Başka bir iş
              </Link>
            </div>
            <p aria-live="polite" className="mt-4 max-w-xl leading-relaxed text-muted">{app.story.pain}</p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {app.soon ? (
              <>
                <Link href={`/uygulamalar/${app.slug}`} className="inline-flex min-h-13 items-center rounded-full bg-ink px-7 text-[17px] font-semibold text-paper transition hover:bg-ink/85">
                  {app.name}: yakında
                </Link>
                <a href={notifyLink(app.name)} data-hit={`talep:${app.slug}`} target="_blank" rel="noreferrer" className="inline-flex min-h-13 items-center gap-2 rounded-full border border-ink/20 bg-card px-7 text-[17px] font-semibold transition hover:border-ink/50">
                  <WhatsAppIcon />
                  Çıkınca haber verin
                </a>
              </>
            ) : (
              <>
                <a href={app.links.demo} className="inline-flex min-h-13 items-center rounded-full bg-ink px-7 text-[17px] font-semibold text-paper transition hover:bg-ink/85">
                  {app.name} demosunu açın
                </a>
                <a href={app.links.signUp} className="inline-flex min-h-13 items-center rounded-full border border-ink/20 bg-card px-7 text-[17px] font-semibold transition hover:border-ink/50">
                  Kaydolun, 1 ay ücretsiz
                </a>
              </>
            )}
          </div>
        </div>

        {/* The same notes and records are in the text beside it, so this is only a picture */}
        <div ref={stage} data-testid="ledger-stage" data-step={step} aria-hidden="true" className="rise relative mx-auto h-[450px] w-full max-w-[350px] sm:h-[560px] sm:max-w-[520px]" style={{ animationDelay: "120ms" }}>
          <div className={`ledger-page absolute left-0 top-0 w-[88%] -rotate-2 rounded-lg px-5 pb-4 pt-3 shadow-lg transition-opacity duration-500 sm:w-[76%] sm:px-7 ${step === LAST_STEP ? "opacity-30" : ""}`}>
            <p className="font-hand text-2xl font-bold text-ink/70">Bugün</p>
            <ul className="mt-1 space-y-1">
              {app.story.lines.map((line, i) => (
                <li key={line.note} className={`ledger-line font-hand text-[23px] leading-[1.25] sm:text-[27px] ${step > i ? "is-done" : ""}`}>
                  <span>{line.note}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={`absolute bottom-0 right-0 w-[48%] transition-all duration-700 ease-out sm:w-[230px] ${step === LAST_STEP ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
            <Phone src={shotSrc(app, app.story.screen)} alt="" sizes="230px" priority />
          </div>

          <ul className="absolute bottom-3 left-0 z-10 w-[66%] space-y-2 sm:w-[300px]">
            {app.story.lines.map((line, i) => (
              <li
                key={line.card}
                className={`rounded-2xl border border-line bg-card px-3.5 py-2.5 shadow-md transition-all duration-500 ease-out ${
                  step > i ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
                }`}
              >
                <p className="flex items-center gap-2 font-display font-semibold leading-tight">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-ember" />
                  {line.card}
                </p>
                <p className="mt-0.5 text-sm leading-snug text-muted">{line.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { APPS, shotSrc } from "@/lib/apps";

const STEP_MS = 4200;

/** Walks through an app's real screens by itself until the visitor takes over */
export function ProductTour() {
  const [appIndex, setAppIndex] = useState(0);
  const [step, setStep] = useState(0);
  const [auto, setAuto] = useState(true);
  const [visible, setVisible] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const app = APPS[appIndex];
  const tour = app.tour;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setAuto(false);
    const seen = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.35 });
    if (root.current) seen.observe(root.current);
    return () => seen.disconnect();
  }, []);

  useEffect(() => {
    if (!auto || !visible) return;
    const timer = setInterval(() => setStep((s) => (s + 1) % tour.length), STEP_MS);
    return () => clearInterval(timer);
  }, [auto, visible, tour.length]);

  const chooseApp = (i: number) => {
    setAuto(false);
    setAppIndex(i);
    setStep(0);
  };

  return (
    <div ref={root} data-testid="tour" className="mt-10 grid items-center gap-8 lg:grid-cols-[1fr_auto] lg:gap-16">
      <div className="min-w-0">
        <div className="flex flex-wrap gap-2">
          {APPS.map((a, i) => (
            <button
              key={a.slug}
              type="button"
              aria-pressed={i === appIndex}
              onClick={() => chooseApp(i)}
              className={`min-h-11 rounded-full border px-5 font-semibold transition ${i === appIndex ? "border-ink bg-ink text-paper" : "border-line bg-card hover:border-ink/40"}`}
            >
              {a.name}
            </button>
          ))}
        </div>
        <ol className="mt-6 space-y-2">
          {tour.map((t, i) => (
            <li key={t.file}>
              <button
                type="button"
                aria-current={i === step ? "step" : undefined}
                onClick={() => {
                  setAuto(false);
                  setStep(i);
                }}
                className={`relative w-full overflow-hidden rounded-2xl border p-4 text-left transition sm:p-5 ${i === step ? "border-ink/25 bg-card shadow-sm" : "border-transparent hover:bg-card/60"}`}
              >
                <span className="flex gap-3.5">
                  <span className={`font-display text-xl font-bold ${i === step ? "text-ember" : "text-muted"}`}>{i + 1}</span>
                  <span>
                    <span className="block font-display text-xl font-semibold">{t.title}</span>
                    {i === step && <span className="mt-1 block leading-relaxed text-muted">{t.text}</span>}
                  </span>
                </span>
                {i === step && auto && visible && (
                  <span key={`${app.slug}-${i}`} className="tour-progress absolute inset-x-0 bottom-0 block h-[3px] origin-left bg-ember" style={{ animationDuration: `${STEP_MS}ms` }} aria-hidden="true" />
                )}
              </button>
            </li>
          ))}
        </ol>
      </div>
      <div className="order-first mx-auto w-[230px] sm:w-[280px] lg:order-none lg:w-[310px]">
        <div className="rounded-[2.2rem] bg-[#08090b] p-[7px] shadow-[0_30px_60px_-20px_rgba(10,12,16,.55)] ring-1 ring-white/25">
          <div className="relative aspect-[780/1688] overflow-hidden rounded-[1.8rem] bg-black">
            {tour.map((t, i) => (
              <Image
                key={`${app.slug}-${t.file}`}
                src={shotSrc(app, t.file)}
                alt={i === step ? `${app.name}: ${t.title}` : ""}
                aria-hidden={i !== step}
                width={780}
                height={1688}
                sizes="310px"
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${i === step ? "opacity-100" : "opacity-0"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

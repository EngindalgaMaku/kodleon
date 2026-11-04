"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { APPS } from "@/lib/apps";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);
  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls="mobil-menu"
        aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
        className="grid h-11 w-11 place-items-center rounded-full border border-ink/15 bg-card"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          {open ? <path d="M4 4l12 12M16 4 4 16" /> : <path d="M3 6h14M3 14h14" />}
        </svg>
      </button>
      {open && (
        <nav id="mobil-menu" aria-label="Mobil menü" className="absolute inset-x-0 top-16 border-b border-line bg-paper px-5 pb-6 pt-2 shadow-lg">
          <ul className="divide-y divide-line text-lg font-medium">
            <li><Link onClick={close} href="/#uygulamalar" className="flex min-h-13 items-center">Uygulamalar</Link></li>
            {APPS.map((a) => (
              <li key={a.slug}>
                <Link onClick={close} href={`/uygulamalar/${a.slug}`} className="flex min-h-13 items-center justify-between gap-3 pl-4">
                  {a.name}
                  <span className="text-right text-sm font-normal text-muted">{a.soon ? "Yakında" : a.sector}</span>
                </Link>
              </li>
            ))}
            <li><Link onClick={close} href="/sektorler" className="flex min-h-13 items-center">Sektörler</Link></li>
            <li><Link onClick={close} href="/#nasil" className="flex min-h-13 items-center">Ücretsiz deneme</Link></li>
            <li><Link onClick={close} href="/#tur" className="flex min-h-13 items-center">Nasıl çalışıyor</Link></li>
          </ul>
        </nav>
      )}
    </div>
  );
}

"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { APPS } from "@/lib/apps";

const send = (key: string) => navigator.sendBeacon?.("/api/hit", key);

function clickKey(href: string) {
  if (href.includes("wa.me/")) return "click:whatsapp";
  for (const a of APPS) {
    if (href === a.links.apk) return `click:apk:${a.slug}`;
    if (href === a.links.demo) return `click:demo:${a.slug}`;
    if (href === a.links.signUp) return `click:kayit:${a.slug}`;
  }
  return null;
}

/** Counts pages and button presses; see lib/stats.ts for what is and is not kept */
export function VisitCounter() {
  const pathname = usePathname();

  useEffect(() => {
    send(`view:${pathname}`);
  }, [pathname]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element).closest?.<HTMLAnchorElement>("a[href]");
      const href = link?.getAttribute("href");
      const key = link?.dataset.hit ? `click:${link.dataset.hit}` : href && clickKey(href);
      if (key) send(key);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}

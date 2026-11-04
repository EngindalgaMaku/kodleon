import Link from "next/link";
import { whatsappLink } from "@/lib/site";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <svg width="30" height="30" viewBox="0 0 32 32" aria-hidden="true">
        <rect width="32" height="32" rx="9" fill={light ? "#f7f5f0" : "#14161a"} />
        <path d="M10.5 7.5v17" stroke={light ? "#14161a" : "#f7f5f0"} strokeWidth="3.6" strokeLinecap="round" />
        <path d="M21.5 8 14 16l7.5 8" fill="none" stroke="#ff5a36" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className={`font-display text-[22px] font-bold tracking-tight ${light ? "text-paper" : "text-ink"}`}>kodleon</span>
    </span>
  );
}

export function WhatsAppIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.9 5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.6-1.1.1-.2 0-.3 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2s.9 2.5 1.1 2.7c.1.2 1.8 2.8 4.4 3.9 1.6.7 2.3.8 3.1.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1 0-.3-.1-.5-.2Z" />
    </svg>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 lg:px-8">
        <Link href="/" aria-label="Kodleon ana sayfa" className="inline-flex min-h-11 items-center">
          <Logo />
        </Link>
        <nav aria-label="Ana menü" className="hidden items-center gap-8 text-[15px] font-medium text-ink/80 md:flex">
          <Link href="/#uygulamalar" className="inline-flex min-h-11 items-center hover:text-ink">Uygulamalar</Link>
          <Link href="/#nasil" className="inline-flex min-h-11 items-center hover:text-ink">Nasıl çalışır</Link>
          <Link href="/#sirada" className="inline-flex min-h-11 items-center hover:text-ink">Sıradaki sektörler</Link>
        </nav>
        <a
          href={whatsappLink("Merhaba, Kodleon uygulamaları hakkında bilgi almak istiyorum.")}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-4 text-sm font-semibold text-paper transition hover:bg-ink/85"
        >
          <WhatsAppIcon className="h-4 w-4" />
          <span>Yazın</span>
        </a>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-12 sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <div>
          <Logo light />
          <p className="mt-3 max-w-sm text-sm text-paper/60">İşletmeler için yazılım çözümleri: web ve Android uygulamaları.</p>
        </div>
        <nav aria-label="Alt menü" className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-paper/70">
          <Link href="/#uygulamalar" className="inline-flex min-h-11 items-center hover:text-paper">Uygulamalar</Link>
          <Link href="/gizlilik" className="inline-flex min-h-11 items-center hover:text-paper">Gizlilik</Link>
          <a href={whatsappLink("Merhaba, Kodleon hakkında bilgi almak istiyorum.")} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center hover:text-paper">WhatsApp</a>
        </nav>
      </div>
    </footer>
  );
}

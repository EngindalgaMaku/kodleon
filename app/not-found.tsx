import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-2xl px-5 py-24 text-center">
      <h1 className="font-display text-6xl font-bold tracking-tight">Bu sayfa yok</h1>
      <p className="mt-4 text-lg text-muted">Aradığınız sayfa taşınmış veya kaldırılmış olabilir.</p>
      <Link href="/" className="mt-8 inline-flex min-h-13 items-center rounded-full bg-ink px-7 font-semibold text-paper">
        Ana sayfaya dön
      </Link>
    </section>
  );
}

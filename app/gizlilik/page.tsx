import { whatsappLink } from "@/lib/site";

export const metadata = { title: "Gizlilik" };

export default function PrivacyPage() {
  return (
    <section className="mx-auto max-w-2xl px-5 py-16">
      <h1 className="font-display text-5xl font-bold tracking-tight">Gizlilik</h1>
      <div className="mt-8 space-y-4 text-lg leading-relaxed text-muted">
        <p>Bu tanıtım sitesinde üyelik veya form yoktur, reklam ve takip çerezi kullanılmaz.</p>
        <p>
          WhatsApp düğmesine bastığınızda WhatsApp açılır; yazdıklarınız WhatsApp'ın kendi koşullarına tabidir ve yalnızca size cevap vermek için kullanılır.
        </p>
        <p>
          Uygulamalara kaydolursanız o uygulamanın kendi aydınlatma metni ve kullanım şartları geçerlidir. Sorularınız için{" "}
          <a href={whatsappLink("Merhaba, gizlilik hakkında bir sorum var.")} target="_blank" rel="noreferrer" className="font-medium text-ember underline underline-offset-4">
            WhatsApp'tan yazabilirsiniz
          </a>
          .
        </p>
      </div>
    </section>
  );
}

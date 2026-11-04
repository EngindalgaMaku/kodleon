import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import { Footer, Header } from "@/components/chrome";
import { VisitCounter } from "@/components/visit-counter";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const display = Bricolage_Grotesque({ subsets: ["latin", "latin-ext"], variable: "--font-bricolage", display: "swap" });
const body = Inter({ subsets: ["latin", "latin-ext"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Kodleon · İşletmeler için yazılım çözümleri", template: "%s · Kodleon" },
  description: "İşletmeler için yazılım çözümleri: sipariş, müşteri, saha ve kasa takibi tek yerde. Halı yıkama ve oto detailing programlarının demosunu ücretsiz deneyin.",
  openGraph: { siteName: "Kodleon", locale: "tr_TR", type: "website", images: [{ url: "/og/kodleon.jpg", width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = { themeColor: "#f7f5f0", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={`${display.variable} ${body.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <VisitCounter />
      </body>
    </html>
  );
}

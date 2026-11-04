import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import { Footer, Header } from "@/components/chrome";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const display = Bricolage_Grotesque({ subsets: ["latin", "latin-ext"], variable: "--font-bricolage", display: "swap" });
const body = Inter({ subsets: ["latin", "latin-ext"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Kodleon · Her işin kendi uygulaması", template: "%s · Kodleon" },
  description: "Halı yıkamadan oto detailinge, işletmelerin günlük işine göre yapılan web ve Android uygulamaları. Demoyu açın, hemen deneyin.",
  openGraph: { siteName: "Kodleon", locale: "tr_TR", type: "website", images: ["/apps/autopro/bugun.webp"] },
};

export const viewport: Viewport = { themeColor: "#f7f5f0", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={`${display.variable} ${body.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

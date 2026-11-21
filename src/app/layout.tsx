import type { Metadata, Viewport } from "next";
import { Instrument_Sans } from "next/font/google";
import Link from "next/link";
import { NavLinks } from "@/components/NavLinks";
import "./globals.css";

const instrument = Instrument_Sans({ variable: "--font-instrument", subsets: ["latin"] });

const title = "NemuKampus — Barang Hilang & Temuan UB";
const description = "Cari dan laporkan barang hilang atau temuan di lingkungan Universitas Brawijaya. Gratis, tanpa akun.";

export const metadata: Metadata = {
  // Vercel sets this on deploy; share links need an absolute origin
  metadataBase: new URL(
    process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000",
  ),
  title,
  description,
  openGraph: { title, description, siteName: "NemuKampus", locale: "id_ID", type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export const viewport: Viewport = { themeColor: "#f8f8f8" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body className={`${instrument.variable} font-sans antialiased min-h-screen flex flex-col`}>
        <a href="#konten" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-brand">
          Lewati ke konten
        </a>
        <header className="sticky top-0 z-40 border-b border-black/10 bg-[#f8f8f8]">
          <nav aria-label="Navigasi utama" className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-2 px-4 sm:gap-4">
            <Link href="/" className="flex min-h-11 items-center gap-2 text-lg font-medium tracking-tight text-[#0a0a0a] sm:text-xl">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="#1f6b3a" aria-hidden><circle cx="6.5" cy="6.5" r="4.5"/><circle cx="17.5" cy="6.5" r="4.5"/><circle cx="6.5" cy="17.5" r="4.5"/><rect x="13" y="13" width="9" height="9" rx="1.5"/></svg>
              NemuKampus
            </Link>
            <NavLinks />
          </nav>
        </header>
        <main id="konten" className="flex-1">{children}</main>
        <footer className="border-t border-slate-200 bg-white">
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-6 text-sm text-slate-600 sm:flex-row sm:justify-between">
            <p>NemuKampus · Barang hilang &amp; temuan Universitas Brawijaya</p>
            <p>Tugas Interaksi Manusia dan Komputer · FILKOM 2026</p>
          </div>
        </footer>
      </body>
    </html>
  );
}

import Link from "next/link";
import { BackLink } from "@/components/NavLinks";
import { SearchX, HandHeart } from "lucide-react";

export default function BuatLaporan() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <BackLink fallback="/">Kembali ke Beranda</BackLink>
      <h1 className="mt-4 text-2xl font-bold">Buat Laporan</h1>
      <p className="mt-1 text-slate-600">Pilih jenis laporan yang ingin kamu buat.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Link href="/lapor/hilang" className="rounded-xl border-2 border-slate-200 bg-white p-6 transition-colors hover:border-lost-line">
          <SearchX className="text-lost" size={36} aria-hidden />
          <h2 className="mt-3 text-lg font-semibold">Barang Hilang</h2>
          <p className="mt-1 text-sm text-slate-600">Saya kehilangan barang dan ingin orang lain membantu mencarinya.</p>
        </Link>
        <Link href="/lapor/ditemukan" className="rounded-xl border-2 border-slate-200 bg-white p-6 transition-colors hover:border-found-line">
          <HandHeart className="text-found" size={36} aria-hidden />
          <h2 className="mt-3 text-lg font-semibold">Barang Ditemukan</h2>
          <p className="mt-1 text-sm text-slate-600">Saya menemukan barang milik orang lain dan ingin mengembalikannya.</p>
        </Link>
      </div>
    </div>
  );
}

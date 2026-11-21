import Link from "next/link";
import { SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-20 text-center">
      <SearchX className="mx-auto text-slate-400" size={56} aria-hidden />
      <h1 className="mt-4 text-2xl font-bold">Halaman tidak ditemukan</h1>
      <p className="mt-2 text-slate-600">Laporan mungkin sudah dihapus oleh pelapornya, atau tautannya salah.</p>
      <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
        <Link href="/cari" className="btn btn-primary">
          Cari Barang
        </Link>
        <Link href="/" className="btn btn-secondary">
          Ke Beranda
        </Link>
      </div>
    </div>
  );
}

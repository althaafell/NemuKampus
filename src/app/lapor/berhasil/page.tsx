"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Copy, Check } from "lucide-react";

type Last = { id: string; code: string; title: string };

export default function LaporanBerhasil() {
  const [last, setLast] = useState<Last | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("nemukampus:last");
      if (raw) setLast(JSON.parse(raw));
    } catch {}
  }, []);

  if (!last) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center">
        <p className="text-slate-600">Tidak ada laporan yang baru dikirim.</p>
        <Link href="/" className="mt-4 inline-block font-medium text-brand underline">Kembali ke Beranda</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-12 text-center">
      <CheckCircle2 className="mx-auto text-found" size={56} aria-hidden />
      <h1 className="mt-4 text-2xl font-bold">Laporan Berhasil Dikirim</h1>
      <p className="mt-2 text-slate-600">
        Laporan <strong>{last.title}</strong> sudah tampil dan bisa dilihat mahasiswa lain.
      </p>

      <div className="mt-8 rounded-xl border-2 border-warn-line bg-warn-soft p-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-warn">Kode Laporan</p>
        <p className="mt-2 font-mono text-4xl font-bold tracking-[0.2em] text-slate-900">{last.code}</p>
        <button
          onClick={() => {
            navigator.clipboard.writeText(last.code);
            setCopied(true);
          }}
          className="mt-3 inline-flex min-h-11 cursor-pointer items-center gap-1.5 rounded-lg px-4 text-sm font-medium text-warn hover:bg-warn-line/50"
        >
          {copied ? <Check size={16} aria-hidden /> : <Copy size={16} aria-hidden />} {copied ? "Tersalin" : "Salin kode"}
        </button>
        <p className="mt-3 text-sm text-warn">
          <strong>Simpan kode ini</strong> (salin atau screenshot). Kode diperlukan untuk menandai laporan selesai atau
          menghapusnya, dan <strong>tidak bisa ditampilkan lagi</strong>.
        </p>
      </div>

      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Link href={`/barang/${last.id}`} className="btn btn-secondary">
          Lihat Laporan
        </Link>
        <Link href="/" className="btn btn-primary">
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}

import { BackLink } from "@/components/NavLinks";
import { notFound } from "next/navigation";
import ReportForm from "@/components/ReportForm";

export default async function FormLaporan({ params }: { params: Promise<{ jenis: string }> }) {
  const { jenis } = await params;
  if (jenis !== "hilang" && jenis !== "ditemukan") notFound();

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <BackLink fallback="/lapor">Kembali ke Buat Laporan</BackLink>
      <h1 className="mt-4 text-2xl font-bold">
        Laporan Barang {jenis === "hilang" ? "Hilang" : "Ditemukan"}
      </h1>
      <p className="mt-1 text-slate-600">Kolom bertanda * wajib diisi.</p>
      <ReportForm type={jenis} />
    </div>
  );
}

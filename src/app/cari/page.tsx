import Link from "next/link";
import { Search, X, SearchX } from "lucide-react";
import { supabase, REPORT_COLUMNS, EXPIRY_DAYS, CATEGORIES, LOCATIONS, type Report } from "@/lib/supabase";
import { ReportGrid } from "@/components/ReportCard";

export const dynamic = "force-dynamic";

type Params = { q?: string; jenis?: string; kategori?: string; lokasi?: string; semua?: string };

const selectCls = "field text-sm";

export default async function CariBarang({ searchParams }: { searchParams: Promise<Params> }) {
  const p = await searchParams;
  // strip characters that would break PostgREST's or() filter syntax
  const q = (p.q ?? "").replace(/[,()%*\\.:]/g, " ").trim();

  let query = supabase.from("reports").select(REPORT_COLUMNS).order("created_at", { ascending: false }).limit(60);
  if (q) query = query.or(`title.ilike.%${q}%,description.ilike.%${q}%`);
  if (p.jenis === "hilang" || p.jenis === "ditemukan") query = query.eq("type", p.jenis);
  if (p.kategori && CATEGORIES.includes(p.kategori)) query = query.eq("category", p.kategori);
  if (p.lokasi && LOCATIONS.includes(p.lokasi)) query = query.eq("location", p.lokasi);
  if (!p.semua) {
    query = query.eq("status", "aktif").gte("created_at", new Date(Date.now() - EXPIRY_DAYS * 864e5).toISOString());
  }
  const { data, error } = await query;
  const reports = (data ?? []) as Report[];
  const filtered = Boolean(q || p.jenis || p.kategori || p.lokasi);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-bold">Cari Barang</h1>

      <form className="mt-5 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex gap-2">
          <label htmlFor="q" className="sr-only">Kata kunci barang</label>
          <input
            id="q"
            name="q"
            defaultValue={p.q}
            placeholder="Nama atau ciri barang…"
            className="field min-w-0 flex-1"
          />
          <button className="btn btn-primary">
            <Search size={18} aria-hidden /> Cari
          </button>
        </div>
        <div className="mt-3 grid gap-3 sm:grid-cols-4">
          <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
            Jenis
            <select name="jenis" defaultValue={p.jenis ?? ""} className={selectCls}>
              <option value="">Semua jenis</option>
              <option value="hilang">Barang hilang</option>
              <option value="ditemukan">Barang ditemukan</option>
            </select>
          </label>
          <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
            Kategori
            <select name="kategori" defaultValue={p.kategori ?? ""} className={selectCls}>
              <option value="">Semua kategori</option>
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
          </label>
          <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
            Lokasi
            <select name="lokasi" defaultValue={p.lokasi ?? ""} className={selectCls}>
              <option value="">Semua lokasi</option>
              {LOCATIONS.map((l) => <option key={l}>{l}</option>)}
            </select>
          </label>
          <label className="flex items-center gap-2 self-end py-2.5 text-sm text-slate-700">
            <input type="checkbox" name="semua" value="1" defaultChecked={!!p.semua} className="size-4 accent-brand" />
            Tampilkan juga yang selesai / lama
          </label>
        </div>
      </form>

      <div className="mb-4 mt-8 flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-lg font-semibold" aria-live="polite">
          {filtered ? `Hasil Pencarian (${reports.length})` : `Semua Laporan (${reports.length})`}
        </h2>
        {(filtered || p.semua) && (
          <Link href="/cari" className="inline-flex min-h-11 items-center gap-1.5 rounded-lg px-3 text-sm font-medium text-brand hover:bg-black/5">
            <X size={16} aria-hidden /> Hapus semua filter
          </Link>
        )}
      </div>
      {error ? (
        <p className="text-danger">Gagal memuat laporan. Coba lagi.</p>
      ) : reports.length ? (
        <ReportGrid reports={reports} />
      ) : (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-600">
          <SearchX className="mx-auto text-slate-400" size={40} aria-hidden />
          <p className="mt-3 font-medium text-slate-700">Tidak ada barang yang cocok.</p>
          <p className="mt-1 text-sm">
            Coba kata kunci lain, atau{" "}
            <Link href="/lapor" className="font-medium text-brand underline">buat laporan</Link> supaya orang lain bisa menghubungimu.
          </p>
        </div>
      )}
    </div>
  );
}

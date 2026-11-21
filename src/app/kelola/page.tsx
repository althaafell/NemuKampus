"use client";

import { useState } from "react";
import Link from "next/link";
import { KeyRound, Loader2, CheckCircle2, Trash2 } from "lucide-react";
import { supabase, formatDate, type Report } from "@/lib/supabase";
import { TypeBadge, StatusBadge } from "@/components/ReportCard";

export default function KelolaLaporan() {
  const [code, setCode] = useState("");
  const [report, setReport] = useState<Report | null>(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [confirming, setConfirming] = useState(false);

  async function find(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMsg(null);
    setReport(null);
    const { data, error } = await supabase.rpc("get_report_by_code", { p_code: code });
    setBusy(false);
    if (error) return setMsg({ ok: false, text: "Terjadi kesalahan. Coba lagi." });
    if (!data?.length) return setMsg({ ok: false, text: "Kode laporan tidak ditemukan. Periksa kembali kodenya." });
    setReport(data[0]);
  }

  async function close() {
    setBusy(true);
    const { data, error } = await supabase.rpc("close_report", { p_code: code });
    setBusy(false);
    if (error || !data) return setMsg({ ok: false, text: "Gagal menandai selesai." });
    setReport({ ...report!, status: "selesai" });
    setMsg({ ok: true, text: "Laporan ditandai selesai dan tidak lagi muncul di pencarian." });
  }

  async function remove() {
    setConfirming(false);
    setBusy(true);
    const { data, error } = await supabase.rpc("delete_report", { p_code: code });
    setBusy(false);
    if (error || !data) return setMsg({ ok: false, text: "Gagal menghapus laporan." });
    setReport(null);
    setCode("");
    setMsg({ ok: true, text: "Laporan berhasil dihapus." });
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-8">
      <h1 className="text-2xl font-bold">Kelola Laporan</h1>
      <p className="mt-1 text-slate-600">Masukkan kode laporan yang kamu dapat saat mengirim laporan.</p>

      <form onSubmit={find} className="mt-6 flex gap-2">
        <label htmlFor="code" className="sr-only">Kode laporan</label>
        <input
          id="code"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          required
          maxLength={8}
          placeholder="Contoh: AB12CD34"
          autoComplete="off"
          className="field min-w-0 flex-1 font-mono tracking-widest"
        />
        <button disabled={busy} aria-busy={busy} className="btn btn-primary">
          {busy ? <Loader2 size={18} className="motion-safe:animate-spin" aria-hidden /> : <KeyRound size={18} aria-hidden />} Cek
        </button>
      </form>

      {msg && (
        <p role="status" className={`mt-4 rounded-lg p-3 text-sm ring-1 ${msg.ok ? "bg-found-soft text-found ring-found-line" : "bg-danger-soft text-danger ring-danger-line"}`}>
          {msg.text}
        </p>
      )}

      {report && (
        <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex gap-2">
            <TypeBadge type={report.type} />
            <StatusBadge status={report.status} />
          </div>
          <h2 className="mt-2 text-lg font-semibold">
            <Link href={`/barang/${report.id}`} className="hover:underline">{report.title}</Link>
          </h2>
          <p className="text-sm text-slate-600">{report.location} · {formatDate(report.event_date)}</p>

          {confirming ? (
            <div role="alertdialog" aria-labelledby="hapus-judul" className="mt-5 rounded-lg bg-danger-soft p-4 ring-1 ring-danger-line">
              <p id="hapus-judul" className="font-semibold text-danger-dark">Hapus laporan ini secara permanen?</p>
              <p className="mt-1 text-sm text-danger">Tindakan ini tidak bisa dibatalkan. Jika barang sudah kembali, sebaiknya pilih &quot;Tandai Selesai&quot;.</p>
              <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                <button onClick={remove} disabled={busy} autoFocus className="btn btn-danger flex-1">
                  <Trash2 size={18} aria-hidden /> Ya, hapus
                </button>
                <button onClick={() => setConfirming(false)} className="btn btn-secondary flex-1">
                  Batal
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              {report.status === "aktif" && (
                <button onClick={close} disabled={busy} className="btn btn-success flex-1">
                  <CheckCircle2 size={18} aria-hidden /> Tandai Selesai
                </button>
              )}
              <button onClick={() => setConfirming(true)} disabled={busy} className="btn btn-danger-outline flex-1">
                <Trash2 size={18} aria-hidden /> Hapus Laporan
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

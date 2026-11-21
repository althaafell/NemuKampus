"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, ShieldAlert, Upload } from "lucide-react";
import { supabase, CATEGORIES, LOCATIONS } from "@/lib/supabase";

const inputCls = "field";

// shrink the photo in the browser so uploads stay small (bucket limit is 2 MB)
async function compressImage(file: File): Promise<Blob> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, 1280 / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  return new Promise((res, rej) => canvas.toBlob((b) => (b ? res(b) : rej(new Error("Gagal memproses foto"))), "image/jpeg", 0.8));
}

export default function ReportForm({ type }: { type: "hilang" | "ditemukan" }) {
  const router = useRouter();
  const [preview, setPreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [waError, setWaError] = useState<string | null>(null);

  function checkWa(value: string) {
    const ok = /^(0|62)8\d{7,12}$/.test(value.replace(/\D/g, ""));
    setWaError(ok ? null : "Nomor WhatsApp tidak valid. Gunakan format 08xxxxxxxxxx (10–15 digit).");
    return ok;
  }
  // campus date (WIB) on the server and in the browser alike: Vercel renders in UTC, a day behind on WIB mornings
  const today = new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Jakarta" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const f = new FormData(e.currentTarget);
    const wa = String(f.get("whatsapp")).replace(/\D/g, "");
    if (!checkWa(wa)) {
      document.getElementById("whatsapp")?.focus();
      return;
    }
    setSubmitting(true);
    try {
      let photoUrl: string | null = null;
      const file = f.get("photo") as File;
      if (file && file.size > 0) {
        const blob = await compressImage(file);
        const path = `${crypto.randomUUID()}.jpg`;
        const { error: upErr } = await supabase.storage.from("photos").upload(path, blob, { contentType: "image/jpeg" });
        if (upErr) throw new Error("Gagal mengunggah foto. Coba foto lain atau kirim tanpa foto.");
        photoUrl = supabase.storage.from("photos").getPublicUrl(path).data.publicUrl;
      }
      const { data, error: rpcErr } = await supabase.rpc("create_report", {
        p_type: type,
        p_title: f.get("title"),
        p_category: f.get("category"),
        p_location: f.get("location"),
        p_location_detail: f.get("location_detail"),
        p_event_date: f.get("event_date"),
        p_description: f.get("description"),
        p_photo_url: photoUrl,
        p_whatsapp: wa,
      });
      if (rpcErr) throw new Error("Laporan gagal dikirim. Periksa kembali isian lalu coba lagi.");
      sessionStorage.setItem("nemukampus:last", JSON.stringify({ ...data, title: f.get("title") }));
      router.push("/lapor/berhasil");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan.");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-5 rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
      <Field label="Nama barang *" htmlFor="title">
        <input id="title" name="title" required minLength={3} maxLength={100} placeholder="Contoh: Dompet kulit hitam" className={inputCls} />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Kategori *" htmlFor="category">
          <select id="category" name="category" required defaultValue="" className={inputCls}>
            <option value="" disabled>Pilih kategori</option>
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </Field>
        <Field label={type === "hilang" ? "Tanggal hilang *" : "Tanggal ditemukan *"} htmlFor="event_date">
          <input id="event_date" name="event_date" type="date" required max={today} defaultValue={today} className={inputCls} />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Lokasi *" htmlFor="location">
          <select id="location" name="location" required defaultValue="" className={inputCls}>
            <option value="" disabled>Pilih gedung / area</option>
            {LOCATIONS.map((l) => <option key={l}>{l}</option>)}
          </select>
        </Field>
        <Field label="Detail lokasi" htmlFor="location_detail">
          <input id="location_detail" name="location_detail" maxLength={200} placeholder="Contoh: lantai 3, dekat lift" className={inputCls} />
        </Field>
      </div>

      <Field label="Deskripsi" htmlFor="description">
        <textarea id="description" name="description" rows={4} maxLength={1000} placeholder="Warna, merek, ukuran, kondisi…" className={inputCls} />
      </Field>
      {type === "ditemukan" && (
        <p className="-mt-3 flex gap-2 rounded-lg bg-warn-soft p-3 text-sm text-warn ring-1 ring-warn-line">
          <ShieldAlert size={18} className="shrink-0" aria-hidden />
          Jangan tulis ciri khas barang (isi dompet, nomor seri, stiker, dll). Simpan untuk menanyakan ke orang yang mengaku pemilik.
        </p>
      )}

      <Field label="Foto barang (opsional, 1 foto)" htmlFor="photo">
        <label htmlFor="photo" className="flex cursor-pointer items-center gap-4 rounded-lg border-2 border-dashed border-slate-300 p-4 hover:border-brand">
          {preview ? (
            // eslint-disable-next-line @next/next/no-img-element -- local blob preview
            <img src={preview} alt="Pratinjau foto" className="size-20 rounded-md object-cover" />
          ) : (
            <Upload className="text-slate-400" size={28} aria-hidden />
          )}
          <span className="text-sm text-slate-600">{preview ? "Ganti foto" : "Pilih foto (JPG, PNG, WebP)"}</span>
        </label>
        <input
          id="photo"
          name="photo"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="sr-only"
          onChange={(e) => {
            const file = e.target.files?.[0];
            setPreview(file ? URL.createObjectURL(file) : null);
          }}
        />
      </Field>

      <Field label="Nomor WhatsApp *" htmlFor="whatsapp">
        <input
          id="whatsapp"
          name="whatsapp"
          type="tel"
          required
          inputMode="numeric"
          autoComplete="tel"
          placeholder="08xxxxxxxxxx"
          className={`${inputCls} ${waError ? "border-danger" : ""}`}
          aria-invalid={!!waError}
          aria-describedby={waError ? "wa-error wa-help" : "wa-help"}
          onBlur={(e) => e.target.value && checkWa(e.target.value)}
          onChange={(e) => waError && checkWa(e.target.value)}
        />
        {waError && <p id="wa-error" className="mt-1 text-sm font-medium text-danger">{waError}</p>}
        <p id="wa-help" className="mt-1 text-sm text-slate-600">Nomor ini akan tampil publik agar orang lain bisa menghubungimu.</p>
      </Field>

      {error && <p role="alert" className="rounded-lg bg-danger-soft p-3 text-sm text-danger ring-1 ring-danger-line">{error}</p>}

      <button
        disabled={submitting}
        aria-busy={submitting}
        className="btn btn-primary min-h-12 w-full disabled:cursor-wait"
      >
        {submitting && <Loader2 size={18} className="motion-safe:animate-spin" aria-hidden />}
        {submitting ? "Mengirim…" : "Kirim Laporan"}
      </button>
    </form>
  );
}

function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-slate-700">{label}</label>
      {children}
    </div>
  );
}

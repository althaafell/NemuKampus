import Image from "next/image";
import { BackLink } from "@/components/NavLinks";
import { notFound } from "next/navigation";
import { MapPin, CalendarDays, Tag, MessageCircle, ShieldAlert, ImageOff } from "lucide-react";
import { supabase, REPORT_COLUMNS, formatDate, type Report } from "@/lib/supabase";
import { TypeBadge, StatusBadge } from "@/components/ReportCard";

export const dynamic = "force-dynamic";

export default async function DetailBarang({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!/^[0-9a-f-]{36}$/i.test(id)) notFound();
  const { data } = await supabase.from("reports").select(REPORT_COLUMNS).eq("id", id).maybeSingle();
  if (!data) notFound();
  const r = data as Report;

  const greeting =
    r.type === "hilang"
      ? `Halo, saya melihat laporan "${r.title}" di NemuKampus. Sepertinya saya menemukan barang tersebut.`
      : `Halo, saya melihat laporan "${r.title}" di NemuKampus. Sepertinya itu barang saya.`;
  const waLink = `https://wa.me/${r.whatsapp}?text=${encodeURIComponent(greeting)}`;

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <BackLink fallback="/cari">Kembali ke hasil pencarian</BackLink>

      <div className="mt-5 grid gap-8 md:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-slate-100">
          {r.photo_url ? (
            <Image src={r.photo_url} alt={r.title} fill sizes="(min-width:768px) 50vw, 100vw" className="object-cover" priority />
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-stone-100 to-stone-200 text-slate-500">
              <ImageOff size={40} aria-hidden /> <span className="text-sm">Tanpa foto</span>
            </div>
          )}
        </div>

        <div>
          <div className="flex gap-2">
            <TypeBadge type={r.type} />
            <StatusBadge status={r.status} />
          </div>
          <h1 className="mt-3 text-2xl font-bold">{r.title}</h1>

          <dl className="mt-5 space-y-3 text-slate-700">
            <div className="flex gap-3">
              <dt><Tag size={18} aria-label="Kategori" /></dt>
              <dd>{r.category}</dd>
            </div>
            <div className="flex gap-3">
              <dt><MapPin size={18} aria-label="Lokasi" /></dt>
              <dd>{r.location}{r.location_detail && <span className="text-slate-500"> — {r.location_detail}</span>}</dd>
            </div>
            <div className="flex gap-3">
              <dt><CalendarDays size={18} aria-label="Tanggal" /></dt>
              <dd>{r.type === "hilang" ? "Hilang" : "Ditemukan"} pada {formatDate(r.event_date)}</dd>
            </div>
          </dl>

          {r.description && (
            <div className="mt-5">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Deskripsi</h2>
              <p className="mt-1 whitespace-pre-line text-slate-800">{r.description}</p>
            </div>
          )}

          {r.status === "selesai" ? (
            <p className="mt-6 rounded-lg bg-slate-100 p-4 text-sm text-slate-700">
              Laporan ini sudah ditandai <strong>selesai</strong> oleh pelapor — barang sudah kembali ke pemiliknya.
            </p>
          ) : (
            <>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-success mt-6 w-full min-h-12"
              >
                <MessageCircle size={20} aria-hidden /> Hubungi via WhatsApp
              </a>
              {r.type === "ditemukan" && (
                <p className="mt-4 flex gap-2 rounded-lg bg-warn-soft p-3 text-sm text-warn ring-1 ring-warn-line">
                  <ShieldAlert size={18} className="shrink-0" aria-hidden />
                  Penemu akan menanyakan ciri khas barang yang tidak ditulis di sini untuk memastikan kamu pemiliknya.
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

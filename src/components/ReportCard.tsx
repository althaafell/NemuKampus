import Link from "next/link";
import Image from "next/image";
import { MapPin, CalendarDays } from "lucide-react";
import { CategoryIcon } from "@/components/CategoryIcon";
import { formatDate, type Report } from "@/lib/supabase";

export function TypeBadge({ type }: { type: Report["type"] }) {
  return type === "hilang" ? (
    <span className="rounded-full bg-lost-soft px-2.5 py-0.5 text-xs font-semibold text-lost ring-1 ring-lost-line">Hilang</span>
  ) : (
    <span className="rounded-full bg-found-soft px-2.5 py-0.5 text-xs font-semibold text-found ring-1 ring-found-line">Ditemukan</span>
  );
}

export function StatusBadge({ status }: { status: Report["status"] }) {
  if (status === "aktif") return null;
  return <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-600 ring-1 ring-slate-200">Selesai</span>;
}

export default function ReportCard({ r }: { r: Report }) {
  return (
    <Link
      href={`/barang/${r.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition-[box-shadow,border-color] duration-200 hover:border-slate-300 hover:shadow-md"
    >
      <div className="relative aspect-[4/3] bg-slate-100">
        <div className={`absolute inset-0 ${r.status === "selesai" ? "opacity-50 grayscale" : ""}`}>
          {r.photo_url ? (
            <Image src={r.photo_url} alt={r.title} fill sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw" className="object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-stone-100 to-stone-200 text-brand/40">
              <CategoryIcon category={r.category} size={56} strokeWidth={1.5} aria-hidden />
              <span className="sr-only">Tanpa foto</span>
            </div>
          )}
        </div>
        <div className="absolute left-2 top-2 flex gap-1.5">
          <TypeBadge type={r.type} />
          <StatusBadge status={r.status} />
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{r.category}</p>
        <h3 className="font-semibold text-slate-900 group-hover:text-brand line-clamp-2">{r.title}</h3>
        <p className="mt-auto flex items-center gap-1.5 text-sm text-slate-600">
          <MapPin size={15} aria-hidden /> {r.location}
        </p>
        <p className="flex items-center gap-1.5 text-sm text-slate-600">
          <CalendarDays size={15} aria-hidden /> {formatDate(r.event_date)}
        </p>
      </div>
    </Link>
  );
}

export function ReportGrid({ reports }: { reports: Report[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {reports.map((r) => (
        <ReportCard key={r.id} r={r} />
      ))}
    </div>
  );
}

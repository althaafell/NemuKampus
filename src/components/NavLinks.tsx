"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Search, PlusCircle, KeyRound, ArrowLeft } from "lucide-react";

const linkCls =
  "flex min-h-11 min-w-11 items-center justify-center gap-1.5 rounded-lg px-2.5 transition-colors duration-200 sm:px-3";

export function NavLinks() {
  const path = usePathname();
  const active = (p: string) => path === p || path.startsWith(p + "/");
  const item = (href: string, label: string, Icon: typeof Search) => (
    <Link
      href={href}
      aria-current={active(href) ? "page" : undefined}
      className={`${linkCls} ${
        active(href)
          ? "rounded-none font-semibold text-brand shadow-[inset_0_-2px_0_#1f6b3a]"
          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
      }`}
    >
      <Icon size={18} aria-hidden />
      <span className="sr-only sm:not-sr-only">{label}</span>
    </Link>
  );

  return (
    <div className="flex shrink-0 items-center gap-1 text-sm font-medium sm:gap-2">
      {item("/cari", "Cari Barang", Search)}
      {item("/kelola", "Kelola Laporan", KeyRound)}
      <Link
        href="/lapor"
        aria-current={active("/lapor") ? "page" : undefined}
        className={`${linkCls} btn-primary font-semibold`}
      >
        <PlusCircle size={18} aria-hidden />
        {/* below 380px only the icon shows, so the header fits a 320px screen */}
        <span className="whitespace-nowrap max-[379px]:sr-only"><span className="hidden sm:inline">Buat </span>Laporan</span>
      </Link>
    </div>
  );
}

// goes back in history when the user came from inside the site, so search filters are kept
export function BackLink({ fallback, children }: { fallback: string; children: React.ReactNode }) {
  const router = useRouter();
  return (
    <Link
      href={fallback}
      onClick={(e) => {
        if (document.referrer.startsWith(location.origin) && history.length > 1) {
          e.preventDefault();
          router.back();
        }
      }}
      className="-ml-2 inline-flex min-h-11 items-center gap-1.5 rounded-lg px-2 text-sm font-medium text-brand hover:bg-black/5"
    >
      <ArrowLeft size={16} aria-hidden /> {children}
    </Link>
  );
}

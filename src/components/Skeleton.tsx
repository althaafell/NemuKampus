export function GridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div aria-busy="true" aria-label="Memuat laporan" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          <div className="aspect-[4/3] motion-safe:animate-pulse bg-slate-200" />
          <div className="space-y-2 p-4">
            <div className="h-3 w-1/3 motion-safe:animate-pulse rounded bg-slate-200" />
            <div className="h-4 w-3/4 motion-safe:animate-pulse rounded bg-slate-200" />
            <div className="h-3 w-1/2 motion-safe:animate-pulse rounded bg-slate-200" />
          </div>
        </div>
      ))}
    </div>
  );
}

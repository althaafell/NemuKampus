export default function Loading() {
  return (
    <div aria-busy="true" aria-label="Memuat detail barang" className="mx-auto max-w-5xl px-4 py-8">
      <div className="h-11 w-56 motion-safe:animate-pulse rounded bg-slate-200" />
      <div className="mt-5 grid gap-8 md:grid-cols-2">
        <div className="aspect-[4/3] motion-safe:animate-pulse rounded-xl bg-slate-200" />
        <div className="space-y-4">
          <div className="h-5 w-24 motion-safe:animate-pulse rounded-full bg-slate-200" />
          <div className="h-8 w-3/4 motion-safe:animate-pulse rounded bg-slate-200" />
          <div className="h-4 w-1/2 motion-safe:animate-pulse rounded bg-slate-200" />
          <div className="h-4 w-2/3 motion-safe:animate-pulse rounded bg-slate-200" />
          <div className="h-12 motion-safe:animate-pulse rounded-lg bg-slate-200" />
        </div>
      </div>
    </div>
  );
}

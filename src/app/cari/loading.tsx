import { GridSkeleton } from "@/components/Skeleton";

export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-bold">Cari Barang</h1>
      <div className="mt-5 h-36 motion-safe:animate-pulse rounded-xl bg-slate-200" />
      <div className="mb-4 mt-8 h-6 w-48 motion-safe:animate-pulse rounded bg-slate-200" />
      <GridSkeleton />
    </div>
  );
}

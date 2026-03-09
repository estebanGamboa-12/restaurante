"use client";

export default function MapSectionSkeleton() {
  return (
    <div
      className="flex items-center justify-center rounded-t-3xl bg-white/5"
      style={{ minHeight: 520 }}
      aria-hidden
    >
      <div className="h-12 w-12 animate-pulse rounded-full bg-white/10" />
    </div>
  );
}

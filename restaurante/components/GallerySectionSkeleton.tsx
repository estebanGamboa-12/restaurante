"use client";

export default function GallerySectionSkeleton() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 md:py-24" aria-hidden>
      <div className="mb-10 h-8 w-32 animate-pulse rounded bg-white/10 mx-auto" />
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="aspect-square animate-pulse rounded-xl bg-white/5 md:rounded-2xl"
          />
        ))}
      </div>
      <div className="mt-10 flex justify-center">
        <div className="h-12 w-40 animate-pulse rounded-full bg-white/5" />
      </div>
    </section>
  );
}

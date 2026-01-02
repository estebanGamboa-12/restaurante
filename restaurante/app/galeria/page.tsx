import type { Metadata } from "next";
import Image from "next/image";
import { Heart, Star } from "lucide-react";
import { site } from "@/data/site";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: `Galería | ${site.brand.seo.title}`,
  description: "Galería de fotos del restaurante en Sevilla: ambiente, platos y brasa real.",
};

export default function GaleriaPage() {
  return (
    <main className="relative pb-24 md:pb-0">
      <SiteHeader site={site} />

      <section className="mx-auto max-w-6xl px-5 py-14">
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-white/60">Galería</p>
          <h1 className="mt-4 text-4xl font-black md:text-5xl">Ambiente, brasa y platos con alma.</h1>
          <p className="mt-4 text-white/75">
            Descubre cómo se vive la experiencia {site.brand.name}: brasas reales, cócteles y un
            ambiente cálido en pleno centro de Sevilla.
          </p>
        </div>

        <div className="mt-8 grid gap-3 md:grid-cols-4">
          {site.gallery.map((src: string, i: number) => (
            <div key={src} className="glass overflow-hidden rounded-3xl">
              <Image
                src={src}
                alt={`Galería ${i + 1}`}
                width={1400}
                height={1000}
                className="h-[220px] w-full object-cover md:h-[260px]"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {site.reviews.map((r: any) => (
            <div key={r.name} className="glass rounded-3xl p-5">
              <div className="flex items-center gap-1">
                {Array.from({ length: r.stars }).map((_, idx) => (
                  <Star key={idx} className="icon text-white" aria-hidden="true" />
                ))}
              </div>
              <p className="mt-3 text-sm text-white/80">“{r.text}”</p>
              <p className="mt-3 text-xs font-bold text-white/70">{r.name}</p>
              <div className="mt-4 flex items-center gap-2 text-xs text-white/60">
                <Heart className="icon" aria-hidden="true" />
                Recomendado
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-12">
        <SiteFooter site={site} />
      </section>
    </main>
  );
}

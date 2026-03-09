"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { SCROLL_SCENES, SCRUB_EASE } from "@/lib/scrollScenes";

type GallerySectionProps = {
  gallery: string[];
};

export default function GallerySection({ gallery }: GallerySectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !gridRef.current) return;

    const ctx = gsap.context(() => {
      const section = sectionRef.current!;
      const items = gridRef.current!.querySelectorAll<HTMLElement>(".gallery-item");

      // Parallax: background (slower) vs foreground (faster)
      const back = section.querySelectorAll<HTMLElement>("[data-parallax='back']");
      const front = section.querySelectorAll<HTMLElement>("[data-parallax='front']");
      if (back.length) {
        gsap.to(back, {
          y: -20,
          ease: SCRUB_EASE,
          scrollTrigger: { trigger: section, ...SCROLL_SCENES.PARALLAX_FULL },
        });
      }
      if (front.length) {
        gsap.to(front, {
          y: -65,
          ease: SCRUB_EASE,
          scrollTrigger: { trigger: section, ...SCROLL_SCENES.PARALLAX_FULL },
        });
      }

      // Entrance: scroll-driven fade in + scale
      gsap.set(items, { opacity: 0, scale: 1.05 });
      const tl = gsap.timeline({
        scrollTrigger: { trigger: section, ...SCROLL_SCENES.SCENE_85 },
      });
      tl.to(items, { opacity: 1, scale: 1, stagger: 0.08, ease: SCRUB_EASE });

      const hoverDuration = 0.28;
      items.forEach((item) => {
        const inner = item.querySelector<HTMLElement>(".gallery-item-inner");
        if (!inner) return;
        item.addEventListener("mouseenter", () => {
          gsap.to(inner, { scale: 1.05, duration: hoverDuration, ease: "power2.out" });
        });
        item.addEventListener("mouseleave", () => {
          gsap.to(inner, { scale: 1, duration: hoverDuration, ease: "power2.out" });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="mx-auto max-w-6xl px-5 py-20 md:py-24"
    >
      <h2 className="mb-10 text-center text-2xl font-bold text-white md:text-3xl">
        Galería
      </h2>
      <div
        ref={gridRef}
        className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4"
      >
        {(gallery ?? []).map((src: string, i: number) => (
          <div
            key={`${src}-${i}`}
            className="gallery-item aspect-square overflow-hidden rounded-xl md:rounded-2xl"
            data-parallax={i % 2 === 0 ? "back" : "front"}
          >
            <div className="gallery-item-inner h-full w-full">
              <Image
                src={src}
                alt=""
                width={500}
                height={500}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-10 text-center">
        <Link
          href="/sobre"
          className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-3 font-semibold text-white hover:bg-white/10"
        >
          Ver más fotos
          <ArrowRight className="icon" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { SCROLL_SCENES, SCRUB_EASE } from "@/lib/scrollScenes";

type PinnedStorySectionProps = {
  headline: string;
  paragraph: string;
  backgroundImage: string;
  dishImage: string;
  dishAlt?: string;
  className?: string;
};

/**
 * Escena de storytelling fijada (pin): animación ligada al scroll con scrub,
 * se invierte al subir. Secuencia: fondo escala → headline desde y:60 → párrafo fade in → imagen plato desde la derecha.
 */
export default function PinnedStorySection({
  headline,
  paragraph,
  backgroundImage,
  dishImage,
  dishAlt = "Plato destacado",
  className = "",
}: PinnedStorySectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const dishRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const bg = bgRef.current;
      const headlineEl = headlineRef.current;
      const paragraphEl = paragraphRef.current;
      const dishEl = dishRef.current;
      gsap.set(bg, { scale: 1 });
      gsap.set(headlineEl, { y: 60, opacity: 0 });
      gsap.set(paragraphEl, { opacity: 0 });
      gsap.set(dishEl, { x: 120 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: section, ...SCROLL_SCENES.PINNED_STORY },
      });
      if (bg) tl.to(bg, { scale: 1.08, ease: SCRUB_EASE }, 0);
      if (headlineEl) tl.to(headlineEl, { y: 0, opacity: 1, ease: SCRUB_EASE }, 0.15);
      if (paragraphEl) tl.to(paragraphEl, { opacity: 1, ease: SCRUB_EASE }, 0.32);
      if (dishEl) tl.to(dishEl, { x: 0, ease: SCRUB_EASE }, 0.48);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-24 ${className}`}
    >
      <div
        ref={bgRef}
        className="absolute inset-0 -z-10 bg-cover bg-center will-change-transform"
        style={{ backgroundImage: `url(${backgroundImage})` }}
        aria-hidden
      />
      <div className="absolute inset-0 -z-10 bg-black/50" aria-hidden />
      <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div>
          <h2
            ref={headlineRef}
            className="text-3xl font-black leading-tight tracking-tight text-white md:text-4xl lg:text-5xl"
          >
            {headline}
          </h2>
          <p
            ref={paragraphRef}
            className="mt-6 max-w-xl text-lg leading-relaxed text-white/90 md:text-xl"
          >
            {paragraph}
          </p>
        </div>
        <div ref={dishRef} className="relative aspect-4/3 overflow-hidden rounded-2xl md:rounded-3xl">
          <Image
            src={dishImage}
            alt={dishAlt}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
}

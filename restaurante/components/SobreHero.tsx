"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { SCROLL_SCENES, SCRUB_EASE } from "@/lib/scrollScenes";

type SobreHeroProps = {
  headline?: string;
  paragraph?: string;
  imageUrl?: string;
};

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1200&auto=format&fit=crop";
const DEFAULT_HEADLINE = "Nuestra Historia";
const DEFAULT_PARAGRAPH =
  "Conoce el equipo, la cocina y el espíritu que hacen de Fuego & Brasa un lugar único en Sevilla.";

export default function SobreHero({
  headline = DEFAULT_HEADLINE,
  paragraph = DEFAULT_PARAGRAPH,
  imageUrl,
}: SobreHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const bg = bgRef.current;
      const headlineEl = headlineRef.current;
      const paragraphEl = paragraphRef.current;
      gsap.set(bg, { scale: 1 });
      gsap.set(headlineEl, { y: 48, opacity: 0 });
      gsap.set(paragraphEl, { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: section, ...SCROLL_SCENES.HERO_PAGE },
      });
      if (bg) tl.to(bg, { scale: 1.08, ease: SCRUB_EASE }, 0);
      if (headlineEl) tl.to(headlineEl, { y: 0, opacity: 1, ease: SCRUB_EASE }, 0.15);
      if (paragraphEl) tl.to(paragraphEl, { opacity: 1, ease: SCRUB_EASE }, 0.4);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const src = imageUrl ?? DEFAULT_IMAGE;

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[44vh] items-center justify-center overflow-hidden md:min-h-[52vh]"
    >
      <div ref={bgRef} className="absolute inset-0 z-0 will-change-transform">
        <Image
          src={src}
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div
          className="absolute inset-0 bg-black/55"
          aria-hidden
        />
      </div>
      <div className="relative z-10 mx-auto max-w-3xl px-5 text-center">
        <h1
          ref={headlineRef}
          className="text-4xl font-black tracking-tight text-white md:text-5xl lg:text-6xl"
        >
          {headline}
        </h1>
        <p
          ref={paragraphRef}
          className="mt-5 text-lg leading-relaxed text-white/90 md:text-xl"
        >
          {paragraph}
        </p>
      </div>
    </section>
  );
}

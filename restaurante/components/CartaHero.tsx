"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { SCROLL_SCENES, SCRUB_EASE } from "@/lib/scrollScenes";

type CartaHeroProps = {
  subtitle?: string;
  imageUrl?: string;
};

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1502998070258-dc1338445ac2?q=80&w=1200&auto=format&fit=crop";
const DEFAULT_SUBTITLE = "Explora nuestros platos. Entrantes, brasa, pasta, postres y más.";

export default function CartaHero({ subtitle, imageUrl }: CartaHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const bg = bgRef.current;
      const headline = headlineRef.current;
      const sub = subtitleRef.current;
      gsap.set(bg, { scale: 1 });
      gsap.set(headline, { y: 80, opacity: 0 });
      gsap.set(sub, { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: section, ...SCROLL_SCENES.HERO_PAGE },
      });
      if (bg) tl.to(bg, { scale: 1.08, ease: SCRUB_EASE }, 0);
      if (headline) tl.to(headline, { y: 0, opacity: 1, ease: SCRUB_EASE }, 0.12);
      if (sub) tl.to(sub, { opacity: 1, ease: SCRUB_EASE }, 0.35);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const src = imageUrl ?? DEFAULT_IMAGE;
  const sub = subtitle ?? DEFAULT_SUBTITLE;

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[42vh] items-center justify-center overflow-hidden md:min-h-[50vh]"
    >
      <div
        ref={bgRef}
        className="absolute inset-0 z-0"
      >
        <Image
          src={src}
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div
          className="absolute inset-0 bg-black/50"
          aria-hidden
        />
      </div>
      <div className="relative z-10 mx-auto max-w-4xl px-5 text-center">
        <h1
          ref={headlineRef}
          className="text-4xl font-black tracking-tight text-white md:text-5xl lg:text-6xl"
        >
          Nuestra Carta
        </h1>
        <p
          ref={subtitleRef}
          className="mt-4 text-lg text-white/90 md:text-xl"
        >
          {sub}
        </p>
      </div>
    </section>
  );
}

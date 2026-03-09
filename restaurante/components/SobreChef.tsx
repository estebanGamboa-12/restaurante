"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { SCROLL_SCENES, SCRUB_EASE } from "@/lib/scrollScenes";

type ChefData = {
  name: string;
  role?: string;
  bio: string;
  quote: string;
  image: string;
};

type SobreChefProps = {
  chef: ChefData;
};

export default function SobreChef({ chef }: SobreChefProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const image = imageRef.current;
      const text = textRef.current;
      if (!image || !text) return;
      gsap.set(image, { scale: 1.05 });
      gsap.set(text, { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: section, ...SCROLL_SCENES.SCENE_80 },
      });
      tl.to(image, { scale: 1, ease: SCRUB_EASE }, 0).to(text, { opacity: 1, ease: SCRUB_EASE }, 0.2);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="mx-auto max-w-6xl px-5 py-20 md:py-28"
    >
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div
          ref={imageRef}
          className="relative aspect-4/5 overflow-hidden rounded-2xl md:rounded-3xl"
        >
          <Image
            src={chef.image}
            alt={chef.name}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority={false}
          />
        </div>
        <div ref={textRef} className="flex flex-col justify-center">
          {chef.role && (
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-white/60">
              {chef.role}
            </p>
          )}
          <h2 className="mt-2 text-3xl font-black text-white md:text-4xl lg:text-5xl">
            {chef.name}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-white/85 md:text-xl">
            {chef.bio}
          </p>
          <blockquote className="mt-8 border-l-4 border-white/30 pl-6 text-lg italic text-white/90 md:text-xl">
            &ldquo;{chef.quote}&rdquo;
          </blockquote>
        </div>
      </div>
    </section>
  );
}

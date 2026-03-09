"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { SCROLL_SCENES, SCRUB_EASE } from "@/lib/scrollScenes";

type FeaturedDishSceneProps = {
  name: string;
  description: string;
  image: string;
  price?: string;
  className?: string;
};

/**
 * Escena cinemática de plato destacado ligada al scroll (scrub).
 * 1. Imagen hace scale reveal (1.05 → 1).
 * 2. Título hace fade in.
 * 3. Descripción hace fade in.
 */
export default function FeaturedDishScene({
  name,
  description,
  image,
  price,
  className = "",
}: FeaturedDishSceneProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const imageWrap = imageWrapRef.current;
      const title = titleRef.current;
      const desc = descRef.current;
      gsap.set(imageWrap, { scale: 1.05 });
      gsap.set(title, { opacity: 0 });
      gsap.set(desc, { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: section, ...SCROLL_SCENES.SCENE_80, end: "+=700" },
      });
      if (imageWrap) tl.to(imageWrap, { scale: 1, ease: SCRUB_EASE }, 0);
      if (title) tl.to(title, { opacity: 1, ease: SCRUB_EASE }, 0.2);
      if (desc) tl.to(desc, { opacity: 1, ease: SCRUB_EASE }, 0.4);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`relative overflow-hidden px-5 py-24 md:py-32 ${className}`}
    >
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
        <div
          ref={imageWrapRef}
          className="overflow-hidden rounded-2xl md:rounded-3xl will-change-transform"
        >
          <Image
            src={image}
            alt={name}
            width={800}
            height={600}
            className="aspect-4/3 w-full object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
        <div className="flex flex-col justify-center">
          <h2
            ref={titleRef}
            className="text-3xl font-black text-white md:text-4xl lg:text-5xl"
          >
            {name}
          </h2>
          <p
            ref={descRef}
            className="mt-4 text-lg leading-relaxed text-white/80 md:text-xl"
          >
            {description}
          </p>
          {price ? (
            <p className="mt-6 text-2xl font-bold text-white md:text-3xl">
              {price}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";

type FeaturedDishParallaxProps = {
  name: string;
  description: string;
  price: string;
  image: string;
  className?: string;
};

/**
 * Sección cinemática de plato destacado: parallax de imagen y reveal ligado al scroll (scrub).
 * 1. Imagen se mueve más lento que el scroll (parallax).
 * 2. Título hace fade in y sube.
 * 3. Descripción hace fade in.
 * 4. Precio aparece al final.
 */
export default function FeaturedDishParallax({
  name,
  description,
  price,
  image,
  className = "",
}: FeaturedDishParallaxProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const priceRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const imageWrap = imageWrapRef.current;
    const title = titleRef.current;
    const desc = descRef.current;
    const priceEl = priceRef.current;

    if (!section) return;

    gsap.set(title, { y: 48, opacity: 0 });
    gsap.set(desc, { opacity: 0 });
    gsap.set(priceEl, { opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    if (imageWrap) {
      tl.fromTo(imageWrap, { y: 0 }, { y: -80, ease: "none" }, 0);
    }
    if (title) {
      tl.to(title, { y: 0, opacity: 1, ease: "none" }, 0.15);
    }
    if (desc) {
      tl.to(desc, { opacity: 1, ease: "none" }, 0.35);
    }
    if (priceEl) {
      tl.to(priceEl, { opacity: 1, ease: "none" }, 0.52);
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === section) t.kill();
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`relative overflow-hidden px-5 py-24 md:py-32 ${className}`}
    >
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
        <div ref={imageWrapRef} className="overflow-hidden rounded-2xl md:rounded-3xl">
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
          <p
            ref={priceRef}
            className="mt-6 text-2xl font-bold text-white md:text-3xl"
          >
            {price}
          </p>
        </div>
      </div>
    </section>
  );
}

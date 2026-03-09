"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { SCROLL_SCENES, SCRUB_EASE } from "@/lib/scrollScenes";

type HorizontalScrollGalleryProps = {
  images: string[];
  className?: string;
};

/**
 * Galería que se desplaza en horizontal mientras el usuario hace scroll vertical.
 * La sección se fija (pin) y el track se mueve con xPercent según el scroll.
 */
export default function HorizontalScrollGallery({
  images,
  className = "",
}: HorizontalScrollGalleryProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track || images.length === 0) return;

    const numPanels = images.length;
    const xPercent = -((numPanels - 1) / numPanels) * 100;

    const ctx = gsap.context(() => {
      gsap.to(track, {
        xPercent,
        ease: SCRUB_EASE,
        scrollTrigger: { trigger: section, ...SCROLL_SCENES.PINNED_GALLERY },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [images.length]);

  if (images.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      className={`relative h-screen overflow-hidden ${className}`}
    >
      <div
        ref={trackRef}
        className="absolute left-0 top-0 flex h-full"
        style={{ width: `${images.length * 100}%` }}
      >
        {images.map((src, i) => (
          <div
            key={`${src}-${i}`}
            className="relative h-full shrink-0 grow-0"
            style={{ width: `${100 / images.length}%` }}
          >
            <Image
              src={src}
              alt=""
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

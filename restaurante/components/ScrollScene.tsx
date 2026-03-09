"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const SCENE_ATTR = "data-scene";

export type ScrollSceneProps = {
  children: React.ReactNode;
  className?: string;
  /** ScrollTrigger start (default: "top center") */
  start?: string;
  /** ScrollTrigger end (default: "+=800") */
  end?: string;
  /** Pin the section while the scene runs (default: true for cinematic effect) */
  pin?: boolean;
};

/**
 * Escena de scroll cinemática: animaciones ligadas al scroll con scrub,
 * se revierten al subir. Usa data-scene en los hijos para asignar roles.
 *
 * Roles: background | headline | paragraph | image
 * - background: escala 1 → 1.1
 * - headline: sube y hace fade in
 * - paragraph: fade in y ligero movimiento arriba
 * - image: parallax horizontal
 *
 * Ejemplo:
 *   <ScrollScene start="top center" end="+=800" pin>
 *     <div data-scene="background">...</div>
 *     <h2 data-scene="headline">...</h2>
 *     <p data-scene="paragraph">...</p>
 *     <div data-scene="image">...</div>
 *   </ScrollScene>
 */
export default function ScrollScene({
  children,
  className = "",
  start = "top+=200 top",
    end = "+=800",
  pin = true,
}: ScrollSceneProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const bg = section.querySelector<HTMLElement>(`[${SCENE_ATTR}="background"]`);
    const headline = section.querySelector<HTMLElement>(`[${SCENE_ATTR}="headline"]`);
    const paragraph = section.querySelector<HTMLElement>(`[${SCENE_ATTR}="paragraph"]`);
    const image = section.querySelector<HTMLElement>(`[${SCENE_ATTR}="image"]`);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start,
        end,
        scrub: true,
        pin: pin ?? true,
        anticipatePin: 1,
      },
    });

    if (bg) {
      tl.fromTo(bg, { scale: 1 }, { scale: 1.1, ease: "none" }, 0);
    }
    if (headline) {
      tl.fromTo(
        headline,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, ease: "none" },
        0.15
      );
    }
    if (paragraph) {
      tl.fromTo(
        paragraph,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, ease: "none" },
        0.3
      );
    }
    if (image) {
      tl.fromTo(
        image,
        { x: 0 },
        { x: -80, ease: "none" },
        0.45
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === section) t.kill();
      });
    };
  }, [start, end, pin]);

  return (
    <section ref={sectionRef} className={`overflow-hidden ${className}`.trim()}>
      {children}
    </section>
  );
}

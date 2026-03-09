"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { SCROLL_SCENES, SCRUB_EASE } from "@/lib/scrollScenes";

export type CategoryItem = { label: string; value: string };

export default function CategoryNav({
  categories,
  value,
  onSelect,
}: {
  categories: CategoryItem[];
  value: string;
  onSelect: (value: string) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const buttons = container.querySelectorAll<HTMLElement>(".category-nav-btn");
    if (!buttons.length) return;

    const ctx = gsap.context(() => {
      gsap.set(buttons, { y: 24, opacity: 0, scale: 0.9 });
      const tl = gsap.timeline({
        scrollTrigger: { trigger: container, ...SCROLL_SCENES.CTA },
      });
      tl.to(buttons, {
        y: 0,
        opacity: 1,
        scale: 1,
        stagger: 0.08,
        ease: SCRUB_EASE,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleMouseEnter = (el: HTMLElement, isActive: boolean) => {
    gsap.to(el, {
      scale: 1.05,
      backgroundColor: isActive ? "rgba(255,255,255,0.98)" : "rgba(255,255,255,0.12)",
      color: isActive ? "#000" : "rgba(255,255,255,0.95)",
      duration: 0.22,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = (el: HTMLElement, isActive: boolean) => {
    gsap.to(el, {
      scale: 1,
      backgroundColor: isActive ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.06)",
      color: isActive ? "#000" : "rgba(255,255,255,0.85)",
      duration: 0.22,
      ease: "power2.out",
    });
  };

  return (
    <nav
      ref={containerRef}
      className="flex flex-wrap items-center justify-center gap-2 md:gap-3"
      aria-label="Categorías de la carta"
    >
      {categories.map(({ label, value: catValue }) => {
        const isActive = value === catValue;
        return (
          <button
            key={catValue}
            type="button"
            className="category-nav-btn rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold transition-colors md:px-6 md:py-3 md:text-base"
            style={{
              backgroundColor: isActive ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.06)",
              color: isActive ? "#000" : "rgba(255,255,255,0.85)",
            }}
            onClick={() => onSelect(catValue)}
            onMouseEnter={(e) => handleMouseEnter(e.currentTarget, isActive)}
            onMouseLeave={(e) => handleMouseLeave(e.currentTarget, isActive)}
          >
            {label}
          </button>
        );
      })}
    </nav>
  );
}

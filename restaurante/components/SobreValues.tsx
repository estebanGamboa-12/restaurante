"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { SCROLL_SCENES, SCRUB_EASE } from "@/lib/scrollScenes";

type ValueItem = { title: string; text: string };

type SobreValuesProps = {
  values: ValueItem[];
};

export default function SobreValues({ values }: SobreValuesProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const grid = gridRef.current;
    if (!section || !grid) return;

    const cards = grid.querySelectorAll<HTMLElement>(".value-card");
    if (!cards.length) return;

    const ctx = gsap.context(() => {
      gsap.set(cards, { y: 40, opacity: 0 });
      const tl = gsap.timeline({
        scrollTrigger: { trigger: section, ...SCROLL_SCENES.SCENE_85 },
      });
      tl.to(cards, { y: 0, opacity: 1, stagger: 0.1, ease: SCRUB_EASE });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  if (!values?.length) return null;

  return (
    <section
      ref={sectionRef}
      className="mx-auto max-w-6xl px-5 py-20 md:py-28"
    >
      <h2 className="mb-12 text-center text-2xl font-bold text-white md:text-3xl">
        Nuestros valores
      </h2>
      <div
        ref={gridRef}
        className="grid gap-6 md:grid-cols-3"
      >
        {values.map((item) => (
          <article
            key={item.title}
            className="value-card glass rounded-2xl border border-white/10 p-6 md:p-8"
          >
            <h3 className="text-xl font-bold text-white md:text-2xl">
              {item.title}
            </h3>
            <p className="mt-3 text-base leading-relaxed text-white/80 md:text-lg">
              {item.text}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

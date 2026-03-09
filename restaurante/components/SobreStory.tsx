"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { SCROLL_SCENES, SCRUB_EASE } from "@/lib/scrollScenes";
import SplitType from "split-type";

type SobreStoryProps = {
  editorialText: string;
  supportingParagraph: string;
};

export default function SobreStory({
  editorialText,
  supportingParagraph,
}: SobreStoryProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const editorialRef = useRef<HTMLParagraphElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const splitRef = useRef<SplitType | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const editorial = editorialRef.current;
    const paragraph = paragraphRef.current;
    if (!section || !editorial || !paragraph) return;

    splitRef.current = new SplitType(editorial, {
      types: ["lines"],
      lineClass: "sobre-story-line",
    });
    const lines = editorial.querySelectorAll<HTMLElement>(".sobre-story-line");
    if (!lines.length) return;

    const ctx = gsap.context(() => {
      gsap.set(lines, { y: 40, opacity: 0 });
      gsap.set(paragraph, { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: section, ...SCROLL_SCENES.SCENE_75 },
      });
      tl.to(lines, { y: 0, opacity: 1, stagger: 0.08, ease: SCRUB_EASE }, 0).to(
        paragraph,
        { opacity: 1, ease: SCRUB_EASE },
        0.4
      );
    }, sectionRef);

    return () => {
      splitRef.current?.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="sobre-story-editorial mx-auto max-w-6xl px-5 py-20 md:py-28"
    >
      <div className="mx-auto max-w-3xl">
        <p
          ref={editorialRef}
          className="text-2xl font-medium leading-snug text-white md:text-3xl lg:text-4xl lg:leading-snug"
        >
          {editorialText}
        </p>
        <p
          ref={paragraphRef}
          className="mt-8 text-lg leading-relaxed text-white/80 md:text-xl"
        >
          {supportingParagraph}
        </p>
      </div>
    </section>
  );
}

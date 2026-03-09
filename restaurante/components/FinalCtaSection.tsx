"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { SCROLL_SCENES, SCRUB_EASE } from "@/lib/scrollScenes";

type FinalCtaSectionProps = {
  headline?: string;
  text?: string;
  buttonLabel?: string;
  buttonHref?: string;
};

export default function FinalCtaSection({
  headline = "Ven a visitarnos",
  text,
  buttonLabel = "Reservar mesa",
  buttonHref,
}: FinalCtaSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const headline = headlineRef.current;
      const button = buttonRef.current;
      const bg = bgRef.current;
      if (!headline || !button) return;

      gsap.set(headline, { opacity: 0 });
      gsap.set(button, { y: 28, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: section, ...SCROLL_SCENES.CTA },
      });
      tl.to(headline, { opacity: 1, ease: SCRUB_EASE }, 0).to(
        button,
        { y: 0, opacity: 1, ease: SCRUB_EASE },
        0.25
      );

      if (bg) {
        gsap.to(bg, {
          y: -30,
          ease: SCRUB_EASE,
          scrollTrigger: { trigger: section, ...SCROLL_SCENES.PARALLAX_FULL },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const href = buttonHref ?? "/contacto";

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden px-5 py-24 md:py-32"
    >
      <div
        ref={bgRef}
        className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-b from-white/4 via-transparent to-white/6"
        aria-hidden
      />
      <div className="mx-auto max-w-3xl text-center">
        <h2
          ref={headlineRef}
          className="text-3xl font-black tracking-tight text-white md:text-4xl lg:text-5xl"
        >
          {headline}
        </h2>
        {text && (
          <p className="mt-4 text-lg text-white/80 md:text-xl">{text}</p>
        )}
        <div className="mt-8">
          <Link
            ref={buttonRef}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-semibold text-black transition-colors hover:bg-white/90"
          >
            {buttonLabel}
            <ArrowRight className="icon" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

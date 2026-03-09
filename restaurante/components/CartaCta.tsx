"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { SCROLL_SCENES, SCRUB_EASE } from "@/lib/scrollScenes";

type CartaCtaProps = {
  headline?: string;
  text?: string;
  buttonLabel?: string;
  buttonHref?: string;
};

export default function CartaCta({
  headline = "Reserva tu mesa",
  text = "Vive la brasa en Sevilla. Te esperamos para una experiencia que se queda.",
  buttonLabel = "Reservar mesa",
  buttonHref,
}: CartaCtaProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const headlineEl = headlineRef.current;
      const textEl = textRef.current;
      const button = buttonRef.current;
      const bg = bgRef.current;
      if (!headlineEl || !button) return;

      gsap.set(headlineEl, { y: 48, opacity: 0 });
      if (textEl) gsap.set(textEl, { opacity: 0 });
      gsap.set(button, { y: 32, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: section, ...SCROLL_SCENES.CTA },
      });
      tl.to(headlineEl, { y: 0, opacity: 1, ease: SCRUB_EASE }, 0).to(
        button,
        { y: 0, opacity: 1, ease: SCRUB_EASE },
        0.25
      );
      if (textEl) tl.to(textEl, { opacity: 1, ease: SCRUB_EASE }, 0.12);

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
        <p ref={textRef} className="mt-4 text-lg text-white/80 md:text-xl">
          {text}
        </p>
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

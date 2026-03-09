"use client";

/**
 * Headline con reveal línea a línea: y 40→0, opacity 0→1, stagger 0.1s.
 * Se activa cuando la sección entra en viewport (ScrollTrigger).
 *
 * Uso:
 *   <CinematicHeadline as="h2" className="text-4xl">Tu título en varias líneas</CinematicHeadline>
 *   <CinematicHeadline triggerRef={sectionRef}>Título</CinematicHeadline>
 */
import { useEffect, useRef } from "react";
import SplitType from "split-type";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const ease = "power2.out";
const LINE_CLASS = "cinematic-headline-line";

type CinematicHeadlineProps = {
  as?: "h1" | "h2" | "h3";
  children: React.ReactNode;
  className?: string;
  /** Element to use as ScrollTrigger trigger (default: wrapper around headline) */
  triggerRef?: React.RefObject<HTMLElement | null>;
};

export default function CinematicHeadline({
  as: Tag = "h2",
  children,
  className = "",
  triggerRef,
}: CinematicHeadlineProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const splitRef = useRef<SplitType | null>(null);

  useEffect(() => {
    const trigger = triggerRef?.current ?? wrapperRef.current;
    if (!headlineRef.current || !trigger) return;

    splitRef.current = new SplitType(headlineRef.current, {
      types: ["lines"],
      lineClass: LINE_CLASS,
    });

    const lines = headlineRef.current.querySelectorAll(`.${LINE_CLASS}`);
    if (lines.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.from(lines, {
        y: 40,
        opacity: 0,
        duration: 0.55,
        stagger: 0.1,
        ease,
        scrollTrigger: {
          trigger,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    }, wrapperRef);

    return () => {
      splitRef.current?.revert();
      ctx.revert();
    };
  }, [triggerRef]);

  return (
    <div ref={wrapperRef}>
      <Tag ref={headlineRef} className={`cinematic-headline ${className}`}>
        {children}
      </Tag>
    </div>
  );
}

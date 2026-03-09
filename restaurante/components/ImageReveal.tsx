"use client";

/**
 * Reveal de imagen con máscara vertical y scale.
 * - Máscara: clip-path de 100% (oculto) a 0% (revelado).
 * - Imagen: scale 1.05 → 1.
 * Se dispara con ScrollTrigger al entrar la sección en viewport.
 *
 * Uso:
 *   <ImageReveal className="rounded-3xl overflow-hidden">
 *     <Image src="..." alt="..." fill className="object-cover" />
 *   </ImageReveal>
 */
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const ease = "power2.out";
const DURATION = 0.85;

type ImageRevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Optional: use another element as ScrollTrigger trigger */
  triggerRef?: React.RefObject<HTMLElement | null>;
};

export default function ImageReveal({
  children,
  className = "",
  triggerRef,
}: ImageRevealProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const scaleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const trigger = triggerRef?.current ?? sectionRef.current;
    if (!maskRef.current || !scaleRef.current || !trigger) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      tl.fromTo(
        maskRef.current,
        { clipPath: "inset(100% 0 0 0)" },
        { clipPath: "inset(0 0 0 0)", duration: DURATION, ease }
      ).fromTo(
        scaleRef.current,
        { scale: 1.05 },
        { scale: 1, duration: DURATION, ease },
        "-=0.85"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [triggerRef]);

  return (
    <section ref={sectionRef} className={className}>
      <div
        ref={maskRef}
        className="overflow-hidden"
        style={{ clipPath: "inset(100% 0 0 0)" }}
      >
        <div ref={scaleRef} className="will-change-transform">
          {children}
        </div>
      </div>
    </section>
  );
}

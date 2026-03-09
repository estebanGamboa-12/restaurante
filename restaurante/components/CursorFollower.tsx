"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

const CURSOR_SIZE = 20;
const CURSOR_SIZE_HOVER = 36;
const FOLLOW_DURATION = 0.35;
const HOVER_SCALE = CURSOR_SIZE_HOVER / CURSOR_SIZE;

export default function CursorFollower() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const xToRef = useRef<((v: number) => void) | null>(null);
  const yToRef = useRef<((v: number) => void) | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const onMatch = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    setIsDesktop(mq.matches);
    mq.addEventListener("change", onMatch);
    return () => mq.removeEventListener("change", onMatch);
  }, []);

  useEffect(() => {
    if (!isDesktop || !cursorRef.current) return;

    const cursor = cursorRef.current;
    gsap.set(cursor, { xPercent: -50, yPercent: -50, x: 0, y: 0 });

    xToRef.current = gsap.quickTo(cursor, "x", {
      duration: FOLLOW_DURATION,
      ease: "power2.out",
    });
    yToRef.current = gsap.quickTo(cursor, "y", {
      duration: FOLLOW_DURATION,
      ease: "power2.out",
    });

    const handleMove = (e: MouseEvent) => {
      xToRef.current?.(e.clientX);
      yToRef.current?.(e.clientY);

      const target = e.target as Node;
      const interactive = (target as Element).closest?.(
        'a, button, [role="button"], input[type="submit"], [data-cursor-hover]'
      );
      gsap.to(cursor, {
        scale: interactive ? HOVER_SCALE : 1,
        duration: 0.2,
        ease: "power2.out",
      });
    };

    document.body.classList.add("custom-cursor-active");
    window.addEventListener("mousemove", handleMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.body.classList.remove("custom-cursor-active");
    };
  }, [isDesktop]);

  if (!isDesktop) return null;

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed left-0 top-0 z-9999 mix-blend-difference"
      aria-hidden
      style={{
        width: CURSOR_SIZE,
        height: CURSOR_SIZE,
        borderRadius: "50%",
        background: "rgba(255, 255, 255, 0.9)",
        boxShadow: "0 0 0 1px rgba(0,0,0,0.1)",
      }}
    />
  );
}

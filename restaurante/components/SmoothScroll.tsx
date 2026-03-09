"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Inicializa Lenis para scroll suave en toda la web e integra con GSAP ScrollTrigger.
 * Solo se ejecuta en el cliente (useEffect). Importar en el layout raíz.
 */
export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 2,
    });

    const raf = (time: number) => lenis.raf(time * 1000);

    // Sincronizar Lenis con GSAP: el ticker de GSAP impulsa Lenis
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Actualizar ScrollTrigger cuando Lenis hace scroll
    lenis.on("scroll", ScrollTrigger.update);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      ScrollTrigger.clearScrollMemory();
    };
  }, []);

  return null;
}

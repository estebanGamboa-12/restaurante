/**
 * Configuración compartida de escenas de scroll para el sitio.
 * Todas las animaciones usan scrub: true para que reviertan al subir.
 * Solo animar transform y opacity para mejor rendimiento.
 */

export const SCROLL_SCENES = {
  /** Hero principal (home): pin, mucho recorrido */
  HERO: {
    start: "top top" as const,
    end: "+=900",
    scrub: true,
    pin: true,
    anticipatePin: 1,
  },
  /** Hero de página (about, contact): sin pin */
  HERO_PAGE: {
    start: "top top" as const,
    end: "+=800",
    scrub: true,
  },
  /** Escena fija tipo storytelling: start con offset para que empiece más abajo en pantalla */
  PINNED_STORY: {
    start: "top top" as const,
    end: "+=900",
    scrub: true,
    anticipatePin: 1,
  },
  /** Galería horizontal: start cuando la sección está ya en pantalla (top 20%) para que el marcador quede en esta sección y no en la Galería grid */
  PINNED_GALLERY: {
    start: "top top" as const,
    end: "+=3500",
    scrub: true,
    pin: true,
    anticipatePin: 1, 
  },
  /** Secciones que entran al 75% del viewport */
  SCENE_75: {
    start: "top 90%" as const,
    end: "+=700",
    scrub: true,
  },
  /** Secciones que entran al 80% del viewport */
  SCENE_80: {
    start: "top 90%" as const,
    end: "+=600",
    scrub: true,
  },
  /** Secciones que entran al 85% del viewport */
  SCENE_85: {
    start: "top 90%" as const,
    end: "+=600",
    scrub: true,
  },
  /** CTA final, menos recorrido */
  CTA: {
    start: "top 90%" as const,
    end: "+=500",
    scrub: true,
  },
  /** Parallax largo (imagen/plato) */
  PARALLAX_FULL: {
    start: "top bottom" as const,
    end: "bottom top",
    scrub: true,
  },
} as const;

/** Ease para animaciones ligadas a scroll (lineal) */
export const SCRUB_EASE = "none";

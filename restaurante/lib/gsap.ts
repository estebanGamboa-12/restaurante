/**
 * Configuración centralizada de GSAP para el proyecto.
 * Importar desde aquí para usar gsap y ScrollTrigger con el plugin ya registrado.
 * Uso solo en el cliente (componentes con "use client" o dentro de useEffect).
 *
 * Ejemplo en una sección/página:
 *   import { gsap, ScrollTrigger } from "@/lib/gsap";
 *   useEffect(() => {
 *     const tl = gsap.timeline({ scrollTrigger: { trigger: ".section", start: "top 80%" } });
 *     tl.from(".title", { y: 40, opacity: 0 });
 *     return () => ScrollTrigger.getAll().forEach((t) => t.kill());
 *   }, []);
 */

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

// Registrar ScrollTrigger como plugin de GSAP (necesario para que funcione)
gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

"use client";

import { useEffect, useRef } from "react";
import { MapPin } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { SCROLL_SCENES, SCRUB_EASE } from "@/lib/scrollScenes";

type MapSectionProps = {
  mapEmbedUrl: string;
  address: string;
  mapsUrl?: string;
  className?: string;
};

export default function MapSection({
  mapEmbedUrl,
  address,
  mapsUrl,
  className = "",
}: MapSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const mapWrapRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const mapWrap = mapWrapRef.current;
      const cta = ctaRef.current;
      if (!mapWrap) return;
      gsap.set(mapWrap, { scale: 1.05 });
      if (cta) gsap.set(cta, { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: section, ...SCROLL_SCENES.SCENE_80 },
      });
      tl.to(mapWrap, { scale: 1, ease: SCRUB_EASE }, 0);
      if (cta) tl.to(cta, { opacity: 1, ease: SCRUB_EASE }, 0.25);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={className}>
      <div ref={mapWrapRef} className="overflow-hidden rounded-t-3xl will-change-transform">
        <iframe
          title="Ubicación del restaurante"
          src={mapEmbedUrl}
          className="h-[520px] w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      {address && (
        <p
          ref={ctaRef}
          className="mt-4 flex items-center gap-2 px-4 pb-4 text-white/80"
        >
          <MapPin className="size-4 shrink-0 text-white/60" aria-hidden />
          {mapsUrl ? (
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-white"
            >
              {address}
            </a>
          ) : (
            <span>{address}</span>
          )}
        </p>
      )}
    </section>
  );
}

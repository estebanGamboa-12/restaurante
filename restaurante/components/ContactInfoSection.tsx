"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Clock, MapPin, Mail, Phone } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { SCROLL_SCENES, SCRUB_EASE } from "@/lib/scrollScenes";

type ContactInfoSectionProps = {
  address: string;
  phone: string;
  email: string;
  hours: string;
  mapsUrl?: string;
};

export default function ContactInfoSection({
  address,
  phone,
  email,
  hours,
  mapsUrl,
}: ContactInfoSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const grid = gridRef.current;
    if (!section || !grid) return;

    const cards = grid.querySelectorAll<HTMLElement>(".contact-info-card");
    if (!cards.length) return;

    const ctx = gsap.context(() => {
      gsap.set(cards, { y: 40, opacity: 0 });
      const tl = gsap.timeline({
        scrollTrigger: { trigger: section, ...SCROLL_SCENES.SCENE_85 },
      });
      tl.to(cards, { y: 0, opacity: 1, stagger: 0.1, ease: SCRUB_EASE });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const phoneHref = `tel:${phone.replace(/\s/g, "")}`;

  return (
    <section
      ref={sectionRef}
      className="mx-auto max-w-6xl px-5 py-16 md:py-20"
    >
      <div
        ref={gridRef}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        <Link
          href={mapsUrl ?? "#"}
          target={mapsUrl ? "_blank" : undefined}
          rel={mapsUrl ? "noopener noreferrer" : undefined}
          className="contact-info-card glass flex items-start gap-4 rounded-2xl border border-white/10 p-5 transition hover:bg-white/10 md:p-6"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10">
            <MapPin className="icon text-white" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-wider text-white/60">Dirección</p>
            <p className="mt-1 text-sm font-medium text-white md:text-base">{address}</p>
          </div>
        </Link>

        <a
          href={phoneHref}
          className="contact-info-card glass flex items-start gap-4 rounded-2xl border border-white/10 p-5 transition hover:bg-white/10 md:p-6"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10">
            <Phone className="icon text-white" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-wider text-white/60">Teléfono</p>
            <p className="mt-1 text-sm font-medium text-white md:text-base">{phone}</p>
          </div>
        </a>

        <a
          href={`mailto:${email}`}
          className="contact-info-card glass flex items-start gap-4 rounded-2xl border border-white/10 p-5 transition hover:bg-white/10 md:p-6"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10">
            <Mail className="icon text-white" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-wider text-white/60">Email</p>
            <p className="mt-1 break-all text-sm font-medium text-white md:text-base">{email}</p>
          </div>
        </a>

        <div className="contact-info-card glass flex items-start gap-4 rounded-2xl border border-white/10 p-5 md:p-6">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10">
            <Clock className="icon text-white" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-wider text-white/60">Horario</p>
            <p className="mt-1 text-sm font-medium text-white md:text-base">{hours}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

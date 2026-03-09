"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { Clock, MapPin, Phone, MessageCircle, ArrowRight, Mail } from "lucide-react";
import ReservationForm from "@/components/ReservationForm";
import MapSectionSkeleton from "@/components/MapSectionSkeleton";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { SCROLL_SCENES, SCRUB_EASE } from "@/lib/scrollScenes";

const MapSection = dynamic(
  () => import("@/components/MapSection"),
  { loading: () => <MapSectionSkeleton /> }
);

type Site = any;

export default function ContactSection({ site, id }: { site: Site; id?: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const formBlockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const formBlock = formBlockRef.current;
    if (!section || !formBlock) return;

    const ctx = gsap.context(() => {
      gsap.set(formBlock, { y: 40, opacity: 0 });
      const tl = gsap.timeline({
        scrollTrigger: { trigger: section, ...SCROLL_SCENES.SCENE_80 },
      });
      tl.to(formBlock, { y: 0, opacity: 1, ease: SCRUB_EASE });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id={id} className="mx-auto max-w-6xl scroll-mt-24 px-5 py-14">
      <div className="grid gap-6 lg:grid-cols-2">
        <div ref={formBlockRef} className="glass rounded-3xl p-6">
          <h2 className="text-3xl font-black md:text-4xl">Reserva tu mesa</h2>
          <p className="mt-2 text-white/75">
            Dinos cuántas personas sois, si preferís terraza o interior y cualquier detalle.
            Confirmamos por WhatsApp en minutos.
          </p>

          <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-5">
            <ReservationForm site={site} />
          </div>

          <div className="mt-6 grid gap-3 text-sm text-white/80">
            <a className="glass rounded-2xl p-4 hover:bg-white/10" href={site.links.maps} target="_blank" rel="noopener noreferrer">
              <div className="flex items-center gap-3">
                <MapPin className="icon" aria-hidden="true" />
                <div>
                  <p className="font-extrabold">Dirección</p>
                  <p className="text-white/70">{site.contact.address}</p>
                </div>
              </div>
            </a>

            <a className="glass rounded-2xl p-4 hover:bg-white/10" href={`tel:${site.contact.phone.replace(/\s/g, "")}`}>
              <div className="flex items-center gap-3">
                <Phone className="icon" aria-hidden="true" />
                <div>
                  <p className="font-extrabold">Teléfono</p>
                  <p className="text-white/70">{site.contact.phone}</p>
                </div>
              </div>
            </a>

            <a className="glass rounded-2xl p-4 hover:bg-white/10" href={`mailto:${site.contact.email}`}>
              <div className="flex items-center gap-3">
                <Mail className="icon" aria-hidden="true" />
                <div>
                  <p className="font-extrabold">Email</p>
                  <p className="text-white/70">{site.contact.email}</p>
                </div>
              </div>
            </a>

            <div className="glass rounded-2xl p-4">
              <div className="flex items-center gap-3">
                <Clock className="icon" aria-hidden="true" />
                <div>
                  <p className="font-extrabold">Horario</p>
                  <p className="text-white/70">{site.contact.hours}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-semibold text-black hover:bg-white/90"
              href={site.links.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="icon" aria-hidden="true" />
              Abrir WhatsApp
              <ArrowRight className="icon" aria-hidden="true" />
            </a>
          </div>
        </div>

        <MapSection
          mapEmbedUrl={site.contact.mapEmbedUrl}
          address={site.contact.address}
          mapsUrl={site.links.maps}
          className="glass overflow-hidden rounded-3xl"
        />
      </div>
    </section>
  );
}

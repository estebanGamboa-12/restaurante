"use client";

import { Clock, MapPin, Phone, MessageCircle, ArrowRight, Mail } from "lucide-react";
import ReservationForm from "@/components/ReservationForm";

type Site = any;

export default function ContactSection({ site, id }: { site: Site; id?: string }) {
  return (
    <section id={id} className="mx-auto max-w-6xl scroll-mt-24 px-5 py-14">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="glass rounded-3xl p-6">
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

        <div className="glass overflow-hidden rounded-3xl">
          <iframe
            title="Mapa"
            src={site.contact.mapEmbedUrl}
            className="h-[520px] w-full"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}

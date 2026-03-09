import type { Metadata } from "next";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";
import SiteHeader from "@/components/SiteHeader";
import ContactHero from "@/components/ContactHero";
import ContactInfoSection from "@/components/ContactInfoSection";
import ContactSection from "@/components/ContactSection";
import FinalCtaSection from "@/components/FinalCtaSection";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = pageMetadata({
  title: `Contacto | ${site.brand.seo.title}`,
  description: "Ubicación, horarios y contacto del restaurante en Sevilla. Reserva mesa fácilmente.",
  path: "/contacto",
  image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop",
});

export default function ContactoPage() {
  return (
    <main className="relative pb-24 md:pb-0">
      <SiteHeader site={site} />
      <ContactHero
        headline="Reserva o Contáctanos"
        subtitle="Reserva tu mesa o escríbenos. Te esperamos para vivir la brasa en Sevilla."
        imageUrl="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop"
      />
      <ContactInfoSection
        address={site.contact.address}
        phone={site.contact.phone}
        email={site.contact.email}
        hours={site.contact.hours}
        mapsUrl={site.links.maps}
      />
      <ContactSection site={site} />
      <FinalCtaSection
        headline="Ven a vivir la experiencia"
        text="Te esperamos en Fuego & Brasa para una velada inolvidable."
        buttonLabel="Reservar mesa"
        buttonHref={site.links.whatsapp}
      />
      <section className="mx-auto max-w-6xl px-5 pb-12">
        <SiteFooter site={site} />
      </section>
    </main>
  );
}

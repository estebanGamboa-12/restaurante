import type { Metadata } from "next";
import { site } from "@/data/site";
import SiteHeader from "@/components/SiteHeader";
import ContactSection from "@/components/ContactSection";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: `Reservas | ${site.brand.seo.title}`,
  description: "Reserva mesa en Sevilla con nuestro formulario rápido: personas, terraza o interior y detalles.",
};

export default function ReservasPage() {
  return (
    <main className="relative pb-24 md:pb-0">
      <SiteHeader site={site} />
      <ContactSection site={site} />
      <section className="mx-auto max-w-6xl px-5 pb-12">
        <SiteFooter site={site} />
      </section>
    </main>
  );
}

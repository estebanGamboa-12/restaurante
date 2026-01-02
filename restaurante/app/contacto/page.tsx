import type { Metadata } from "next";
import { site } from "@/data/site";
import SiteHeader from "@/components/SiteHeader";
import ContactSection from "@/components/ContactSection";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: `Contacto | ${site.brand.seo.title}`,
  description: "Ubicación, horarios y contacto del restaurante en Sevilla. Reserva mesa fácilmente.",
};

export default function ContactoPage() {
  return (
    <main className="relative">
      <SiteHeader site={site} />
      <ContactSection site={site} />
      <section className="mx-auto max-w-6xl px-5 pb-12">
        <SiteFooter site={site} />
      </section>
    </main>
  );
}

import type { Metadata } from "next";
import { site } from "@/data/site";
import SiteHeader from "@/components/SiteHeader";
import MenuSection from "@/components/MenuSection";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: `Carta | ${site.brand.seo.title}`,
  description: "Carta completa del restaurante en Sevilla con platos recomendados y más pedidos.",
};

export default function CartaPage() {
  return (
    <main className="relative pb-24 md:pb-0">
      <SiteHeader site={site} />
      <MenuSection
        site={site}
        title="Carta completa"
        description="Platos recomendados, los más pedidos y opciones veggie. Todo lo que gusta en Sevilla."
      />
      <section className="mx-auto max-w-6xl px-5 pb-12">
        <SiteFooter site={site} />
      </section>
    </main>
  );
}

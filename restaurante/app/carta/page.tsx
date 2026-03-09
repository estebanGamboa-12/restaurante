import type { Metadata } from "next";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";
import SiteHeader from "@/components/SiteHeader";
import CartaHero from "@/components/CartaHero";
import MenuSection from "@/components/MenuSection";
import CartaCta from "@/components/CartaCta";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = pageMetadata({
  title: `Carta | ${site.brand.seo.title}`,
  description: "Carta completa del restaurante en Sevilla con todos los platos.",
  path: "/carta",
  image: (site as { hero?: { heroImage?: string } }).hero?.heroImage,
});

export default function CartaPage() {
  return (
    <main className="relative pb-24 md:pb-0">
      <SiteHeader site={site} />
      <CartaHero
        subtitle="Explora la carta completa y filtra por categorías según te apetezca."
        imageUrl={(site as { hero?: { heroImage?: string } }).hero?.heroImage}
      />
      <MenuSection
        site={site}
        title="Carta completa"
        description="Explora la carta completa y filtra por categorías según te apetezca."
      />
      <CartaCta
        headline="Reserva tu mesa"
        text="Después de ver la carta, reserva tu mesa y ven a disfrutar de la brasa en Sevilla."
        buttonLabel="Reservar mesa"
        buttonHref={(site as { links?: { whatsapp?: string } }).links?.whatsapp}
      />
      <section className="mx-auto max-w-6xl px-5 pb-12">
        <SiteFooter site={site} />
      </section>
    </main>
  );
}

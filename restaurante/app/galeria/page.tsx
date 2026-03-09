import type { Metadata } from "next";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";
import SiteHeader from "@/components/SiteHeader";
import SobreHero from "@/components/SobreHero";
import SobreStory from "@/components/SobreStory";
import SobreChef from "@/components/SobreChef";
import SobreValues from "@/components/SobreValues";
import CartaCta from "@/components/CartaCta";
import SiteFooter from "@/components/SiteFooter";
import { Flame, Sparkles, Utensils } from "lucide-react";

export const metadata: Metadata = pageMetadata({
  title: `Galería | ${site.brand.seo.title}`,
  description:
    "Conoce nuestra historia, la brasa real y la terraza más apetecible del centro de Sevilla.",
  path: "/galeria",
  image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1200&auto=format&fit=crop",
});

export default function GaleriaPage() {
  return (
    <main className="relative pb-24 md:pb-0">
      <SiteHeader site={site} />
      <SobreHero
        headline="Nuestra Historia"
        paragraph="Conoce nuestra historia, la brasa real y la terraza más apetecible del centro de Sevilla."
        imageUrl="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1200&auto=format&fit=crop"
      />
      <SobreStory
        editorialText="Todo empezó con una parrilla, un buen producto y las ganas de hacer algo distinto en el centro de Sevilla. Queríamos un sitio donde la brasa fuera la protagonista y la gente se sintiera en casa."
        supportingParagraph="Hoy seguimos con la misma idea: cocina honesta, proveedores de confianza y un equipo que cuida cada detalle. La terraza y el ambiente son parte de lo que somos, pero el plato que llega a la mesa es el que cuenta."
      />
      {site.chef && <SobreChef chef={site.chef} />}
      {site.values && <SobreValues values={site.values} />}
      <section className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-white/60">Sobre nosotros</p>
            <h1 className="mt-4 text-4xl font-black md:text-5xl">
              Brasa en Sevilla, producto premium y ambiente con encanto.
            </h1>
            <p className="mt-4 text-white/75">
              En {site.brand.name} combinamos fuego, cocina de autor y un servicio cercano para que cada
              visita sea memorable. Apostamos por proveedores locales, tiempos de cocción perfectos y
              una carta que mezcla clásicos con platos recomendados.
            </p>
            <p className="mt-4 text-white/75">
              Nuestro equipo te guía con los vinos y cócteles que mejor acompañan cada plato. Y si
              quieres terraza, tenemos uno de los rincones más agradables del centro de Sevilla.
            </p>
          </div>

          <div className="grid gap-4">
            <div className="glass rounded-3xl p-5">
              <div className="flex items-center gap-3">
                <Flame className="icon-lg" aria-hidden="true" />
                <div>
                  <p className="text-lg font-extrabold">Brasa auténtica</p>
                  <p className="text-sm text-white/70">Cortes seleccionados y punto perfecto en cada plato.</p>
                </div>
              </div>
            </div>
            <div className="glass rounded-3xl p-5">
              <div className="flex items-center gap-3">
                <Utensils className="icon-lg" aria-hidden="true" />
                <div>
                  <p className="text-lg font-extrabold">Carta viva</p>
                  <p className="text-sm text-white/70">Platos recomendados y novedades según temporada.</p>
                </div>
              </div>
            </div>
            <div className="glass rounded-3xl p-5">
              <div className="flex items-center gap-3">
                <Sparkles className="icon-lg" aria-hidden="true" />
                <div>
                  <p className="text-lg font-extrabold">Terraza top</p>
                  <p className="text-sm text-white/70">Interior con ambiente cálido y terraza amplia.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {site.highlights.map((h: any) => (
            <div key={h.title} className="glass rounded-3xl p-5">
              <p className="text-lg font-extrabold">{h.title}</p>
              <p className="mt-2 text-sm text-white/70">{h.text}</p>
            </div>
          ))}
        </div>
      </section>
      <CartaCta
        headline="Ven a vivir la experiencia"
        text="Reserva tu mesa y descubre la brasa, el producto y el ambiente que hacen único a Fuego & Brasa en Sevilla."
        buttonLabel="Reservar mesa"
        buttonHref={(site as { links?: { whatsapp?: string } }).links?.whatsapp}
      />
      <section className="mx-auto max-w-6xl px-5 pb-12">
        <SiteFooter site={site} />
      </section>
    </main>
  );
}

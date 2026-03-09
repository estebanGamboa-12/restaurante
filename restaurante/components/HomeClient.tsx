"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import {
  ArrowRight,
  BadgeCheck,
  Clock,
  Phone,
  Sparkles,
  UtensilsCrossed,
} from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Link from "next/link";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { SCROLL_SCENES, SCRUB_EASE } from "@/lib/scrollScenes";
import SplitType from "split-type";
import GallerySectionSkeleton from "@/components/GallerySectionSkeleton";
import PinnedStorySection from "@/components/PinnedStorySection";
import FeaturedDishScene from "@/components/FeaturedDishScene";
import HorizontalScrollGallery from "@/components/HorizontalScrollGallery";

const GallerySection = dynamic(
  () => import("@/components/GallerySection"),
  {
    loading: () => <GallerySectionSkeleton />,
    ssr: false,
  }
);

type Site = any;

export default function HomeClient({ site }: { site: Site }) {
  const mainRef = useRef<HTMLElement>(null);
  const heroSectionRef = useRef<HTMLElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const heroTagsRef = useRef<HTMLDivElement>(null);
  const heroHeadlineRef = useRef<HTMLHeadingElement>(null);
  const heroSubtitleRef = useRef<HTMLParagraphElement>(null);
  const heroCtaRef = useRef<HTMLDivElement>(null);
  const splitInstanceRef = useRef<SplitType | null>(null);
  const experienceSectionRef = useRef<HTMLElement>(null);
  const experienceSectionBgRef = useRef<HTMLDivElement>(null);
  const experienceCardsRef = useRef<HTMLDivElement>(null);
  const brandStorySectionRef = useRef<HTMLElement>(null);
  const brandStoryStatementRef = useRef<HTMLHeadingElement>(null);
  const brandStoryParagraphRef = useRef<HTMLParagraphElement>(null);
  const brandStorySplitRef = useRef<SplitType | null>(null);
  const menuPreviewSectionRef = useRef<HTMLElement>(null);
  const menuPreviewTitleRef = useRef<HTMLHeadingElement>(null);
  const menuPreviewItemsRef = useRef<HTMLDivElement>(null);
  const drinksSectionRef = useRef<HTMLElement>(null);
  const drinksGridRef = useRef<HTMLDivElement>(null);
  const ctaSectionRef = useRef<HTMLElement>(null);
  const ctaHeadlineRef = useRef<HTMLHeadingElement>(null);
  const ctaTextRef = useRef<HTMLParagraphElement>(null);
  const ctaButtonRef = useRef<HTMLAnchorElement>(null);
  const ctaBgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctaButtonCleanup: (() => void) | null = null;
    const ctx = gsap.context(() => {
      const scope = mainRef.current;
      if (!scope) return;
      // Split headline into lines for line-by-line animation
      if (heroHeadlineRef.current) {
        splitInstanceRef.current = new SplitType(heroHeadlineRef.current, {
          types: ["lines"],
          lineClass: "hero-line",
        });
      }

      const section = heroSectionRef.current;
      const image = heroImageRef.current;
      const tags = heroTagsRef.current?.querySelectorAll<HTMLElement>(".hero-tag");
      const lines = heroHeadlineRef.current?.querySelectorAll<HTMLElement>(".hero-line");
      const subtitle = heroSubtitleRef.current;
      const buttons = heroCtaRef.current?.querySelectorAll<HTMLElement>("a");

      if (!section) return;

      // Initial state: content hidden so it reveals as user scrolls
      if (image) gsap.set(image, { scale: 1 });
      if (tags?.length) gsap.set(tags, { y: 20, opacity: 0 });
      if (lines?.length) gsap.set(lines, { y: 80, opacity: 0 });
      if (subtitle) gsap.set(subtitle, { y: 24, opacity: 0 });
      if (buttons?.length) gsap.set(buttons, { y: 32, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: section, ...SCROLL_SCENES.HERO },
      });

      // Imagen: scale + parallax (y -40) en la misma timeline para un solo ScrollTrigger
      if (image) {
        tl.to(image, { scale: 1.1, ease: SCRUB_EASE }, 0);
        tl.to(image, { y: -40, ease: SCRUB_EASE }, 0);
      }
      if (tags?.length) tl.to(tags, { y: 0, opacity: 1, stagger: 0.07, ease: SCRUB_EASE }, 0.1);
      if (lines?.length) tl.to(lines, { y: 0, opacity: 1, stagger: 0.08, ease: SCRUB_EASE }, 0.2);
      if (subtitle) tl.to(subtitle, { y: 0, opacity: 1, ease: SCRUB_EASE }, 0.45);
      if (buttons?.length) tl.to(buttons, { y: 0, opacity: 1, stagger: 0.06, ease: SCRUB_EASE }, 0.58);

      // Experience cards: scroll-driven (scrub) – section bg fades, cards y:60 + stagger, icons scale 0.9→1
      if (
        experienceSectionRef.current &&
        experienceSectionBgRef.current &&
        experienceCardsRef.current
      ) {
        const section = experienceSectionRef.current;
        const bg = experienceSectionBgRef.current;
        const cards = experienceCardsRef.current.querySelectorAll<HTMLElement>(".experience-card");
        const icons = section.querySelectorAll<HTMLElement>(".experience-card-image");

        gsap.set(bg, { opacity: 0 });
        gsap.set(cards, { y: 60, opacity: 0 });
        gsap.set(icons, { scale: 0.9 });

        const tl = gsap.timeline({
          scrollTrigger: { trigger: section, ...SCROLL_SCENES.SCENE_80, end: "+=700" },
        });
        tl.to(bg, { opacity: 1, ease: SCRUB_EASE }, 0)
          .to(cards, { y: 0, opacity: 1, stagger: 0.12, ease: SCRUB_EASE }, 0.12)
          .to(icons, { scale: 1, ease: SCRUB_EASE }, 0.4);

        // Hover: card y -6, shadow increase, image scale (0.25s)
        const hoverDuration = 0.25;
        const hoverEase = "power2.out";
        cards.forEach((card) => {
          const img = card.querySelector<HTMLElement>(".experience-card-image");
          card.addEventListener("mouseenter", () => {
            gsap.to(card, {
              y: -6,
              boxShadow: "0 20px 48px rgba(0,0,0,0.35)",
              duration: hoverDuration,
              ease: hoverEase,
            });
            if (img) {
              gsap.to(img, { scale: 1.05, duration: hoverDuration, ease: hoverEase });
            }
          });
          card.addEventListener("mouseleave", () => {
            gsap.to(card, {
              y: 0,
              boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
              duration: hoverDuration,
              ease: hoverEase,
            });
            if (img) {
              gsap.to(img, { scale: 1, duration: hoverDuration, ease: hoverEase });
            }
          });
        });
      }

      // Brand story: scroll-driven line-by-line reveal + paragraph fade
      if (
        brandStorySectionRef.current &&
        brandStoryStatementRef.current &&
        brandStoryParagraphRef.current
      ) {
        brandStorySplitRef.current = new SplitType(brandStoryStatementRef.current, {
          types: ["lines"],
          lineClass: "brand-story-line",
        });
        const statementLines = brandStoryStatementRef.current.querySelectorAll<HTMLElement>(
          ".brand-story-line"
        );
        const section = brandStorySectionRef.current;
        const paragraph = brandStoryParagraphRef.current;
        gsap.set(statementLines, { y: 40, opacity: 0 });
        gsap.set(paragraph, { opacity: 0 });
        const tl = gsap.timeline({
          scrollTrigger: { trigger: section, ...SCROLL_SCENES.SCENE_80 },
        });
        tl.to(statementLines, { y: 0, opacity: 1, stagger: 0.08, ease: SCRUB_EASE }, 0)
          .to(paragraph, { opacity: 1, ease: SCRUB_EASE }, 0.35);
      }

      // Menu preview: scroll-driven reveal – title, items stagger, dish images scale, prices
      if (
        menuPreviewSectionRef.current &&
        menuPreviewTitleRef.current &&
        menuPreviewItemsRef.current
      ) {
        const section = menuPreviewSectionRef.current;
        const title = menuPreviewTitleRef.current;
        const items = menuPreviewItemsRef.current.querySelectorAll<HTMLElement>(".menu-preview-item");
        const images = section.querySelectorAll<HTMLElement>(".menu-preview-image");
        const prices = section.querySelectorAll<HTMLElement>(".menu-preview-price");

        gsap.set(title, { y: 40, opacity: 0 });
        gsap.set(items, { y: 32, opacity: 0 });
        gsap.set(images, { scale: 1.05 });
        gsap.set(prices, { opacity: 0 });

        const tl = gsap.timeline({
          scrollTrigger: { trigger: section, ...SCROLL_SCENES.SCENE_75 },
        });
        tl.to(title, { y: 0, opacity: 1, ease: SCRUB_EASE }, 0)
          .to(items, { y: 0, opacity: 1, stagger: 0.08, ease: SCRUB_EASE }, 0.12)
          .to(images, { scale: 1, ease: SCRUB_EASE }, 0.35)
          .to(prices, { opacity: 1, ease: SCRUB_EASE }, 0.5);
      }

      // Drinks: scroll-driven – cards fade in, slight scale, stagger
      if (drinksSectionRef.current && drinksGridRef.current) {
        const section = drinksSectionRef.current;
        const cards = drinksGridRef.current.querySelectorAll<HTMLElement>(".drink-card");
        if (cards.length) {
          gsap.set(cards, { opacity: 0, scale: 0.95 });
          const tl = gsap.timeline({
            scrollTrigger: { trigger: section, ...SCROLL_SCENES.SCENE_80 },
          });
          tl.to(cards, {
            opacity: 1,
            scale: 1,
            stagger: 0.08,
            ease: SCRUB_EASE,
          });
        }
      }

      // CTA: scroll-driven – background scale, headline, button; button hover
      if (
        ctaSectionRef.current &&
        ctaHeadlineRef.current &&
        ctaButtonRef.current &&
        ctaBgRef.current
      ) {
        const section = ctaSectionRef.current;
        const bg = ctaBgRef.current;
        const headline = ctaHeadlineRef.current;
        const button = ctaButtonRef.current;
        const textEl = ctaTextRef.current;

        gsap.set(bg, { scale: 1 });
        gsap.set(headline, { y: 48, opacity: 0 });
        if (textEl) gsap.set(textEl, { opacity: 0 });
        gsap.set(button, { y: 32, opacity: 0 });

        const tl = gsap.timeline({
          scrollTrigger: { trigger: section, ...SCROLL_SCENES.CTA },
        });
        tl.to(bg, { scale: 1.05, ease: SCRUB_EASE }, 0)
          .to(headline, { y: 0, opacity: 1, ease: SCRUB_EASE }, 0.12)
          .to(button, { y: 0, opacity: 1, ease: SCRUB_EASE }, 0.35);
        if (textEl) tl.to(textEl, { opacity: 1, ease: SCRUB_EASE }, 0.22);

        const onEnter = () => gsap.to(button, { scale: 1.05, duration: 0.22, ease: "power2.out" });
        const onLeave = () => gsap.to(button, { scale: 1, duration: 0.22, ease: "power2.out" });
        button.addEventListener("mouseenter", onEnter);
        button.addEventListener("mouseleave", onLeave);
        ctaButtonCleanup = () => {
          button.removeEventListener("mouseenter", onEnter);
          button.removeEventListener("mouseleave", onLeave);
        };
      }
    }, mainRef);

    return () => {
      ctaButtonCleanup?.();
      splitInstanceRef.current?.revert();
      brandStorySplitRef.current?.revert();
      ctx.revert();
    };
  }, []);

  return (
    <main ref={mainRef} className="relative pb-24 md:pb-0">
      <SiteHeader site={site} />

      {/* HERO */}
      <section
        ref={heroSectionRef}
        className="mx-auto max-w-6xl px-5 pt-10 pb-12 md:pt-16 md:pb-16"
      >
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <div
              ref={heroTagsRef}
              className="hidden flex-wrap gap-2 md:flex"
            >
              {site.hero.badges.map((b: string) => (
                <span
                  key={b}
                  className="hero-tag glass inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold text-white/90"
                >
                  <BadgeCheck className="icon" aria-hidden="true" />
                  {b}
                </span>
              ))}
            </div>

            <h1
              ref={heroHeadlineRef}
              className="hero-headline mt-5 overflow-hidden text-4xl font-black tracking-tight md:text-6xl"
            >
              {site.brand.tagline}
            </h1>

            <p
              ref={heroSubtitleRef}
              className="mt-4 max-w-xl text-base text-white/80 md:text-lg"
            >
              {site.brand.description}
            </p>

            <div ref={heroCtaRef} className="mt-6 flex flex-wrap gap-3">
              <Link
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-semibold text-black hover:bg-white/90"
                href="/reservas"
              >
                {site.hero.primaryCta}
                <ArrowRight className="icon" aria-hidden="true" />
              </Link>

              <Link
                className="glass hidden items-center gap-2 rounded-full px-5 py-3 font-semibold text-white hover:bg-white/10 md:inline-flex"
                href="/sobre"
              >
                Ver galería
              </Link>
            </div>

            <div className="mt-8 hidden flex-wrap gap-6 text-sm text-white/75 md:flex">
              <span className="inline-flex items-center gap-2">
                <Clock className="icon" aria-hidden="true" />
                {site.contact.hours}
              </span>
              <span className="inline-flex items-center gap-2">
                <Sparkles className="icon" aria-hidden="true" />
                Brasa real + cócteles
              </span>
            </div>
          </div>

          <div className="relative">
            <div
              ref={heroImageRef}
              className="glass overflow-hidden rounded-3xl will-change-transform"
            >
              <Image
                src={site.hero.heroImage}
                alt="Restaurante - brasa"
                width={1600}
                height={1000}
                priority
                className="h-[360px] w-full object-cover md:h-[520px]"
              />
            </div>

            <div className="mt-4 hidden w-full md:pointer-events-none md:absolute md:-bottom-8 md:left-1/2 md:mt-0 md:w-[88%] md:-translate-x-1/2 md:block">
              <div className="grid gap-4 rounded-3xl border border-white/10 bg-black/40 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:grid-cols-2 lg:grid-cols-4">
                {site.highlights.map((h: any) => (
                  <div
                    key={h.title}
                    className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 shadow-[0_8px_20px_rgba(0,0,0,0.25)]"
                  >
                    <p className="text-sm font-extrabold text-white">{h.title}</p>
                    <p className="mt-1 text-xs text-white/70">{h.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience cards */}
      <section
        ref={experienceSectionRef}
        className="relative mx-auto max-w-6xl px-5 py-16 md:py-20"
      >
        <div
          ref={experienceSectionBgRef}
          className="pointer-events-none absolute inset-0 -z-10 rounded-3xl bg-white/5"
          aria-hidden
        />
        <div
          ref={experienceCardsRef}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {site.highlights.map((h: { title: string; text: string; image?: string }) => (
            <div
              key={h.title}
              className="experience-card glass cursor-pointer overflow-hidden rounded-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.2)]"
            >
              {h.image && (
                <div className="experience-card-image relative h-32 w-full overflow-hidden md:h-40">
                  <Image
                    src={h.image}
                    alt=""
                    width={400}
                    height={160}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <h3 className="text-lg font-bold text-white md:text-xl">
                  {h.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/75">
                  {h.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pinned storytelling scene */}
      {(() => {
        const items = site.menu?.items ?? [];
        const dish = items[2] ?? items[0];
        if (!dish?.image) return null;
        return (
          <PinnedStorySection
            headline={site.brandStory?.statement ?? "Cocina con alma."}
            paragraph={site.brandStory?.paragraph ?? "En Fuego & Brasa unimos la brasa de siempre con el ritmo de Sevilla. Sin prisas, con cuidado."}
            backgroundImage={site.hero?.heroImage ?? "https://images.unsplash.com/photo-1502998070258-dc1338445ac2?q=80&w=1200&auto=format&fit=crop"}
            dishImage={dish.image}
            dishAlt={dish.name}
          />
        );
      })()}

      {/* Brand story */}
      <section
        ref={brandStorySectionRef}
        className="mx-auto max-w-6xl px-5 py-20 md:py-28"
      >
        <div className="mx-auto max-w-3xl text-center">
          <h2
            ref={brandStoryStatementRef}
            className="brand-story-statement text-3xl font-black leading-tight tracking-tight text-white md:text-4xl lg:text-5xl"
          >
            {site.brandStory?.statement ?? "Cocina con alma."}
          </h2>
          <p
            ref={brandStoryParagraphRef}
            className="mt-6 text-lg leading-relaxed text-white/80 md:text-xl"
          >
            {site.brandStory?.paragraph ??
              "En Fuego & Brasa unimos la brasa de siempre con el ritmo de Sevilla."}
          </p>
        </div>
      </section>

      {/* Featured dish – parallax + scrub */}
      {(() => {
        const items = site.menu?.items ?? [];
        const dish = items[2] ?? items[0];
        if (!dish?.name || !dish?.image) return null;
        return (
          <FeaturedDishScene
            name={dish.name}
            description={dish.desc}
            price={dish.price}
            image={dish.image}
          />
        );
      })()}

      {/* Menu preview – featured dishes */}
      <section
        ref={menuPreviewSectionRef}
        className="mx-auto max-w-6xl px-5 py-20 md:py-24"
      >
        <h2
          ref={menuPreviewTitleRef}
          className="mb-10 text-center text-2xl font-bold text-white md:text-3xl"
        >
          Platos destacados
        </h2>
        <div
          ref={menuPreviewItemsRef}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {(site.menu?.items ?? [])
            .slice(0, 4)
            .map(
              (dish: {
                name: string;
                desc: string;
                price: string;
                image?: string;
              }) => (
                <article
                  key={dish.name}
                  className="menu-preview-item glass overflow-hidden rounded-2xl border border-white/10"
                >
                  {dish.image && (
                    <div className="menu-preview-image relative aspect-4/3 overflow-hidden">
                      <Image
                        src={dish.image}
                        alt={dish.name}
                        width={400}
                        height={300}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-4 md:p-5">
                    <h3 className="font-bold text-white md:text-lg">
                      {dish.name}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-white/75">
                      {dish.desc}
                    </p>
                    <p className="menu-preview-price mt-3 text-base font-semibold text-white">
                      {dish.price}
                    </p>
                  </div>
                </article>
              )
            )}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/carta"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-3 font-semibold text-white hover:bg-white/10"
          >
            Ver carta completa
            <ArrowRight className="icon" aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* Drinks / Cocktails */}
      <section
        ref={drinksSectionRef}
        className="mx-auto max-w-6xl px-5 py-20 md:py-24"
      >
        <h2 className="mb-10 text-center text-2xl font-bold text-white md:text-3xl">
          Cócteles y bebidas
        </h2>
        <div
          ref={drinksGridRef}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {(site.drinks ?? []).map(
            (drink: { name: string; desc: string; image?: string }) => (
              <article
                key={drink.name}
                className="drink-card glass overflow-hidden rounded-2xl border border-white/10"
              >
                {drink.image && (
                  <div className="relative aspect-square overflow-hidden md:aspect-4/3">
                    <Image
                      src={drink.image}
                      alt={drink.name}
                      width={400}
                      height={400}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
                <div className="p-5">
                  <h3 className="font-bold text-white md:text-lg">
                    {drink.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/75">
                    {drink.desc}
                  </p>
                </div>
              </article>
            )
          )}
        </div>
      </section>

      <div data-gallery-wrap>
        <GallerySection gallery={site.gallery ?? []} />
      </div>

      <div data-horizontal-gallery-wrap>
        <HorizontalScrollGallery images={site.gallery ?? []} />
      </div>

      <section className="mx-auto max-w-6xl px-5 py-12">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Carta",
              description: "Entrantes, brasa y postres con nuestra selección completa.",
              icon: UtensilsCrossed,
              href: "/carta",
              cta: "Ver carta",
            },
            {
              title: "Galería",
              description: "Ambiente, platos y brasa en imágenes reales.",
              icon: ArrowRight,
              href: "/sobre",
              cta: "Explorar",
            },
            {
              title: "Contacto",
              description: "Horarios, ubicación y contacto directo.",
              icon: Phone,
              href: "/contacto",
              cta: "Hablar",
            },
          ].map((card) => {
            const Icon = card.icon;
            return (
              <Link key={card.title} href={card.href} className="glass rounded-3xl p-6">
                <div className="flex items-center justify-between">
                  <p className="text-xl font-extrabold">{card.title}</p>
                  <Icon className="icon" aria-hidden="true" />
                </div>
                <p className="mt-3 text-sm text-white/70">{card.description}</p>
                <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white">
                  {card.cta}
                  <ArrowRight className="icon" aria-hidden="true" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Final CTA – Reservar mesa */}
      <section
        ref={ctaSectionRef}
        className="relative overflow-hidden px-5 py-24 md:py-32"
      >
        <div
          ref={ctaBgRef}
          className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-b from-white/4 via-transparent to-white/6"
          aria-hidden
        />
        <div className="mx-auto max-w-3xl text-center">
          <h2
            ref={ctaHeadlineRef}
            className="text-3xl font-black tracking-tight text-white md:text-4xl lg:text-5xl"
          >
            Reserva tu mesa
          </h2>
          <p
            ref={ctaTextRef}
            className="mt-4 text-lg text-white/80 md:text-xl"
          >
            Vive la brasa en Sevilla. Te esperamos para una experiencia que se queda.
          </p>
          <div className="mt-8">
            <Link
              ref={ctaButtonRef}
              href={site.links?.whatsapp ?? "/contacto"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-semibold text-black transition-colors hover:bg-white/90"
            >
              Reservar mesa
              <ArrowRight className="icon" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-12">
        <SiteFooter site={site} />
      </section>
    </main>
  );
}

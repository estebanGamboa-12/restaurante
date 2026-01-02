"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Clock,
  Heart,
  Home,
  ImageIcon,
  Phone,
  Sparkles,
  Star,
  UtensilsCrossed,
} from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import MenuSection from "@/components/MenuSection";
import ContactSection from "@/components/ContactSection";
import SiteFooter from "@/components/SiteFooter";
import Link from "next/link";

type Site = any;

export default function HomeClient({ site }: { site: Site }) {
  const [activeSection, setActiveSection] = useState("inicio");
  const fadeUp = {
    hidden: { opacity: 0, y: 26 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
  };

  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.10 } },
  };

  useEffect(() => {
    const ids = ["inicio", "carta", "galeria", "contacto"];
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: 0.1 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="relative pb-28 md:pb-0">
      <SiteHeader site={site} />

      {/* HERO */}
      <section id="inicio" className="mx-auto max-w-6xl scroll-mt-24 px-5 pt-10 pb-12 md:pt-16 md:pb-16">
        <motion.div initial="hidden" animate="show" variants={stagger} className="grid gap-8 lg:grid-cols-2">
          <motion.div variants={fadeUp}>
            <div className="flex flex-wrap gap-2">
              {site.hero.badges.map((b: string) => (
                <span
                  key={b}
                  className="glass inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold text-white/90"
                >
                  <BadgeCheck className="icon" aria-hidden="true" />
                  {b}
                </span>
              ))}
            </div>

            <h1 className="mt-5 text-4xl font-black tracking-tight md:text-6xl">
              {site.brand.tagline}
            </h1>

            <p className="mt-4 max-w-xl text-base text-white/80 md:text-lg">
              {site.brand.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-semibold text-black hover:bg-white/90"
                href="/reservas"
              >
                {site.hero.primaryCta}
                <ArrowRight className="icon" aria-hidden="true" />
              </Link>

              <Link
                className="glass inline-flex items-center gap-2 rounded-full px-5 py-3 font-semibold text-white hover:bg-white/10"
                href="/carta"
              >
                {site.hero.secondaryCta}
              </Link>
            </div>

            {/* “app-like” quick actions en móvil */}
            <div className="mt-7 grid grid-cols-3 gap-3 md:hidden">
              <Link
                className="glass rounded-2xl p-3"
                href="/carta"
              >
                <p className="mt-2 text-xs font-bold">Carta</p>
                <p className="text-[11px] text-white/70">Ver platos</p>
              </Link>
              <Link
                className="glass rounded-2xl p-3"
                href="/reservas"
              >
                <p className="mt-2 text-xs font-bold">Reserva</p>
                <p className="text-[11px] text-white/70">En 30s</p>
              </Link>
              <a
                className="glass rounded-2xl p-3"
                href={site.links.maps}
                target="_blank"
                rel="noopener noreferrer"
              >
                <p className="mt-2 text-xs font-bold">Cómo llegar</p>
                <p className="text-[11px] text-white/70">{site.brand.city}</p>
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-6 text-sm text-white/75">
              <span className="inline-flex items-center gap-2">
                <Clock className="icon" aria-hidden="true" />
                {site.contact.hours}
              </span>
              <span className="inline-flex items-center gap-2">
                <Sparkles className="icon" aria-hidden="true" />
                Brasa real + cócteles
              </span>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="relative">
            <div className="glass overflow-hidden rounded-3xl">
              <Image
                src={site.hero.heroImage}
                alt="Restaurante - brasa"
                width={1600}
                height={1000}
                priority
                className="h-[360px] w-full object-cover md:h-[520px]"
              />
            </div>

            <div className="pointer-events-none absolute -bottom-6 left-1/2 w-[92%] -translate-x-1/2">
              <div className="glass grid grid-cols-3 gap-3 rounded-3xl p-4">
                {site.highlights.map((h: any) => (
                  <div key={h.title} className="rounded-2xl bg-white/5 p-3">
                    <p className="text-xs font-extrabold">{h.title}</p>
                    <p className="mt-1 text-[11px] text-white/70">{h.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* MENU */}
      <MenuSection
        site={site}
        id="carta"
        title="Carta más deseada en Sevilla"
        description="Carta completa con platos recomendados, los más pedidos y filtros por categoría."
      />

      {/* GALLERY */}
      <section id="galeria" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-14">
        <h2 className="text-3xl font-black md:text-4xl">Galería</h2>
        <p className="mt-2 text-white/75">Ambiente, platos y brasa en su punto.</p>

        <div className="mt-7 grid gap-3 md:grid-cols-4">
          {site.gallery.map((src: string, i: number) => (
            <div key={src} className="glass overflow-hidden rounded-3xl">
              <Image
                src={src}
                alt={`Galería ${i + 1}`}
                width={1400}
                height={1000}
                className="h-[220px] w-full object-cover md:h-[260px]"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {site.reviews.map((r: any) => (
            <div key={r.name} className="glass rounded-3xl p-5">
              <div className="flex items-center gap-1">
                {Array.from({ length: r.stars }).map((_, idx) => (
                  <Star key={idx} className="icon text-white" aria-hidden="true" />
                ))}
              </div>
              <p className="mt-3 text-sm text-white/80">“{r.text}”</p>
              <p className="mt-3 text-xs font-bold text-white/70">{r.name}</p>
              <div className="mt-4 flex items-center gap-2 text-xs text-white/60">
                <Heart className="icon" aria-hidden="true" />
                Recomendado
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <ContactSection site={site} id="contacto" />

      <section className="mx-auto max-w-6xl px-5 pb-12">
        <SiteFooter site={site} />
      </section>

      <div className="pointer-events-none fixed bottom-4 left-1/2 z-50 w-[92%] -translate-x-1/2 md:hidden">
        <nav className="glass pointer-events-auto grid grid-cols-4 gap-2 rounded-3xl p-2">
          {[
            { id: "inicio", label: "Inicio", icon: Home },
            { id: "carta", label: "Carta", icon: UtensilsCrossed },
            { id: "galeria", label: "Galería", icon: ImageIcon },
            { id: "contacto", label: "Contacto", icon: Phone },
          ].map((item) => {
            const isActive = activeSection === item.id;
            const Icon = item.icon;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-current={isActive ? "page" : undefined}
                className={[
                  "flex flex-col items-center gap-1 rounded-2xl px-2 py-2 text-[11px] font-semibold transition",
                  isActive
                    ? "bg-white/15 text-white shadow-[0_0_18px_rgba(255,255,255,0.18)]"
                    : "text-white/60 hover:text-white",
                ].join(" ")}
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>
      </div>
    </main>
  );
}

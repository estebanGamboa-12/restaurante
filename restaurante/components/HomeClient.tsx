"use client";

import Image from "next/image";
import { motion } from "framer-motion";
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

type Site = any;

export default function HomeClient({ site }: { site: Site }) {
  const fadeUp = {
    hidden: { opacity: 0, y: 26 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
  };

  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.10 } },
  };

  return (
    <main className="relative pb-24 md:pb-0">
      <SiteHeader site={site} />

      {/* HERO */}
      <section className="mx-auto max-w-6xl px-5 pt-10 pb-12 md:pt-16 md:pb-16">
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
                href="/galeria"
              >
                Ver galería
              </Link>
            </div>

            {/* “app-like” quick actions en móvil */}
            <div className="mt-7 grid grid-cols-2 gap-3 md:hidden sm:grid-cols-3">
              <Link
                className="glass rounded-2xl p-3"
                href="/carta"
              >
                <p className="mt-2 text-xs font-bold">Carta</p>
                <p className="text-[11px] text-white/70">Ver platos</p>
              </Link>
              <Link
                className="glass rounded-2xl p-3"
                href="/galeria"
              >
                <p className="mt-2 text-xs font-bold">Galería</p>
                <p className="text-[11px] text-white/70">Ambiente & platos</p>
              </Link>
              <a
                className="glass rounded-2xl p-3 col-span-2 sm:col-span-1"
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

            <div className="mt-4 w-full md:pointer-events-none md:absolute md:-bottom-6 md:left-1/2 md:mt-0 md:w-[92%] md:-translate-x-1/2">
              <div className="glass grid gap-3 rounded-3xl p-4 sm:grid-cols-2 md:grid-cols-3">
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
              href: "/galeria",
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

      <section className="mx-auto max-w-6xl px-5 pb-12">
        <SiteFooter site={site} />
      </section>
    </main>
  );
}

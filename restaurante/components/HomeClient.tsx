"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Clock,
  Flame,
  Gift,
  Heart,
  Instagram,
  MapPin,
  MessageCircle,
  Phone,
  Search,
  Sparkles,
  Star,
} from "lucide-react";

type Site = any;

function waLink(site: Site, message: string) {
  const base = String(site.links.whatsapp).split("?")[0];
  return `${base}?text=${encodeURIComponent(message)}`;
}

export default function HomeClient({ site }: { site: Site }) {
  const [activeDock, setActiveDock] = useState<"home" | "menu" | "gallery" | "contact">("home");
  const [q, setQ] = useState("");
  const [cat, setCat] = useState(site.menu.categories[0]);

  const sections = useMemo(
    () => [
      { id: "home", dock: "home" as const },
      { id: "menu", dock: "menu" as const },
      { id: "gallery", dock: "gallery" as const },
      { id: "contact", dock: "contact" as const },
    ],
    []
  );

  useEffect(() => {
    const nodes = sections.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    if (!nodes.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const found = sections.find((s) => s.id === entry.target.id);
          if (found) setActiveDock(found.dock);
        }
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 }
    );

    nodes.forEach((n) => obs.observe(n));
    return () => obs.disconnect();
  }, [sections]);

  const fadeUp = {
    hidden: { opacity: 0, y: 26 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
  };

  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.10 } },
  };

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return site.menu.items.filter((it: any) => {
      const okCat = cat === "Todos" || it.category === cat;
      if (!okCat) return false;
      if (!term) return true;
      const hay = `${it.name} ${it.desc} ${it.price} ${it.category}`.toLowerCase();
      return hay.includes(term);
    });
  }, [q, cat, site.menu.items]);

  return (
    <main className="relative">
      {/* NAV */}
      <div className="sticky top-0 z-40">
        <div className="glass">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
            <a href="#home" className="flex items-center gap-2 font-semibold tracking-wide">
              <Flame className="icon" aria-hidden="true" />
              <span>{site.brand.name}</span>
            </a>

            <div className="hidden items-center gap-6 md:flex text-sm text-white/80">
              <a className="hover:text-white" href="#menu">Carta</a>
              <a className="hover:text-white" href="#gallery">Galería</a>
              <a className="hover:text-white" href="#contact">Contacto</a>
            </div>

            <div className="flex items-center gap-3">
              <a
                className="hidden md:inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold hover:bg-white/14"
                href={site.links.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="icon" aria-hidden="true" />
                Instagram
              </a>

              <a
                className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-white/90"
                href={site.links.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="icon" aria-hidden="true" />
                Reservar
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* HERO */}
      <section id="home" className="mx-auto max-w-6xl px-5 pt-10 pb-12 md:pt-16 md:pb-16">
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
              <a
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-semibold text-black hover:bg-white/90"
                href={waLink(site, "Hola, quiero reservar una mesa. ¿Tenéis disponibilidad hoy?")}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="icon" aria-hidden="true" />
                {site.hero.primaryCta}
                <ArrowRight className="icon" aria-hidden="true" />
              </a>

              <a
                className="glass inline-flex items-center gap-2 rounded-full px-5 py-3 font-semibold text-white hover:bg-white/10"
                href="#menu"
              >
                <Search className="icon" aria-hidden="true" />
                {site.hero.secondaryCta}
              </a>
            </div>

            {/* “app-like” quick actions en móvil */}
            <div className="mt-7 grid grid-cols-3 gap-3 md:hidden">
              <a
                className="glass rounded-2xl p-3"
                href="#menu"
              >
                <Gift className="icon-lg" aria-hidden="true" />
                <p className="mt-2 text-xs font-bold">Carta</p>
                <p className="text-[11px] text-white/70">Ver platos</p>
              </a>
              <a
                className="glass rounded-2xl p-3"
                href={waLink(site, "Hola, quiero reservar para 2. Hora preferida:")}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="icon-lg" aria-hidden="true" />
                <p className="mt-2 text-xs font-bold">Reserva</p>
                <p className="text-[11px] text-white/70">En 30s</p>
              </a>
              <a
                className="glass rounded-2xl p-3"
                href={site.links.maps}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MapPin className="icon-lg" aria-hidden="true" />
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
      <section id="menu" className="mx-auto max-w-6xl px-5 py-14">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-3xl font-black md:text-4xl">Carta</h2>
            <p className="mt-2 text-white/75">Filtra por categoría o busca tu plato.</p>
          </div>

          <div className="glass flex items-center gap-2 rounded-2xl px-3 py-2">
            <Search className="icon" aria-hidden="true" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscar… (entrecot, croquetas, trufa)"
              className="w-full bg-transparent text-sm outline-none placeholder:text-white/45 md:w-[340px]"
            />
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {site.menu.categories.map((c: string) => (
            <button
              key={c}
              type="button"
              onClick={() => setCat(c)}
              className={[
                "rounded-full px-4 py-2 text-sm font-semibold transition",
                c === cat ? "bg-white text-black" : "glass hover:bg-white/10",
              ].join(" ")}
            >
              {c}
            </button>
          ))}
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="mt-8 grid gap-4 md:grid-cols-2"
        >
          {filtered.map((it: any) => (
            <motion.article key={it.name} variants={fadeUp} className="glass rounded-3xl p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-extrabold">{it.name}</h3>
                  <p className="mt-1 text-sm text-white/70">{it.desc}</p>
                  <div className="mt-3 flex flex-wrap gap-2 text-[11px]">
                    <span className="rounded-full bg-white/10 px-2 py-1 font-bold">{it.category}</span>
                    {it.veggie && <span className="rounded-full bg-white/10 px-2 py-1 font-bold">Veg</span>}
                    {it.spicy && <span className="rounded-full bg-white/10 px-2 py-1 font-bold">Picante</span>}
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-lg font-black">{it.price}</p>
                  <a
                    className="mt-2 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold text-black hover:bg-white/90"
                    href={waLink(site, `Hola, quiero reservar y pedir: ${it.name}. ¿Disponible hoy?`)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Reservar
                    <ArrowRight className="icon" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="mx-auto max-w-6xl px-5 py-14">
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
      <section id="contact" className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="glass rounded-3xl p-6">
            <h2 className="text-3xl font-black md:text-4xl">Contacto</h2>
            <p className="mt-2 text-white/75">{site.contact.notes}</p>

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
                Reservar por WhatsApp
                <ArrowRight className="icon" aria-hidden="true" />
              </a>

              <a
                className="glass inline-flex items-center gap-2 rounded-full px-5 py-3 font-semibold text-white hover:bg-white/10"
                href={site.links.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="icon" aria-hidden="true" />
                Ver Instagram
              </a>
            </div>
          </div>

          <div className="glass overflow-hidden rounded-3xl">
            <iframe
              title="Mapa"
              src={site.contact.mapEmbedUrl}
              className="h-[420px] w-full"
              loading="lazy"
            />
          </div>
        </div>

        <footer className="mt-10 flex flex-col gap-3 text-xs text-white/55 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {site.brand.name} — {site.brand.city}</p>
          <p className="text-white/45">Hecho con Next.js + Tailwind + Framer Motion</p>
        </footer>
      </section>

      {/* MOBILE DOCK */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
        <div className="glass mx-3 mb-3 grid grid-cols-4 gap-2 rounded-3xl p-2"
          style={{
            paddingBottom: "calc(0.5rem + env(safe-area-inset-bottom))",
          }}
        >
          <a
            href="#home"
            className={[
              "flex flex-col items-center justify-center gap-1 rounded-2xl px-2 py-3 text-[11px] font-bold",
              activeDock === "home" ? "bg-white text-black" : "bg-white/0 text-white/75",
            ].join(" ")}
          >
            <Flame className="icon-lg" aria-hidden="true" />
            Inicio
          </a>

          <a
            href="#menu"
            className={[
              "flex flex-col items-center justify-center gap-1 rounded-2xl px-2 py-3 text-[11px] font-bold",
              activeDock === "menu" ? "bg-white text-black" : "bg-white/0 text-white/75",
            ].join(" ")}
          >
            <Search className="icon-lg" aria-hidden="true" />
            Carta
          </a>

          <a
            href={site.links.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center gap-1 rounded-2xl bg-white px-2 py-3 text-[11px] font-black text-black"
          >
            <MessageCircle className="icon-lg" aria-hidden="true" />
            Reservar
          </a>

          <a
            href="#contact"
            className={[
              "flex flex-col items-center justify-center gap-1 rounded-2xl px-2 py-3 text-[11px] font-bold",
              activeDock === "contact" ? "bg-white text-black" : "bg-white/0 text-white/75",
            ].join(" ")}
          >
            <MapPin className="icon-lg" aria-hidden="true" />
            Contacto
          </a>
        </div>
      </div>
    </main>
  );
}

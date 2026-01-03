"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { Search, X } from "lucide-react";

type Site = any;

export default function MenuSection({
  site,
  title = "Carta",
  description = "Filtra por categoría o busca tu plato favorito.",
  id,
}: {
  site: Site;
  title?: string;
  description?: string;
  id?: string;
}) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState(site.menu.categories[0]);

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 26 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
  };

  const stagger: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
  };

  const normalizedQuery = q.trim().toLowerCase();

  const matchesFilters = (it: any) => {
    const okCat = cat === "Todos" || it.category === cat;
    if (!okCat) return false;
    if (!normalizedQuery) return true;
    const hay = `${it.name} ${it.desc} ${it.price} ${it.category}`.toLowerCase();
    return hay.includes(normalizedQuery);
  };

  const filtered = useMemo(
    () => site.menu.items.filter((it: any) => matchesFilters(it)),
    [cat, normalizedQuery, site.menu.items]
  );

  const listKey = `${cat}-${normalizedQuery}`;

  return (
    <section id={id} className="mx-auto max-w-6xl scroll-mt-24 px-5 py-14">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-3xl font-black md:text-5xl">{title}</h2>
          <p className="mt-2 text-white/75">{description}</p>
        </div>

        <div className="glass flex items-center gap-2 rounded-2xl px-3 py-2">
          <Search className="icon" aria-hidden="true" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            type="search"
            aria-label="Buscar en la carta"
            placeholder="Buscar… (entrecot, croquetas, trufa)"
            className="w-full bg-transparent text-sm outline-none placeholder:text-white/45 md:w-[340px]"
          />
          {q ? (
            <button
              type="button"
              onClick={() => setQ("")}
              className="rounded-full p-1 text-white/70 transition hover:text-white"
              aria-label="Limpiar búsqueda"
            >
              <X className="icon" aria-hidden="true" />
            </button>
          ) : null}
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-2">
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
        <span className="text-xs font-semibold text-white/60">
          {filtered.length} platos
        </span>
      </div>

      <motion.div
        key={listKey}
        initial="hidden"
        animate="show"
        variants={stagger}
        className="mt-8 grid gap-4 md:grid-cols-2"
      >
        {filtered.length ? (
          filtered.map((it: any) => (
            <motion.article key={it.name} variants={fadeUp} className="glass rounded-3xl p-6">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex flex-1 items-start gap-4">
                  {it.image ? (
                    <div className="h-24 w-24 shrink-0 overflow-hidden rounded-2xl">
                      <Image
                        src={it.image}
                        alt={it.name}
                        width={320}
                        height={240}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  ) : null}
                  <div>
                    <h3 className="text-xl font-extrabold">{it.name}</h3>
                    <p className="mt-2 text-sm text-white/70">{it.desc}</p>
                    <div className="mt-3 flex flex-wrap gap-2 text-[11px]">
                      <span className="rounded-full bg-white/10 px-2 py-1 font-bold">{it.category}</span>
                      {it.badge && (
                        <span className="rounded-full bg-white px-2 py-1 font-bold text-black">
                          {it.badge}
                        </span>
                      )}
                      {it.veggie && <span className="rounded-full bg-white/10 px-2 py-1 font-bold">Veg</span>}
                      {it.spicy && <span className="rounded-full bg-white/10 px-2 py-1 font-bold">Picante</span>}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-xl font-black">{it.price}</p>
                </div>
              </div>
            </motion.article>
          ))
        ) : (
          <motion.article
            variants={fadeUp}
            className="rounded-3xl border border-dashed border-white/20 p-6 text-sm text-white/70"
          >
            No hay resultados con estos filtros. Prueba otra categoría o borra la búsqueda.
          </motion.article>
        )}
      </motion.div>
    </section>
  );
}

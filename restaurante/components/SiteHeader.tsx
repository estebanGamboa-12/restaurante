"use client";

import Link from "next/link";
import { Flame, Instagram, MessageCircle } from "lucide-react";

type Site = any;

export default function SiteHeader({ site }: { site: Site }) {
  return (
    <div className="sticky top-0 z-40">
      <div className="glass">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
          <Link href="/" className="flex items-center gap-2 font-semibold tracking-wide">
            <Flame className="icon" aria-hidden="true" />
            <span>{site.brand.name}</span>
          </Link>

          <nav className="hidden items-center gap-6 text-sm text-white/80 md:flex">
            <Link className="hover:text-white" href="/">Inicio</Link>
            <Link className="hover:text-white" href="/carta">Carta</Link>
            <Link className="hover:text-white" href="/galeria">Galería</Link>
            <Link className="hover:text-white" href="/contacto">Contacto</Link>
          </nav>

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

            <Link
              className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-white/90"
              href="/reservas"
            >
              <MessageCircle className="icon" aria-hidden="true" />
              Reservar
            </Link>
          </div>
        </div>
      </div>
      <nav className="glass mx-auto flex max-w-6xl gap-3 overflow-x-auto px-5 pb-4 md:hidden">
        {[
          { href: "/", label: "Inicio" },
          { href: "/carta", label: "Carta" },
          { href: "/galeria", label: "Galería" },
          { href: "/contacto", label: "Contacto" },
          { href: "/reservas", label: "Reservas" },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="glass shrink-0 rounded-full px-4 py-2 text-xs font-semibold text-white/80 hover:text-white"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}

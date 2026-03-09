"use client";

import Link from "next/link";
import {
  Flame,
  Home,
  Image,
  Instagram,
  MessageCircle,
  Phone,
  UtensilsCrossed,
} from "lucide-react";

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
            <Link className="hover:text-white" href="/sobre">Sobre</Link>
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
      <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
        <div className="mx-auto max-w-6xl px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3">
          <div className="glass grid grid-cols-5 gap-2 rounded-[28px] px-3 py-2 shadow-[0_12px_40px_rgba(0,0,0,0.45)]">
            {[
              { href: "/", label: "Inicio", icon: Home },
              { href: "/carta", label: "Carta", icon: UtensilsCrossed },
              { href: "/sobre", label: "Sobre", icon: Image },
              { href: "/contacto", label: "Contacto", icon: Phone },
              { href: "/reservas", label: "Reservar", icon: MessageCircle, primary: true },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={[
                    "group flex flex-col items-center gap-1 rounded-2xl px-2 py-2 text-[11px] font-semibold transition",
                    item.primary
                      ? "bg-white text-black shadow-[0_10px_24px_rgba(255,255,255,0.25)]"
                      : "text-white/70 hover:text-white hover:bg-white/10",
                  ].join(" ")}
                >
                  <Icon
                    className={item.primary ? "icon-lg" : "icon"}
                    aria-hidden="true"
                  />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
}

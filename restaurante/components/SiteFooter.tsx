"use client";

type Site = any;

export default function SiteFooter({ site }: { site: Site }) {
  return (
    <footer className="mt-12 flex flex-col gap-3 text-xs text-white/55 md:flex-row md:items-center md:justify-between">
      <p>© {new Date().getFullYear()} {site.brand.name} — {site.brand.city}</p>
      <p className="text-white/45">Brasa, terraza y carta cuidada en el centro de Sevilla</p>
    </footer>
  );
}

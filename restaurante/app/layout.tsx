import type { Metadata } from "next";
import "./globals.css";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: `${site.brand.name} | ${site.brand.city}`,
  description: site.brand.description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="noise">
        {/* blobs de fondo */}
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <div className="blob absolute -top-24 -left-24 h-80 w-80 rounded-full bg-white/10" />
          <div className="blob delay absolute top-12 right-[-120px] h-[420px] w-[420px] rounded-full bg-white/10" />
          <div className="blob delay2 absolute bottom-[-160px] left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-white/10" />
        </div>
        {children}
      </body>
    </html>
  );
}

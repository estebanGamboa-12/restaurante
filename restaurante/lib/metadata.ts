import type { Metadata } from "next";
import { SITE_URL } from "@/data/site";

const defaultImage = "https://images.unsplash.com/photo-1502998070258-dc1338445ac2?q=80&w=1200&auto=format&fit=crop";

type PageMetadataOptions = {
  title: string;
  description: string;
  path?: string;
  image?: string;
};

/**
 * Genera metadata completa para una página: title, description, openGraph y twitter.
 */
export function pageMetadata({
  title,
  description,
  path = "",
  image,
}: PageMetadataOptions): Metadata {
  const url = path ? `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}` : SITE_URL;
  const imageUrl = image ?? defaultImage;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: "Fuego & Brasa",
      images: [{ url: imageUrl, width: 1200, height: 630, alt: title }],
      locale: "es_ES",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

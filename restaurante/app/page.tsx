import type { Metadata } from "next";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";
import HomeClient from "@/components/HomeClient";

export const metadata: Metadata = pageMetadata({
  title: site.brand.seo.title,
  description: site.brand.seo.description,
  path: "/",
  image: site.hero?.heroImage,
});

export default function Page() {
  return <HomeClient site={site} />;
}

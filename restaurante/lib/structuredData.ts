/**
 * Genera el JSON-LD de tipo Restaurant según schema.org
 * https://schema.org/Restaurant
 */

type SiteContact = {
  address: string;
  phone: string;
  email?: string;
  hours: string;
  cuisine?: string;
};

type SiteBrand = {
  name: string;
  city?: string;
};

type SiteForStructuredData = {
  brand: SiteBrand;
  contact: SiteContact;
  links?: { maps?: string };
  hero?: { heroImage?: string };
};

/**
 * Convierte horario legible (ej. "Lun–Dom · 13:00–16:30 · 20:00–00:30")
 * a formato schema.org openingHours: Mo-Su 13:00-16:30, Mo-Su 20:00-00:30
 */
function parseOpeningHours(hours: string): string[] {
  // Formato típico: "Lun–Dom · 13:00–16:30 · 20:00–00:30"
  const match = hours.match(
    /(\w+)\s*[–-]\s*(\w+)\s*[·•]\s*(\d{1,2}:\d{2})\s*[–-]\s*(\d{1,2}:\d{2})\s*[·•]\s*(\d{1,2}:\d{2})\s*[–-]\s*(\d{1,2}:\d{2})/i
  );
  if (match) {
    const [, dayFrom, dayTo, open1, close1, open2, close2] = match;
    const dayMap: Record<string, string> = {
      lun: "Mo",
      mar: "Tu",
      mié: "We",
      mie: "We",
      jue: "Th",
      vie: "Fr",
      sáb: "Sa",
      sab: "Sa",
      dom: "Su",
    };
    const d1 = dayMap[dayFrom?.toLowerCase().slice(0, 3) ?? ""] ?? "Mo";
    const d2 = dayMap[dayTo?.toLowerCase().slice(0, 3) ?? ""] ?? "Su";
    const range = `${d1}-${d2}`;
    return [`${range} ${open1}-${close1}`, `${range} ${open2}-${close2}`];
  }
  // Fallback: Lun-Dom = Mo-Su
  if (hours.includes("13:00") && hours.includes("16:30")) {
    return ["Mo-Su 13:00-16:30", "Mo-Su 20:00-00:30"];
  }
  return [];
}

export function getRestaurantStructuredData(site: SiteForStructuredData) {
  const openingHours = parseOpeningHours(site.contact.hours);

  const address = site.contact.address;
  // Intentar separar calle y localidad (ej. "Calle Sierpes 18, Sevilla")
  const addressParts = address.split(",").map((s) => s.trim());
  const streetAddress = addressParts[0] ?? address;
  const addressLocality = addressParts.slice(1).join(", ") || undefined;

  const restaurant: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: site.brand.name,
    telephone: site.contact.phone,
    email: site.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress,
      addressLocality: addressLocality || site.brand.city,
      addressCountry: "ES",
    },
    openingHours: openingHours.length > 0 ? openingHours : undefined,
    servesCuisine: site.contact.cuisine || "Cocina a la brasa",
  };

  if (site.links?.maps) {
    restaurant.url = site.links.maps;
  }

  if (site.hero?.heroImage) {
    restaurant.image = site.hero.heroImage;
  }

  return restaurant;
}

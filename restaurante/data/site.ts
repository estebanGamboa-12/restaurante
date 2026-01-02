export const site = {
  brand: {
    name: "FUEGO & BRASA",
    city: "Madrid",
    tagline: "Cocina a la brasa. Sabor que se queda.",
    description:
      "Carne premium, verduras a la brasa y coctelería de autor. Reserva en 30 segundos y ven a comer como Dios manda.",
  },

  links: {
    whatsapp:
      "https://wa.me/34999000111?text=Hola%20Fuego%20%26%20Brasa%2C%20quiero%20reservar%20una%20mesa",
    instagram: "https://instagram.com/",
    maps:
      "https://www.google.com/maps?q=Calle+de+la+Rosa+24,+Madrid",
  },

  contact: {
    address: "Calle de la Rosa 24, Madrid",
    phone: "+34 999 000 111",
    email: "hola@fuegoybrasa.com",
    hours: "Lun–Dom · 13:00–16:30 · 20:00–00:30",
    notes: "Cocina abierta hasta las 23:30. Opciones veganas y sin gluten.",
    mapEmbedUrl:
      "https://www.google.com/maps?q=Calle%20de%20la%20Rosa%2024,%20Madrid&output=embed",
  },

  hero: {
    badges: ["Reserva en 30s", "Brasa real", "Cócteles top"],
    primaryCta: "Reservar por WhatsApp",
    secondaryCta: "Ver carta",
    heroImage:
      "https://images.unsplash.com/photo-1541542684-4bf98f785c25?auto=format&fit=crop&w=1600&q=80",
  },

  highlights: [
    {
      title: "Carne premium",
      text: "Cortes seleccionados, punto perfecto y jugosidad real.",
    },
    {
      title: "Brasa auténtica",
      text: "Sabor ahumado fino, sin disfrazar el producto.",
    },
    {
      title: "Coctelería de autor",
      text: "Clásicos y firma. Una experiencia completa.",
    },
  ],

  menu: {
    categories: ["Todos", "Entrantes", "Brasa", "Pasta", "Postres", "Bebidas"],
    items: [
      {
        name: "Croquetas cremosas (6u)",
        desc: "Jamón ibérico y bechamel suave con toque ahumado.",
        price: "9,50€",
        category: "Entrantes",
        spicy: false,
        veggie: false,
      },
      {
        name: "Ensalada de burrata",
        desc: "Tomate, albahaca, pesto suave y aceite premium.",
        price: "12,00€",
        category: "Entrantes",
        spicy: false,
        veggie: true,
      },
      {
        name: "Costillar BBQ de la casa",
        desc: "Cocción lenta + brasa final. Salsa casera.",
        price: "19,90€",
        category: "Brasa",
        spicy: true,
        veggie: false,
      },
      {
        name: "Entrecot a la brasa",
        desc: "350g, patata asada y chimichurri suave.",
        price: "22,50€",
        category: "Brasa",
        spicy: false,
        veggie: false,
      },
      {
        name: "Pasta trufada",
        desc: "Nata ligera, setas y parmesano.",
        price: "15,90€",
        category: "Pasta",
        spicy: false,
        veggie: true,
      },
      {
        name: "Cheesecake cremosa",
        desc: "Base crujiente, crema suave y coulis de frutos rojos.",
        price: "6,90€",
        category: "Postres",
        spicy: false,
        veggie: true,
      },
      {
        name: "Spritz Brasa",
        desc: "Aperol, cava, soda y twist cítrico.",
        price: "8,50€",
        category: "Bebidas",
        spicy: false,
        veggie: true,
      },
    ],
  },

  gallery: [
    "https://images.unsplash.com/photo-1555992336-03a23c92cf9a?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1529417305482-41dcb2f8ccfd?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1400&q=80",
  ],

  reviews: [
    {
      name: "Carla M.",
      text: "Brutal. La carne estaba perfecta y el servicio rapidísimo.",
      stars: 5,
    },
    {
      name: "Luis R.",
      text: "Ambiente top y cócteles increíbles. Volvemos fijo.",
      stars: 5,
    },
    {
      name: "Marta G.",
      text: "Carta clara, todo muy cuidado. La brasa se nota.",
      stars: 5,
    },
  ],
} as const;

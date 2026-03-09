/** URL base del sitio para Open Graph y canonical (sin barra final) */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://fuegoybrasa.com";

export const site = {
  siteUrl: SITE_URL,
  brand: {
    name: "FUEGO & BRASA",
    city: "Sevilla",
    tagline: "Brasa en Sevilla. Sabor que se queda.",
    description:
      "Brasa auténtica, producto premium y ambiente con encanto. Reserva fácil y sabor que se queda.",
    seo: {
      title: "Restaurante en Sevilla | Fuego & Brasa",
      description:
        "Restaurante en Sevilla con cocina a la brasa, platos recomendados y terraza. Reserva mesa y descubre la carta más deseada.",
    },
  },

  links: {
    whatsapp:
      "https://wa.me/34999000111?text=Hola%20Fuego%20%26%20Brasa%2C%20quiero%20reservar%20una%20mesa",
    instagram: "https://www.instagram.com/esteban.webdev/",
    maps:
      "https://www.google.com/maps?q=Calle+Sierpes+18,+Sevilla",
  },

  contact: {
    address: "Calle Sierpes 18, Sevilla",
    phone: "+34 000 000 000",
    email: "hola@fuegoybrasa.com",
    hours: "Lun–Dom · 13:00–16:30 · 20:00–00:30",
    /** Tipo de cocina para schema.org (servesCuisine) */
    cuisine: "Cocina a la brasa",
    notes: "Cocina abierta hasta las 23:30. Opciones veganas, sin gluten y terraza.",
    mapEmbedUrl:
      "https://www.google.com/maps/place/05270+El+Tiemblo,+%C3%81vila/@40.4126913,-4.5208344,14z/data=!3m1!4b1!4m6!3m5!1s0xd4051960470c0b9:0x55888abcc72c6f7e!8m2!3d40.4130828!4d-4.4993148!16s%2Fm%2F02z8y5q?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D",
  },

  hero: {
    badges: ["Restaurante en Sevilla", "Terraza y brasa real", "Platos recomendados"],
    primaryCta: "Reservar mesa",
    secondaryCta: "Ver carta completa",
    heroImage:
      "https://images.unsplash.com/photo-1502998070258-dc1338445ac2?q=80&w=679&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },

  brandStory: {
    statement:
      "Cocina con alma. Cada plato cuenta una historia de fuego, producto y tradición.",
    paragraph:
      "En Fuego & Brasa unimos la brasa de siempre con el ritmo de Sevilla. Sin prisas, con cuidado.",
  },

  chef: {
    name: "Marco Valle",
    role: "Chef y fundador",
    bio: "Más de quince años entre fogones y parrillas. Formado en cocina de producto y obsesionado con el punto de la carne y el humo justo. En Fuego & Brasa ha unido su pasado en restaurantes de autor con la cocina de barrio que siempre quiso hacer.",
    quote: "La brasa no perdona. O respetas el producto y el tiempo, o el plato te lo dice.",
    image:
      "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=800&auto=format&fit=crop",
  },

  values: [
    {
      title: "Ingredientes locales",
      text: "Trabajamos con productores y proveedores de la zona. Frescura, trazabilidad y apoyo al territorio.",
    },
    {
      title: "Brasa tradicional",
      text: "Fuego de leña, tiempos de cocción respetados y técnica que no esconde el sabor del producto.",
    },
    {
      title: "Cocina de temporada",
      text: "La carta evoluciona con el año. Lo que llega al plato depende de lo que la temporada nos ofrece.",
    },
  ],

  highlights: [
    {
      title: "Carne premium",
      text: "Cortes seleccionados, punto perfecto y jugosidad real.",
      image:
        "https://images.unsplash.com/photo-1558030006-450675393462?q=80&w=600&auto=format&fit=crop",
    },
    {
      title: "Brasa auténtica",
      text: "Sabor ahumado fino, sin disfrazar el producto.",
      image:
        "https://images.unsplash.com/photo-1529694157872-4e0c0f3b238b?q=80&w=600&auto=format&fit=crop",
    },
    {
      title: "Coctelería de autor",
      text: "Clásicos y firma. Una experiencia completa.",
      image:
        "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=600&auto=format&fit=crop",
    },
    {
      title: "Terraza en Sevilla",
      text: "Mesa al sol o interior con ambiente chill.",
      image:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=600&auto=format&fit=crop",
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
        image:
          "https://plus.unsplash.com/premium_photo-1661777692723-ba8dd05065d9?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        spicy: false,
        veggie: false,
        badge: "Más pedido",
      },
      {
        name: "Ensalada de burrata",
        desc: "Tomate, albahaca, pesto suave y aceite premium.",
        price: "12,00€",
        category: "Entrantes",
        image:
          "https://images.unsplash.com/photo-1457460866886-40ef8d4b42a0?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        spicy: false,
        veggie: true,
        badge: "Recomendado",
      },
      {
        name: "Costillar BBQ de la casa",
        desc: "Cocción lenta + brasa final. Salsa casera.",
        price: "19,90€",
        category: "Brasa",
        image:
          "https://images.unsplash.com/photo-1522906456132-bac22adad34e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        spicy: true,
        veggie: false,
        badge: "Recomendado",
      },
      {
        name: "Entrecot a la brasa",
        desc: "350g, patata asada y chimichurri suave.",
        price: "22,50€",
        category: "Brasa",
        image:
          "https://plus.unsplash.com/premium_photo-1678897742200-85f052d33a71?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        spicy: false,
        veggie: false,
        badge: "Más pedido",
      },
      {
        name: "Pasta trufada",
        desc: "Nata ligera, setas y parmesano.",
        price: "15,90€",
        category: "Pasta",
        image:
          "https://images.unsplash.com/photo-1652465485624-be97a5074683?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        spicy: false,
        veggie: true,
      },
      {
        name: "Cheesecake cremosa",
        desc: "Base crujiente, crema suave y coulis de frutos rojos.",
        price: "6,90€",
        category: "Postres",
        image:
          "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=1400&q=80",
        spicy: false,
        veggie: true,
        badge: "Recomendado",
      },
      {
        name: "Spritz Brasa",
        desc: "Aperol, cava, soda y twist cítrico.",
        price: "8,50€",
        category: "Bebidas",
        image:
          "https://images.unsplash.com/photo-1457460866886-40ef8d4b42a0?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        spicy: false,
        veggie: true,
      },
    ],
  },

  drinks: [
    {
      name: "Spritz Brasa",
      desc: "Aperol, cava, soda y twist cítrico. Nuestra firma.",
      image:
        "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=600&auto=format&fit=crop",
    },
    {
      name: "Gin Tonic de la casa",
      desc: "Ginebra premium, tónica artesanal y botánicos frescos.",
      image:
        "https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=600&auto=format&fit=crop",
    },
    {
      name: "Mojito clásico",
      desc: "Ron blanco, hierbabuena, lima, azúcar y soda.",
      image:
        "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?q=80&w=600&auto=format&fit=crop",
    },
    {
      name: "Vermut & naranja",
      desc: "Vermut rojo, bitter y piel de naranja. Aperitivo perfecto.",
      image:
        "https://images.unsplash.com/photo-1470337458703-46ed17530a5c?q=80&w=600&auto=format&fit=crop",
    },
  ],

  gallery: [
    "https://images.unsplash.com/photo-1555992336-03a23c92cf9a?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1529417305482-41dcb2f8ccfd?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1400&q=80",
    "https://plus.unsplash.com/premium_photo-1661883237884-263e8de8869b?q=80&w=1189&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
      stars: 4,
    },
    {
      name: "Marta G.",
      text: "Carta clara, todo muy cuidado. La brasa se nota.",
      stars: 5,
    },
  ],
} as const;

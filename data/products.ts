import type { Product, ProductVariant } from "@/types/product"

export const products: Product[] = [
  {
    id: "murrieta-j1",
    name: "Rifle Murrieta J1",
    shortDescription: "Diseño tradicional ideal para tiro de precisión a distancia",
    description:
      "El Murrieta J1 destaca por su diseño tradicional tipo carabina, ideal para usuarios que prefieren una estructura más larga y estable. Cada detalle ha sido cuidadosamente diseñado para ofrecer una experiencia de tiro incomparable, combinando la robustez con la precisión. Perfecto para tiro de precisión a distancia, este rifle representa la fusión perfecta entre tecnología avanzada y tradición artesanal.",
    price: 89999,
    category: "rifles",
    features: [
      "Diseño tradicional tipo carabina",
      "Cañón fabricado con maquinaria CZ",
      "Estructura larga y estable para mayor precisión",
      "Gatillo de dos tiempos ajustable",
      "Disponible en diferentes acabados de culata",
      "Armazón en negro o marrón con detalles dorados/bronce",
    ],
    specifications: {
      barrel: "Cañón estriado: 6-12 microestrías (fabricación propia), Longitud: 550mm",
      loadingMechanism: "Side Lever (palanca lateral para carga a repetición)",
      powerSystems: [
        "Doble Click para monotiro",
        "Regulador de potencia de martillo",
        "Regulador de válvula de potencia (opcional)",
        "Depósito 260cc con manómetro",
        "Coliza 11mm - 22mm para mira telescópica",
      ],
      trigger: "Con seguro y regulador",
      stock: "Artesanal en madera (tonalidades clara, media, oscura) o madera negra texturada",
      frame: "Recubrimiento: Pintura Microtexturado (Negro o Marrón)",
      accessories: [
        "Pico de carga (Aluminio con o-rings incluidos)",
        "Cuna monotiro (Plástico 3D)",
        "Cargador rotativo (Plástico 3D)",
        "Moderador (Aluminio)",
        "Culata con porta correa y cantonera de goma",
      ],
      weight: "3kg - 3.5kg",
      power: "950-1050 fps (200 bar), 700-750 fps (100 bar)",
      grouping: "30 disparos en un diámetro de 25mm a 35 metros",
    },
    gallery: ["/images/rifle-jp1-wood.jpeg", "/images/rifle-jp1-brown.jpeg", "/images/rifle-jp1-black.jpeg"],
    variants: [
      {
        id: "murrieta-j1-5.5",
        name: "Calibre 5.5mm",
        caliber: "5.5mm",
        price: 89999,
        stock: 15,
        velocity: "950-1050 fps (200 bar)",
        energy: "28 joules",
        autonomy: "30-35 disparos óptimos (200 bar)",
      },
      {
        id: "murrieta-j1-6.35",
        name: "Calibre 6.35mm",
        caliber: "6.35mm",
        price: 94999,
        stock: 10,
        velocity: "950-1050 fps (200 bar)",
        energy: "35 joules",
        autonomy: "25-30 disparos óptimos (200 bar)",
      },
      {
        id: "murrieta-j1-7.62",
        name: "Calibre 7.62mm",
        caliber: "7.62mm",
        price: 99999,
        stock: 8,
        velocity: "950-1050 fps (200 bar)",
        energy: "45 joules",
        autonomy: "10-15 disparos óptimos (200 bar)",
      },
    ],
  },
  {
    id: "murrieta-bullpup",
    name: "Rifle Murrieta BULLPUP",
    shortDescription: "Diseño compacto para mayor movilidad sin comprometer potencia",
    description:
      "El Murrieta BULLPUP está diseñado para aquellos que buscan un rifle más compacto y manejable. Su tamaño reducido lo hace ideal para situaciones que requieren mayor movilidad, sin comprometer la potencia ni la precisión del disparo. La combinación de materiales avanzados y tecnología de punta garantiza una precisión excepcional tiro tras tiro, incluso en las condiciones más exigentes.",
    price: 109999,
    category: "rifles",
    features: [
      "Diseño compacto tipo bullpup",
      "Mayor manejabilidad y movilidad",
      "Cañón fabricado con maquinaria CZ",
      "Sistema de recarga rápida",
      "Disponible en diferentes acabados de culata",
      "Armazón en negro o marrón con detalles dorados/bronce",
    ],
    specifications: {
      barrel: "Cañón estriado: 6-12 microestrías (fabricación propia), Longitud: 550mm",
      loadingMechanism: "Side Lever (palanca lateral para carga a repetición)",
      powerSystems: [
        "Doble Click para monotiro",
        "Regulador de potencia de martillo",
        "Regulador de válvula de potencia (opcional)",
        "Depósito 260cc con manómetro",
        "Coliza 11mm - 22mm para mira telescópica",
      ],
      trigger: "Con seguro y regulador",
      stock: "Artesanal en madera (tonalidades clara, media, oscura) o madera negra texturada",
      frame: "Recubrimiento: Pintura Microtexturado (Negro o Marrón)",
      accessories: [
        "Pico de carga (Aluminio con o-rings incluidos)",
        "Cuna monotiro (Plástico 3D)",
        "Cargador rotativo (Plástico 3D)",
        "Moderador (Aluminio)",
        "Culata con porta correa y cantonera de goma",
      ],
      weight: "3kg - 3.5kg",
      power: "950-1050 fps (200 bar), 700-750 fps (100 bar)",
      grouping: "30 disparos en un diámetro de 25mm a 35 metros",
    },
    gallery: ["/images/bullpup-wood.jpeg", "/images/bullpup-copper.jpeg", "/images/bullpup-silver.jpeg"],
    variants: [
      {
        id: "murrieta-bullpup-5.5",
        name: "Calibre 5.5mm",
        caliber: "5.5mm",
        price: 109999,
        stock: 12,
        velocity: "950-1050 fps (200 bar)",
        energy: "28 joules",
        autonomy: "30-35 disparos óptimos (200 bar)",
      },
      {
        id: "murrieta-bullpup-6.35",
        name: "Calibre 6.35mm",
        caliber: "6.35mm",
        price: 114999,
        stock: 8,
        velocity: "950-1050 fps (200 bar)",
        energy: "35 joules",
        autonomy: "25-30 disparos óptimos (200 bar)",
      },
      {
        id: "murrieta-bullpup-7.62",
        name: "Calibre 7.62mm",
        caliber: "7.62mm",
        price: 119999,
        stock: 5,
        velocity: "950-1050 fps (200 bar)",
        energy: "45 joules",
        autonomy: "10-15 disparos óptimos (200 bar)",
      },
    ],
  },
]

export const accessories = [
  {
    id: "mira-telescopica",
    name: "Mira Telescópica 4x32",
    description:
      "Mira telescópica de alta precisión con retícula iluminada. Cristales tratados con múltiples capas para una claridad excepcional.",
    price: 34999,
    category: "accesorios",
    image: "/images/product-3.jpeg",
  },
  {
    id: "kit-mantenimiento",
    name: "Kit de Mantenimiento Premium",
    description:
      "Todo lo necesario para mantener tu rifle en óptimas condiciones. Incluye aceites especiales, herramientas y paños de microfibra.",
    price: 12999,
    category: "accesorios",
    image: "/images/product-4.jpeg",
  },
]

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id)
}

export function getVariantById(productId: string, variantId: string): ProductVariant | undefined {
  const product = getProductById(productId)
  if (!product) return undefined
  return product.variants.find((variant) => variant.id === variantId)
}

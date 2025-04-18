import ProductsPageClient from "./ProductsPageClient"

export const metadata = {
  title: "Productos | J. Murrieta - Rifles de Aire Comprimido Premium",
  description:
    "Explora nuestra colección completa de rifles de aire comprimido y accesorios. Calidad y precisión en cada producto.",
}

export default function ProductsPage({ searchParams }: { searchParams: { categoria?: string; orden?: string } }) {
  return <ProductsPageClient searchParams={searchParams} />
}

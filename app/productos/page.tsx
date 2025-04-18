import { Suspense } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import WhatsappButton from "@/components/whatsapp-button"
import ProductCatalog from "@/components/product-catalog"
import ProductFilters from "@/components/product-filters"
import PageBanner from "@/components/page-banner"
import { CartProvider } from "@/components/cart-provider"

export const metadata = {
  title: "Productos | J. Murrieta - Rifles de Aire Comprimido Premium",
  description:
    "Explora nuestra colección completa de rifles de aire comprimido y accesorios. Calidad y precisión en cada producto.",
}

export default function ProductsPage({ searchParams }: { searchParams: { categoria?: string; orden?: string } }) {
  const categoria = searchParams.categoria || "todos"
  const orden = searchParams.orden || "destacados"

  return (
    <CartProvider>
      <div className="min-h-screen bg-black text-gray-100">
        <Navbar />
        <main className="pt-20">
          {/* Banner de la página */}
          <PageBanner
            title="Productos"
            subtitle="Nuestra Colección"
            description="Descubre nuestra selección de rifles de aire comprimido y accesorios, donde la artesanía se encuentra con la precisión."
            imageSrc="/images/product-1.jpeg"
          />

          {/* Catálogo de productos */}
          <section className="py-16 bg-black">
            <div className="container-custom">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Filtros */}
                <div className="lg:col-span-1">
                  <ProductFilters activeCategory={categoria} activeSort={orden} />
                </div>

                {/* Productos */}
                <div className="lg:col-span-3">
                  <Suspense fallback={<div className="text-center py-12">Cargando productos...</div>}>
                    <ProductCatalog category={categoria} sort={orden} />
                  </Suspense>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
        <WhatsappButton />
      </div>
    </CartProvider>
  )
}

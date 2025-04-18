"use client"

import { Suspense } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import WhatsappButton from "@/components/whatsapp-button"
import ProductCatalog from "@/components/product-catalog"
import ProductFilters from "@/components/product-filters"
import PageBanner from "@/components/page-banner"
import { CartProvider } from "@/components/cart-provider"
import { motion } from "framer-motion"

export default function ProductsPageClient({ searchParams }: { searchParams: { categoria?: string; orden?: string } }) {
  const categoria = searchParams.categoria || "todos"
  const orden = searchParams.orden || "destacados"

  // Variantes para animaciones
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

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
          <section className="py-16 bg-gradient-to-b from-black to-gray-900/80">
            <div className="container-custom">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.1,
                    },
                  },
                }}
                className="grid grid-cols-1 lg:grid-cols-4 gap-8"
              >
                {/* Filtros */}
                <motion.div variants={fadeInUp} className="lg:col-span-1">
                  <div className="sticky top-24">
                    <ProductFilters activeCategory={categoria} activeSort={orden} />
                  </div>
                </motion.div>

                {/* Productos */}
                <motion.div variants={fadeInUp} className="lg:col-span-3">
                  <Suspense
                    fallback={
                      <div className="text-center py-12 card-glass">
                        <div className="w-10 h-10 border-4 border-gold-500/30 border-t-gold-500 rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-gold-400 font-cinzel">Cargando productos...</p>
                      </div>
                    }
                  >
                    <ProductCatalog category={categoria} sort={orden} />
                  </Suspense>
                </motion.div>
              </motion.div>
            </div>
          </section>
        </main>
        <Footer />
        <WhatsappButton />
      </div>
    </CartProvider>
  )
}

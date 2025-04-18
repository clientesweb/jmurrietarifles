"use client"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import WhatsappButton from "@/components/whatsapp-button"
import { motion } from "framer-motion"
import ContactForm from "@/components/contact-form"
import ArmeriesMap from "@/components/armeries-map"
import ContactInfo from "@/components/contact-info"
import { CartProvider } from "@/components/cart-provider"
import PageBanner from "@/components/page-banner"

export default function ContactPageClient() {
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
            title="Contacto"
            subtitle="Estamos para ayudarte"
            description="Ponte en contacto con nosotros para cualquier consulta sobre nuestros productos o encuentra la armería más cercana donde adquirir rifles J. Murrieta."
            imageSrc="/images/product-4.jpeg"
          />

          {/* Sección de contacto */}
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
                className="grid grid-cols-1 lg:grid-cols-2 gap-12"
              >
                <motion.div variants={fadeInUp}>
                  <ContactForm />
                </motion.div>
                <motion.div variants={fadeInUp}>
                  <ContactInfo />
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* Mapa de armerías */}
          <section className="py-16 bg-gradient-to-b from-gray-900/80 to-black">
            <div className="container-custom">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-12"
              >
                <span className="inline-block text-gold-500 uppercase tracking-widest text-sm mb-3 font-cinzel">
                  Encuentra tu armería
                </span>
                <h2 className="text-3xl font-bold mb-6 font-cinzel gold-gradient">Distribuidores Oficiales</h2>
                <div className="w-20 h-px bg-gold-500/30 mx-auto mb-6" />
                <p className="text-gray-300 max-w-2xl mx-auto">
                  Descubre dónde puedes adquirir nuestros productos en todo el país. Nuestros distribuidores oficiales
                  te brindarán asesoramiento especializado.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <ArmeriesMap />
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

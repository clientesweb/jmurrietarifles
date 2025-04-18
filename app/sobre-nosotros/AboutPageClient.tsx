"use client"

import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import WhatsappButton from "@/components/whatsapp-button"
import Image from "next/image"
import { Award, Clock, Shield, Target, Users, Globe } from "lucide-react"
import { CartProvider } from "@/components/cart-provider"
import PageBanner from "@/components/page-banner"
import { motion } from "framer-motion"

export default function AboutPageClient() {
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

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
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
            title="Sobre Nosotros"
            subtitle="Nuestra Historia"
            description="Desde 1892, J. Murrieta ha sido sinónimo de excelencia en la fabricación de rifles de aire comprimido, combinando la tradición artesanal argentina con la más avanzada tecnología."
            imageSrc="/images/craftsmanship.jpeg"
          />

          {/* Historia */}
          <section className="py-16 bg-gradient-to-b from-black to-gray-900/80">
            <div className="container-custom">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
              >
                <motion.div variants={fadeInUp}>
                  <span className="inline-block text-gold-500 uppercase tracking-widest text-sm mb-3 font-cinzel">
                    Desde 2021
                  </span>
                  <h2 className="text-3xl font-bold mb-6 font-cinzel gold-gradient">Nuestra Historia</h2>
                  <div className="w-20 h-px bg-gold-500/30 mb-6" />
                  <div className="space-y-4 text-gray-300">
                    <p>
                      La historia de J. Murrieta comienza en 2021, cuando un grupo de apasionados por la precisión y la
                      artesanía estableció una empresa con la visión de revolucionar el diseño y rendimiento de los
                      rifles de aire comprimido PCP en Argentina. Su objetivo era crear rifles que no solo fueran
                      herramientas de precisión, sino también piezas únicas que reflejaran dedicación y perfección.
                    </p>
                    <p>
                      Desde sus inicios, J. Murrieta ha demostrado que la calidad y la robustez pueden coexistir con la
                      estética y la funcionalidad. La empresa ha logrado destacar en un mercado competitivo gracias a su
                      capacidad de combinar tecnología avanzada con un toque artesanal.
                    </p>
                    <p>
                      Hoy, J. Murrieta es reconocida por la fabricación propia de cañones con estriados realizados con
                      maquinarias CZ, estableciendo un estándar que inspira a otros en el sector. La empresa continúa
                      innovando y creando experiencias únicas para sus clientes.
                    </p>
                  </div>
                </motion.div>
                <motion.div variants={fadeInUp}>
                  <div className="relative h-[400px] md:h-[500px] card-glass overflow-hidden border border-gold-500/10">
                    <Image
                      src="/images/craftsmanship.jpeg"
                      alt="Artesano trabajando en un rifle J. Murrieta"
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent h-1/3" />
                    <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm p-3 rounded-sm border border-gold-500/20">
                      <p className="text-sm text-gold-400 font-cinzel">Taller de J. Murrieta, 2021</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* Valores */}
          <section className="py-16 bg-gradient-to-b from-gray-900/80 to-black">
            <div className="container-custom">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-12"
              >
                <span className="inline-block text-gold-500 uppercase tracking-widest text-sm mb-3 font-cinzel">
                  Lo que nos define
                </span>
                <h2 className="text-3xl font-bold mb-6 font-cinzel gold-gradient">Nuestros Valores</h2>
                <div className="w-20 h-px bg-gold-500/30 mx-auto mb-6" />
                <p className="text-gray-300 max-w-2xl mx-auto">
                  En J. Murrieta, nuestros valores fundamentales guían cada aspecto de nuestro trabajo, desde la
                  selección de materiales hasta el servicio al cliente.
                </p>
              </motion.div>

              <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                <motion.div variants={fadeInUp} whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
                  <div className="card-glass p-6 flex flex-col items-center text-center h-full border border-gold-500/10">
                    <Award className="h-12 w-12 mb-4 text-gold-500" aria-hidden="true" />
                    <h3 className="text-xl font-bold mb-2 font-cinzel">Excelencia</h3>
                    <p className="text-gray-400">
                      Nos comprometemos con los más altos estándares de calidad en cada etapa del proceso de
                      fabricación, garantizando productos excepcionales.
                    </p>
                  </div>
                </motion.div>

                <motion.div variants={fadeInUp} whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
                  <div className="card-glass p-6 flex flex-col items-center text-center h-full border border-gold-500/10">
                    <Clock className="h-12 w-12 mb-4 text-gold-500" aria-hidden="true" />
                    <h3 className="text-xl font-bold mb-2 font-cinzel">Tradición</h3>
                    <p className="text-gray-400">
                      Honramos las técnicas artesanales transmitidas a través de generaciones, preservando la esencia de
                      nuestra herencia.
                    </p>
                  </div>
                </motion.div>

                <motion.div variants={fadeInUp} whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
                  <div className="card-glass p-6 flex flex-col items-center text-center h-full border border-gold-500/10">
                    <Target className="h-12 w-12 mb-4 text-gold-500" aria-hidden="true" />
                    <h3 className="text-xl font-bold mb-2 font-cinzel">Precisión</h3>
                    <p className="text-gray-400">
                      Cada detalle cuenta. Nos esforzamos por la precisión tanto en nuestros productos como en nuestros
                      procesos.
                    </p>
                  </div>
                </motion.div>

                <motion.div variants={fadeInUp} whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
                  <div className="card-glass p-6 flex flex-col items-center text-center h-full border border-gold-500/10">
                    <Shield className="h-12 w-12 mb-4 text-gold-500" aria-hidden="true" />
                    <h3 className="text-xl font-bold mb-2 font-cinzel">Confiabilidad</h3>
                    <p className="text-gray-400">
                      Nuestros productos están diseñados para durar generaciones, respaldados por nuestra garantía y
                      servicio técnico.
                    </p>
                  </div>
                </motion.div>

                <motion.div variants={fadeInUp} whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
                  <div className="card-glass p-6 flex flex-col items-center text-center h-full border border-gold-500/10">
                    <Users className="h-12 w-12 mb-4 text-gold-500" aria-hidden="true" />
                    <h3 className="text-xl font-bold mb-2 font-cinzel">Comunidad</h3>
                    <p className="text-gray-400">
                      Valoramos la relación con nuestros clientes y la comunidad de tiradores, aprendiendo y creciendo
                      juntos.
                    </p>
                  </div>
                </motion.div>

                <motion.div variants={fadeInUp} whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
                  <div className="card-glass p-6 flex flex-col items-center text-center h-full border border-gold-500/10">
                    <Globe className="h-12 w-12 mb-4 text-gold-500" aria-hidden="true" />
                    <h3 className="text-xl font-bold mb-2 font-cinzel">Responsabilidad</h3>
                    <p className="text-gray-400">
                      Nos comprometemos con prácticas sostenibles y éticas en todos los aspectos de nuestra operación.
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* Equipo */}
          <section className="py-16 bg-gradient-to-b from-black to-gray-900/80">
            <div className="container-custom">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-12"
              >
                <span className="inline-block text-gold-500 uppercase tracking-widest text-sm mb-3 font-cinzel">
                  Nuestro Equipo
                </span>
                <h2 className="text-3xl font-bold mb-6 font-cinzel gold-gradient">Artesanos y Expertos</h2>
                <div className="w-20 h-px bg-gold-500/30 mx-auto mb-6" />
                <p className="text-gray-300 max-w-2xl mx-auto">
                  Detrás de cada rifle J. Murrieta hay un equipo de artesanos apasionados y expertos dedicados a la
                  excelencia.
                </p>
              </motion.div>

              <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                {[1, 2, 3, 4].map((index) => (
                  <motion.div key={index} variants={fadeInUp} whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
                    <div className="card-glass overflow-hidden border border-gold-500/10">
                      <div className="relative h-80">
                        <Image
                          src={`/placeholder.svg?height=320&width=240`}
                          alt={`Miembro del equipo ${index}`}
                          fill
                          className="object-cover transition-transform duration-700 hover:scale-105"
                        />
                      </div>
                      <div className="p-4 text-center">
                        <h3 className="font-bold mb-1 font-cinzel">Nombre Apellido</h3>
                        <p className="text-gold-500 text-sm mb-2">Maestro Artesano</p>
                        <p className="text-gray-400 text-sm">
                          Con más de 20 años de experiencia en la fabricación de rifles de precisión.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* Instalaciones */}
          <section className="py-16 bg-gradient-to-b from-gray-900/80 to-black">
            <div className="container-custom">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center mb-12"
              >
                <span className="inline-block text-gold-500 uppercase tracking-widest text-sm mb-3 font-cinzel">
                  Nuestras Instalaciones
                </span>
                <h2 className="text-3xl font-bold mb-6 font-cinzel gold-gradient">Donde Nace la Excelencia</h2>
                <div className="w-20 h-px bg-gold-500/30 mx-auto mb-6" />
                <p className="text-gray-300 max-w-2xl mx-auto">
                  Nuestro taller combina la tradición artesanal con tecnología de vanguardia para crear productos
                  excepcionales.
                </p>
              </motion.div>

              <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                <motion.div variants={fadeInUp} className="md:col-span-2">
                  <div className="card-glass overflow-hidden border border-gold-500/10">
                    <div className="relative h-80">
                      <Image
                        src="/images/workshop.jpeg"
                        alt="Taller de J. Murrieta"
                        fill
                        className="object-cover transition-transform duration-700 hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold mb-1 font-cinzel">Taller Principal</h3>
                      <p className="text-gray-400 text-sm">
                        Ubicado en el corazón de Córdoba, nuestro taller principal combina la tradición con la
                        innovación.
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={fadeInUp} className="space-y-6">
                  <div className="card-glass overflow-hidden border border-gold-500/10">
                    <div className="relative h-36">
                      <Image
                        src="/images/testing.jpeg"
                        alt="Área de pruebas"
                        fill
                        className="object-cover transition-transform duration-700 hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold mb-1 font-cinzel">Área de Pruebas</h3>
                      <p className="text-gray-400 text-sm">
                        Cada rifle es rigurosamente probado para garantizar su precisión y rendimiento.
                      </p>
                    </div>
                  </div>

                  <div className="card-glass overflow-hidden border border-gold-500/10">
                    <div className="relative h-36">
                      <Image
                        src="/images/craftsmanship.jpeg"
                        alt="Showroom"
                        fill
                        className="object-cover transition-transform duration-700 hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold mb-1 font-cinzel">Showroom</h3>
                      <p className="text-gray-400 text-sm">
                        Visita nuestro showroom para conocer y probar nuestra colección completa.
                      </p>
                    </div>
                  </div>
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

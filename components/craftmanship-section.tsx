"use client"

import { useEffect } from "react"
import Image from "next/image"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function CraftmanshipSection() {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
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
    <section className="py-24 bg-gradient-to-b from-gray-900 to-black">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-amber-400 uppercase tracking-widest text-sm mb-3 font-cinzel">
            Nuestra Artesanía
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white font-cinzel">
            Tradición e Innovación
          </h2>
          <div className="w-20 h-px bg-white/20 mx-auto mb-6" />
          <p className="text-gray-300 max-w-2xl mx-auto">
            Cada rifle J. Murrieta es el resultado de un meticuloso proceso artesanal combinado con tecnología de
            vanguardia, creando piezas únicas de rendimiento excepcional.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          <motion.div variants={itemVariants} className="order-2 lg:order-1">
            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-white font-cinzel">
              Excelencia en Cada <span className="text-amber-400">Detalle</span>
            </h3>
            <p className="text-gray-300 mb-6">
              En J. Murrieta, cada rifle es sometido a rigurosos procesos de fabricación, utilizando maquinaria CNC en
              sus mecanizados y CZ para la creación de los Cañones Estriados, garantizando una precisión y rendimiento
              excepcionales.
            </p>
            <p className="text-gray-300 mb-8">
              Nuestro compromiso con la calidad se refleja en cada componente, desde la selección de materiales premium
              hasta el acabado final, asegurando que cada rifle no solo sea una herramienta de precisión, sino también
              una obra de arte.
            </p>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="bg-black/30 p-6 rounded-lg border border-gold-500/10">
                <div className="text-3xl font-bold text-amber-400 mb-2">30+</div>
                <p className="text-gray-400 text-sm">Años de experiencia combinada</p>
              </div>
              <div className="bg-black/30 p-6 rounded-lg border border-gold-500/10">
                <div className="text-3xl font-bold text-amber-400 mb-2">100%</div>
                <p className="text-gray-400 text-sm">Fabricación argentina</p>
              </div>
            </div>

            <Link href="/sobre-nosotros">
              <Button className="bg-amber-400 hover:bg-amber-500 text-black rounded-full px-8 py-6">
                Conocer Nuestra Historia
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>

          <motion.div variants={itemVariants} className="order-1 lg:order-2">
            <div className="relative">
              <div className="relative h-[500px] rounded-lg overflow-hidden">
                <Image
                  src="/images/craftsmanship.jpeg"
                  alt="Artesano trabajando en un rifle J. Murrieta"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              </div>

              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-black p-4 rounded-lg border border-gold-500/20 shadow-xl">
                <Image
                  src="/images/rifle-detail.jpeg"
                  alt="Detalle de rifle J. Murrieta"
                  fill
                  className="object-cover rounded-lg"
                  sizes="192px"
                />
              </div>

              <div className="absolute -top-6 -left-6 bg-black p-3 rounded-lg border border-gold-500/20 shadow-xl">
                <div className="text-amber-400 font-cinzel text-lg font-bold">Desde 2021</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

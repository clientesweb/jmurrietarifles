"use client"

import { useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ShoppingBag, Phone } from "lucide-react"

export default function CTASection() {
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
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
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
    <section className="py-24 bg-black relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.2) 2px, transparent 0)",
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="bg-gradient-to-br from-gray-900 to-black p-12 rounded-lg border border-gold-500/20 shadow-xl text-center"
        >
          <motion.div variants={itemVariants}>
            <span className="inline-block text-amber-400 uppercase tracking-widest text-sm mb-3 font-cinzel">
              Eleva Tu Experiencia
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white font-cinzel">
              ¿Listo para la <span className="text-amber-400">Precisión</span>?
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto mb-10">
              Descubre la diferencia J. Murrieta en tu próxima experiencia de tiro. Nuestros rifles combinan artesanía
              tradicional con tecnología de vanguardia para ofrecerte precisión inigualable y un rendimiento
              excepcional.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/productos">
              <Button className="bg-amber-400 hover:bg-amber-500 text-black rounded-full px-8 py-6 min-w-[200px]">
                <ShoppingBag className="mr-2 h-5 w-5" />
                Ver Catálogo
              </Button>
            </Link>
            <Link href="/contacto">
              <Button
                variant="outline"
                className="border-gold-500/40 text-gold-400 hover:bg-gold-500/10 rounded-full px-8 py-6 min-w-[200px]"
              >
                <Phone className="mr-2 h-5 w-5" />
                Contactar
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

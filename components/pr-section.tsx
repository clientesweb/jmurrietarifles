"use client"

import { useEffect } from "react"
import Image from "next/image"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function PRSection() {
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
    <section className="py-24 bg-black">
      <div className="container-custom">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          <motion.div variants={itemVariants} className="order-2 lg:order-1">
            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-white font-cinzel">
              Diseño y <span className="text-amber-400">Rendimiento</span>
            </h3>
            <p className="text-gray-300 mb-6">
              Cada rifle J. Murrieta es una obra de arte en sí mismo, combinando la estética con la funcionalidad.
              Nuestros diseños están pensados para ofrecer una experiencia de tiro superior, con un equilibrio perfecto
              entre potencia y precisión.
            </p>
            <p className="text-gray-300 mb-8">
              Desde la culata ergonómica hasta el cañón de alta precisión, cada detalle ha sido cuidadosamente
              considerado para garantizar un rendimiento excepcional en cada disparo.
            </p>

            <Link href="/productos">
              <Button className="bg-amber-400 hover:bg-amber-500 text-black rounded-full px-8 py-6">
                Descubrir Modelos
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>

          <motion.div variants={itemVariants} className="order-1 lg:order-2">
            <div className="relative">
              <div className="relative h-[500px] rounded-lg overflow-hidden">
                <Image
                  src="/images/product-1.jpeg"
                  alt="Rifle J. Murrieta Premium"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

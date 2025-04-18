"use client"

import { useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Target, Award, Gauge, PenToolIcon as Tool } from "lucide-react"

const features = [
  {
    icon: <Target className="h-8 w-8 text-amber-400" />,
    title: "Precisión Excepcional",
    description:
      "Agrupación de 30 disparos en un diámetro de 25mm a 35 metros, garantizando una precisión inigualable en cada disparo.",
  },
  {
    icon: <Award className="h-8 w-8 text-amber-400" />,
    title: "Materiales de Alta Calidad",
    description:
      "Fabricados con materiales meticulosamente seleccionados, garantizando una durabilidad superior y resistencia en diversas condiciones.",
  },
  {
    icon: <Gauge className="h-8 w-8 text-amber-400" />,
    title: "Potencia Regulable",
    description:
      "Sistema con regulador de potencia de martillo y válvula opcional, permitiendo ajustar la potencia según tus necesidades.",
  },
  {
    icon: <Tool className="h-8 w-8 text-amber-400" />,
    title: "Fabricación Propia",
    description:
      "Cañones con 6-12 microestrías fabricados con maquinaria CZ, asegurando la máxima calidad y precisión en cada disparo.",
  },
]

export default function FeaturesSection() {
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
    <section id="caracteristicas" className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-amber-400 uppercase tracking-widest text-sm mb-3 font-cinzel">
            Lo Que Nos Distingue
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white font-cinzel">
            Filosofía de Excelencia
          </h2>
          <div className="w-20 h-px bg-white/20 mx-auto mb-6" />
          <p className="text-gray-300 max-w-2xl mx-auto">
            Nuestros rifles de aire comprimido PCP combinan tecnología avanzada con un toque artesanal, creando piezas
            únicas de rendimiento excepcional que nos distinguen en la industria argentina.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-lg border border-gold-500/10 shadow-xl hover:shadow-gold-500/5 transition-all duration-500 hover:-translate-y-1"
            >
              <div className="bg-gradient-to-br from-amber-500/20 to-amber-700/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6 shadow-inner">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

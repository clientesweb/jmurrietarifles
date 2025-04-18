"use client"

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

export default function Features() {
  return (
    <section id="caracteristicas" className="section-padding bg-black">
      <div className="container-custom">
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block text-amber-400 uppercase tracking-widest text-sm mb-3 font-cinzel">
            Lo Que Nos Distingue
          </span>
          <h2 className="heading-lg mb-4 text-white font-cinzel">Filosofía de Excelencia</h2>
          <div className="w-20 h-px bg-white/20 mx-auto mb-6" />
          <p className="text-gray-300 max-w-2xl mx-auto">
            Nuestros rifles de aire comprimido PCP combinan tecnología avanzada con un toque artesanal, creando piezas
            únicas de rendimiento excepcional que nos distinguen en la industria argentina.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="card-glass p-6 text-center transition-all duration-300 hover:border-white/30 hover:shadow-lg"
            >
              <div className="flex justify-center mb-6">
                <div className="p-4 rounded-full bg-white/5 border border-white/10">{feature.icon}</div>
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

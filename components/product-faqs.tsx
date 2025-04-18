"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

interface FAQ {
  question: string
  answer: string
}

const defaultFaqs: FAQ[] = [
  {
    question: "¿Cuál es el alcance efectivo de los rifles?",
    answer:
      "El alcance efectivo varía según el modelo y calibre. En general, nuestros rifles de aire comprimido tienen un alcance efectivo de entre 50-100 metros para el calibre 4.5mm, 60-120 metros para el 5.5mm y 70-130 metros para el 6.35mm, dependiendo de las condiciones ambientales y la pericia del tirador.",
  },
  {
    question: "¿Qué tipo de mantenimiento requieren los rifles?",
    answer:
      "Recomendamos una limpieza básica después de cada uso, lubricación de las partes móviles cada 500 disparos aproximadamente, y una revisión completa por un técnico especializado una vez al año. Cada rifle viene con un manual detallado de mantenimiento y un kit básico de limpieza.",
  },
  {
    question: "¿Ofrecen garantía para sus productos?",
    answer:
      "Sí, todos nuestros rifles cuentan con una garantía de 2 años contra defectos de fabricación. Además, ofrecemos un servicio de mantenimiento de por vida con costos preferenciales para los propietarios de rifles J. Murrieta.",
  },
  {
    question: "¿Es necesario tener licencia para adquirir estos rifles?",
    answer:
      "La regulación varía según el país y la región. En Argentina, los rifles de aire comprimido de hasta cierta potencia no requieren licencia especial. Sin embargo, recomendamos consultar la legislación local antes de realizar su compra. Podemos asesorarlo sobre los requisitos específicos de su ubicación.",
  },
  {
    question: "¿Realizan envíos internacionales?",
    answer:
      "Sí, realizamos envíos a nivel internacional. Los costos y tiempos de entrega varían según el destino. Para envíos internacionales, es responsabilidad del comprador verificar las regulaciones de importación de armas de aire comprimido en su país.",
  },
]

export default function ProductFAQs({ faqs = defaultFaqs }: { faqs?: FAQ[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="w-full">
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="card-glass overflow-hidden transition-all duration-300">
            <button
              className="flex items-center justify-between w-full p-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
              onClick={() => toggleFAQ(index)}
              aria-expanded={openIndex === index}
              aria-controls={`faq-answer-${index}`}
            >
              <span className="font-medium text-white">{faq.question}</span>
              <ChevronDown
                className={`h-5 w-5 text-amber-400 transition-transform duration-300 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              id={`faq-answer-${index}`}
              className={`overflow-hidden transition-all duration-300 ${
                openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="p-4 pt-0 text-gray-300 border-t border-white/10">{faq.answer}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 card-glass p-6">
        <h3 className="text-xl font-bold mb-4 text-white">¿Tienes más preguntas?</h3>
        <p className="text-gray-300 mb-4">
          No dudes en contactarnos si tienes alguna pregunta adicional sobre nuestros productos o servicios.
        </p>
        <div className="flex items-center text-amber-400">
          <span className="mr-2">Contáctanos:</span>
          <a href="mailto:info@jmurrieta.com" className="hover:underline">
            info@jmurrieta.com
          </a>
        </div>
      </div>
    </div>
  )
}

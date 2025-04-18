"use client"

import { useState, useEffect } from "react"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "react-intersection-observer"

const testimonials = [
  {
    id: "1",
    name: "Miguel Sánchez",
    role: "Tirador Profesional",
    content:
      "Los rifles J. Murrieta han revolucionado mi experiencia de tiro. La precisión y calidad de construcción son incomparables. Después de años probando diferentes marcas, finalmente encontré la perfección.",
    rating: 5,
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "2",
    name: "Carolina Gutiérrez",
    role: "Cazadora Deportiva",
    content:
      "Después de probar muchas marcas, finalmente encontré en J. Murrieta el equilibrio perfecto entre rendimiento y elegancia. La atención al detalle es impresionante y el servicio al cliente excepcional.",
    rating: 5,
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: "3",
    name: "Roberto Méndez",
    role: "Coleccionista",
    content:
      "La atención al detalle en cada rifle es impresionante. Son verdaderas obras de arte que también ofrecen un rendimiento excepcional. Mi colección de J. Murrieta es mi mayor orgullo.",
    rating: 5,
    image: "/placeholder.svg?height=80&width=80",
  },
]

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  })

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (inView) {
        nextTestimonial()
      }
    }, 8000)

    return () => clearInterval(interval)
  }, [inView])

  return (
    <section id="testimonios" className="py-24 bg-gradient-to-b from-black to-gray-900">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-amber-400 uppercase tracking-widest text-sm mb-3 font-cinzel">
            Lo Que Dicen Nuestros Clientes
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white font-cinzel">Experiencias</h2>
          <div className="w-20 h-px bg-white/20 mx-auto mb-6" />
          <p className="text-gray-300 max-w-2xl mx-auto">
            Descubre por qué los tiradores más exigentes eligen J. Murrieta para sus rifles de aire comprimido.
          </p>
        </motion.div>

        <div ref={ref} className="relative max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-gray-900 to-black p-8 md:p-12 rounded-lg border border-gold-500/10 shadow-xl">
            <div className="absolute top-0 left-0 transform -translate-x-6 -translate-y-6">
              <div className="text-6xl text-amber-400/20 font-serif">"</div>
            </div>

            <div className="absolute bottom-0 right-0 transform translate-x-6 translate-y-6">
              <div className="text-6xl text-amber-400/20 font-serif">"</div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <div className="flex justify-center mb-6">
                  <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-amber-400">
                    <img
                      src={testimonials[activeIndex].image || "/placeholder.svg"}
                      alt={testimonials[activeIndex].name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>

                <p className="text-xl md:text-2xl text-white mb-8 italic leading-relaxed">
                  {testimonials[activeIndex].content}
                </p>

                <div className="flex flex-col items-center">
                  <div className="flex mb-4">
                    {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="font-bold text-xl mb-1 text-white">{testimonials[activeIndex].name}</p>
                  <p className="text-amber-400 text-sm uppercase tracking-wider">{testimonials[activeIndex].role}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeIndex === index ? "bg-amber-400 scale-125" : "bg-white/30"
                }`}
                aria-label={`Ver testimonio ${index + 1} de ${testimonials.length}`}
              />
            ))}
          </div>

          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 bg-black/30 backdrop-blur-sm rounded-full h-10 w-10 hidden md:flex border border-white/10"
            onClick={prevTestimonial}
            aria-label="Testimonio anterior"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 bg-black/30 backdrop-blur-sm rounded-full h-10 w-10 hidden md:flex border border-white/10"
            onClick={nextTestimonial}
            aria-label="Testimonio siguiente"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}

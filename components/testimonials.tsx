"use client"

import { useState } from "react"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const testimonials = [
  {
    id: "1",
    name: "Miguel Sánchez",
    role: "Tirador Profesional",
    content:
      "Los rifles J. Murrieta han revolucionado mi experiencia de tiro. La precisión y calidad de construcción son incomparables. Después de años probando diferentes marcas, finalmente encontré la perfección.",
    rating: 5,
  },
  {
    id: "2",
    name: "Carolina Gutiérrez",
    role: "Cazadora Deportiva",
    content:
      "Después de probar muchas marcas, finalmente encontré en J. Murrieta el equilibrio perfecto entre rendimiento y elegancia. La atención al detalle es impresionante y el servicio al cliente excepcional.",
    rating: 5,
  },
  {
    id: "3",
    name: "Roberto Méndez",
    role: "Coleccionista",
    content:
      "La atención al detalle en cada rifle es impresionante. Son verdaderas obras de arte que también ofrecen un rendimiento excepcional. Mi colección de J. Murrieta es mi mayor orgullo.",
    rating: 5,
  },
]

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section id="testimonios" className="section-padding bg-gradient-to-b from-gray-900 to-black">
      <div className="container-custom">
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block text-amber-400 uppercase tracking-widest text-sm mb-3 font-cinzel">
            Lo Que Dicen Nuestros Clientes
          </span>
          <h2 className="heading-lg mb-4 text-white font-cinzel">Experiencias</h2>
          <div className="w-20 h-px bg-white/20 mx-auto mb-6" />
          <p className="text-gray-300 max-w-2xl mx-auto">
            Descubre por qué los tiradores más exigentes eligen J. Murrieta para sus rifles de aire comprimido.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="card-glass p-8 md:p-12 text-center">
            <div className="flex justify-center mb-8">
              <div className="text-amber-400 text-5xl font-serif">"</div>
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
              <p className="font-bold text-xl mb-1">{testimonials[activeIndex].name}</p>
              <p className="text-gray-400 text-sm uppercase tracking-wider">{testimonials[activeIndex].role}</p>
            </div>
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
            variant="ghost"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 bg-black/30 backdrop-blur-sm rounded-full h-10 w-10 hidden md:flex border border-white/10"
            onClick={prevTestimonial}
            aria-label="Testimonio anterior"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
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

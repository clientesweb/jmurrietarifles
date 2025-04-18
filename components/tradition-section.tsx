"use client"

import { useState } from "react"
import { Award, Clock, Shield } from "lucide-react"
import ImageSlider from "./image-slider"

export default function TraditionSection() {
  const [isLoaded, setIsLoaded] = useState(false)

  const handleIframeLoad = () => {
    setIsLoaded(true)
  }

  const sliderImages = [
    {
      src: "/images/j1-gera-1.jpeg",
      alt: "Persona apuntando con rifle J. Murrieta",
    },
    {
      src: "/images/j1-gera-2.jpeg",
      alt: "Personas practicando con rifle J. Murrieta junto al lago",
    },
  ]

  return (
    <section className="section-padding bg-gradient-to-b from-black to-gray-900" id="tradicion">
      <div className="container-custom">
        {/* Encabezado de la sección */}
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block text-amber-400 uppercase tracking-widest text-sm mb-3 font-cinzel">
            Nuestra Historia
          </span>
          <h2 className="heading-lg mb-4 text-white font-cinzel">Tradición e Innovación</h2>
          <div className="w-20 h-px bg-white/20 mx-auto mb-6" />
          <p className="text-gray-300 max-w-2xl mx-auto">
            J. Murrieta representa la fusión perfecta entre innovación tecnológica y tradición artesanal. Nuestros
            rifles de aire comprimido PCP son más que herramientas, son una prueba de que la dedicación a la calidad y
            el diseño puede llevar a la excelencia.
          </p>
        </div>

        {/* Contenido principal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Video */}
          <div className="card-glass overflow-hidden">
            <div className="relative aspect-video">
              {!isLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <div className="w-10 h-10 border-4 border-gray-600 border-t-white rounded-full animate-spin"></div>
                </div>
              )}
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/gDWtKd-sA0Y?rel=0&showinfo=0&autoplay=0"
                title="Tradiciones Argentinas - Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                onLoad={handleIframeLoad}
                className={`absolute inset-0 w-full h-full ${
                  isLoaded ? "opacity-100" : "opacity-0"
                } transition-opacity duration-500`}
              ></iframe>
            </div>
          </div>

          {/* Contenido de texto e imagen */}
          <div className="flex flex-col space-y-6">
            <div className="card-glass p-6">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                {/* Reemplazamos la imagen estática con el slider */}
                <div className="relative w-full md:w-1/3 aspect-square rounded-sm overflow-hidden">
                  <ImageSlider images={sliderImages} autoPlay={true} interval={4000} />
                </div>
                <div className="md:w-2/3">
                  <h3 className="heading-sm mb-3 gold-text font-cinzel">Excelencia e Innovación</h3>
                  <p className="text-body-sm text-gray-300">
                    Cada modelo PCP es sometido a rigurosos procesos de fabricación, utilizando maquinaria CNC en sus
                    mecanizados y CZ para la creación de los Cañones Estriados, garantizando una precisión y rendimiento
                    excepcionales.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="card-glass p-4 flex flex-col items-center text-center">
                <Award className="h-8 w-8 mb-3 text-amber-400" aria-hidden="true" />
                <h4 className="font-medium mb-1 font-cinzel">Calidad Premium</h4>
                <p className="text-xs text-gray-400">Materiales seleccionados</p>
              </div>
              <div className="card-glass p-4 flex flex-col items-center text-center">
                <Clock className="h-8 w-8 mb-3 text-amber-400" aria-hidden="true" />
                <h4 className="font-medium mb-1 font-cinzel">Desde 2021</h4>
                <p className="text-xs text-gray-400">Innovación constante</p>
              </div>
              <div className="card-glass p-4 flex flex-col items-center text-center">
                <Shield className="h-8 w-8 mb-3 text-amber-400" aria-hidden="true" />
                <h4 className="font-medium mb-1 font-cinzel">Diseño único</h4>
                <p className="text-xs text-gray-400">Estética y funcionalidad</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Award, Target } from "lucide-react"

export default function PromoBanner() {
  return (
    <section className="py-16 bg-black">
      <div className="container-custom">
        <div className="relative overflow-hidden rounded-sm">
          <div className="relative w-full h-[300px] sm:h-[350px] md:h-[450px]">
            <Image
              src="/images/product-1.jpeg"
              alt="Rifle de precisión J. Murrieta con mira telescópica"
              fill
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-black/60 md:from-black/90 md:via-black/70 md:to-black/50" />
          </div>

          <div className="absolute inset-0 flex flex-col justify-center px-4 sm:px-6 md:px-12">
            <div className="max-w-xl">
              <span className="inline-block text-amber-400 uppercase tracking-widest text-xs sm:text-sm mb-2 sm:mb-3">
                Nueva Colección 2023
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-white">
                Precisión Inigualable
              </h2>

              <p className="text-gray-200 mb-4 sm:mb-6 text-sm sm:text-base">
                Descubre nuestra nueva línea de rifles con miras telescópicas de alta definición, diseñados para el
                tirador que exige perfección en cada disparo.
              </p>

              <div className="flex flex-wrap gap-2 sm:gap-4 mb-4 sm:mb-8">
                <div className="flex items-center bg-black/40 backdrop-blur-sm px-3 py-1 sm:px-4 sm:py-2 rounded-sm border border-white/10">
                  <Award className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2 text-amber-400" aria-hidden="true" />
                  <span className="text-xs sm:text-sm text-gray-300">Calidad Premium</span>
                </div>
                <div className="flex items-center bg-black/40 backdrop-blur-sm px-3 py-1 sm:px-4 sm:py-2 rounded-sm border border-white/10">
                  <Target className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2 text-amber-400" aria-hidden="true" />
                  <span className="text-xs sm:text-sm text-gray-300">Máxima Precisión</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 sm:gap-4">
                <Link href="/#productos">
                  <Button className="btn-primary group text-xs sm:text-sm py-2 sm:py-3 px-4 sm:px-6">
                    <span>EXPLORAR AHORA</span>
                    <ArrowRight className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link href="/#caracteristicas">
                  <Button variant="outline" className="btn-secondary text-xs sm:text-sm py-2 sm:py-3 px-4 sm:px-6">
                    CONOCER MÁS
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

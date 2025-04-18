import Image from "next/image"

interface PageBannerProps {
  title: string
  subtitle?: string
  description?: string
  imageSrc: string
}

export default function PageBanner({ title, subtitle, description, imageSrc }: PageBannerProps) {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Imagen de fondo */}
      <div className="absolute inset-0 z-0">
        <Image
          src={imageSrc || "/placeholder.svg"}
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A]/90 via-[#1A1A1A]/70 to-[#1A1A1A]/90" />
      </div>

      {/* Contenido */}
      <div className="relative z-10 container-custom">
        <div className="text-center max-w-3xl mx-auto">
          {subtitle && (
            <span className="inline-block text-amber-400 uppercase tracking-widest text-sm mb-3 font-cinzel">
              {subtitle}
            </span>
          )}
          <h1 className="text-3xl md:text-5xl font-bold mb-6 font-playfair text-parchment-500">{title}</h1>
          <div className="w-20 h-px bg-gold-500/30 mx-auto mb-6" />
          {description && <p className="text-parchment-300 max-w-2xl mx-auto text-lg">{description}</p>}
        </div>
      </div>
    </section>
  )
}

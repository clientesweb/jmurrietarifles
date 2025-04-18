import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import WhatsappButton from "@/components/whatsapp-button"
import Image from "next/image"
import { Award, Clock, Shield, Target, Users, Globe } from "lucide-react"
import { CartProvider } from "@/components/cart-provider"
import PageBanner from "@/components/page-banner"

export const metadata = {
  title: "Sobre Nosotros | J. Murrieta - Rifles de Aire Comprimido Premium",
  description:
    "Conoce la historia y valores de J. Murrieta, fabricantes de rifles de aire comprimido premium desde 1892.",
}

export default function AboutPage() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-black text-gray-100">
        <Navbar />
        <main className="pt-20">
          {/* Banner de la página */}
          <PageBanner
            title="Sobre Nosotros"
            subtitle="Nuestra Historia"
            description="Desde 1892, J. Murrieta ha sido sinónimo de excelencia en la fabricación de rifles de aire comprimido, combinando la tradición artesanal argentina con la más avanzada tecnología."
            imageSrc="/images/craftsmanship.jpeg"
          />

          {/* Historia */}
          <section className="py-16 bg-black">
            <div className="container-custom">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <span className="inline-block text-amber-400 uppercase tracking-widest text-sm mb-3">Desde 1892</span>
                  <h2 className="text-3xl font-bold mb-6 font-playfair">Nuestra Historia</h2>
                  <div className="w-20 h-px bg-white/20 mb-6" />
                  <div className="space-y-4 text-gray-300">
                    <p>
                      La historia de J. Murrieta comienza en 2021, cuando un grupo de apasionados por la precisión y la
                      artesanía estableció una empresa con la visión de revolucionar el diseño y rendimiento de los
                      rifles de aire comprimido PCP en Argentina. Su objetivo era crear rifles que no solo fueran
                      herramientas de precisión, sino también piezas únicas que reflejaran dedicación y perfección.
                    </p>
                    <p>
                      Desde sus inicios, J. Murrieta ha demostrado que la calidad y la robustez pueden coexistir con la
                      estética y la funcionalidad. La empresa ha logrado destacar en un mercado competitivo gracias a su
                      capacidad de combinar tecnología avanzada con un toque artesanal.
                    </p>
                    <p>
                      Hoy, J. Murrieta es reconocida por la fabricación propia de cañones con estriados realizados con
                      maquinarias CZ, estableciendo un estándar que inspira a otros en el sector. La empresa continúa
                      innovando y creando experiencias únicas para sus clientes.
                    </p>
                  </div>
                </div>
                <div className="relative h-[400px] md:h-[500px] card-glass overflow-hidden">
                  <Image
                    src="/images/craftsmanship.jpeg"
                    alt="Artesano trabajando en un rifle J. Murrieta"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent h-1/3" />
                  <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm p-3 rounded-sm">
                    <p className="text-sm text-gray-300">Taller de J. Murrieta, circa 1920</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Valores */}
          <section className="py-16 bg-gradient-to-b from-black to-gray-900">
            <div className="container-custom">
              <div className="text-center mb-12">
                <span className="inline-block text-amber-400 uppercase tracking-widest text-sm mb-3">
                  Lo que nos define
                </span>
                <h2 className="text-3xl font-bold mb-6 font-playfair">Nuestros Valores</h2>
                <div className="w-20 h-px bg-white/20 mx-auto mb-6" />
                <p className="text-gray-300 max-w-2xl mx-auto">
                  En J. Murrieta, nuestros valores fundamentales guían cada aspecto de nuestro trabajo, desde la
                  selección de materiales hasta el servicio al cliente.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="card-glass p-6 flex flex-col items-center text-center">
                  <Award className="h-12 w-12 mb-4 text-amber-400" aria-hidden="true" />
                  <h3 className="text-xl font-bold mb-2">Excelencia</h3>
                  <p className="text-gray-400">
                    Nos comprometemos con los más altos estándares de calidad en cada etapa del proceso de fabricación,
                    garantizando productos excepcionales.
                  </p>
                </div>

                <div className="card-glass p-6 flex flex-col items-center text-center">
                  <Clock className="h-12 w-12 mb-4 text-amber-400" aria-hidden="true" />
                  <h3 className="text-xl font-bold mb-2">Tradición</h3>
                  <p className="text-gray-400">
                    Honramos las técnicas artesanales transmitidas a través de generaciones, preservando la esencia de
                    nuestra herencia.
                  </p>
                </div>

                <div className="card-glass p-6 flex flex-col items-center text-center">
                  <Target className="h-12 w-12 mb-4 text-amber-400" aria-hidden="true" />
                  <h3 className="text-xl font-bold mb-2">Precisión</h3>
                  <p className="text-gray-400">
                    Cada detalle cuenta. Nos esforzamos por la precisión tanto en nuestros productos como en nuestros
                    procesos.
                  </p>
                </div>

                <div className="card-glass p-6 flex flex-col items-center text-center">
                  <Shield className="h-12 w-12 mb-4 text-amber-400" aria-hidden="true" />
                  <h3 className="text-xl font-bold mb-2">Confiabilidad</h3>
                  <p className="text-gray-400">
                    Nuestros productos están diseñados para durar generaciones, respaldados por nuestra garantía y
                    servicio técnico.
                  </p>
                </div>

                <div className="card-glass p-6 flex flex-col items-center text-center">
                  <Users className="h-12 w-12 mb-4 text-amber-400" aria-hidden="true" />
                  <h3 className="text-xl font-bold mb-2">Comunidad</h3>
                  <p className="text-gray-400">
                    Valoramos la relación con nuestros clientes y la comunidad de tiradores, aprendiendo y creciendo
                    juntos.
                  </p>
                </div>

                <div className="card-glass p-6 flex flex-col items-center text-center">
                  <Globe className="h-12 w-12 mb-4 text-amber-400" aria-hidden="true" />
                  <h3 className="text-xl font-bold mb-2">Responsabilidad</h3>
                  <p className="text-gray-400">
                    Nos comprometemos con prácticas sostenibles y éticas en todos los aspectos de nuestra operación.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Equipo */}
          <section className="py-16 bg-gradient-to-b from-gray-900 to-black">
            <div className="container-custom">
              <div className="text-center mb-12">
                <span className="inline-block text-amber-400 uppercase tracking-widest text-sm mb-3">
                  Nuestro Equipo
                </span>
                <h2 className="text-3xl font-bold mb-6 font-playfair">Artesanos y Expertos</h2>
                <div className="w-20 h-px bg-white/20 mx-auto mb-6" />
                <p className="text-gray-300 max-w-2xl mx-auto">
                  Detrás de cada rifle J. Murrieta hay un equipo de artesanos apasionados y expertos dedicados a la
                  excelencia.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((index) => (
                  <div key={index} className="card-glass overflow-hidden">
                    <div className="relative h-80">
                      <Image
                        src={`/placeholder.svg?height=320&width=240`}
                        alt={`Miembro del equipo ${index}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4 text-center">
                      <h3 className="font-bold mb-1">Nombre Apellido</h3>
                      <p className="text-amber-400 text-sm mb-2">Maestro Artesano</p>
                      <p className="text-gray-400 text-sm">
                        Con más de 20 años de experiencia en la fabricación de rifles de precisión.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Instalaciones */}
          <section className="py-16 bg-black">
            <div className="container-custom">
              <div className="text-center mb-12">
                <span className="inline-block text-amber-400 uppercase tracking-widest text-sm mb-3">
                  Nuestras Instalaciones
                </span>
                <h2 className="text-3xl font-bold mb-6 font-playfair">Donde Nace la Excelencia</h2>
                <div className="w-20 h-px bg-white/20 mx-auto mb-6" />
                <p className="text-gray-300 max-w-2xl mx-auto">
                  Nuestro taller combina la tradición artesanal con tecnología de vanguardia para crear productos
                  excepcionales.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="card-glass overflow-hidden col-span-2">
                  <div className="relative h-80">
                    <Image src="/images/workshop.jpeg" alt="Taller de J. Murrieta" fill className="object-cover" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold mb-1">Taller Principal</h3>
                    <p className="text-gray-400 text-sm">
                      Ubicado en el corazón de Córdoba, nuestro taller principal combina la tradición con la innovación.
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="card-glass overflow-hidden">
                    <div className="relative h-36">
                      <Image src="/images/testing.jpeg" alt="Área de pruebas" fill className="object-cover" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold mb-1">Área de Pruebas</h3>
                      <p className="text-gray-400 text-sm">
                        Cada rifle es rigurosamente probado para garantizar su precisión y rendimiento.
                      </p>
                    </div>
                  </div>

                  <div className="card-glass overflow-hidden">
                    <div className="relative h-36">
                      <Image src="/images/craftsmanship.jpeg" alt="Showroom" fill className="object-cover" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold mb-1">Showroom</h3>
                      <p className="text-gray-400 text-sm">
                        Visita nuestro showroom para conocer y probar nuestra colección completa.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
        <WhatsappButton />
      </div>
    </CartProvider>
  )
}

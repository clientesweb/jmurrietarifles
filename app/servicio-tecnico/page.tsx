import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import WhatsappButton from "@/components/whatsapp-button"
import Image from "next/image"
import { PenToolIcon as Tool, Shield, Clock, FileText, HelpCircle, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CartProvider } from "@/components/cart-provider"
import ServiceRequestForm from "@/components/service-request-form"
import PageBanner from "@/components/page-banner"

export const metadata = {
  title: "Servicio Técnico | J. Murrieta - Rifles de Aire Comprimido Premium",
  description:
    "Servicio técnico especializado para rifles de aire comprimido J. Murrieta. Mantenimiento, reparaciones y garantía.",
}

export default function ServicePage() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-black text-gray-100">
        <Navbar />
        <main className="pt-20">
          {/* Banner de la página */}
          <PageBanner
            title="Servicio Técnico"
            subtitle="Soporte Especializado"
            description="Nuestro equipo de técnicos especializados está listo para mantener tu rifle J. Murrieta en óptimas condiciones, garantizando su rendimiento y durabilidad."
            imageSrc="/images/product-2.jpeg"
          />

          {/* Servicios */}
          <section className="py-16 bg-black">
            <div className="container-custom">
              <div className="text-center mb-12">
                <span className="inline-block text-amber-400 uppercase tracking-widest text-sm mb-3">
                  Nuestros Servicios
                </span>
                <h2 className="text-3xl font-bold mb-6 font-playfair">Cuidado Experto</h2>
                <div className="w-20 h-px bg-white/20 mx-auto mb-6" />
                <p className="text-gray-300 max-w-2xl mx-auto">
                  Ofrecemos una amplia gama de servicios para mantener tu rifle en perfectas condiciones.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="card-glass p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-amber-400/20 p-3 rounded-full mr-4">
                      <Tool className="h-6 w-6 text-amber-400" />
                    </div>
                    <h3 className="text-xl font-bold">Mantenimiento</h3>
                  </div>
                  <p className="text-gray-300 mb-4">
                    Servicio de mantenimiento preventivo para mantener tu rifle en óptimas condiciones. Incluye
                    limpieza, lubricación y ajustes.
                  </p>
                  <ul className="space-y-2 text-gray-400 text-sm mb-6">
                    <li className="flex items-start">
                      <span className="text-amber-400 mr-2">•</span>
                      <span>Limpieza profesional</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-400 mr-2">•</span>
                      <span>Lubricación de componentes</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-400 mr-2">•</span>
                      <span>Ajustes de precisión</span>
                    </li>
                  </ul>
                  <div className="text-amber-400 font-bold mb-2">Desde $15.000</div>
                </div>

                <div className="card-glass p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-amber-400/20 p-3 rounded-full mr-4">
                      <Shield className="h-6 w-6 text-amber-400" />
                    </div>
                    <h3 className="text-xl font-bold">Reparaciones</h3>
                  </div>
                  <p className="text-gray-300 mb-4">
                    Servicio de reparación para solucionar problemas específicos o restaurar rifles dañados. Realizado
                    por técnicos especializados.
                  </p>
                  <ul className="space-y-2 text-gray-400 text-sm mb-6">
                    <li className="flex items-start">
                      <span className="text-amber-400 mr-2">•</span>
                      <span>Diagnóstico completo</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-400 mr-2">•</span>
                      <span>Reemplazo de piezas</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-400 mr-2">•</span>
                      <span>Pruebas de rendimiento</span>
                    </li>
                  </ul>
                  <div className="text-amber-400 font-bold mb-2">Presupuesto personalizado</div>
                </div>

                <div className="card-glass p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-amber-400/20 p-3 rounded-full mr-4">
                      <Clock className="h-6 w-6 text-amber-400" />
                    </div>
                    <h3 className="text-xl font-bold">Restauración</h3>
                  </div>
                  <p className="text-gray-300 mb-4">
                    Servicio de restauración para rifles antiguos o de colección. Recuperamos la belleza y funcionalidad
                    original.
                  </p>
                  <ul className="space-y-2 text-gray-400 text-sm mb-6">
                    <li className="flex items-start">
                      <span className="text-amber-400 mr-2">•</span>
                      <span>Restauración de madera</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-400 mr-2">•</span>
                      <span>Renovación de acabados metálicos</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-400 mr-2">•</span>
                      <span>Reconstrucción de mecanismos</span>
                    </li>
                  </ul>
                  <div className="text-amber-400 font-bold mb-2">Consultar disponibilidad</div>
                </div>
              </div>
            </div>
          </section>

          {/* Proceso de servicio */}
          <section className="py-16 bg-gradient-to-b from-black to-gray-900">
            <div className="container-custom">
              <div className="text-center mb-12">
                <span className="inline-block text-amber-400 uppercase tracking-widest text-sm mb-3">
                  Cómo Trabajamos
                </span>
                <h2 className="text-3xl font-bold mb-6 font-playfair">Nuestro Proceso</h2>
                <div className="w-20 h-px bg-white/20 mx-auto mb-6" />
                <p className="text-gray-300 max-w-2xl mx-auto">
                  Un proceso simple y eficiente para garantizar el mejor servicio para tu rifle J. Murrieta.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="card-glass p-6 text-center">
                  <div className="bg-amber-400/20 p-4 rounded-full mx-auto mb-4 w-16 h-16 flex items-center justify-center">
                    <FileText className="h-8 w-8 text-amber-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">1. Solicitud</h3>
                  <p className="text-gray-400 text-sm">
                    Completa el formulario de solicitud de servicio con los detalles de tu rifle.
                  </p>
                </div>

                <div className="card-glass p-6 text-center">
                  <div className="bg-amber-400/20 p-4 rounded-full mx-auto mb-4 w-16 h-16 flex items-center justify-center">
                    <HelpCircle className="h-8 w-8 text-amber-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">2. Diagnóstico</h3>
                  <p className="text-gray-400 text-sm">
                    Nuestros técnicos realizan un diagnóstico completo y te envían un presupuesto.
                  </p>
                </div>

                <div className="card-glass p-6 text-center">
                  <div className="bg-amber-400/20 p-4 rounded-full mx-auto mb-4 w-16 h-16 flex items-center justify-center">
                    <Tool className="h-8 w-8 text-amber-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">3. Servicio</h3>
                  <p className="text-gray-400 text-sm">
                    Una vez aprobado el presupuesto, realizamos el servicio con la máxima atención al detalle.
                  </p>
                </div>

                <div className="card-glass p-6 text-center">
                  <div className="bg-amber-400/20 p-4 rounded-full mx-auto mb-4 w-16 h-16 flex items-center justify-center">
                    <CheckCircle className="h-8 w-8 text-amber-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">4. Entrega</h3>
                  <p className="text-gray-400 text-sm">
                    Te entregamos tu rifle en perfectas condiciones, listo para usar.
                  </p>
                </div>
              </div>

              <div className="text-center mt-12">
                <Button className="bg-amber-400 text-black hover:bg-amber-500 px-8 py-6">
                  <Link href="#solicitar-servicio">SOLICITAR SERVICIO</Link>
                </Button>
              </div>
            </div>
          </section>

          {/* Garantía */}
          <section className="py-16 bg-gradient-to-b from-gray-900 to-black">
            <div className="container-custom">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="relative h-[400px] card-glass overflow-hidden">
                  <Image
                    src="/images/product-1.jpeg"
                    alt="Rifle J. Murrieta con garantía"
                    fill
                    className="object-cover"
                  />
                </div>

                <div>
                  <span className="inline-block text-amber-400 uppercase tracking-widest text-sm mb-3">
                    Tranquilidad Garantizada
                  </span>
                  <h2 className="text-3xl font-bold mb-6 font-playfair">Nuestra Garantía</h2>
                  <div className="w-20 h-px bg-white/20 mb-6" />
                  <div className="space-y-4 text-gray-300">
                    <p>
                      Todos los rifles J. Murrieta cuentan con una garantía de 2 años contra defectos de fabricación.
                      Además, ofrecemos un servicio de mantenimiento de por vida con costos preferenciales para los
                      propietarios de nuestros rifles.
                    </p>
                    <p>
                      Nuestro compromiso con la calidad nos permite ofrecer esta garantía con total confianza, sabiendo
                      que cada rifle que sale de nuestro taller cumple con los más altos estándares de excelencia.
                    </p>
                    <p>
                      Para hacer efectiva la garantía, simplemente contacta con nuestro servicio técnico y te guiaremos
                      en todo el proceso.
                    </p>
                  </div>

                  <div className="mt-8">
                    <Link href="/contacto">
                      <Button variant="outline" className="border-white/20 hover:bg-white/5">
                        CONTACTAR SERVICIO TÉCNICO
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Formulario de solicitud */}
          <section id="solicitar-servicio" className="py-16 bg-black">
            <div className="container-custom">
              <div className="text-center mb-12">
                <span className="inline-block text-amber-400 uppercase tracking-widest text-sm mb-3">
                  Estamos para Ayudarte
                </span>
                <h2 className="text-3xl font-bold mb-6 font-playfair">Solicitar Servicio</h2>
                <div className="w-20 h-px bg-white/20 mx-auto mb-6" />
                <p className="text-gray-300 max-w-2xl mx-auto">
                  Completa el siguiente formulario para solicitar un servicio técnico para tu rifle J. Murrieta.
                </p>
              </div>

              <div className="max-w-3xl mx-auto">
                <ServiceRequestForm />
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

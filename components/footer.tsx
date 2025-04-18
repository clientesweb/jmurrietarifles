import Link from "next/link"
import Image from "next/image"
import { Instagram, Facebook, Mail, Phone, Shield, CreditCard, Code, MapPin, Clock } from "lucide-react"
import PaymentMethods from "@/components/payment-methods"

export default function Footer() {
  return (
    <footer id="contacto" className="bg-[#1A1A1A] border-t border-gold-500/10">
      <div className="container-custom py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-12">
          <div className="md:col-span-1">
            <div className="flex items-center mb-6">
              <div className="relative w-40 h-14 mr-3">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-3x9rpXntbkt5mShwsv2OtChUDRfMfJ.png"
                  alt="J. Murrieta"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            <p className="text-parchment-400 mb-6 text-sm">
              Excelencia en rifles de aire comprimido desde Argentina para el mundo.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://instagram.com/jmurrietapcp"
                target="_blank"
                className="text-gold-500/70 hover:text-gold-500 transition-colors duration-300"
                aria-label="Síguenos en Instagram"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="https://facebook.com/JMurrietaPCP"
                target="_blank"
                className="text-gold-500/70 hover:text-gold-500 transition-colors duration-300"
                aria-label="Síguenos en Facebook"
              >
                <Facebook className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold mb-4 uppercase tracking-wider text-gold-500 font-cinzel">Navegación</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/#productos"
                  className="text-parchment-400 hover:text-gold-500 transition-colors duration-300 text-sm"
                >
                  Productos
                </Link>
              </li>
              <li>
                <Link
                  href="/#caracteristicas"
                  className="text-parchment-400 hover:text-gold-500 transition-colors duration-300 text-sm"
                >
                  Filosofía
                </Link>
              </li>
              <li>
                <Link
                  href="/#testimonios"
                  className="text-parchment-400 hover:text-gold-500 transition-colors duration-300 text-sm"
                >
                  Experiencias
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold mb-4 uppercase tracking-wider text-gold-500 font-cinzel">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/terminos"
                  className="text-parchment-400 hover:text-gold-500 transition-colors duration-300 text-sm"
                >
                  Términos y Condiciones
                </Link>
              </li>
              <li>
                <Link
                  href="/privacidad"
                  className="text-parchment-400 hover:text-gold-500 transition-colors duration-300 text-sm"
                >
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link
                  href="/envios"
                  className="text-parchment-400 hover:text-gold-500 transition-colors duration-300 text-sm"
                >
                  Envíos y Devoluciones
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold mb-4 uppercase tracking-wider text-gold-500 font-cinzel">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <Phone className="h-4 w-4 mr-3 text-gold-500/70" aria-hidden="true" />
                <span className="text-parchment-400 text-sm">+54 9 351 537 1671</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-4 w-4 mr-3 text-gold-500/70" aria-hidden="true" />
                <span className="text-parchment-400 text-sm">+54 9 351 687 0117</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-4 w-4 mr-3 text-gold-500/70" aria-hidden="true" />
                <span className="text-parchment-400 text-sm">jmurrietapcp@gmail.com</span>
              </li>
              <li className="flex items-start">
                <MapPin className="h-4 w-4 mr-3 text-gold-500/70 mt-1" aria-hidden="true" />
                <span className="text-parchment-400 text-sm">La Sierrita 191, Villa del Dique</span>
              </li>
              <li className="flex items-start">
                <Clock className="h-4 w-4 mr-3 text-gold-500/70 mt-1" aria-hidden="true" />
                <span className="text-parchment-400 text-sm">
                  7:00 am a 20:00 pm
                  <br />
                  De Lunes a Viernes
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gold-500/10">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-6">
              <CreditCard className="h-5 w-5 text-gold-500/70" aria-hidden="true" />
              <h3 className="text-sm uppercase tracking-wider text-gold-500 font-cinzel">Métodos de pago aceptados</h3>
              <div className="flex items-center text-xs text-gold-500/70">
                <Shield className="h-3 w-3 mr-1" aria-hidden="true" />
                <span>Pago seguro</span>
              </div>
            </div>

            <div className="card-glass p-6 mb-8 border border-gold-500/10">
              <PaymentMethods />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-center">
              <p className="text-parchment-500/50 text-xs">
                &copy; {new Date().getFullYear()} J. Murrieta. Todos los derechos reservados.
              </p>
              <div className="h-3 w-[1px] bg-gold-500/20 hidden sm:block"></div>
              <Link
                href="https://dualitydomain.com"
                target="_blank"
                className="flex items-center text-parchment-500/50 hover:text-gold-500 transition-colors duration-300 text-xs"
              >
                <Code className="h-3 w-3 mr-1" aria-hidden="true" />
                <span>Desarrollado por Duality Domain</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

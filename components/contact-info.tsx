import { Mail, Phone, MapPin, Clock, Instagram, Facebook, Twitter } from "lucide-react"
import Link from "next/link"

export default function ContactInfo() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-6 font-playfair">Información de contacto</h2>
        <div className="space-y-6">
          <div className="flex items-start">
            <Phone className="h-5 w-5 mr-4 text-amber-400 mt-1" />
            <div>
              <h3 className="font-medium mb-1">Teléfono</h3>
              <p className="text-gray-400">+54 11 1234-5678</p>
              <p className="text-gray-400">+54 11 8765-4321</p>
            </div>
          </div>

          <div className="flex items-start">
            <Mail className="h-5 w-5 mr-4 text-amber-400 mt-1" />
            <div>
              <h3 className="font-medium mb-1">Email</h3>
              <p className="text-gray-400">info@jmurrieta.com</p>
              <p className="text-gray-400">ventas@jmurrieta.com</p>
            </div>
          </div>

          <div className="flex items-start">
            <MapPin className="h-5 w-5 mr-4 text-amber-400 mt-1" />
            <div>
              <h3 className="font-medium mb-1">Dirección</h3>
              <p className="text-gray-400">Av. Libertador 1234</p>
              <p className="text-gray-400">Buenos Aires, Argentina</p>
            </div>
          </div>

          <div className="flex items-start">
            <Clock className="h-5 w-5 mr-4 text-amber-400 mt-1" />
            <div>
              <h3 className="font-medium mb-1">Horario de atención</h3>
              <p className="text-gray-400">Lunes a Viernes: 9:00 - 18:00</p>
              <p className="text-gray-400">Sábados: 9:00 - 13:00</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card-glass p-6">
        <h3 className="font-medium mb-4">Síguenos en redes sociales</h3>
        <div className="flex space-x-4">
          <Link
            href="https://instagram.com"
            target="_blank"
            className="bg-white/5 hover:bg-white/10 transition-colors duration-300 p-3 rounded-sm"
            aria-label="Síguenos en Instagram"
          >
            <Instagram className="h-5 w-5 text-amber-400" />
          </Link>
          <Link
            href="https://facebook.com"
            target="_blank"
            className="bg-white/5 hover:bg-white/10 transition-colors duration-300 p-3 rounded-sm"
            aria-label="Síguenos en Facebook"
          >
            <Facebook className="h-5 w-5 text-amber-400" />
          </Link>
          <Link
            href="https://twitter.com"
            target="_blank"
            className="bg-white/5 hover:bg-white/10 transition-colors duration-300 p-3 rounded-sm"
            aria-label="Síguenos en Twitter"
          >
            <Twitter className="h-5 w-5 text-amber-400" />
          </Link>
        </div>
      </div>

      <div className="card-glass p-6">
        <h3 className="font-medium mb-4">Atención al cliente</h3>
        <p className="text-gray-400 text-sm mb-4">
          Para consultas sobre productos, servicio técnico o garantías, nuestro equipo de atención al cliente está
          disponible para ayudarte.
        </p>
        <Link href="tel:+541112345678">
          <button className="btn-elegant w-full py-3">LLAMAR AHORA</button>
        </Link>
      </div>
    </div>
  )
}

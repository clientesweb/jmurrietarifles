"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle2, Loader2 } from "lucide-react"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Limpiar error cuando el usuario comienza a escribir
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "El nombre es requerido"
    }

    if (!formData.email.trim()) {
      newErrors.email = "El email es requerido"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "El email no es válido"
    }

    if (!formData.message.trim()) {
      newErrors.message = "El mensaje es requerido"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setFormStatus("submitting")

    try {
      // Construct WhatsApp message
      const message = `
*Nuevo Contacto - J. Murrieta*

*Nombre:* ${formData.name}
*Email:* ${formData.email}
*Teléfono:* ${formData.phone}
*Asunto:* ${formData.subject}

*Mensaje:*
${formData.message}
      `.trim()

      // Encode message for URL
      const encodedMessage = encodeURIComponent(message)

      // WhatsApp number
      const phoneNumber = "5493515371671"

      // Open WhatsApp with the message
      window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank")

      setFormStatus("success")
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      })
    } catch (error) {
      setFormStatus("error")
    }
  }

  return (
    <div className="card-glass p-6 md:p-8 border border-gold-500/10">
      {formStatus === "success" ? (
        <div className="text-center py-8">
          <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2 font-playfair">¡Mensaje enviado!</h3>
          <p className="text-gray-400 mb-6">
            Gracias por contactarnos. Nos pondremos en contacto contigo lo antes posible.
          </p>
          <Button
            variant="outline"
            className="btn-elegant border-gold-500/30 text-gold-500 hover:bg-gold-500/10"
            onClick={() => setFormStatus("idle")}
          >
            Enviar otro mensaje
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-3">
            <label htmlFor="name" className="text-luxury text-gold-500">
              Nombre completo <span className="text-red-500">*</span>
            </label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ingresa tu nombre completo"
              className="bg-gray-900/30 border-gold-500/30 focus:border-gold-500/50 glass-effect"
              required
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          <div className="space-y-3">
            <label htmlFor="email" className="text-luxury text-gold-500">
              Email <span className="text-red-500">*</span>
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Ingresa tu email"
              className="bg-gray-900/30 border-gold-500/30 focus:border-gold-500/50 glass-effect"
              required
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div className="space-y-3">
            <label htmlFor="phone" className="text-luxury text-gold-500">
              Teléfono
            </label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Ingresa tu número de teléfono"
              className="bg-gray-900/30 border-gold-500/30 focus:border-gold-500/50 glass-effect"
            />
          </div>

          <div className="space-y-3">
            <label htmlFor="subject" className="text-luxury text-gold-500">
              Asunto
            </label>
            <Input
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="¿Sobre qué quieres contactarnos?"
              className="bg-gray-900/30 border-gold-500/30 focus:border-gold-500/50 glass-effect"
            />
          </div>

          <div className="space-y-3">
            <label htmlFor="message" className="text-luxury text-gold-500">
              Mensaje <span className="text-red-500">*</span>
            </label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Escribe tu mensaje aquí"
              className="bg-gray-900/30 border-gold-500/30 focus:border-gold-500/50 glass-effect min-h-[150px]"
              required
            />
            {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
          </div>

          <Button
            type="submit"
            className="w-full py-6 bg-gold-500 hover:bg-gold-600 text-black"
            disabled={formStatus === "submitting"}
          >
            {formStatus === "submitting" ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ENVIANDO...
              </>
            ) : (
              "ENVIAR MENSAJE"
            )}
          </Button>

          {formStatus === "error" && (
            <p className="text-red-500 text-sm text-center mt-4">
              Ocurrió un error al enviar el mensaje. Por favor, intenta nuevamente.
            </p>
          )}
        </form>
      )}
    </div>
  )
}

"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2, CheckCircle2 } from "lucide-react"

export default function ServiceRequestForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    model: "",
    serialNumber: "",
    purchaseDate: "",
    serviceType: "maintenance",
    description: "",
    termsAccepted: false,
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

  const handleRadioChange = (value: string) => {
    setFormData((prev) => ({ ...prev, serviceType: value }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, termsAccepted: checked }))

    if (errors.termsAccepted && checked) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors.termsAccepted
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

    if (!formData.phone.trim()) {
      newErrors.phone = "El teléfono es requerido"
    }

    if (!formData.model.trim()) {
      newErrors.model = "El modelo es requerido"
    }

    if (!formData.description.trim()) {
      newErrors.description = "La descripción es requerida"
    }

    if (!formData.termsAccepted) {
      newErrors.termsAccepted = "Debes aceptar los términos y condiciones"
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

    // Simulación de envío de formulario
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setFormStatus("success")
    } catch (error) {
      setFormStatus("error")
    }
  }

  return (
    <div className="card-glass p-6 md:p-8 border border-gold-500/10">
      {formStatus === "success" ? (
        <div className="text-center py-8">
          <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2 font-playfair">¡Solicitud enviada!</h3>
          <p className="text-gray-400 mb-6">
            Gracias por contactarnos. Nos pondremos en contacto contigo lo antes posible para coordinar el servicio.
          </p>
          <Button
            variant="outline"
            className="btn-elegant border-gold-500/30 text-gold-500 hover:bg-gold-500/10"
            onClick={() => setFormStatus("idle")}
          >
            Enviar otra solicitud
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div className="space-y-3">
              <label htmlFor="phone" className="text-luxury text-gold-500">
                Teléfono <span className="text-red-500">*</span>
              </label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Ingresa tu número de teléfono"
                className="bg-gray-900/30 border-gold-500/30 focus:border-gold-500/50 glass-effect"
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>

            <div className="space-y-3">
              <label htmlFor="model" className="text-luxury text-gold-500">
                Modelo del rifle <span className="text-red-500">*</span>
              </label>
              <Input
                id="model"
                name="model"
                value={formData.model}
                onChange={handleChange}
                placeholder="Ej: Murrieta Classic 5.5mm"
                className="bg-gray-900/30 border-gold-500/30 focus:border-gold-500/50 glass-effect"
              />
              {errors.model && <p className="text-red-500 text-xs mt-1">{errors.model}</p>}
            </div>

            <div className="space-y-3">
              <label htmlFor="serialNumber" className="text-luxury text-gold-500">
                Número de serie
              </label>
              <Input
                id="serialNumber"
                name="serialNumber"
                value={formData.serialNumber}
                onChange={handleChange}
                placeholder="Ubicado en la parte inferior del rifle"
                className="bg-gray-900/30 border-gold-500/30 focus:border-gold-500/50 glass-effect"
              />
            </div>

            <div className="space-y-3">
              <label htmlFor="purchaseDate" className="text-luxury text-gold-500">
                Fecha de compra
              </label>
              <Input
                id="purchaseDate"
                name="purchaseDate"
                type="date"
                value={formData.purchaseDate}
                onChange={handleChange}
                className="bg-gray-900/30 border-gold-500/30 focus:border-gold-500/50 glass-effect"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-luxury text-gold-500">
              Tipo de servicio <span className="text-red-500">*</span>
            </label>
            <RadioGroup value={formData.serviceType} onValueChange={handleRadioChange} className="space-y-3">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="maintenance" id="maintenance" />
                <Label htmlFor="maintenance">Mantenimiento preventivo</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="repair" id="repair" />
                <Label htmlFor="repair">Reparación</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="restoration" id="restoration" />
                <Label htmlFor="restoration">Restauración</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="other" id="other" />
                <Label htmlFor="other">Otro</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <label htmlFor="description" className="text-luxury text-gold-500">
              Descripción del servicio requerido <span className="text-red-500">*</span>
            </label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe el problema o servicio que necesitas"
              className="bg-gray-900/30 border-gold-500/30 focus:border-gold-500/50 glass-effect min-h-[150px]"
            />
            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
          </div>

          <div className="flex items-start space-x-2">
            <Checkbox id="terms" checked={formData.termsAccepted} onCheckedChange={handleCheckboxChange} />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Acepto los términos y condiciones <span className="text-red-500">*</span>
              </label>
              <p className="text-sm text-gray-500">
                Al enviar este formulario, acepto que J. Murrieta procese mis datos personales de acuerdo con su
                política de privacidad.
              </p>
              {errors.termsAccepted && <p className="text-red-500 text-xs">{errors.termsAccepted}</p>}
            </div>
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
              "SOLICITAR SERVICIO"
            )}
          </Button>

          {formStatus === "error" && (
            <p className="text-red-500 text-sm text-center mt-4">
              Ocurrió un error al enviar la solicitud. Por favor, intenta nuevamente.
            </p>
          )}
        </form>
      )}
    </div>
  )
}

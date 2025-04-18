"use client"

import { useState } from "react"
import { Star, ThumbsUp, MessageSquare } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

interface Review {
  id: string
  author: string
  date: string
  rating: number
  comment: string
  helpful: number
  avatar?: string
}

const defaultReviews: Review[] = [
  {
    id: "1",
    author: "Miguel Sánchez",
    date: "15/03/2023",
    rating: 5,
    comment:
      "Increíble precisión y acabados de primera calidad. El rifle Classic en calibre 5.5mm superó todas mis expectativas. El equilibrio es perfecto y la culata de nogal es una verdadera obra de arte. Definitivamente vale cada centavo.",
    helpful: 24,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    author: "Carolina Gutiérrez",
    date: "02/05/2023",
    rating: 4,
    comment:
      "Excelente rifle, muy preciso y con un diseño elegante. La única razón por la que no le doy 5 estrellas es porque el tiempo de entrega fue mayor al esperado. Sin embargo, el producto en sí es excepcional.",
    helpful: 18,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    author: "Roberto Méndez",
    date: "20/07/2023",
    rating: 5,
    comment:
      "He probado muchos rifles de aire comprimido a lo largo de los años, pero este está en otra liga. La atención al detalle es impresionante y el servicio al cliente fue excelente cuando tuve algunas preguntas sobre el mantenimiento.",
    helpful: 32,
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export default function ProductReviews({ reviews = defaultReviews }: { reviews?: Review[] }) {
  const [helpfulClicked, setHelpfulClicked] = useState<Record<string, boolean>>({})
  const [filter, setFilter] = useState<number | null>(null)

  const filteredReviews = filter ? reviews.filter((review) => review.rating === filter) : reviews

  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length || 0

  const ratingCounts = reviews.reduce(
    (acc, review) => {
      acc[review.rating] = (acc[review.rating] || 0) + 1
      return acc
    },
    {} as Record<number, number>,
  )

  const handleHelpfulClick = (id: string) => {
    setHelpfulClicked((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div className="w-full">
      <div className="flex flex-col lg:flex-row gap-8 mb-10">
        <div className="lg:w-1/3 card-glass p-6">
          <div className="text-center mb-6">
            <div className="text-4xl font-bold mb-2">{averageRating.toFixed(1)}</div>
            <div className="flex justify-center mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-5 w-5 ${
                    star <= Math.round(averageRating) ? "text-amber-400 fill-amber-400" : "text-gray-600"
                  }`}
                />
              ))}
            </div>
            <div className="text-sm text-gray-400">{reviews.length} reseñas</div>
          </div>

          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <button
                key={rating}
                className={`flex items-center w-full p-2 rounded-sm transition-colors ${
                  filter === rating ? "bg-white/10" : "hover:bg-white/5"
                }`}
                onClick={() => setFilter(filter === rating ? null : rating)}
                aria-pressed={filter === rating}
                aria-label={`Filtrar por ${rating} estrellas`}
              >
                <div className="flex items-center mr-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-4 w-4 ${star <= rating ? "text-amber-400 fill-amber-400" : "text-gray-600"}`}
                    />
                  ))}
                </div>
                <div className="flex-grow bg-white/10 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-amber-400 h-full"
                    style={{
                      width: `${((ratingCounts[rating] || 0) / reviews.length) * 100}%`,
                    }}
                  ></div>
                </div>
                <span className="ml-2 text-sm text-gray-400">{ratingCounts[rating] || 0}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="lg:w-2/3 space-y-6">
          {filteredReviews.length > 0 ? (
            filteredReviews.map((review) => (
              <div key={review.id} className="border-b border-white/10 pb-6 last:border-0">
                <div className="flex items-start mb-4">
                  <div className="relative h-10 w-10 rounded-full overflow-hidden mr-3">
                    <Image
                      src={review.avatar || "/placeholder.svg?height=40&width=40"}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="40px"
                    />
                  </div>
                  <div>
                    <div className="font-medium">{review.author}</div>
                    <div className="text-sm text-gray-400">{review.date}</div>
                  </div>
                </div>

                <div className="flex mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-4 w-4 ${star <= review.rating ? "text-amber-400 fill-amber-400" : "text-gray-600"}`}
                    />
                  ))}
                </div>

                <p className="text-gray-300 mb-4">{review.comment}</p>

                <div className="flex items-center text-sm text-gray-400">
                  <button
                    className={`flex items-center mr-4 transition-colors ${
                      helpfulClicked[review.id] ? "text-green-500" : "hover:text-white"
                    }`}
                    onClick={() => handleHelpfulClick(review.id)}
                    aria-pressed={helpfulClicked[review.id]}
                    aria-label="Marcar como útil"
                  >
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    <span>Útil ({helpfulClicked[review.id] ? review.helpful + 1 : review.helpful})</span>
                  </button>
                  <button className="flex items-center hover:text-white transition-colors duration-300">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    <span>Comentar</span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-400">
              No hay reseñas que coincidan con el filtro seleccionado.
            </div>
          )}

          <div className="pt-4">
            <Button className="bg-white/10 hover:bg-white/20 text-white w-full">Escribir una reseña</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

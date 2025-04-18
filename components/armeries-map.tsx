"use client"

import { useState, useEffect, useRef } from "react"
import { MapPin, Phone, Mail, Globe, ChevronDown } from "lucide-react"
import { armeries } from "@/data/armeries"
import type { Armery } from "@/data/armeries"

// Declare google as a global variable
declare global {
  interface Window {
    google: any
  }
}

export default function ArmeriesMap() {
  const [selectedArmery, setSelectedArmery] = useState<Armery | null>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [activeProvince, setActiveProvince] = useState<string | null>(null)
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<google.maps.Map | null>(null)
  const markersRef = useRef<google.maps.Marker[]>([])
  const [isProvinceDropdownOpen, setIsProvinceDropdownOpen] = useState(false)

  // Obtener provincias únicas para el filtro
  const provinces = Array.from(new Set(armeries.map((armery) => armery.province))).sort()

  // Filtrar armerías por provincia
  const filteredArmeries = activeProvince ? armeries.filter((armery) => armery.province === activeProvince) : armeries

  // Inicializar el mapa
  useEffect(() => {
    // Cargar el script de Google Maps
    const loadGoogleMapsScript = () => {
      const script = document.createElement("script")
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places`
      script.async = true
      script.defer = true
      script.onload = initMap
      document.head.appendChild(script)
    }

    const initMap = () => {
      if (!mapRef.current) return

      // Centrar el mapa en Argentina
      const mapOptions = {
        center: { lat: -38.416097, lng: -63.616672 }, // Centro de Argentina
        zoom: 4,
        styles: [
          { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
          { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
          { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
          {
            featureType: "administrative.locality",
            elementType: "labels.text.fill",
            stylers: [{ color: "#d59563" }],
          },
          {
            featureType: "poi",
            elementType: "labels.text.fill",
            stylers: [{ color: "#d59563" }],
          },
          {
            featureType: "poi.park",
            elementType: "geometry",
            stylers: [{ color: "#263c3f" }],
          },
          {
            featureType: "poi.park",
            elementType: "labels.text.fill",
            stylers: [{ color: "#6b9a76" }],
          },
          {
            featureType: "road",
            elementType: "geometry",
            stylers: [{ color: "#38414e" }],
          },
          {
            featureType: "road",
            elementType: "geometry.stroke",
            stylers: [{ color: "#212a37" }],
          },
          {
            featureType: "road",
            elementType: "labels.text.fill",
            stylers: [{ color: "#9ca5b3" }],
          },
          {
            featureType: "road.highway",
            elementType: "geometry",
            stylers: [{ color: "#746855" }],
          },
          {
            featureType: "road.highway",
            elementType: "geometry.stroke",
            stylers: [{ color: "#1f2835" }],
          },
          {
            featureType: "road.highway",
            elementType: "labels.text.fill",
            stylers: [{ color: "#f3d19c" }],
          },
          {
            featureType: "transit",
            elementType: "geometry",
            stylers: [{ color: "#2f3948" }],
          },
          {
            featureType: "transit.station",
            elementType: "labels.text.fill",
            stylers: [{ color: "#d59563" }],
          },
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [{ color: "#17263c" }],
          },
          {
            featureType: "water",
            elementType: "labels.text.fill",
            stylers: [{ color: "#515c6d" }],
          },
          {
            featureType: "water",
            elementType: "labels.text.stroke",
            stylers: [{ color: "#17263c" }],
          },
        ],
      }

      const map = new window.google.maps.Map(mapRef.current, mapOptions)
      mapInstanceRef.current = map

      // Agregar marcadores para cada armería
      armeries.forEach((armery) => {
        const marker = new window.google.maps.Marker({
          position: armery.coordinates,
          map: map,
          title: armery.name,
          icon: {
            url:
              "data:image/svg+xml;charset=UTF-8," +
              encodeURIComponent(`
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            `),
            scaledSize: new window.google.maps.Size(30, 30),
          },
        })

        marker.addListener("click", () => {
          setSelectedArmery(armery)
          map.setCenter(armery.coordinates)
          map.setZoom(12)
        })

        markersRef.current.push(marker)
      })

      setMapLoaded(true)
    }

    // Si la API de Google Maps ya está cargada
    if (window.google && window.google.maps) {
      initMap()
    } else {
      loadGoogleMapsScript()
    }

    return () => {
      // Limpiar marcadores al desmontar
      markersRef.current.forEach((marker) => marker.setMap(null))
      markersRef.current = []
    }
  }, [])

  // Actualizar marcadores cuando cambia el filtro de provincia
  useEffect(() => {
    if (!mapInstanceRef.current || !mapLoaded) return

    // Limpiar marcadores existentes
    markersRef.current.forEach((marker) => marker.setMap(null))
    markersRef.current = []

    // Agregar nuevos marcadores según el filtro
    filteredArmeries.forEach((armery) => {
      const marker = new window.google.maps.Marker({
        position: armery.coordinates,
        map: mapInstanceRef.current,
        title: armery.name,
        icon: {
          url:
            "data:image/svg+xml;charset=UTF-8," +
            encodeURIComponent(`
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          `),
          scaledSize: new window.google.maps.Size(30, 30),
        },
      })

      marker.addListener("click", () => {
        setSelectedArmery(armery)
        mapInstanceRef.current?.setCenter(armery.coordinates)
        mapInstanceRef.current?.setZoom(12)
      })

      markersRef.current.push(marker)
    })

    // Ajustar el mapa para mostrar todos los marcadores si hay filtro activo
    if (activeProvince && filteredArmeries.length > 0) {
      const bounds = new window.google.maps.LatLngBounds()
      filteredArmeries.forEach((armery) => {
        bounds.extend(new window.google.maps.LatLng(armery.coordinates.lat, armery.coordinates.lng))
      })
      mapInstanceRef.current.fitBounds(bounds)

      // Si solo hay una armería, hacer zoom adecuado
      if (filteredArmeries.length === 1) {
        mapInstanceRef.current.setZoom(12)
      }
    } else {
      // Resetear a vista de Argentina completa
      mapInstanceRef.current.setCenter({ lat: -38.416097, lng: -63.616672 })
      mapInstanceRef.current.setZoom(4)
    }
  }, [activeProvince, filteredArmeries, mapLoaded])

  const handleProvinceChange = (province: string | null) => {
    setActiveProvince(province)
    setSelectedArmery(null)
    setIsProvinceDropdownOpen(false)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Lista de armerías */}
      <div className="lg:col-span-1 space-y-6">
        {/* Filtro de provincias */}
        <div className="card-glass p-4">
          <div className="relative">
            <button
              className="w-full flex items-center justify-between p-2 bg-gray-900/50 border border-white/10 rounded-sm"
              onClick={() => setIsProvinceDropdownOpen(!isProvinceDropdownOpen)}
            >
              <span>{activeProvince || "Todas las provincias"}</span>
              <ChevronDown
                className={`h-5 w-5 transition-transform duration-300 ${isProvinceDropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            {isProvinceDropdownOpen && (
              <div className="absolute z-10 w-full mt-1 bg-gray-900 border border-white/10 rounded-sm shadow-lg max-h-60 overflow-y-auto">
                <button
                  className="w-full text-left p-3 hover:bg-white/5 transition-colors"
                  onClick={() => handleProvinceChange(null)}
                >
                  Todas las provincias
                </button>
                {provinces.map((province) => (
                  <button
                    key={province}
                    className={`w-full text-left p-3 hover:bg-white/5 transition-colors ${activeProvince === province ? "bg-white/10" : ""}`}
                    onClick={() => handleProvinceChange(province)}
                  >
                    {province}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Lista de armerías */}
        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
          {filteredArmeries.length > 0 ? (
            filteredArmeries.map((armery) => (
              <button
                key={armery.id}
                className={`w-full text-left card-glass p-4 transition-all duration-300 hover:border-amber-400/50 ${
                  selectedArmery?.id === armery.id ? "border-amber-400" : "border-white/10"
                }`}
                onClick={() => {
                  setSelectedArmery(armery)
                  if (mapInstanceRef.current) {
                    mapInstanceRef.current.setCenter(armery.coordinates)
                    mapInstanceRef.current.setZoom(12)
                  }
                }}
              >
                <h3 className="font-medium mb-2">{armery.name}</h3>
                <div className="flex items-start text-sm text-gray-400 mb-2">
                  <MapPin className="h-4 w-4 mr-2 mt-1 flex-shrink-0 text-amber-400/70" />
                  <span>
                    {armery.address}, {armery.city}
                  </span>
                </div>
                <div className="flex items-center text-sm text-gray-400">
                  <Phone className="h-4 w-4 mr-2 flex-shrink-0 text-amber-400/70" />
                  <span>{armery.phone}</span>
                </div>
              </button>
            ))
          ) : (
            <div className="text-center py-8 text-gray-400 card-glass">
              No se encontraron armerías en esta provincia.
            </div>
          )}
        </div>
      </div>

      {/* Mapa */}
      <div className="lg:col-span-2 space-y-6">
        <div className="card-glass overflow-hidden" style={{ height: "500px" }}>
          {!mapLoaded && (
            <div className="h-full flex items-center justify-center bg-gray-900">
              <div className="w-10 h-10 border-4 border-gray-600 border-t-white rounded-full animate-spin"></div>
            </div>
          )}
          <div ref={mapRef} className="h-full w-full" />
        </div>

        {/* Detalles de la armería seleccionada */}
        {selectedArmery && (
          <div className="card-glass p-6">
            <h3 className="text-xl font-bold mb-4">{selectedArmery.name}</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 mr-3 mt-1 text-amber-400" />
                  <div>
                    <h4 className="font-medium mb-1">Dirección</h4>
                    <p className="text-gray-400">{selectedArmery.address}</p>
                    <p className="text-gray-400">
                      {selectedArmery.city}, {selectedArmery.province}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="h-5 w-5 mr-3 mt-1 text-amber-400" />
                  <div>
                    <h4 className="font-medium mb-1">Teléfono</h4>
                    <p className="text-gray-400">{selectedArmery.phone}</p>
                  </div>
                </div>

                {selectedArmery.email && (
                  <div className="flex items-start">
                    <Mail className="h-5 w-5 mr-3 mt-1 text-amber-400" />
                    <div>
                      <h4 className="font-medium mb-1">Email</h4>
                      <p className="text-gray-400">{selectedArmery.email}</p>
                    </div>
                  </div>
                )}

                {selectedArmery.website && (
                  <div className="flex items-start">
                    <Globe className="h-5 w-5 mr-3 mt-1 text-amber-400" />
                    <div>
                      <h4 className="font-medium mb-1">Sitio web</h4>
                      <a
                        href={`https://${selectedArmery.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-amber-400 hover:underline"
                      >
                        {selectedArmery.website}
                      </a>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <h4 className="font-medium mb-3">Productos disponibles</h4>
                <ul className="space-y-2">
                  {selectedArmery.products.map((product, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-amber-400 mr-2">•</span>
                      <span className="text-gray-300">{product}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

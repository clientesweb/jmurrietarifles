// Service Worker para J. Murrieta
const CACHE_NAME = "jmurrieta-cache-v1"
const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json",
  "/icons/icon-192.png",
  "/icons/icon-384.png",
  "/icons/icon-512.png",
  "/images/logo-murrieta.png",
  "/images/hero-bg.jpeg",
  "/images/product-1.jpeg",
  "/images/product-2.jpeg",
  "/images/product-3.jpeg",
  "/images/product-4.jpeg",
  "/images/craftsmanship.jpeg",
  "/images/workshop.jpeg",
  "/images/testing.jpeg",
  "/images/j1-gera-1.jpeg",
  "/images/j1-gera-2.jpeg",
]

// Instalación del Service Worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Cache abierto")
      return cache.addAll(urlsToCache)
    }),
  )
})

// Estrategia de caché: Network first, fallback to cache
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Si la respuesta es válida, clonarla y almacenarla en caché
        if (response && response.status === 200) {
          const responseToCache = response.clone()
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache)
          })
        }
        return response
      })
      .catch(() => {
        // Si la red falla, intentar desde caché
        return caches.match(event.request)
      }),
  )
})

// Activación y limpieza de cachés antiguos
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME]
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName)
          }
        }),
      )
    }),
  )
})

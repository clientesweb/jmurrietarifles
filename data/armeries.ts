export interface Armery {
  id: string
  name: string
  address: string
  city: string
  province: string
  phone: string
  email?: string
  website?: string
  coordinates: {
    lat: number
    lng: number
  }
  products: string[]
}

export const armeries: Armery[] = [
  {
    id: "armeria-buenos-aires",
    name: "Armería Buenos Aires",
    address: "Av. Corrientes 1234",
    city: "Buenos Aires",
    province: "CABA",
    phone: "+54 11 1234-5678",
    email: "info@armeriaba.com",
    website: "www.armeriaba.com",
    coordinates: {
      lat: -34.603722,
      lng: -58.381592,
    },
    products: ["Murrieta Classic", "Murrieta Tactical", "Accesorios"],
  },
  {
    id: "armeria-cordoba",
    name: "Armería Córdoba",
    address: "Av. Colón 567",
    city: "Córdoba",
    province: "Córdoba",
    phone: "+54 351 234-5678",
    email: "ventas@armeriacordoba.com",
    coordinates: {
      lat: -31.413197,
      lng: -64.191544,
    },
    products: ["Murrieta Classic", "Accesorios"],
  },
  {
    id: "armeria-rosario",
    name: "Armería Rosario",
    address: "Av. Pellegrini 890",
    city: "Rosario",
    province: "Santa Fe",
    phone: "+54 341 456-7890",
    website: "www.armeriarosario.com.ar",
    coordinates: {
      lat: -32.946819,
      lng: -60.639465,
    },
    products: ["Murrieta Classic", "Murrieta Tactical", "Accesorios"],
  },
  {
    id: "armeria-mendoza",
    name: "Armería Mendoza",
    address: "Av. San Martín 1234",
    city: "Mendoza",
    province: "Mendoza",
    phone: "+54 261 789-0123",
    email: "contacto@armeriamendoza.com",
    coordinates: {
      lat: -32.889458,
      lng: -68.84584,
    },
    products: ["Murrieta Tactical", "Accesorios"],
  },
  {
    id: "armeria-bariloche",
    name: "Armería Bariloche",
    address: "Mitre 234",
    city: "San Carlos de Bariloche",
    province: "Río Negro",
    phone: "+54 294 456-7890",
    coordinates: {
      lat: -41.133472,
      lng: -71.310863,
    },
    products: ["Murrieta Classic", "Accesorios"],
  },
  {
    id: "armeria-salta",
    name: "Armería Salta",
    address: "Caseros 567",
    city: "Salta",
    province: "Salta",
    phone: "+54 387 234-5678",
    website: "www.armeriasalta.com.ar",
    coordinates: {
      lat: -24.782127,
      lng: -65.423798,
    },
    products: ["Murrieta Classic", "Murrieta Tactical"],
  },
  {
    id: "armeria-tucuman",
    name: "Armería Tucumán",
    address: "San Martín 789",
    city: "San Miguel de Tucumán",
    province: "Tucumán",
    phone: "+54 381 345-6789",
    email: "ventas@armeriatucuman.com",
    coordinates: {
      lat: -26.824407,
      lng: -65.222511,
    },
    products: ["Murrieta Classic", "Accesorios"],
  },
  {
    id: "armeria-mar-del-plata",
    name: "Armería Mar del Plata",
    address: "Av. Luro 1234",
    city: "Mar del Plata",
    province: "Buenos Aires",
    phone: "+54 223 456-7890",
    coordinates: {
      lat: -38.002796,
      lng: -57.55658,
    },
    products: ["Murrieta Tactical", "Accesorios"],
  },
]

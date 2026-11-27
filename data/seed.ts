import type { Category, Product, StockEntry, Store } from "../lib/types.ts";

// Datos de ejemplo. Se usan cuando no hay Supabase configurado,
// y supabase/seed.sql carga los mismos datos en la base.

export const categories: Category[] = [
  { slug: "celulares", name: "Celulares y accesorios", emoji: "📱" },
  { slug: "hogar", name: "Hogar y cocina", emoji: "🏠" },
  { slug: "moda", name: "Moda", emoji: "👕" },
  { slug: "belleza", name: "Belleza y cuidado", emoji: "💄" },
  { slug: "colmado", name: "Colmado y despensa", emoji: "🛒" },
];

export const stores: Store[] = [
  { slug: "santo-domingo", name: "Todo Mío Santo Domingo", city: "Santo Domingo", address: "Av. Winston Churchill" },
  { slug: "santiago", name: "Todo Mío Santiago", city: "Santiago de los Caballeros", address: "Av. Juan Pablo Duarte" },
  { slug: "punta-cana", name: "Todo Mío Punta Cana", city: "Punta Cana", address: "Bávaro, Av. Barceló" },
];

export const products: Product[] = [
  { slug: "audifonos-bluetooth-pro", name: "Audífonos Bluetooth Pro", description: "Cancelación de ruido, 30 horas de batería y estuche de carga rápida.", price: 2450, compareAtPrice: 2990, categorySlug: "celulares", brand: "SonoMax", tags: ["audio", "inalambrico", "auriculares"], featured: true },
  { slug: "cargador-rapido-usb-c-25w", name: "Cargador rápido USB-C 25W", description: "Carga tu celular al 50% en 30 minutos. Incluye cable de 1 metro.", price: 890, categorySlug: "celulares", brand: "VoltPlus", tags: ["carga", "cable", "adaptador"] },
  { slug: "funda-antigolpes-transparente", name: "Funda antigolpes transparente", description: "Esquinas reforzadas y bordes elevados para proteger cámara y pantalla.", price: 450, categorySlug: "celulares", brand: "Escudo", tags: ["case", "proteccion", "estuche"] },
  { slug: "power-bank-20000", name: "Power bank 20,000 mAh", description: "Dos salidas USB y una USB-C. Carga dos celulares a la vez.", price: 1750, categorySlug: "celulares", brand: "VoltPlus", tags: ["bateria", "portatil", "carga"], featured: true },
  { slug: "licuadora-6-velocidades", name: "Licuadora 6 velocidades", description: "Vaso de vidrio de 1.5 litros y cuchillas de acero inoxidable. Ideal para batidas.", price: 3290, compareAtPrice: 3790, categorySlug: "hogar", brand: "CocinaFácil", tags: ["cocina", "electrodomestico", "batidas"], featured: true },
  { slug: "caldero-aluminio-24cm", name: "Caldero de aluminio 24 cm", description: "El caldero de toda la vida para el arroz y el concón.", price: 1450, categorySlug: "hogar", brand: "La Criolla", tags: ["cocina", "olla", "arroz"] },
  { slug: "abanico-pedestal-18", name: "Abanico de pedestal 18\"", description: "Tres velocidades, oscilación y altura ajustable. Bajo consumo.", price: 2890, categorySlug: "hogar", brand: "BrisaMar", tags: ["ventilador", "calor", "electrodomestico"] },
  { slug: "juego-sabanas-queen", name: "Juego de sábanas queen", description: "Microfibra suave, cuatro piezas. Varios colores.", price: 1990, categorySlug: "hogar", tags: ["cama", "dormitorio", "textil"] },
  { slug: "camiseta-algodon-unisex", name: "Camiseta de algodón unisex", description: "100% algodón, corte clásico. Tallas S a XXL.", price: 650, categorySlug: "moda", brand: "Caribe Wear", tags: ["ropa", "t-shirt", "playera"] },
  { slug: "tenis-deportivos-runner", name: "Tenis deportivos Runner", description: "Suela amortiguada y malla transpirable para correr o el día a día.", price: 3450, compareAtPrice: 3990, categorySlug: "moda", brand: "Paso Firme", tags: ["zapatos", "calzado", "deporte"], featured: true },
  { slug: "gorra-bordada", name: "Gorra bordada RD", description: "Gorra ajustable con bordado de la bandera dominicana.", price: 550, categorySlug: "moda", brand: "Caribe Wear", tags: ["accesorio", "sombrero"] },
  { slug: "protector-solar-spf50", name: "Protector solar SPF 50", description: "Resistente al agua, textura ligera. 200 ml.", price: 980, categorySlug: "belleza", brand: "Sol Caribe", tags: ["piel", "playa", "bloqueador"] },
  { slug: "crema-hidratante-coco", name: "Crema hidratante de coco", description: "Hidratación de 24 horas con aceite de coco natural.", price: 620, categorySlug: "belleza", brand: "Natural Isla", tags: ["piel", "corporal"] },
  { slug: "cafe-molido-1lb", name: "Café molido 1 lb", description: "Café dominicano de altura, tostado medio.", price: 395, categorySlug: "colmado", brand: "Cumbre", tags: ["desayuno", "bebida"], featured: true },
  { slug: "arroz-selecto-10lb", name: "Arroz selecto 10 lb", description: "Grano largo, cosecha nacional.", price: 520, categorySlug: "colmado", brand: "Campo Verde", tags: ["granos", "despensa"] },
  { slug: "habichuelas-rojas-lata", name: "Habichuelas rojas en lata", description: "Listas para guisar. Lata de 15 oz.", price: 85, categorySlug: "colmado", brand: "La Criolla", tags: ["granos", "enlatado", "frijoles"] },
];

const q = (productSlug: string, sd: number, sti: number, pc: number): StockEntry[] => [
  { productSlug, storeSlug: "santo-domingo", quantity: sd },
  { productSlug, storeSlug: "santiago", quantity: sti },
  { productSlug, storeSlug: "punta-cana", quantity: pc },
];

export const stock: StockEntry[] = [
  ...q("audifonos-bluetooth-pro", 12, 4, 0),
  ...q("cargador-rapido-usb-c-25w", 40, 25, 10),
  ...q("funda-antigolpes-transparente", 60, 30, 15),
  ...q("power-bank-20000", 3, 0, 2),
  ...q("licuadora-6-velocidades", 8, 5, 1),
  ...q("caldero-aluminio-24cm", 20, 18, 6),
  ...q("abanico-pedestal-18", 0, 7, 4),
  ...q("juego-sabanas-queen", 10, 0, 0),
  ...q("camiseta-algodon-unisex", 80, 50, 35),
  ...q("tenis-deportivos-runner", 6, 2, 0),
  ...q("gorra-bordada", 25, 10, 40),
  ...q("protector-solar-spf50", 15, 8, 30),
  ...q("crema-hidratante-coco", 22, 12, 9),
  ...q("cafe-molido-1lb", 100, 70, 20),
  ...q("arroz-selecto-10lb", 50, 45, 12),
  ...q("habichuelas-rojas-lata", 0, 0, 0),
];

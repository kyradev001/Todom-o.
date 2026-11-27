# Todo Mío

Tienda en línea (PWA) con catálogo, búsqueda y stock por tienda, pensada para vender también por WhatsApp, Facebook, Instagram y TikTok.

## Qué incluye (paso 1)

- **Catálogo** con categorías, marcas, ofertas y productos destacados. Precios en pesos dominicanos (RD$).
- **Búsqueda** sin importar acentos ni mayúsculas ("cafe" encuentra "Café"), por prefijo ("licua"), marca o etiqueta, con filtros por categoría y tienda, "solo disponibles" y orden por precio o nombre.
- **Stock por tienda**: cada producto muestra las unidades disponibles en Santo Domingo, Santiago y Punta Cana.
- **PWA instalable** en el celular, con manifiesto, ícono y un service worker que guarda las páginas ya visitadas.
- **Base de datos opcional en Supabase**: sin configurar nada, la tienda usa los datos de ejemplo de `data/seed.ts`.

## Cómo correrla

```bash
npm install
npm run dev      # http://localhost:3000
npm test         # pruebas de búsqueda y stock
npm run build    # compilación de producción
```

## Conectar Supabase (opcional)

1. Crea un proyecto en [supabase.com](https://supabase.com).
2. En el editor SQL ejecuta `supabase/schema.sql` y luego `supabase/seed.sql`.
3. Copia `.env.example` a `.env.local` y llena `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

Si cambias `data/seed.ts`, regenera el SQL con `npm run db:seed-sql`.

## Estructura

| Carpeta | Contenido |
| --- | --- |
| `app/` | Páginas: inicio, `/buscar`, `/categoria/[slug]`, `/producto/[slug]`, `/tiendas` |
| `components/` | Encabezado con buscador, tarjetas de producto, filtros |
| `lib/` | Búsqueda, acceso a datos (Supabase o datos de ejemplo), formato de precios |
| `data/seed.ts` | Productos, tiendas y stock de ejemplo |
| `supabase/` | Esquema SQL y datos iniciales |

## Próximos pasos

1. Carrito y pedido por WhatsApp (enlace `wa.me` con el pedido escrito).
2. Feed de catálogo para Meta (Facebook e Instagram) y TikTok Shop, más sus píxeles.
3. Stock en vivo con Supabase Realtime, pago en línea y panel de administración.

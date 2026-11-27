import type { Product, ProductWithStock, SearchParams } from "./types.ts";

/** Minúsculas y sin acentos, para que "cafe" encuentre "Café". */
export function normalize(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim();
}

export function tokenize(text: string): string[] {
  return normalize(text)
    .split(/[^a-z0-9ñ]+/)
    .filter((t) => t.length > 0);
}

/**
 * Puntuación de relevancia. 0 significa que el producto no coincide.
 * Cada palabra buscada debe aparecer en algún campo (por prefijo), y pesa más
 * si aparece en el nombre que en la marca, etiquetas o descripción.
 */
export function scoreProduct(product: Product, query: string): number {
  const terms = tokenize(query);
  if (terms.length === 0) return 1;

  const fields: [string[], number][] = [
    [tokenize(product.name), 10],
    [tokenize(product.brand ?? ""), 6],
    [product.tags.flatMap(tokenize), 5],
    [tokenize(product.categorySlug), 4],
    [tokenize(product.description), 1],
  ];

  let score = 0;
  for (const term of terms) {
    let best = 0;
    for (const [words, weight] of fields) {
      for (const word of words) {
        if (word === term) best = Math.max(best, weight * 2);
        else if (word.startsWith(term)) best = Math.max(best, weight);
      }
    }
    if (best === 0) return 0;
    score += best;
  }
  if (normalize(product.name).includes(normalize(query))) score += 15;
  return score;
}

export function searchProducts(
  products: ProductWithStock[],
  params: SearchParams,
): ProductWithStock[] {
  const q = params.q?.trim() ?? "";
  const scored: { p: ProductWithStock; score: number }[] = [];

  for (const p of products) {
    if (params.category && p.categorySlug !== params.category) continue;
    const storeQty = params.store
      ? (p.stockByStore.find((s) => s.store.slug === params.store)?.quantity ?? 0)
      : p.totalStock;
    if (params.inStockOnly && storeQty <= 0) continue;
    const score = scoreProduct(p, q);
    if (score > 0) scored.push({ p, score });
  }

  const sort = params.sort ?? "relevancia";
  scored.sort((a, b) => {
    switch (sort) {
      case "precio-asc":
        return a.p.price - b.p.price;
      case "precio-desc":
        return b.p.price - a.p.price;
      case "nombre":
        return a.p.name.localeCompare(b.p.name, "es");
      default:
        // Relevancia; a igualdad, primero lo que hay en stock.
        return b.score - a.score || Number(b.p.totalStock > 0) - Number(a.p.totalStock > 0);
    }
  });

  return scored.map((s) => s.p);
}

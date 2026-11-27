import type { SearchParams, SortOrder } from "./types.ts";

const SORTS: SortOrder[] = ["relevancia", "precio-asc", "precio-desc", "nombre"];

type Raw = Record<string, string | string[] | undefined>;

const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) || undefined;

/** Convierte los parámetros de la URL (?q=&categoria=&tienda=&orden=&disponible=) en filtros. */
export function parseSearchParams(raw: Raw): SearchParams {
  const sort = first(raw.orden) as SortOrder | undefined;
  return {
    q: first(raw.q),
    category: first(raw.categoria),
    store: first(raw.tienda),
    inStockOnly: first(raw.disponible) === "1",
    sort: sort && SORTS.includes(sort) ? sort : "relevancia",
  };
}

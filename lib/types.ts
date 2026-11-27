export type Category = {
  slug: string;
  name: string;
  emoji: string;
};

export type Store = {
  slug: string;
  name: string;
  city: string;
  address: string;
};

export type Product = {
  slug: string;
  name: string;
  description: string;
  /** Precio en pesos dominicanos (DOP), sin centavos decimales: 1250 = RD$1,250. */
  price: number;
  /** Precio anterior, si el producto está en oferta. */
  compareAtPrice?: number;
  categorySlug: string;
  brand?: string;
  tags: string[];
  /** URL de la foto. Si falta, se muestra un marcador con el emoji de la categoría. */
  image?: string;
  featured?: boolean;
};

/** Unidades disponibles de un producto en una tienda. */
export type StockEntry = {
  productSlug: string;
  storeSlug: string;
  quantity: number;
};

export type ProductWithStock = Product & {
  categoryEmoji: string;
  totalStock: number;
  stockByStore: { store: Store; quantity: number }[];
};

export type SortOrder = "relevancia" | "precio-asc" | "precio-desc" | "nombre";

export type SearchParams = {
  q?: string;
  category?: string;
  store?: string;
  inStockOnly?: boolean;
  sort?: SortOrder;
};

import type { Category, Product, ProductWithStock, StockEntry, Store } from "./types.ts";

export function joinStock(
  products: Product[],
  categories: Category[],
  stores: Store[],
  stock: StockEntry[],
): ProductWithStock[] {
  return products.map((p) => {
    const categoryEmoji = categories.find((c) => c.slug === p.categorySlug)?.emoji ?? "🛍️";
    const stockByStore = stores.map((store) => ({
      store,
      quantity:
        stock.find((s) => s.productSlug === p.slug && s.storeSlug === store.slug)?.quantity ?? 0,
    }));
    return {
      ...p,
      categoryEmoji,
      stockByStore,
      totalStock: stockByStore.reduce((sum, s) => sum + s.quantity, 0),
    };
  });
}

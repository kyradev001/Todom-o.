import "server-only";
import { createClient } from "@supabase/supabase-js";
import * as seed from "../data/seed.ts";
import { joinStock } from "./join.ts";
import { searchProducts } from "./search.ts";
import type { Category, Product, ProductWithStock, SearchParams, StockEntry, Store } from "./types.ts";

type CatalogData = {
  categories: Category[];
  stores: Store[];
  products: Product[];
  stock: StockEntry[];
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const usingSupabase = Boolean(supabaseUrl && supabaseKey);

async function loadFromSupabase(): Promise<CatalogData> {
  const sb = createClient(supabaseUrl!, supabaseKey!, { auth: { persistSession: false } });
  const [cats, sts, prods, stk] = await Promise.all([
    sb.from("categories").select("slug, name, emoji").order("name"),
    sb.from("stores").select("slug, name, city, address").order("name"),
    sb
      .from("products")
      .select("slug, name, description, price, compare_at_price, category_slug, brand, tags, image, featured")
      .eq("active", true),
    sb.from("stock").select("product_slug, store_slug, quantity"),
  ]);
  for (const r of [cats, sts, prods, stk]) if (r.error) throw r.error;

  return {
    categories: cats.data!,
    stores: sts.data!,
    products: prods.data!.map((p) => ({
      slug: p.slug,
      name: p.name,
      description: p.description ?? "",
      price: Number(p.price),
      compareAtPrice: p.compare_at_price == null ? undefined : Number(p.compare_at_price),
      categorySlug: p.category_slug,
      brand: p.brand ?? undefined,
      tags: p.tags ?? [],
      image: p.image ?? undefined,
      featured: p.featured ?? false,
    })),
    stock: stk.data!.map((s) => ({
      productSlug: s.product_slug,
      storeSlug: s.store_slug,
      quantity: s.quantity,
    })),
  };
}

async function load(): Promise<CatalogData> {
  return usingSupabase ? loadFromSupabase() : seed;
}

export async function getCategories(): Promise<Category[]> {
  return (await load()).categories;
}

export async function getStores(): Promise<Store[]> {
  return (await load()).stores;
}

export async function getProducts(): Promise<ProductWithStock[]> {
  const d = await load();
  return joinStock(d.products, d.categories, d.stores, d.stock);
}

export async function getProduct(slug: string): Promise<ProductWithStock | undefined> {
  return (await getProducts()).find((p) => p.slug === slug);
}

export async function search(params: SearchParams): Promise<ProductWithStock[]> {
  return searchProducts(await getProducts(), params);
}

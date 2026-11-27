// Genera supabase/seed.sql a partir de data/seed.ts.
// Uso: node --experimental-strip-types scripts/generate-seed-sql.ts > supabase/seed.sql
import { categories, products, stock, stores } from "../data/seed.ts";

const s = (v: string | undefined | null) => (v == null ? "null" : `'${v.replace(/'/g, "''")}'`);
const arr = (v: string[]) => `array[${v.map(s).join(", ")}]::text[]`;

const out: string[] = ["-- Generado por scripts/generate-seed-sql.ts. No editar a mano.", "begin;"];
for (const c of categories)
  out.push(`insert into categories (slug, name, emoji) values (${s(c.slug)}, ${s(c.name)}, ${s(c.emoji)}) on conflict (slug) do update set name = excluded.name, emoji = excluded.emoji;`);
for (const t of stores)
  out.push(`insert into stores (slug, name, city, address) values (${s(t.slug)}, ${s(t.name)}, ${s(t.city)}, ${s(t.address)}) on conflict (slug) do update set name = excluded.name, city = excluded.city, address = excluded.address;`);
for (const p of products)
  out.push(
    `insert into products (slug, name, description, price, compare_at_price, category_slug, brand, tags, image, featured) values (${s(p.slug)}, ${s(p.name)}, ${s(p.description)}, ${p.price}, ${p.compareAtPrice ?? "null"}, ${s(p.categorySlug)}, ${s(p.brand)}, ${arr(p.tags)}, ${s(p.image)}, ${p.featured ? "true" : "false"}) on conflict (slug) do nothing;`,
  );
for (const k of stock)
  out.push(`insert into stock (product_slug, store_slug, quantity) values (${s(k.productSlug)}, ${s(k.storeSlug)}, ${k.quantity}) on conflict (product_slug, store_slug) do update set quantity = excluded.quantity;`);
out.push("commit;");
console.log(out.join("\n"));

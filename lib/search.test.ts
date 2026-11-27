import assert from "node:assert/strict";
import { test } from "node:test";
import { categories, products, stock, stores } from "../data/seed.ts";
import { parseSearchParams } from "./params.ts";
import { joinStock } from "./join.ts";
import { normalize, searchProducts } from "./search.ts";

const all = joinStock(products, categories, stores, stock);
const slugs = (q: Parameters<typeof searchProducts>[1]) => searchProducts(all, q).map((p) => p.slug);

test("normalize quita acentos y mayúsculas", () => {
  assert.equal(normalize("  Café ÁRBOL "), "cafe arbol");
});

test("búsqueda sin acentos encuentra productos con acentos", () => {
  assert.deepEqual(slugs({ q: "cafe" }), ["cafe-molido-1lb"]);
  assert.ok(slugs({ q: "audifonos" }).includes("audifonos-bluetooth-pro"));
});

test("búsqueda por prefijo, marca y etiqueta", () => {
  assert.ok(slugs({ q: "licua" }).includes("licuadora-6-velocidades"));
  assert.deepEqual(slugs({ q: "voltplus" }).sort(), ["cargador-rapido-usb-c-25w", "power-bank-20000"]);
  assert.ok(slugs({ q: "frijoles" }).includes("habichuelas-rojas-lata"));
});

test("todas las palabras deben coincidir", () => {
  assert.deepEqual(slugs({ q: "cargador xyzzy" }), []);
});

test("el nombre pesa más que la descripción", () => {
  assert.equal(slugs({ q: "carga" })[0], "cargador-rapido-usb-c-25w");
});

test("filtro por categoría", () => {
  const r = searchProducts(all, { category: "moda" });
  assert.ok(r.length > 0 && r.every((p) => p.categorySlug === "moda"));
});

test("filtro de disponibles por tienda", () => {
  const r = slugs({ store: "punta-cana", inStockOnly: true });
  assert.ok(!r.includes("audifonos-bluetooth-pro")); // 0 en Punta Cana
  assert.ok(r.includes("gorra-bordada"));
  assert.ok(!slugs({ inStockOnly: true }).includes("habichuelas-rojas-lata")); // agotado en todas
});

test("orden por precio", () => {
  const r = searchProducts(all, { sort: "precio-asc" });
  for (let i = 1; i < r.length; i++) assert.ok(r[i - 1].price <= r[i].price);
});

test("stock total suma todas las tiendas", () => {
  const p = all.find((x) => x.slug === "audifonos-bluetooth-pro")!;
  assert.equal(p.totalStock, 16);
  assert.equal(p.categoryEmoji, "📱");
});

test("parseSearchParams ignora orden inválido", () => {
  assert.deepEqual(parseSearchParams({ q: "x", orden: "malo", disponible: "1", tienda: ["santiago", "otra"] }), {
    q: "x",
    category: undefined,
    store: "santiago",
    inStockOnly: true,
    sort: "relevancia",
  });
});

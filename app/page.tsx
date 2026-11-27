import Link from "next/link";
import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import { getCategories, getProducts } from "@/lib/catalog";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [categories, products] = await Promise.all([getCategories(), getProducts()]);
  const featured = products.filter((p) => p.featured);
  const deals = products.filter((p) => p.compareAtPrice && p.totalStock > 0);

  return (
    <>
      <Header />
      <main className="container">
        <section className="hero">
          <h1>Todo lo que buscas, en tu tienda más cercana</h1>
          <p>Mira el stock en tiempo real de cada sucursal y compra en línea.</p>
        </section>

        <section>
          <h2>Categorías</h2>
          <div className="categories">
            {categories.map((c) => (
              <Link key={c.slug} href={`/categoria/${c.slug}`} className="category">
                <span className="category-emoji">{c.emoji}</span>
                {c.name}
              </Link>
            ))}
          </div>
        </section>

        {deals.length > 0 && (
          <section>
            <h2>Ofertas</h2>
            <div className="grid">
              {deals.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </section>
        )}

        <section>
          <h2>Destacados</h2>
          <div className="grid">
            {featured.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

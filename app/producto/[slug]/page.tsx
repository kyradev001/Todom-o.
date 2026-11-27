import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import { ProductImage } from "@/components/ProductImage";
import { getCategories, getProduct, getProducts } from "@/lib/catalog";
import { formatPrice, stockLabel } from "@/lib/format";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProduct((await params).slug);
  if (!product) return { title: "Producto no encontrado" };
  return {
    title: product.name,
    description: product.description,
    openGraph: { title: product.name, description: product.description, images: product.image ? [product.image] : [] },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const [categories, all] = await Promise.all([getCategories(), getProducts()]);
  const category = categories.find((c) => c.slug === product.categorySlug);
  const related = all.filter((p) => p.categorySlug === product.categorySlug && p.slug !== product.slug).slice(0, 4);

  return (
    <>
      <Header />
      <main className="container">
        <nav className="breadcrumb">
          <Link href="/">Inicio</Link> ›{" "}
          {category && <Link href={`/categoria/${category.slug}`}>{category.name}</Link>}
        </nav>
        <article className="product">
          <ProductImage product={product} large />
          <div className="product-info">
            {product.brand && <div className="brand">{product.brand}</div>}
            <h1>{product.name}</h1>
            <div className="price-row">
              <span className="price big">{formatPrice(product.price)}</span>
              {product.compareAtPrice && <s className="old-price">{formatPrice(product.compareAtPrice)}</s>}
            </div>
            <p>{product.description}</p>

            <h2>Disponibilidad por tienda</h2>
            <ul className="store-stock">
              {product.stockByStore.map(({ store, quantity }) => (
                <li key={store.slug}>
                  <div>
                    <strong>{store.city}</strong>
                    <span>{store.address}</span>
                  </div>
                  <span className={quantity > 0 ? "stock ok" : "stock out"}>{stockLabel(quantity)}</span>
                </li>
              ))}
            </ul>
            <button className="primary" disabled title="El carrito llega en el paso 2">
              {product.totalStock > 0 ? "Agregar al carrito (próximamente)" : "Agotado"}
            </button>
          </div>
        </article>

        {related.length > 0 && (
          <section>
            <h2>También te puede interesar</h2>
            <div className="grid">
              {related.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </section>
        )}
      </main>
    </>
  );
}

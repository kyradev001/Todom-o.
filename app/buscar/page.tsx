import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import { SearchFilters } from "@/components/SearchFilters";
import { getCategories, getStores, search } from "@/lib/catalog";
import { parseSearchParams } from "@/lib/params";

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { q } = parseSearchParams(await searchParams);
  return { title: q ? `Resultados para "${q}"` : "Buscar" };
}

export default async function SearchPage({ searchParams }: Props) {
  const params = parseSearchParams(await searchParams);
  const [results, categories, stores] = await Promise.all([search(params), getCategories(), getStores()]);

  return (
    <>
      <Header query={params.q} />
      <main className="container">
        <h1 className="page-title">
          {params.q ? <>Resultados para “{params.q}”</> : "Todos los productos"}
          <small>
            {results.length} {results.length === 1 ? "producto" : "productos"}
          </small>
        </h1>
        <SearchFilters params={params} categories={categories} stores={stores} />
        {results.length > 0 ? (
          <div className="grid">
            {results.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        ) : (
          <p className="empty">No encontramos productos con esa búsqueda. Prueba con otras palabras o quita filtros.</p>
        )}
      </main>
    </>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import { SearchFilters } from "@/components/SearchFilters";
import { getCategories, getStores, search } from "@/lib/catalog";
import { parseSearchParams } from "@/lib/params";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = (await getCategories()).find((c) => c.slug === slug);
  return { title: category?.name ?? "Categoría" };
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const [categories, stores] = await Promise.all([getCategories(), getStores()]);
  const category = categories.find((c) => c.slug === slug);
  if (!category) notFound();

  const filters = { ...parseSearchParams(await searchParams), category: slug };
  const results = await search(filters);

  return (
    <>
      <Header />
      <main className="container">
        <h1 className="page-title">
          {category.emoji} {category.name}
          <small>
            {results.length} {results.length === 1 ? "producto" : "productos"}
          </small>
        </h1>
        <SearchFilters
          params={filters}
          categories={categories}
          stores={stores}
          showCategory={false}
          action={`/categoria/${slug}`}
        />
        <div className="grid">
          {results.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </main>
    </>
  );
}

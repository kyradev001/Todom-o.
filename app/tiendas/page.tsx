import Link from "next/link";
import { Header } from "@/components/Header";
import { getProducts, getStores } from "@/lib/catalog";

export const metadata = { title: "Tiendas" };
export const dynamic = "force-dynamic";

export default async function StoresPage() {
  const [stores, products] = await Promise.all([getStores(), getProducts()]);
  return (
    <>
      <Header />
      <main className="container">
        <h1 className="page-title">Nuestras tiendas</h1>
        <div className="stores">
          {stores.map((store) => {
            const available = products.filter((p) =>
              p.stockByStore.some((s) => s.store.slug === store.slug && s.quantity > 0),
            ).length;
            return (
              <div key={store.slug} className="store-card">
                <h2>{store.name}</h2>
                <p>
                  {store.address}, {store.city}
                </p>
                <p>{available} productos disponibles</p>
                <Link href={`/buscar?tienda=${store.slug}&disponible=1`}>Ver lo disponible aquí →</Link>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
}

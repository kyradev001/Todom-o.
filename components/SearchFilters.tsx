import type { Category, SearchParams, Store } from "@/lib/types";

export function SearchFilters({
  params,
  categories,
  stores,
  showCategory = true,
  action = "/buscar",
}: {
  params: SearchParams;
  categories: Category[];
  stores: Store[];
  showCategory?: boolean;
  action?: string;
}) {
  return (
    <form action={action} className="filters">
      {params.q !== undefined && <input type="hidden" name="q" value={params.q} />}
      {showCategory && (
        <label>
          Categoría
          <select name="categoria" defaultValue={params.category ?? ""}>
            <option value="">Todas</option>
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </label>
      )}
      <label>
        Tienda
        <select name="tienda" defaultValue={params.store ?? ""}>
          <option value="">Todas las tiendas</option>
          {stores.map((s) => (
            <option key={s.slug} value={s.slug}>
              {s.city}
            </option>
          ))}
        </select>
      </label>
      <label>
        Ordenar
        <select name="orden" defaultValue={params.sort ?? "relevancia"}>
          <option value="relevancia">Relevancia</option>
          <option value="precio-asc">Precio: menor a mayor</option>
          <option value="precio-desc">Precio: mayor a menor</option>
          <option value="nombre">Nombre</option>
        </select>
      </label>
      <label className="checkbox">
        <input type="checkbox" name="disponible" value="1" defaultChecked={params.inStockOnly} />
        Solo disponibles
      </label>
      <button type="submit">Aplicar</button>
    </form>
  );
}

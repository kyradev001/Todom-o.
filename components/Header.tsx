import Link from "next/link";

export function Header({ query = "" }: { query?: string }) {
  return (
    <header className="header">
      <div className="container header-inner">
        <Link href="/" className="logo">
          Todo <span>Mío</span>
        </Link>
        <form action="/buscar" className="search" role="search">
          <input
            type="search"
            name="q"
            defaultValue={query}
            placeholder="Buscar productos, marcas y más…"
            aria-label="Buscar productos"
          />
          <button type="submit">Buscar</button>
        </form>
        <nav className="nav">
          <Link href="/tiendas">Tiendas</Link>
        </nav>
      </div>
    </header>
  );
}

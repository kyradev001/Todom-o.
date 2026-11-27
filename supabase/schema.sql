-- Esquema de la base de datos para Supabase (Postgres).
-- Ejecútalo en el editor SQL de Supabase y luego supabase/seed.sql para cargar datos de ejemplo.

create table if not exists categories (
  slug  text primary key,
  name  text not null,
  emoji text not null default '🛍️'
);

create table if not exists stores (
  slug    text primary key,
  name    text not null,
  city    text not null,
  address text not null default ''
);

create table if not exists products (
  slug             text primary key,
  name             text not null,
  description      text not null default '',
  price            numeric(12, 2) not null check (price >= 0),
  compare_at_price numeric(12, 2) check (compare_at_price is null or compare_at_price >= 0),
  category_slug    text not null references categories(slug),
  brand            text,
  tags             text[] not null default '{}',
  image            text,
  featured         boolean not null default false,
  active           boolean not null default true,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

-- Unidades de cada producto en cada tienda.
create table if not exists stock (
  product_slug text not null references products(slug) on delete cascade,
  store_slug   text not null references stores(slug) on delete cascade,
  quantity     integer not null default 0 check (quantity >= 0),
  updated_at   timestamptz not null default now(),
  primary key (product_slug, store_slug)
);

create index if not exists products_category_idx on products(category_slug);

-- Lectura pública del catálogo; las escrituras quedan reservadas al panel/servicio.
alter table categories enable row level security;
alter table stores     enable row level security;
alter table products   enable row level security;
alter table stock      enable row level security;

drop policy if exists "lectura publica" on categories;
drop policy if exists "lectura publica" on stores;
drop policy if exists "lectura publica" on products;
drop policy if exists "lectura publica" on stock;
create policy "lectura publica" on categories for select using (true);
create policy "lectura publica" on stores     for select using (true);
create policy "lectura publica" on products   for select using (active);
create policy "lectura publica" on stock      for select using (true);

-- Permite escuchar cambios de stock en tiempo real (Supabase Realtime).
do $$
begin
  alter publication supabase_realtime add table stock;
exception when others then null;
end $$;

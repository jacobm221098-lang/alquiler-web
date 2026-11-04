-- ============================================================
--  Tabla de anuncios + seguridad (RLS) para AlquilaCR
--  Pegar y ejecutar en Supabase → SQL Editor → New query → Run
-- ============================================================

create table if not exists anuncios (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid references auth.users(id) on delete cascade not null,
  categoria   text not null,
  titulo      text not null,
  provincia   text,
  canton      text,
  precio      numeric not null,
  unidad      text not null default 'mes',
  descripcion text,
  foto        text,
  contacto    text,
  created_at  timestamptz default now()
);

-- Activar Row Level Security (sin esto, nadie puede leer ni escribir)
alter table anuncios enable row level security;

-- Cualquiera (incluso sin login) puede VER los anuncios
create policy "lectura publica"
  on anuncios for select
  using (true);

-- Solo un usuario logueado puede INSERTAR, y solo a su propio nombre
create policy "insertar propio"
  on anuncios for insert
  with check (auth.uid() = user_id);

-- Solo el dueño puede EDITAR o BORRAR su anuncio
create policy "editar propio"
  on anuncios for update
  using (auth.uid() = user_id);

create policy "borrar propio"
  on anuncios for delete
  using (auth.uid() = user_id);

-- ============================================================
--  Tabla de PERFILES (rol vendedor / comprador)
-- ============================================================
create table if not exists perfiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  rol     text not null default 'comprador' check (rol in ('comprador','vendedor')),
  creado  timestamptz default now()
);

alter table perfiles enable row level security;

create policy "ver perfiles"    on perfiles for select using (true);
create policy "crear mi perfil" on perfiles for insert with check (auth.uid() = user_id);
create policy "editar mi perfil" on perfiles for update using (auth.uid() = user_id);

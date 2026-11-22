create table categorias (
  id bigint generated always as identity primary key,
  user_id uuid references auth.users not null default auth.uid(),
  nome text not null,
  created_at timestamptz default now()
);

create table gastos (
  id bigint generated always as identity primary key,
  user_id uuid references auth.users not null default auth.uid(),
  categoria_id bigint references categorias(id) on delete set null,
  descricao text not null,
  valor numeric(10,2) not null,
  data date default current_date
);

create table orcamentos (
  id bigint generated always as identity primary key,
  user_id uuid references auth.users not null default auth.uid(),
  categoria_id bigint references categorias(id) on delete cascade,
  limite numeric(10,2) not null,
  mes date not null
);

alter table categorias enable row level security;
alter table gastos enable row level security;
alter table orcamentos enable row level security;

create policy "dono acessa categorias" on categorias for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "dono acessa gastos" on gastos for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "dono acessa orcamentos" on orcamentos for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);
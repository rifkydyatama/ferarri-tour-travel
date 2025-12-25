-- Migration: Create tour_packages table
create table if not exists public.tour_packages (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  location text not null,
  duration text not null,
  price_from integer not null,
  hero_image text not null,
  highlights jsonb not null default '[]'::jsonb,
  itinerary jsonb not null default '[]'::jsonb,
  inclusions jsonb not null default '[]'::jsonb,
  exclusions jsonb not null default '[]'::jsonb,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Enable RLS
alter table public.tour_packages enable row level security;

-- Public read access
create policy "Allow public read access"
on public.tour_packages
for select
to anon, authenticated
using (is_active = true);

-- Admin full access
create policy "Allow admin full access"
on public.tour_packages
for all
to authenticated
using (
  exists (
    select 1 from public.admin_users
    where user_id = auth.uid()
  )
);

-- Trigger for updated_at
create trigger trg_tour_packages_updated_at
before update on public.tour_packages
for each row execute function public.set_updated_at();
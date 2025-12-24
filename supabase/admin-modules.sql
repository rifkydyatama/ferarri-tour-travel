-- Admin modules schema (itinerary/armada/payroll/tracking)
-- Run this in Supabase SQL editor.

-- UUID helper
create extension if not exists pgcrypto;

-- Helper: check if current user is in admin allowlist
create or replace function public.is_admin_user()
returns boolean
language sql
stable
as $$
  select exists (
    select 1
    from public.admin_users au
    where au.user_id = auth.uid()
  );
$$;

-- =====================
-- Itineraries
-- =====================
create table if not exists public.itineraries (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  start_date date null,
  end_date date null,
  notes text null,
  status text not null default 'Draft',
  created_at timestamptz not null default now()
);

create index if not exists itineraries_created_at_idx on public.itineraries (created_at desc);

alter table public.itineraries enable row level security;

drop policy if exists "Admin read itineraries" on public.itineraries;
drop policy if exists "Admin write itineraries" on public.itineraries;

create policy "Admin read itineraries"
on public.itineraries
for select
to authenticated
using (public.is_admin_user());

create policy "Admin write itineraries"
on public.itineraries
for all
to authenticated
using (public.is_admin_user())
with check (public.is_admin_user());

-- =====================
-- Armada
-- =====================
create table if not exists public.armada (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  plate_number text null,
  capacity int null,
  status text not null default 'Active',
  created_at timestamptz not null default now()
);

create index if not exists armada_created_at_idx on public.armada (created_at desc);

alter table public.armada enable row level security;

drop policy if exists "Admin read armada" on public.armada;
drop policy if exists "Admin write armada" on public.armada;

create policy "Admin read armada"
on public.armada
for select
to authenticated
using (public.is_admin_user());

create policy "Admin write armada"
on public.armada
for all
to authenticated
using (public.is_admin_user())
with check (public.is_admin_user());

-- =====================
-- Payroll Entries
-- =====================
create table if not exists public.payroll_entries (
  id uuid primary key default gen_random_uuid(),
  employee_name text not null,
  period text not null,
  amount numeric not null,
  notes text null,
  status text not null default 'Draft',
  created_at timestamptz not null default now()
);

create index if not exists payroll_entries_created_at_idx on public.payroll_entries (created_at desc);

alter table public.payroll_entries enable row level security;

drop policy if exists "Admin read payroll" on public.payroll_entries;
drop policy if exists "Admin write payroll" on public.payroll_entries;

create policy "Admin read payroll"
on public.payroll_entries
for select
to authenticated
using (public.is_admin_user());

create policy "Admin write payroll"
on public.payroll_entries
for all
to authenticated
using (public.is_admin_user())
with check (public.is_admin_user());

-- =====================
-- Armada Tracking Events
-- =====================
create table if not exists public.armada_tracking_events (
  id uuid primary key default gen_random_uuid(),
  armada_label text not null,
  location text not null,
  note text not null,
  timestamp timestamptz not null default now()
);

create index if not exists armada_tracking_events_timestamp_idx on public.armada_tracking_events (timestamp desc);

alter table public.armada_tracking_events enable row level security;

drop policy if exists "Admin read tracking" on public.armada_tracking_events;
drop policy if exists "Admin write tracking" on public.armada_tracking_events;

create policy "Admin read tracking"
on public.armada_tracking_events
for select
to authenticated
using (public.is_admin_user());

create policy "Admin write tracking"
on public.armada_tracking_events
for all
to authenticated
using (public.is_admin_user())
with check (public.is_admin_user());

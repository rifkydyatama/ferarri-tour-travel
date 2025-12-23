-- Minimal table for CMS-like site content
-- Run this in Supabase SQL editor.

create table if not exists public.site_pages (
  slug text primary key,
  content jsonb not null,
  updated_at timestamptz not null default now()
);

-- Admin allowlist (who can access /admin dashboard)
-- Notes:
-- - This app uses Supabase Auth for email+password login (no hardcoded password).
-- - Add a user to this table to grant admin access.
create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;

-- Allow logged-in users to read only their own row (used by requireAdminUser())
drop policy if exists "admin_users_select_self" on public.admin_users;
create policy "admin_users_select_self"
on public.admin_users
for select
to authenticated
using (auth.uid() = user_id);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_site_pages_updated_at on public.site_pages;
create trigger trg_site_pages_updated_at
before update on public.site_pages
for each row execute function public.set_updated_at();

-- Seed example row (optional)
-- insert into public.site_pages (slug, content) values ('home', '{}'::jsonb)
-- on conflict (slug) do nothing;

-- Migration: Create tour_reviews table
create table if not exists public.tour_reviews (
  id uuid primary key default gen_random_uuid(),
  package_id uuid not null references public.tour_packages(id) on delete cascade,
  user_name text not null, -- In a real app, this would be a user_id foreign key
  rating integer not null check (rating >= 1 and rating <= 5),
  comment text,
  created_at timestamptz not null default now()
);

-- Enable RLS
alter table public.tour_reviews enable row level security;

-- Public read access
create policy "Allow public read access"
on public.tour_reviews
for select
to anon, authenticated
using (true);

-- Allow users to insert their own reviews
-- For this simple implementation, we allow any authenticated user to insert.
-- A real implementation might check if the user has booked the tour.
create policy "Allow authenticated users to insert"
on public.tour_reviews
for insert
to authenticated
with check (true);

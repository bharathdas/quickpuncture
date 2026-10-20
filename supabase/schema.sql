-- Bookings table for QuickPuncture
create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  booking_ref text unique not null,
  vehicle_type text not null,
  service_id text not null,
  service_title text not null,
  price numeric not null,
  eta_minutes integer not null,
  name text not null,
  phone text not null,
  address text not null,
  preferred_time text,
  notes text,
  status text not null default 'received',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Automatically enable Row Level Security on this table
alter table public.bookings enable row level security;

-- Allow anyone (using the anon/public key) to create a booking
create policy "Anyone can insert a booking"
on public.bookings for insert
to anon
with check (true);

-- Allow anyone to read bookings (needed for /track lookup and /dashboard)
create policy "Anyone can read bookings"
on public.bookings for select
to anon
using (true);

-- Allow anyone to update a booking's status (needed for the tracking auto-progress demo)
create policy "Anyone can update bookings"
on public.bookings for update
to anon
using (true);
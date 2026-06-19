-- Run this in the Supabase SQL editor (Dashboard → SQL Editor → New query).

create extension if not exists "pgcrypto";

create table if not exists public.submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  project text,
  stack text,
  message text not null,
  created_at timestamptz not null default now()
);

-- Enable Row Level Security. The app uses the service-role key on the server,
-- which bypasses RLS, so no public policies are needed. This keeps the table
-- locked down to anonymous/public clients.
alter table public.submissions enable row level security;

create index if not exists submissions_created_at_idx
  on public.submissions (created_at desc);

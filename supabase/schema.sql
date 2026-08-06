-- ─────────────────────────────────────────────────────────────
-- Infinite Passport — Supabase Schema
-- Run in the Supabase SQL editor, or via `supabase db push`.
-- ─────────────────────────────────────────────────────────────

create extension if not exists "uuid-ossp";

-- ── Members ─────────────────────────────────────────────────
create table members (
  id uuid primary key default uuid_generate_v4(),
  auth_user_id uuid references auth.users (id) on delete cascade unique,
  full_name text not null,
  email text not null unique,
  avatar_url text,
  chapter text not null default 'YPO Bolivia',
  member_since date not null default now(),
  role text not null default 'member' check (role in ('member', 'spouse', 'chapter_manager', 'admin')),
  bio text,
  city text,
  country text,
  created_at timestamptz not null default now()
);

-- ── Stamp definitions (the reusable "die set") ─────────────
create table stamp_definitions (
  id text primary key, -- slug, e.g. 'explorer'
  name text not null,
  category text not null check (category in
    ('learning','connection','wellness','leadership','community','family','global','special')),
  description text not null,
  icon text not null,
  rare boolean not null default false,
  secret boolean not null default false,
  created_by uuid references members (id),
  created_at timestamptz not null default now()
);

-- ── Events ──────────────────────────────────────────────────
create table events (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  category text not null,
  city text not null,
  country text not null,
  event_date date not null,
  cover_image_url text,
  description text,
  linked_stamp_definition_id text references stamp_definitions (id),
  created_by uuid references members (id),
  created_at timestamptz not null default now()
);

-- ── Stamp instances (an awarded stamp) ─────────────────────
create table stamp_instances (
  id uuid primary key default uuid_generate_v4(),
  definition_id text not null references stamp_definitions (id),
  member_id uuid not null references members (id) on delete cascade,
  event_id uuid references events (id),
  awarded_at timestamptz not null default now(),
  city text not null,
  country text not null,
  note text,
  gallery text[] default '{}',
  awarded_by uuid references members (id),
  created_at timestamptz not null default now()
);

-- ── Notifications ───────────────────────────────────────────
create table notifications (
  id uuid primary key default uuid_generate_v4(),
  chapter text not null default 'YPO Bolivia',
  title text not null,
  body text not null,
  sent_by uuid references members (id),
  sent_at timestamptz not null default now()
);

-- ── Storage buckets ─────────────────────────────────────────
insert into storage.buckets (id, name, public) values ('avatars', 'avatars', true) on conflict do nothing;
insert into storage.buckets (id, name, public) values ('gallery', 'gallery', true) on conflict do nothing;
insert into storage.buckets (id, name, public) values ('event-covers', 'event-covers', true) on conflict do nothing;

-- ── Row Level Security ──────────────────────────────────────
alter table members enable row level security;
alter table stamp_instances enable row level security;
alter table events enable row level security;
alter table stamp_definitions enable row level security;
alter table notifications enable row level security;

-- Members can read their own row and any chapter-mate's public fields
create policy "members_select_own_chapter" on members
  for select using (true);

create policy "members_update_own" on members
  for update using (auth.uid() = auth_user_id);

-- Everyone can read stamp definitions and events (catalog data)
create policy "stamp_definitions_read_all" on stamp_definitions for select using (true);
create policy "events_read_all" on events for select using (true);
create policy "notifications_read_all" on notifications for select using (true);

-- Members can read their own stamp instances; chapter managers/admins read all
create policy "stamp_instances_read_own_or_admin" on stamp_instances
  for select using (
    member_id in (select id from members where auth_user_id = auth.uid())
    or exists (
      select 1 from members
      where auth_user_id = auth.uid() and role in ('chapter_manager', 'admin')
    )
  );

-- Only chapter managers/admins can write events, stamp definitions, and awards
create policy "chapter_manager_write_events" on events
  for insert with check (
    exists (select 1 from members where auth_user_id = auth.uid() and role in ('chapter_manager', 'admin'))
  );

create policy "chapter_manager_write_stamp_definitions" on stamp_definitions
  for insert with check (
    exists (select 1 from members where auth_user_id = auth.uid() and role in ('chapter_manager', 'admin'))
  );

create policy "chapter_manager_award_stamps" on stamp_instances
  for insert with check (
    exists (select 1 from members where auth_user_id = auth.uid() and role in ('chapter_manager', 'admin'))
  );

create policy "chapter_manager_remove_stamps" on stamp_instances
  for delete using (
    exists (select 1 from members where auth_user_id = auth.uid() and role in ('chapter_manager', 'admin'))
  );

create policy "chapter_manager_send_notifications" on notifications
  for insert with check (
    exists (select 1 from members where auth_user_id = auth.uid() and role in ('chapter_manager', 'admin'))
  );

-- ── Realtime ────────────────────────────────────────────────
-- Enables live stamp-unlock animations: subscribe on the client to
-- postgres_changes on stamp_instances filtered by member_id.
alter publication supabase_realtime add table stamp_instances;
alter publication supabase_realtime add table notifications;

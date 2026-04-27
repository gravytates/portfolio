-- ============================================================
-- 0001_initial_schema.sql
-- Full schema for gradyshelton.com portfolio redesign
-- ============================================================

-- ── Enums ───────────────────────────────────────────────────

create type public.user_role as enum ('admin', 'editor');
create type public.post_type as enum ('book-review', 'novel-update', 'essay');
create type public.post_status as enum ('draft', 'published');
create type public.media_type as enum ('image', 'gif', 'video', 'screenshot');

-- ── Profiles ─────────────────────────────────────────────────
-- Extends auth.users. One row per Supabase Auth user.
-- Created automatically via trigger on user signup.

create table public.profiles (
  id           uuid primary key references auth.users(id) on delete cascade,
  role         public.user_role not null default 'editor',
  display_name text,
  avatar_url   text,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- Trigger: auto-create profile row on new user signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name'
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ── Posts ─────────────────────────────────────────────────────
-- Single-table design: nullable type-specific columns + CHECK constraints.
-- CHECK constraints provide DB-level validation mirroring the TS discriminated union.

create table public.posts (
  id              uuid primary key default gen_random_uuid(),
  type            public.post_type not null,
  status          public.post_status not null default 'draft',
  slug            text not null unique,
  title           text not null,
  excerpt         text,
  body            jsonb,              -- ProseMirror JSON from Tiptap
  cover_image_url text,
  published_at    timestamptz,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),
  author_id       uuid not null references public.profiles(id),

  -- book-review specific columns
  book_title  text,
  book_author text,
  rating      smallint check (rating between 1 and 5),

  -- novel-update specific columns
  project_slug text,
  word_count   integer check (word_count >= 0),

  -- Type-level integrity constraints
  constraint book_review_required_fields check (
    type <> 'book-review'
    or (book_title is not null and book_author is not null and rating is not null)
  ),
  constraint novel_update_required_fields check (
    type <> 'novel-update'
    or project_slug is not null
  )
);

create index posts_type_status_idx on public.posts (type, status, published_at desc);
create index posts_slug_idx on public.posts (slug);
create index posts_author_idx on public.posts (author_id);

-- ── Projects ──────────────────────────────────────────────────

create table public.projects (
  id            uuid primary key default gen_random_uuid(),
  slug          text not null unique,
  title         text not null,
  employer      text,                         -- "Instrument", "Novi", "Gemini", etc.
  description   text not null,
  body          jsonb,                        -- optional rich text detail
  url           text,
  github_url    text,
  technologies  text[] not null default '{}', -- pragmatic: controlled admin input
  display_order integer not null default 0,
  featured      boolean not null default false,
  is_active     boolean not null default true,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index projects_display_order_idx on public.projects (display_order) where is_active;
create index projects_featured_idx on public.projects (featured) where is_active;

-- ── Project Media ─────────────────────────────────────────────

create table public.project_media (
  id            uuid primary key default gen_random_uuid(),
  project_id    uuid not null references public.projects(id) on delete cascade,
  url           text not null,
  alt_text      text not null,
  media_type    public.media_type not null default 'image',
  display_order integer not null default 0,
  is_cover      boolean not null default false,
  created_at    timestamptz not null default now()
);

create index project_media_project_id_idx on public.project_media (project_id, display_order);

-- ============================================================
-- Row Level Security
-- ============================================================

alter table public.profiles     enable row level security;
alter table public.posts        enable row level security;
alter table public.projects     enable row level security;
alter table public.project_media enable row level security;

-- ── profiles ──────────────────────────────────────────────────

create policy "Public profiles viewable by all"
  on public.profiles for select
  using (true);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Admins can update any profile"
  on public.profiles for update
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- ── posts ─────────────────────────────────────────────────────

create policy "Published posts are publicly readable"
  on public.posts for select
  using (status = 'published');

create policy "Editors and admins can read all posts"
  on public.posts for select
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('admin', 'editor')
    )
  );

create policy "Editors and admins can create posts"
  on public.posts for insert
  with check (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('admin', 'editor')
    )
  );

create policy "Authors can update own posts; admins can update any"
  on public.posts for update
  using (
    author_id = auth.uid()
    or exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

create policy "Only admins can delete posts"
  on public.posts for delete
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- ── projects ─────────────────────────────────────────────────

create policy "Projects are publicly readable"
  on public.projects for select
  using (true);

create policy "Only admins can manage projects"
  on public.projects for all
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- ── project_media ────────────────────────────────────────────

create policy "Project media is publicly readable"
  on public.project_media for select
  using (true);

create policy "Only admins can manage project media"
  on public.project_media for all
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

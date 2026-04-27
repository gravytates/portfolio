# Portfolio — Claude Code Notes

## Environment quirk

`NODE_OPTIONS=--openssl-legacy-provider` is set in this shell environment (Node v22 doesn't support it).
All npm scripts already clear it via `NODE_OPTIONS=''`. If running Next.js commands directly, prefix them:

```bash
NODE_OPTIONS='' npx next dev
```

## Stack

- Next.js 16 / App Router / TypeScript strict
- Tailwind CSS v4 (CSS-based config, no tailwind.config.ts)
- Supabase (auth + PostgreSQL + RLS)
- Tiptap v3 (rich text — ProseMirror JSON in DB)
- Vercel deployment

## TypeScript flags

`noUncheckedIndexedAccess` and `exactOptionalPropertyTypes` are enabled in tsconfig.json.
Array index access returns `T | undefined`. Optional properties must be provided exactly.

## Key architecture files

- `src/types/domain.ts` — Post discriminated union + all domain types
- `src/types/db.ts` — Raw Supabase row shapes
- `src/lib/utils/mappers.ts` — DB rows → domain types
- `middleware.ts` — Auth guard for /admin/*
- `supabase/migrations/0001_initial_schema.sql` — Full DB schema + RLS
- `.env.local.example` — Required environment variables

## Adding Supabase credentials

Copy `.env.local.example` to `.env.local` and fill in values from
Supabase dashboard → Project Settings → API.

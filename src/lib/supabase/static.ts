import { createClient } from '@supabase/supabase-js'

/**
 * Cookie-free Supabase client for build-time contexts (generateStaticParams, etc.)
 * where next/headers is unavailable. Can only access publicly-readable data per RLS.
 */
export function createStaticClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )
}

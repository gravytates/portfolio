/**
 * Browser-side Supabase client.
 * Used in 'use client' components that need to interact with Supabase directly
 * (e.g. auth state listeners, real-time subscriptions).
 *
 * For mutations and reads in server components, use src/lib/supabase/server.ts instead.
 */

import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )
}

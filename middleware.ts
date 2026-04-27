import { createClient } from '@/lib/supabase/middleware'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const { supabase, response } = createClient(request)

  // Refresh session — required to keep session cookie alive.
  // Must be called before any redirect or response.
  const {
    data: { session },
  } = await supabase.auth.getSession()

  const { pathname } = request.nextUrl

  if (pathname.startsWith('/admin')) {
    // Not authenticated → redirect to login
    if (!session) {
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }

    // Fetch role — belt-and-suspenders beyond RLS
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single()

    const role = profile?.role

    if (!role || !['admin', 'editor'].includes(role)) {
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }

    // /admin/users is admin-only
    if (pathname.startsWith('/admin/users') && role !== 'admin') {
      return NextResponse.redirect(new URL('/admin', request.url))
    }
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Run on all routes except:
     * - _next/static  (static files)
     * - _next/image   (image optimization)
     * - favicon.ico   (favicon)
     * - auth/callback (Supabase OAuth/magic link handler — must be public)
     * - public/       (static assets)
     */
    '/((?!_next/static|_next/image|favicon\\.ico|auth/callback|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}

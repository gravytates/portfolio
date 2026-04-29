import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import type { UserRole } from '@/types/domain'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()

  const { data: { session } } = await supabase.auth.getSession()
  if (!session) redirect('/auth/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, display_name')
    .eq('id', session.user.id)
    .single()

  return (
    <div className="min-h-screen bg-zinc-50">
      <AdminSidebar
        email={session.user.email ?? ''}
        role={(profile?.role ?? 'editor') as UserRole}
      />
      <main className="pl-56 min-h-screen">
        <div className="max-w-4xl mx-auto px-8 py-8">
          {children}
        </div>
      </main>
    </div>
  )
}

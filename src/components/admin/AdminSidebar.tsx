import Link from 'next/link'
import { LogoutButton } from './LogoutButton'
import type { UserRole } from '@/types/domain'

interface AdminSidebarProps {
  email: string
  role: UserRole
}

const NAV = [
  { href: '/admin', label: 'Dashboard', exact: true },
  { href: '/admin/posts', label: 'Posts' },
] as const

const ADMIN_NAV = [
  { href: '/admin/users', label: 'Users' },
] as const

export function AdminSidebar({ email, role }: AdminSidebarProps) {
  return (
    <aside className="fixed inset-y-0 left-0 w-56 bg-brand-blue-dark flex flex-col z-40">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-white/10">
        <Link href="/" className="text-xs font-medium tracking-widest uppercase text-white/60 hover:text-white transition-colors">
          Grady Shelton
        </Link>
        <p className="text-[10px] text-white/30 mt-0.5">Admin</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5" aria-label="Admin navigation">
        {NAV.map((item) => (
          <SidebarLink key={item.href} href={item.href} label={item.label} />
        ))}
        {role === 'admin' &&
          ADMIN_NAV.map((item) => (
            <SidebarLink key={item.href} href={item.href} label={item.label} />
          ))}
      </nav>

      {/* User footer */}
      <div className="px-5 py-4 border-t border-white/10 space-y-1">
        <p className="text-xs text-white/50 truncate">{email}</p>
        <p className="text-[10px] text-white/30 uppercase tracking-wide">{role}</p>
        <LogoutButton />
      </div>
    </aside>
  )
}

function SidebarLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="block px-3 py-2 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/10 transition-colors"
    >
      {label}
    </Link>
  )
}

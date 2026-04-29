import Link from 'next/link'
import { getPostStats } from '@/lib/queries/posts'

export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
  const stats = await getPostStats()

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-semibold text-zinc-800">Dashboard</h1>
      </header>

      <div className="grid grid-cols-3 gap-4">
        <StatCard label="Total posts" value={stats.total} />
        <StatCard label="Published" value={stats.published} />
        <StatCard label="Drafts" value={stats.drafts} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <QuickLink href="/admin/posts/new" label="New post" description="Write a book review, novel update, or essay" />
        <QuickLink href="/admin/posts" label="All posts" description={`${stats.total} total`} />
        <QuickLink href="/" label="View site" description="Open the public site" external />
      </div>
    </div>
  )
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-white rounded-xl border border-zinc-200 px-5 py-4">
      <p className="text-xs text-zinc-400 uppercase tracking-wide mb-1">{label}</p>
      <p className="text-3xl font-semibold text-zinc-800">{value}</p>
    </div>
  )
}

function QuickLink({
  href,
  label,
  description,
  external,
}: {
  href: string
  label: string
  description: string
  external?: boolean
}) {
  return (
    <Link
      href={href}
      target={external ? '_blank' : undefined}
      className="bg-white rounded-xl border border-zinc-200 px-5 py-4 hover:border-brand-blue/40 hover:shadow-sm transition group"
    >
      <p className="text-sm font-medium text-zinc-700 group-hover:text-brand-blue-dark mb-0.5">{label}</p>
      <p className="text-xs text-zinc-400">{description}</p>
    </Link>
  )
}

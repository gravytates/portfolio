import Link from 'next/link'

const FILTERS = [
  { href: '/writing', label: 'All' },
  { href: '/writing/essays', label: 'Essays' },
  { href: '/writing/book-reviews', label: 'Book Reviews' },
  { href: '/writing/novel-updates', label: 'Novel Updates' },
] as const

interface WritingNavProps {
  activeHref: string
}

export function WritingNav({ activeHref }: WritingNavProps) {
  return (
    <nav className="flex gap-6" aria-label="Writing filters">
      {FILTERS.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className={`text-sm transition-colors ${
            activeHref === href
              ? 'text-zinc-800 font-medium'
              : 'text-zinc-400 hover:text-zinc-600'
          }`}
          aria-current={activeHref === href ? 'page' : undefined}
        >
          {label}
        </Link>
      ))}
    </nav>
  )
}

import Link from 'next/link'

export function HomeLink() {
  return (
    <Link
      href="/"
      className="text-xs font-medium tracking-widest uppercase text-brand-blue hover:text-brand-blue-dark transition-colors"
      aria-label="Return to home"
    >
      Grady Shelton
    </Link>
  )
}

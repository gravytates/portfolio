import Link from 'next/link'

/**
 * Hub landing page — gradyshelton.com/
 * Routes visitors to the two main flows.
 * Static — no data fetching needed.
 */
export default function HubPage() {
  return (
    <main className="flex flex-1 flex-col">
      <section
        className="relative flex flex-1 flex-col items-center justify-center gap-16 min-h-screen bg-brand-blue-dark overflow-hidden px-6 py-16"
        style={{ backgroundImage: 'url(/projects/whitemountains.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-brand-blue-dark/60" />

        {/* Identity */}
        <div className="relative text-center text-white">
          <h1 className="font-serif text-6xl md:text-7xl tracking-tight mb-3">GRADY SHELTON</h1>
          <p className="text-lg text-zinc-300 tracking-widest uppercase font-light">
            [ developer &amp; writer ]
          </p>
        </div>

        {/* Section nav */}
        <nav className="relative flex flex-col gap-5 sm:flex-row" aria-label="Site sections">
          <Link
            href="/software"
            className="group flex flex-col gap-2 rounded-2xl border border-white/20 bg-white/95 backdrop-blur-sm px-10 py-8 text-center shadow-lg transition hover:bg-white hover:border-white"
          >
            <span className="text-2xl font-medium text-brand-blue-dark group-hover:text-brand-blue transition">
              Software
            </span>
            <span className="text-sm text-zinc-500">Projects, skills, and experience</span>
          </Link>

          <Link
            href="/writing"
            className="group flex flex-col gap-2 rounded-2xl border border-white/20 bg-white/95 backdrop-blur-sm px-10 py-8 text-center shadow-lg transition hover:bg-white hover:border-white"
          >
            <span className="text-2xl font-medium text-brand-blue-dark group-hover:text-brand-blue transition">
              Writing
            </span>
            <span className="text-sm text-zinc-500">Book reviews and updates</span>
          </Link>
        </nav>
      </section>
    </main>
  )
}

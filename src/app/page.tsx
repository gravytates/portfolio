import Link from 'next/link'

/**
 * Hub landing page — gradyshelton.com/
 * Routes visitors to the two main flows.
 * Static — no data fetching needed.
 */
export default function HubPage() {
  return (
    <main className="flex flex-1 flex-col">
      {/* Hero */}
      <section
        id="hero"
        className="relative h-[60vh] min-h-[400px] flex items-center justify-center bg-brand-blue-dark overflow-hidden"
        style={{ backgroundImage: 'url(/projects/whitemountains.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-brand-blue-dark/60" />
        <div className="relative text-center text-white px-6">
          <h1 className="font-serif text-6xl md:text-7xl tracking-tight mb-3">GRADY SHELTON</h1>
          <p className="text-lg text-zinc-300 tracking-widest uppercase font-light">
            [ developer &amp; writer ]
          </p>
        </div>
      </section>

      {/* Section nav */}
      <div className="flex flex-1 flex-col items-center justify-center gap-8 px-6 py-16 bg-brand-cream">
        <nav className="flex flex-col gap-6 sm:flex-row" aria-label="Site sections">
          <Link
            href="/software"
            className="group flex flex-col gap-2 rounded-2xl border border-brand-blue/20 bg-white px-10 py-8 text-center shadow-sm transition hover:shadow-md hover:border-brand-blue/50"
          >
            <span className="text-2xl font-medium text-brand-blue-dark group-hover:text-brand-blue transition">
              Software
            </span>
            <span className="text-sm text-zinc-500">Projects, skills, and experience</span>
          </Link>

          <Link
            href="/writing"
            className="group flex flex-col gap-2 rounded-2xl border border-brand-blue/20 bg-white px-10 py-8 text-center shadow-sm transition hover:shadow-md hover:border-brand-blue/50"
          >
            <span className="text-2xl font-medium text-brand-blue-dark group-hover:text-brand-blue transition">
              Writing
            </span>
            <span className="text-sm text-zinc-500">Book reviews and updates</span>
          </Link>
        </nav>
      </div>
    </main>
  )
}

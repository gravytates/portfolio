import Link from 'next/link'

/**
 * Hub landing page — gradyshelton.com/
 * Routes visitors to the two main flows.
 * Static — no data fetching needed.
 */
export default function HubPage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-12 px-6 py-24 bg-[#f9f9f9]">
      <header className="text-center">
        <h1 className="font-serif text-5xl text-[#314a60] mb-3">Grady Shelton</h1>
        <p className="text-lg text-[#51799c]">Developer & Writer — Portland, OR</p>
      </header>

      <nav className="flex flex-col gap-6 sm:flex-row" aria-label="Site sections">
        <Link
          href="/software"
          className="group flex flex-col gap-2 rounded-2xl border border-[#51799c]/20 bg-white px-10 py-8 text-center shadow-sm transition hover:shadow-md hover:border-[#51799c]/50"
        >
          <span className="text-2xl font-medium text-[#314a60] group-hover:text-[#51799c] transition">
            Software
          </span>
          <span className="text-sm text-zinc-500">Projects, skills, and experience</span>
        </Link>

        <Link
          href="/writing"
          className="group flex flex-col gap-2 rounded-2xl border border-[#51799c]/20 bg-white px-10 py-8 text-center shadow-sm transition hover:shadow-md hover:border-[#51799c]/50"
        >
          <span className="text-2xl font-medium text-[#314a60] group-hover:text-[#51799c] transition">
            Writing
          </span>
          <span className="text-sm text-zinc-500">Book reviews and prose</span>
        </Link>
      </nav>
    </main>
  )
}

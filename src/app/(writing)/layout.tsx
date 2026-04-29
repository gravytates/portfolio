import { HomeLink } from '@/components/shared/HomeLink'

export default function WritingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-zinc-100">
        <div className="max-w-2xl mx-auto px-6 py-4 flex items-center justify-between">
          <HomeLink />
          <span className="text-xs font-medium tracking-widest uppercase text-zinc-300">
            Writing
          </span>
        </div>
      </header>
      <main className="max-w-2xl mx-auto px-6 py-12">
        {children}
      </main>
    </div>
  )
}

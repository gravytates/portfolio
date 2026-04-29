import { HomeLink } from '@/components/shared/HomeLink'
import { SectionSwitcher } from '@/components/shared/SectionSwitcher'

export default function WritingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-zinc-100">
        <div className="max-w-2xl mx-auto px-6 py-4 flex items-center justify-between">
          <HomeLink />
          <SectionSwitcher current="writing" />
        </div>
      </header>
      <main className="max-w-2xl mx-auto px-6 py-12">
        {children}
      </main>
    </div>
  )
}

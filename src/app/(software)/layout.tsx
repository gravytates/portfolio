import { HomeLink } from '@/components/shared/HomeLink'
import { SoftwareNav } from '@/components/software/SoftwareNav'
import { SectionSwitcher } from '@/components/shared/SectionSwitcher'

export default function SoftwareLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <header className="border-b border-zinc-100 bg-white">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <HomeLink />
          <SectionSwitcher current="software" />
        </div>
      </header>
      {children}
      <SoftwareNav />
    </div>
  )
}

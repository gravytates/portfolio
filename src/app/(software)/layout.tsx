import { SoftwareNav } from '@/components/software/SoftwareNav'
import { HomeLink } from '@/components/shared/HomeLink'

export default function SoftwareLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HomeLink lightUntil="hero" />
      {children}
      <SoftwareNav />
    </>
  )
}

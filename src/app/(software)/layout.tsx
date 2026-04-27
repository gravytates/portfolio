import { SoftwareNav } from '@/components/software/SoftwareNav'

export default function SoftwareLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <SoftwareNav />
    </>
  )
}

import type { Metadata } from 'next'
import { getProjects } from '@/lib/queries/projects'
import { WorkProjects } from '@/components/software/WorkProjects'
import { ProjectGrid } from '@/components/software/ProjectGrid'
import { TechGrid } from '@/components/software/TechGrid'
import { BackgroundSection } from '@/components/software/BackgroundSection'
import { ConnectSection } from '@/components/software/ConnectSection'

export const revalidate = 3600 // ISR: revalidate every 1 hour

export const metadata: Metadata = {
  title: 'Software',
  description:
    'Full-stack product developer and tech lead. Projects, skills, and experience — Grady Shelton.',
  openGraph: {
    title: 'Software — Grady Shelton',
    description: 'Full-stack product developer and tech lead. Projects, skills, and experience.',
  },
}

export default async function SoftwarePage() {
  const projects = await getProjects()

  return (
    <main>
      {/* Hero */}
      <section
        className="relative h-[60vh] min-h-[400px] flex items-center justify-center bg-[#314a60] overflow-hidden"
        style={{ backgroundImage: 'url(/projects/whitemountains.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-[#314a60]/60" />
        <div className="relative text-center text-white px-6">
          <h1 className="font-serif text-6xl md:text-7xl tracking-tight mb-3">GRADY SHELTON</h1>
          <p className="text-lg text-zinc-300 tracking-widest uppercase font-light">
            [ developer ]
          </p>
        </div>
      </section>

      {/* Work projects */}
      <WorkProjects projects={projects} />

      {/* Personal projects grid */}
      <ProjectGrid projects={projects} />

      {/* Technologies */}
      <TechGrid />

      {/* Background / Bio */}
      <BackgroundSection />

      {/* Connect */}
      <ConnectSection />
    </main>
  )
}

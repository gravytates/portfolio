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

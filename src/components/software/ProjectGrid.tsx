import type { Project } from '@/types/domain'
import { PersonalProjectCard } from './PersonalProjectCard'
import { LunchWithGallery } from './LunchWithGallery'

interface ProjectGridProps {
  projects: Project[]
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  const personalProjects = projects.filter((p) => p.employer === null)
  const lunchwith = personalProjects.find((p) => p.slug === 'lunchwith')
  const gridProjects = personalProjects.filter((p) => p.slug !== 'lunchwith')

  return (
    <section className="py-12 px-6 bg-[#f9f9f9]">
      <div className="max-w-5xl mx-auto">
        <h3 className="font-serif text-2xl text-brand-blue-dark mb-8">
          Personal &amp; Freelance
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {gridProjects.map((project) => (
            <PersonalProjectCard key={project.id} project={project} />
          ))}
        </div>

        {lunchwith && <LunchWithGallery project={lunchwith} />}
      </div>
    </section>
  )
}

import type { Project } from '@/types/domain'

interface WorkProjectsProps {
  projects: Project[]
}

// Instrument sub-clients — hard-coded since they live within the single Instrument project
const INSTRUMENT_CLIENTS = [
  { name: 'Salesforce — Dreamforce', url: 'https://www.salesforce.com/dreamforce/', note: 'Live streaming event platform, sessions, scheduling' },
  { name: 'About Twitter', url: 'https://about.twitter.com', note: 'Show what Twitter is all about (RIP)' },
  { name: 'Intuitive', url: 'https://www.intuitive.com/en-us', note: '3D model viewer and component library' },
  { name: "Levi's", url: 'https://levi.com', note: 'New ecommerce site' },
  { name: 'Zwift', url: 'https://zwift.com', note: 'Entire new ecommerce platform' },
  { name: 'Sonos Radio', url: 'https://www.sonos.com/en-us/sonos-radio', note: 'New marketing site' },
  { name: 'Appfolio', url: 'https://www.appfolio.com/', note: 'New business site' },
]

export function WorkProjects({ projects }: WorkProjectsProps) {
  const workProjects = projects.filter((p) => p.employer !== null)

  return (
    <section id="projects" className="py-20 px-6 bg-[#f9f9f9]">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-serif text-4xl text-brand-blue-dark mb-12">Projects</h2>
        <div className="space-y-12">
          {workProjects.map((project) => (
            <div key={project.id}>
              <h3 className="font-serif text-2xl text-brand-blue-dark mb-3">
                {project.employer}
              </h3>
              {project.slug === 'instrument' ? (
                // Instrument gets the detailed sub-client list
                <ul className="space-y-2 text-zinc-700 leading-relaxed">
                  {INSTRUMENT_CLIENTS.map((client) => (
                    <li key={client.url} className="flex gap-2">
                      <span className="text-brand-blue mt-1 select-none">–</span>
                      <span>
                        <a
                          href={client.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-brand-blue hover:underline font-medium"
                        >
                          {client.name}
                        </a>
                        {' '}— {client.note}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div>
                  <p className="text-zinc-700 leading-relaxed mb-2">{project.description}</p>
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-brand-blue hover:underline"
                    >
                      Visit site →
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

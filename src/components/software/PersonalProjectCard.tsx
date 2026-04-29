'use client'

import Image from 'next/image'
import { useState } from 'react'
import type { Project } from '@/types/domain'

interface PersonalProjectCardProps {
  project: Project
}

export function PersonalProjectCard({ project }: PersonalProjectCardProps) {
  const [revealed, setRevealed] = useState(false)
  const coverMedia = project.media.find((m) => m.isCover) ?? project.media[0]

  return (
    <div
      className={`
        relative rounded-xl overflow-hidden cursor-pointer select-none
        aspect-[4/3] bg-brand-blue-dark border border-brand-blue/20
        transition-shadow duration-200
        hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue
      `}
      tabIndex={0}
      role="button"
      aria-expanded={revealed}
      aria-label={`${project.title} — click to reveal details`}
      onClick={() => setRevealed((v) => !v)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          setRevealed((v) => !v)
        }
      }}
    >
      {/* Background screenshot */}
      {coverMedia && (
        <Image
          src={coverMedia.url}
          alt={coverMedia.altText}
          fill
          className={`object-cover transition-opacity duration-300 ${revealed ? 'opacity-10' : 'opacity-100'}`}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        />
      )}

      {/* Details overlay */}
      <div
        className={`
          absolute inset-0 flex flex-col justify-center px-6 py-5
          transition-opacity duration-300
          ${revealed ? 'opacity-100' : 'opacity-0'}
        `}
      >
        <h3 className="font-serif text-xl text-white mb-3">{project.title}</h3>
        <p className="text-sm text-zinc-300 leading-relaxed mb-4">{project.description}</p>
        <div className="flex gap-3 flex-wrap">
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-xs text-brand-blue bg-white/10 hover:bg-white/20 rounded px-3 py-1.5 transition"
            >
              View code →
            </a>
          )}
        </div>
        {/* Tech tags */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="text-xs text-zinc-400 bg-white/5 border border-white/10 rounded-full px-2 py-0.5"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Title strip (visible when not revealed) */}
      <div
        className={`
          absolute bottom-0 inset-x-0 bg-gradient-to-t from-brand-blue-dark/90 to-transparent
          px-4 py-3 transition-opacity duration-300
          ${revealed ? 'opacity-0' : 'opacity-100'}
        `}
      >
        <p className="text-white text-sm font-medium">{project.title}</p>
      </div>
    </div>
  )
}

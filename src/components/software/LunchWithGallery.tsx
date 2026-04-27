import Image from 'next/image'
import type { Project } from '@/types/domain'

interface LunchWithGalleryProps {
  project: Project
}

export function LunchWithGallery({ project }: LunchWithGalleryProps) {
  return (
    <div className="border-t border-[#51799c]/15 pt-8">
      <div className="flex items-baseline gap-4 mb-2">
        <h3 className="font-serif text-2xl text-[#314a60]">{project.title}</h3>
        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[#51799c] hover:underline"
          >
            View code →
          </a>
        )}
      </div>
      <p className="text-zinc-600 leading-relaxed mb-6 max-w-2xl">{project.description}</p>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {project.media.map((media) => (
          <div
            key={media.id}
            className="flex-shrink-0 w-40 rounded-xl overflow-hidden border border-[#51799c]/15 bg-[#314a60]"
          >
            <Image
              src={media.url}
              alt={media.altText}
              width={160}
              height={280}
              className="w-full h-auto object-cover"
              unoptimized={media.mediaType === 'gif'}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

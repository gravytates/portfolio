import Image from 'next/image'
import { TECH_CATEGORIES } from '@/lib/data/technologies'

export function TechGrid() {
  return (
    <section id="technologies" className="py-20 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-serif text-4xl text-[#314a60] mb-12 text-center">Technologies</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
          {TECH_CATEGORIES.map((category) => (
            <div key={category.name} className="flex flex-col items-center gap-3 text-center">
              <Image
                src={category.icon}
                alt={category.iconAlt}
                width={40}
                height={40}
                className="opacity-70"
              />
              <h3 className="font-medium text-[#314a60] text-sm uppercase tracking-wide">
                {category.name}
              </h3>
              <ul className="space-y-0.5">
                {category.items.map((item) => (
                  <li key={item} className="text-sm text-zinc-600">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

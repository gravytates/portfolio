'use client'

import { useEffect, useState } from 'react'

const NAV_ITEMS = [
  { label: 'Projects', href: '#projects' },
  { label: 'Technologies', href: '#technologies' },
  { label: 'Background', href: '#background' },
  { label: 'Connect', href: '#connect' },
]

export function SoftwareNav() {
  const [activeSection, setActiveSection] = useState<string>('')

  useEffect(() => {
    const sectionIds = NAV_ITEMS.map((item) => item.href.slice(1))

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && entry.target.id) {
            setActiveSection(entry.target.id)
          }
        }
      },
      { rootMargin: '-30% 0px -60% 0px' },
    )

    for (const id of sectionIds) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-50 hidden sm:flex justify-center"
      aria-label="Section navigation"
    >
      <div className="flex gap-1 mb-4 bg-brand-blue-dark/95 backdrop-blur-sm rounded-full px-3 py-2 shadow-lg border border-white/10">
        {NAV_ITEMS.map((item) => {
          const isActive = activeSection === item.href.slice(1)
          return (
            <a
              key={item.href}
              href={item.href}
              className={`
                px-4 py-1.5 rounded-full text-sm font-medium transition-colors
                ${isActive
                  ? 'bg-brand-blue text-white'
                  : 'text-zinc-300 hover:text-white hover:bg-white/10'
                }
              `}
            >
              {item.label}
            </a>
          )
        })}
      </div>
    </nav>
  )
}

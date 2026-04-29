'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'

const SECTIONS = [
  { href: '/software', label: 'Software' },
  { href: '/writing', label: 'Writing' },
] as const

interface SectionSwitcherProps {
  current: 'software' | 'writing'
}

export function SectionSwitcher({ current }: SectionSwitcherProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1 text-xs font-medium tracking-widest uppercase text-zinc-400 hover:text-zinc-600 transition-colors"
        aria-haspopup="true"
        aria-expanded={open}
      >
        {current}
        <svg
          className={`w-3 h-3 transition-transform duration-150 ${open ? 'rotate-180' : ''}`}
          viewBox="0 0 12 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden
        >
          <path d="M2 4l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 bg-white rounded-lg border border-zinc-100 shadow-md overflow-hidden z-50 min-w-[120px]">
          {SECTIONS.map(({ href, label }) => {
            const isCurrent = href === `/${current}`
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={`block px-4 py-2.5 text-sm transition-colors ${
                  isCurrent
                    ? 'text-zinc-800 font-medium bg-zinc-50'
                    : 'text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50'
                }`}
                aria-current={isCurrent ? 'page' : undefined}
              >
                {label}
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}

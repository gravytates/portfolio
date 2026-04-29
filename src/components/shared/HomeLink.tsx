'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

interface HomeLinkProps {
  /**
   * ID of an element to observe via IntersectionObserver.
   * While that element is intersecting the viewport, the link renders white.
   * Once it exits, it transitions to brand blue.
   * Omit on pages with no hero (defaults to blue).
   */
  lightUntil?: string
}

export function HomeLink({ lightUntil }: HomeLinkProps) {
  // Start white if we have a hero to observe (page loads at top, hero is visible)
  const [overHero, setOverHero] = useState(!!lightUntil)

  useEffect(() => {
    if (!lightUntil) return

    const el = document.getElementById(lightUntil)
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => setOverHero(entry?.isIntersecting ?? false),
      { threshold: 0 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [lightUntil])

  return (
    <Link
      href="/"
      className={`
        fixed top-4 left-5 z-50
        text-xs font-medium tracking-widest uppercase
        transition-colors duration-300
        ${overHero
          ? 'text-white/80 hover:text-white'
          : 'text-brand-blue hover:text-brand-blue-dark'}
      `}
      aria-label="Return to home"
    >
      Grady Shelton
    </Link>
  )
}

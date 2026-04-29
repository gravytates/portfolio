'use client'

import { signOut } from '@/lib/actions/auth'
import { useTransition } from 'react'

export function LogoutButton() {
  const [pending, startTransition] = useTransition()

  return (
    <button
      onClick={() => startTransition(() => signOut())}
      disabled={pending}
      className="w-full text-left text-xs text-zinc-400 hover:text-zinc-600 transition-colors disabled:opacity-50 py-1"
    >
      {pending ? 'Signing out…' : 'Sign out'}
    </button>
  )
}

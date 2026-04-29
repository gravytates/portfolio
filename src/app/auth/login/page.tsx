'use client'

import { useActionState } from 'react'
import { sendMagicLink } from '@/lib/actions/auth'
import type { MagicLinkState } from '@/lib/actions/auth'

const inputClass =
  'w-full border border-zinc-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/40 focus:border-brand-blue'

export default function LoginPage() {
  const [state, action, pending] = useActionState<MagicLinkState | null, FormData>(
    sendMagicLink,
    null,
  )

  if (state?.sent) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#f9f9f9] px-6">
        <div className="max-w-sm w-full text-center space-y-3">
          <div className="text-3xl">✉️</div>
          <h1 className="font-serif text-2xl text-brand-blue-dark">Check your inbox</h1>
          <p className="text-sm text-zinc-500">
            A magic link is on its way. Click it to access the admin panel.
          </p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#f9f9f9] px-6">
      <div className="max-w-sm w-full space-y-6">
        <header className="text-center">
          <h1 className="font-serif text-3xl text-brand-blue-dark mb-1">Admin</h1>
          <p className="text-sm text-zinc-400">gradyshelton.com</p>
        </header>

        <form action={action} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-xs font-medium text-zinc-500 mb-1.5 uppercase tracking-wide">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="you@example.com"
              required
              autoComplete="email"
              className={inputClass}
            />
          </div>

          {state?.error && (
            <p className="text-xs text-red-500">{state.error}</p>
          )}

          <button
            type="submit"
            disabled={pending}
            className="w-full bg-brand-blue text-white py-2.5 rounded-lg text-sm font-medium hover:bg-brand-blue-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {pending ? 'Sending…' : 'Send magic link'}
          </button>
        </form>
      </div>
    </main>
  )
}

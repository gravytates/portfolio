'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export interface MagicLinkState {
  error?: string
  sent?: boolean
}

/**
 * Send a magic link to the provided email.
 * Compatible with useActionState — receives (prevState, formData).
 */
export async function sendMagicLink(
  _prevState: MagicLinkState | null,
  formData: FormData,
): Promise<MagicLinkState> {
  const email = formData.get('email')

  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return { error: 'Please enter a valid email address.' }
  }

  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
    },
  })

  if (error) {
    return { error: error.message }
  }

  return { sent: true }
}

/**
 * Sign out the current user and redirect to the login page.
 * Used in the admin sidebar logout button.
 */
export async function signOut(): Promise<never> {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/auth/login')
}

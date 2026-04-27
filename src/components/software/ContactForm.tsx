'use client'

import { useForm, ValidationError } from '@formspree/react'

const FORM_ID = 'xknpnaoz'

const inputClass =
  'w-full border border-zinc-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#51799c]/40 focus:border-[#51799c] aria-[invalid=true]:border-red-400 aria-[invalid=true]:ring-red-200'

const errorClass = 'text-xs text-red-500 mt-1'

export function ContactForm() {
  const [state, handleSubmit] = useForm(FORM_ID)

  if (state.succeeded) {
    return (
      <div className="max-w-md rounded-lg bg-[#51799c]/10 border border-[#51799c]/20 px-6 py-5 text-sm text-[#314a60]">
        Message sent — I&apos;ll be in touch soon.
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md" noValidate>
      <div>
        <input
          type="text"
          name="name"
          placeholder="Name"
          className={inputClass}
          aria-label="Name"
        />
        <ValidationError field="name" errors={state.errors} className={errorClass} />
      </div>

      <div>
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className={inputClass}
          aria-label="Email"
        />
        <ValidationError field="email" errors={state.errors} className={errorClass} />
      </div>

      <div>
        <textarea
          name="message"
          placeholder="Message"
          rows={5}
          required
          className={`${inputClass} resize-y`}
          aria-label="Message"
        />
        <ValidationError field="message" errors={state.errors} className={errorClass} />
      </div>

      {/* Form-level error (network failure, spam block, etc.) */}
      <ValidationError errors={state.errors} className={errorClass} />

      <button
        type="submit"
        disabled={state.submitting}
        className="bg-[#51799c] text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-[#314a60] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {state.submitting ? 'Sending…' : 'Send'}
      </button>
    </form>
  )
}

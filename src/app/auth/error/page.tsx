import Link from 'next/link'

export default function AuthErrorPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-brand-cream px-6">
      <div className="max-w-sm w-full text-center space-y-4">
        <h1 className="font-serif text-2xl text-brand-blue-dark">Authentication failed</h1>
        <p className="text-sm text-zinc-500">
          The link may have expired or already been used. Request a new one.
        </p>
        <Link
          href="/auth/login"
          className="inline-block text-sm text-brand-blue hover:underline"
        >
          Back to login
        </Link>
      </div>
    </main>
  )
}

import { PostForm } from '@/components/admin/PostForm'

export const metadata = { title: 'New Post' }

export default function NewPostPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold text-zinc-800">New post</h1>
      </header>
      <PostForm />
    </div>
  )
}

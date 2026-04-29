import { notFound } from 'next/navigation'
import { getPostById } from '@/lib/queries/posts'
import { PostForm } from '@/components/admin/PostForm'

interface EditPostPageProps {
  params: Promise<{ id: string }>
}

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: EditPostPageProps) {
  const { id } = await params
  const post = await getPostById(id)
  return { title: post ? `Edit: ${post.title}` : 'Post not found' }
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const { id } = await params
  const post = await getPostById(id)
  if (!post) notFound()

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold text-zinc-800">Edit post</h1>
        <p className="text-sm text-zinc-400 mt-0.5">{post.slug}</p>
      </header>
      <PostForm initialPost={post} />
    </div>
  )
}

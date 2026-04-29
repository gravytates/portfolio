import { getPublishedPosts } from '@/lib/queries/posts'
import { PostCard } from '@/components/writing/PostCard'
import { WritingNav } from '@/components/writing/WritingNav'
import type { Metadata } from 'next'

export const revalidate = 1800

export const metadata: Metadata = {
  title: 'Updates',
  description: 'Progress updates on my novel-in-progress.',
}

export default async function UpdatesPage() {
  const posts = await getPublishedPosts({ type: 'novel-update' })

  return (
    <div className="space-y-10">
      <div className="space-y-6">
        <h1 className="font-serif text-4xl text-zinc-800">Updates</h1>
        <WritingNav activeHref="/writing/updates" />
      </div>

      {posts.length === 0 ? (
        <p className="text-zinc-400">No updates published yet.</p>
      ) : (
        <div className="divide-y divide-zinc-100">
          {posts.map((post) => (
            <div key={post.id} className="py-8 first:pt-0">
              <PostCard post={post} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

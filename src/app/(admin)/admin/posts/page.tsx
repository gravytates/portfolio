import Link from 'next/link'
import { getAllPosts } from '@/lib/queries/posts'
import { PostActionsCell } from '@/components/admin/PostActionsCell'
import type { Post } from '@/types/domain'

export const dynamic = 'force-dynamic'

const TYPE_LABELS: Record<Post['type'], string> = {
  'book-review': 'Book Review',
  'novel-update': 'Novel Update',
  'essay': 'Essay',
}

const TYPE_COLORS: Record<Post['type'], string> = {
  'book-review': 'bg-amber-100 text-amber-700',
  'novel-update': 'bg-violet-100 text-violet-700',
  'essay': 'bg-sky-100 text-sky-700',
}

export default async function PostsPage() {
  const posts = await getAllPosts()

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-zinc-800">Posts</h1>
        <Link
          href="/admin/posts/new"
          className="bg-brand-blue text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand-blue-dark transition-colors"
        >
          New post
        </Link>
      </header>

      {posts.length === 0 ? (
        <div className="bg-white rounded-xl border border-zinc-200 px-8 py-16 text-center">
          <p className="text-zinc-400 text-sm">No posts yet.</p>
          <Link href="/admin/posts/new" className="mt-3 inline-block text-sm text-brand-blue hover:underline">
            Create your first post →
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-zinc-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-100 bg-zinc-50">
                <th className="text-left px-5 py-3 text-xs font-medium text-zinc-400 uppercase tracking-wide">Title</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-zinc-400 uppercase tracking-wide">Type</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-zinc-400 uppercase tracking-wide">Status</th>
                <th className="text-left px-5 py-3 text-xs font-medium text-zinc-400 uppercase tracking-wide">Date</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-zinc-50/50 transition-colors">
                  <td className="px-5 py-3.5 font-medium text-zinc-800 max-w-xs">
                    <Link
                      href={`/admin/posts/${post.id}`}
                      className="hover:text-brand-blue transition-colors line-clamp-1"
                    >
                      {post.title}
                    </Link>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${TYPE_COLORS[post.type]}`}>
                      {TYPE_LABELS[post.type]}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${
                      post.status === 'published'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-zinc-100 text-zinc-500'
                    }`}>
                      {post.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-zinc-400 whitespace-nowrap">
                    {post.createdAt.toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </td>
                  <td className="px-5 py-3.5">
                    <PostActionsCell postId={post.id} status={post.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

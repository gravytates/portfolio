'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { publishPost, unpublishPost, deletePost } from '@/lib/actions/posts'
import type { PostStatus } from '@/types/domain'

interface PostActionsCellProps {
  postId: string
  status: PostStatus
}

export function PostActionsCell({ postId, status }: PostActionsCellProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  function handleTogglePublish() {
    startTransition(async () => {
      const action = status === 'published' ? unpublishPost : publishPost
      await action(postId)
      router.refresh()
    })
  }

  function handleDelete() {
    if (!confirm('Delete this post? This cannot be undone.')) return
    startTransition(async () => {
      await deletePost(postId)
      router.refresh()
    })
  }

  return (
    <div className="flex items-center gap-3 justify-end">
      <button
        type="button"
        onClick={handleTogglePublish}
        disabled={isPending}
        className="text-xs text-zinc-500 hover:text-zinc-800 transition-colors disabled:opacity-40"
      >
        {status === 'published' ? 'Unpublish' : 'Publish'}
      </button>
      <button
        type="button"
        onClick={handleDelete}
        disabled={isPending}
        className="text-xs text-red-400 hover:text-red-600 transition-colors disabled:opacity-40"
      >
        Delete
      </button>
    </div>
  )
}

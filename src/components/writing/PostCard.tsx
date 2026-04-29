import Link from 'next/link'
import type { Post } from '@/types/domain'

interface PostCardProps {
  post: Post
}

const TYPE_LABELS: Record<Post['type'], string> = {
  'book-review': 'Book Review',
  'novel-update': 'Update',
  'essay': 'Writing',
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export function PostCard({ post }: PostCardProps) {
  const date = post.publishedAt ?? post.createdAt

  return (
    <article>
      <Link href={`/writing/${post.slug}`} className="group block">
        <div className="flex items-baseline gap-3 mb-2">
          <time
            dateTime={date.toISOString()}
            className="text-sm text-zinc-400 tabular-nums"
          >
            {formatDate(date)}
          </time>
          <span className="text-zinc-300" aria-hidden>·</span>
          <span className="text-xs font-medium text-brand-blue uppercase tracking-wide">
            {TYPE_LABELS[post.type]}
          </span>
          {post.type === 'book-review' && (
            <>
              <span className="text-zinc-300" aria-hidden>·</span>
              <span className="text-sm text-zinc-500 italic">{post.bookTitle}</span>
            </>
          )}
        </div>

        <h2 className="font-serif text-2xl text-zinc-800 group-hover:text-brand-blue transition-colors leading-snug mb-2">
          {post.title}
        </h2>

        {post.excerpt && (
          <p className="text-zinc-500 leading-relaxed line-clamp-2">
            {post.excerpt}
          </p>
        )}
      </Link>
    </article>
  )
}

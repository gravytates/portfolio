import { notFound } from 'next/navigation'
import { getPublishedPostBySlug, getPublishedPostSlugs } from '@/lib/queries/posts'
import { TiptapRenderer } from '@/components/writing/TiptapRenderer'
import { WritingNav } from '@/components/writing/WritingNav'
import type { Metadata } from 'next'
import type { Post } from '@/types/domain'

export const revalidate = 3600

interface PostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getPublishedPostSlugs()
  return slugs.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPublishedPostBySlug(slug)
  if (!post) return {}

  return {
    title: post.title,
    description: post.excerpt ?? undefined,
    openGraph: {
      title: post.title,
      description: post.excerpt ?? undefined,
      type: 'article',
      publishedTime: post.publishedAt?.toISOString(),
    },
  }
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

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = await getPublishedPostBySlug(slug)
  if (!post) notFound()

  const date = post.publishedAt ?? post.createdAt

  return (
    <article className="space-y-10">
      {/* Nav */}
      <WritingNav activeHref={`/writing/${slug}`} />

      {/* Header */}
      <header className="space-y-4">
        <div className="flex items-baseline gap-3">
          <time dateTime={date.toISOString()} className="text-sm text-zinc-400">
            {formatDate(date)}
          </time>
          <span className="text-zinc-300" aria-hidden>·</span>
          <span className="text-xs font-medium text-brand-blue uppercase tracking-wide">
            {TYPE_LABELS[post.type]}
          </span>
        </div>

        <h1 className="font-serif text-4xl text-zinc-800 leading-tight">
          {post.title}
        </h1>

        {post.type === 'book-review' && (
          <p className="text-zinc-500 italic">
            {post.bookTitle} by {post.bookAuthor}
            <span className="not-italic ml-3 text-zinc-400">
              {'★'.repeat(post.rating)}{'☆'.repeat(5 - post.rating)}
            </span>
          </p>
        )}

        {post.type === 'novel-update' && post.wordCount != null && (
          <p className="text-sm text-zinc-400">
            {post.wordCount.toLocaleString()} words
          </p>
        )}

        {post.excerpt && (
          <p className="text-lg text-zinc-500 leading-relaxed border-l-2 border-zinc-200 pl-4">
            {post.excerpt}
          </p>
        )}
      </header>

      {/* Body */}
      {post.body && (
        <TiptapRenderer content={post.body} />
      )}
    </article>
  )
}

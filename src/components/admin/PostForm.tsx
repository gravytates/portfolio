'use client'

import { useRef, useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { TiptapEditor } from './TiptapEditor'
import type { TiptapEditorHandle } from './TiptapEditor'
import { createPost, updatePost } from '@/lib/actions/posts'
import { titleToSlug } from '@/lib/utils/slug'
import type { Post, PostType } from '@/types/domain'
import type { CreatePostInput } from '@/types/api'
import type { JSONContent } from '@tiptap/core'

interface PostFormProps {
  /** Existing post for edit mode; undefined for new post */
  initialPost?: Post
}

const POST_TYPES: { value: PostType; label: string }[] = [
  { value: 'book-review', label: 'Book Review' },
  { value: 'novel-update', label: 'Update' },
  { value: 'essay', label: 'Essay' },
]

const RATINGS = [1, 2, 3, 4, 5] as const

const inputClass =
  'w-full border border-zinc-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/40 focus:border-brand-blue'

const labelClass = 'block text-xs font-medium text-zinc-500 mb-1 uppercase tracking-wide'

const errorClass = 'text-xs text-red-500 mt-1'

export function PostForm({ initialPost }: PostFormProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const editorRef = useRef<TiptapEditorHandle>(null)

  const [postType, setPostType] = useState<PostType>(initialPost?.type ?? 'essay')
  const [title, setTitle] = useState(initialPost?.title ?? '')
  const [slug, setSlug] = useState(initialPost?.slug ?? '')
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(!!initialPost)
  const [status, setStatus] = useState<'draft' | 'published'>(initialPost?.status ?? 'draft')
  const [excerpt, setExcerpt] = useState(initialPost?.excerpt ?? '')
  const [coverImageUrl, setCoverImageUrl] = useState(initialPost?.coverImageUrl ?? '')

  // Book review fields
  const [bookTitle, setBookTitle] = useState(
    initialPost?.type === 'book-review' ? initialPost.bookTitle : '',
  )
  const [bookAuthor, setBookAuthor] = useState(
    initialPost?.type === 'book-review' ? initialPost.bookAuthor : '',
  )
  const [rating, setRating] = useState<1 | 2 | 3 | 4 | 5>(
    initialPost?.type === 'book-review' ? initialPost.rating : 3,
  )

  // Novel update fields
  const [projectSlug, setProjectSlug] = useState(
    initialPost?.type === 'novel-update' ? initialPost.projectSlug : '',
  )
  const [wordCount, setWordCount] = useState<string>(
    initialPost?.type === 'novel-update' && initialPost.wordCount
      ? String(initialPost.wordCount)
      : '',
  )

  const [fieldErrors, setFieldErrors] = useState<Partial<Record<string, string[]>>>({})
  const [globalError, setGlobalError] = useState<string | null>(null)

  function handleTitleChange(value: string) {
    setTitle(value)
    if (!slugManuallyEdited) {
      setSlug(titleToSlug(value))
    }
  }

  function buildInput(): CreatePostInput | null {
    const bodyJSON = editorRef.current?.getJSON()
    const base = {
      slug,
      title,
      ...(excerpt ? { excerpt } : {}),
      ...(coverImageUrl ? { coverImageUrl } : {}),
      status,
      ...(bodyJSON !== undefined ? { body: bodyJSON } : {}),
    }

    if (postType === 'book-review') {
      return { ...base, type: 'book-review', bookTitle, bookAuthor, rating }
    }
    if (postType === 'novel-update') {
      return {
        ...base,
        type: 'novel-update',
        projectSlug,
        ...(wordCount ? { wordCount: parseInt(wordCount, 10) } : {}),
      }
    }
    if (postType === 'essay') {
      return { ...base, type: 'essay' }
    }
    return null
  }

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault()
    setFieldErrors({})
    setGlobalError(null)

    const input = buildInput()
    if (!input) return

    startTransition(async () => {
      const result = initialPost
        ? await updatePost({ id: initialPost.id, ...input })
        : await createPost(input)

      if (!result.success) {
        setGlobalError(result.error)
        if (result.fieldErrors) setFieldErrors(result.fieldErrors)
        return
      }

      router.push('/admin/posts')
      router.refresh()
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Post type + status row */}
      <div className="flex gap-4">
        <div className="flex-1">
          <label className={labelClass}>Type</label>
          <select
            value={postType}
            onChange={(e) => setPostType(e.target.value as PostType)}
            className={inputClass}
            disabled={!!initialPost} // can't change type after creation
          >
            {POST_TYPES.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>
        <div className="w-36">
          <label className={labelClass}>Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as 'draft' | 'published')}
            className={inputClass}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
      </div>

      {/* Title */}
      <div>
        <label className={labelClass}>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => handleTitleChange(e.target.value)}
          placeholder="Post title"
          required
          className={inputClass}
        />
        {fieldErrors['title'] && <p className={errorClass}>{fieldErrors['title'][0]}</p>}
      </div>

      {/* Slug */}
      <div>
        <label className={labelClass}>Slug</label>
        <input
          type="text"
          value={slug}
          onChange={(e) => { setSlug(e.target.value); setSlugManuallyEdited(true) }}
          placeholder="url-slug"
          required
          className={inputClass}
        />
        {fieldErrors['slug'] && <p className={errorClass}>{fieldErrors['slug'][0]}</p>}
      </div>

      {/* Type-specific fields */}
      {postType === 'book-review' && (
        <fieldset className="space-y-4 border border-zinc-100 rounded-xl p-4">
          <legend className="text-xs font-medium text-zinc-400 uppercase tracking-wide px-1">Book details</legend>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Book title</label>
              <input type="text" value={bookTitle} onChange={(e) => setBookTitle(e.target.value)} required className={inputClass} />
              {fieldErrors['bookTitle'] && <p className={errorClass}>{fieldErrors['bookTitle'][0]}</p>}
            </div>
            <div>
              <label className={labelClass}>Author</label>
              <input type="text" value={bookAuthor} onChange={(e) => setBookAuthor(e.target.value)} required className={inputClass} />
              {fieldErrors['bookAuthor'] && <p className={errorClass}>{fieldErrors['bookAuthor'][0]}</p>}
            </div>
          </div>
          <div>
            <label className={labelClass}>Rating</label>
            <div className="flex gap-2">
              {RATINGS.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRating(r)}
                  className={`w-9 h-9 rounded-lg text-sm font-medium border transition-colors ${
                    rating === r
                      ? 'bg-brand-blue text-white border-brand-blue'
                      : 'border-zinc-200 text-zinc-500 hover:border-brand-blue'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        </fieldset>
      )}

      {postType === 'novel-update' && (
        <fieldset className="space-y-4 border border-zinc-100 rounded-xl p-4">
          <legend className="text-xs font-medium text-zinc-400 uppercase tracking-wide px-1">Novel details</legend>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Project slug</label>
              <input type="text" value={projectSlug} onChange={(e) => setProjectSlug(e.target.value)} placeholder="my-novel" required className={inputClass} />
              {fieldErrors['projectSlug'] && <p className={errorClass}>{fieldErrors['projectSlug'][0]}</p>}
            </div>
            <div>
              <label className={labelClass}>Word count (optional)</label>
              <input type="number" value={wordCount} onChange={(e) => setWordCount(e.target.value)} placeholder="42000" min={0} className={inputClass} />
            </div>
          </div>
        </fieldset>
      )}

      {/* Excerpt */}
      <div>
        <label className={labelClass}>Excerpt <span className="normal-case font-normal text-zinc-400">(optional)</span></label>
        <textarea
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          placeholder="Short summary shown on list pages"
          rows={2}
          className={`${inputClass} resize-y`}
        />
      </div>

      {/* Cover image URL */}
      <div>
        <label className={labelClass}>Cover image URL <span className="normal-case font-normal text-zinc-400">(optional)</span></label>
        <input
          type="url"
          value={coverImageUrl}
          onChange={(e) => setCoverImageUrl(e.target.value)}
          placeholder="https://…"
          className={inputClass}
        />
      </div>

      {/* Body */}
      <div>
        <label className={labelClass}>Body</label>
        <TiptapEditor
          ref={editorRef}
          {...(initialPost?.body != null
            ? { initialContent: initialPost.body as JSONContent }
            : {})}
          placeholder="Write your post here…"
        />
      </div>

      {globalError && (
        <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          {globalError}
        </p>
      )}

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={isPending}
          className="bg-brand-blue text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-brand-blue-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isPending ? 'Saving…' : initialPost ? 'Save changes' : 'Create post'}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2.5 rounded-lg text-sm text-zinc-500 hover:text-zinc-700 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

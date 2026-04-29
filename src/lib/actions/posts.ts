'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { mapPost } from '@/lib/utils/mappers'
import { createPostSchema, updatePostSchema } from '@/lib/validations/posts'
import type { ActionResult, CreatePostInput, UpdatePostInput } from '@/types/api'
import type { Post } from '@/types/domain'
import type { DbPostWithAuthor } from '@/types/db'

// ── Helpers ───────────────────────────────────────────────────────────────────

const POST_SELECT = `
  id, type, status, slug, title, excerpt, body, cover_image_url,
  published_at, created_at, updated_at, author_id,
  book_title, book_author, rating,
  project_slug, word_count,
  profiles!author_id (id, display_name, avatar_url)
` as const

/** Invalidate all public writing ISR pages */
function revalidateWriting(slug?: string, type?: string) {
  revalidatePath('/writing', 'layout')
  if (slug) revalidatePath(`/writing/${slug}`)
  if (type === 'book-review') revalidatePath('/writing/book-reviews')
  if (type === 'novel-update') revalidatePath('/writing/novel-updates')
  if (type === 'essay') revalidatePath('/writing/essays')
}

async function getAuthedClient() {
  const supabase = await createClient()
  const { data: { session } } = await supabase.auth.getSession()
  return { supabase, session }
}

// ── Create ────────────────────────────────────────────────────────────────────

export async function createPost(input: CreatePostInput): Promise<ActionResult<Post>> {
  const parsed = createPostSchema.safeParse(input)
  if (!parsed.success) {
    return {
      success: false,
      error: 'Validation failed',
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    }
  }

  const { supabase, session } = await getAuthedClient()
  if (!session) return { success: false, error: 'Unauthorized' }

  const d = parsed.data
  const now = new Date().toISOString()

  const row: Record<string, unknown> = {
    type: d.type,
    status: d.status,
    slug: d.slug,
    title: d.title,
    excerpt: d.excerpt ?? null,
    body: d.body ?? null,
    cover_image_url: d.coverImageUrl ?? null,
    author_id: session.user.id,
    published_at: d.status === 'published' ? now : null,
  }

  if (d.type === 'book-review') {
    row.book_title = d.bookTitle
    row.book_author = d.bookAuthor
    row.rating = d.rating
  } else if (d.type === 'novel-update') {
    row.project_slug = d.projectSlug
    row.word_count = d.wordCount ?? null
  }

  const { data, error } = await supabase
    .from('posts')
    .insert(row)
    .select(POST_SELECT)
    .single()

  if (error || !data) {
    return { success: false, error: error?.message ?? 'Failed to create post' }
  }

  if (d.status === 'published') revalidateWriting(d.slug, d.type)

  return { success: true, data: mapPost(data as unknown as DbPostWithAuthor) }
}

// ── Update ────────────────────────────────────────────────────────────────────

export async function updatePost(input: UpdatePostInput): Promise<ActionResult<Post>> {
  const parsed = updatePostSchema.safeParse(input)
  if (!parsed.success) {
    return {
      success: false,
      error: 'Validation failed',
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    }
  }

  const { supabase, session } = await getAuthedClient()
  if (!session) return { success: false, error: 'Unauthorized' }

  const { id, ...fields } = parsed.data

  const row: Record<string, unknown> = {
    updated_at: new Date().toISOString(),
  }

  if (fields.slug !== undefined) row.slug = fields.slug
  if (fields.title !== undefined) row.title = fields.title
  if ('excerpt' in fields) row.excerpt = fields.excerpt
  if ('body' in fields) row.body = fields.body
  if ('coverImageUrl' in fields) row.cover_image_url = fields.coverImageUrl
  if (fields.status !== undefined) {
    row.status = fields.status
    if (fields.status === 'published') row.published_at = new Date().toISOString()
  }
  if (fields.bookTitle !== undefined) row.book_title = fields.bookTitle
  if (fields.bookAuthor !== undefined) row.book_author = fields.bookAuthor
  if (fields.rating !== undefined) row.rating = fields.rating
  if (fields.projectSlug !== undefined) row.project_slug = fields.projectSlug
  if ('wordCount' in fields) row.word_count = fields.wordCount

  const { data, error } = await supabase
    .from('posts')
    .update(row)
    .eq('id', id)
    .select(POST_SELECT)
    .single()

  if (error || !data) {
    return { success: false, error: error?.message ?? 'Failed to update post' }
  }

  const post = mapPost(data as unknown as DbPostWithAuthor)
  revalidateWriting(post.slug, post.type)

  return { success: true, data: post }
}

// ── Publish / Unpublish ───────────────────────────────────────────────────────

export async function publishPost(id: string): Promise<ActionResult<Post>> {
  return updatePost({ id, status: 'published' })
}

export async function unpublishPost(id: string): Promise<ActionResult<Post>> {
  return updatePost({ id, status: 'draft' })
}

// ── Delete ────────────────────────────────────────────────────────────────────

export async function deletePost(id: string): Promise<ActionResult<void>> {
  const { supabase, session } = await getAuthedClient()
  if (!session) return { success: false, error: 'Unauthorized' }

  // Fetch slug + type first so we can revalidate after deletion
  const { data: post } = await supabase
    .from('posts')
    .select('slug, type, status')
    .eq('id', id)
    .single()

  const { error } = await supabase.from('posts').delete().eq('id', id)

  if (error) return { success: false, error: error.message }

  if (post?.status === 'published') {
    revalidateWriting(post.slug, post.type)
  }

  return { success: true, data: undefined }
}

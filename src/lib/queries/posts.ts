import { createClient } from '@/lib/supabase/server'
import { createStaticClient } from '@/lib/supabase/static'
import { mapPost } from '@/lib/utils/mappers'
import type { Post } from '@/types/domain'
import type { PostListParams } from '@/types/api'
import type { DbPostWithAuthor } from '@/types/db'

const POST_SELECT = `
  id, type, status, slug, title, excerpt, body, cover_image_url,
  published_at, created_at, updated_at, author_id,
  book_title, book_author, rating,
  project_slug, word_count,
  profiles!author_id (id, display_name, avatar_url)
` as const

/**
 * Fetch all posts — includes drafts (admin use).
 * RLS ensures only authenticated editors/admins can read drafts.
 */
export async function getAllPosts(params: PostListParams = {}): Promise<Post[]> {
  const supabase = await createClient()

  let query = supabase
    .from('posts')
    .select(POST_SELECT)
    .order('created_at', { ascending: false })

  if (params.type) query = query.eq('type', params.type)
  if (params.status) query = query.eq('status', params.status)
  if (params.limit) query = query.limit(params.limit)
  if (params.offset) query = query.range(params.offset, params.offset + (params.limit ?? 20) - 1)

  const { data, error } = await query

  if (error) {
    console.error('getAllPosts error:', error.message)
    return []
  }

  return (data ?? []).map((row) => mapPost(row as unknown as DbPostWithAuthor))
}

/**
 * Fetch published posts only — for public /writing pages.
 */
export async function getPublishedPosts(params: Omit<PostListParams, 'status'> = {}): Promise<Post[]> {
  return getAllPosts({ ...params, status: 'published' })
}

/**
 * Fetch a single post by ID — for the admin edit form.
 */
export async function getPostById(id: string): Promise<Post | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('posts')
    .select(POST_SELECT)
    .eq('id', id)
    .single()

  if (error || !data) return null

  return mapPost(data as unknown as DbPostWithAuthor)
}

/**
 * Fetch a single published post by slug — for public /writing/[slug].
 */
export async function getPublishedPostBySlug(slug: string): Promise<Post | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('posts')
    .select(POST_SELECT)
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (error || !data) return null

  return mapPost(data as unknown as DbPostWithAuthor)
}

/**
 * Fetch just slugs — used for generateStaticParams.
 * Uses a cookie-free client since generateStaticParams runs at build time.
 */
export async function getPublishedPostSlugs(): Promise<{ slug: string }[]> {
  const supabase = createStaticClient()
  const { data } = await supabase
    .from('posts')
    .select('slug')
    .eq('status', 'published')
  return data ?? []
}

/**
 * Post counts for the admin dashboard.
 */
export async function getPostStats(): Promise<{
  total: number
  published: number
  drafts: number
}> {
  const supabase = await createClient()

  const { count: total } = await supabase
    .from('posts')
    .select('id', { count: 'exact', head: true })

  const { count: published } = await supabase
    .from('posts')
    .select('id', { count: 'exact', head: true })
    .eq('status', 'published')

  return {
    total: total ?? 0,
    published: published ?? 0,
    drafts: (total ?? 0) - (published ?? 0),
  }
}

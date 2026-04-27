/**
 * Raw shapes returned by Supabase queries.
 * These mirror the DB schema exactly — snake_case, strings for dates,
 * nulls for nullable columns. Do NOT use these directly in components;
 * map through domain types via src/lib/utils/mappers.ts instead.
 */

export type DbUserRole = 'admin' | 'editor'
export type DbPostType = 'book-review' | 'novel-update' | 'essay'
export type DbPostStatus = 'draft' | 'published'
export type DbMediaType = 'image' | 'gif' | 'video' | 'screenshot'

export interface DbProfile {
  id: string
  role: DbUserRole
  display_name: string | null
  avatar_url: string | null
  created_at: string
  updated_at: string
}

export interface DbPost {
  id: string
  type: DbPostType
  status: DbPostStatus
  slug: string
  title: string
  excerpt: string | null
  body: unknown | null // ProseMirror JSON — unknown until validated
  cover_image_url: string | null
  published_at: string | null
  created_at: string
  updated_at: string
  author_id: string
  // book-review specific
  book_title: string | null
  book_author: string | null
  rating: number | null
  // novel-update specific
  project_slug: string | null
  word_count: number | null
}

export interface DbPostWithAuthor extends DbPost {
  profiles: Pick<DbProfile, 'id' | 'display_name' | 'avatar_url'>
}

export interface DbProject {
  id: string
  slug: string
  title: string
  employer: string | null
  description: string
  body: unknown | null
  url: string | null
  github_url: string | null
  technologies: string[]
  display_order: number
  featured: boolean
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface DbProjectMedia {
  id: string
  project_id: string
  url: string
  alt_text: string
  media_type: DbMediaType
  display_order: number
  is_cover: boolean
  created_at: string
}

export interface DbProjectWithMedia extends DbProject {
  project_media: DbProjectMedia[]
}

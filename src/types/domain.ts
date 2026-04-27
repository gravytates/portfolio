/**
 * Application domain types — camelCase, Date objects, non-null where guaranteed.
 * These are what components and server actions operate on.
 * Produced by mapping DB row types through src/lib/utils/mappers.ts.
 */

import type { JSONContent } from '@tiptap/core'

// ── User ──────────────────────────────────────────────────────────────────────

export type UserRole = 'admin' | 'editor'

export interface User {
  id: string
  role: UserRole
  displayName: string | null
  avatarUrl: string | null
}

export type UserSummary = Pick<User, 'id' | 'displayName' | 'avatarUrl'>

// ── Post discriminated union ───────────────────────────────────────────────────

export type PostStatus = 'draft' | 'published'
export type PostType = 'book-review' | 'novel-update' | 'essay'

interface PostBase {
  id: string
  status: PostStatus
  slug: string
  title: string
  excerpt: string | null
  body: JSONContent | null
  coverImageUrl: string | null
  publishedAt: Date | null
  createdAt: Date
  updatedAt: Date
  author: UserSummary
}

export interface BookReviewPost extends PostBase {
  type: 'book-review'
  bookTitle: string
  bookAuthor: string
  rating: 1 | 2 | 3 | 4 | 5 // literal union — not just `number`
}

export interface NovelUpdatePost extends PostBase {
  type: 'novel-update'
  projectSlug: string
  wordCount: number | null
}

export interface EssayPost extends PostBase {
  type: 'essay'
}

export type Post = BookReviewPost | NovelUpdatePost | EssayPost

// ── Utility types ─────────────────────────────────────────────────────────────

/** Narrow the Post union to a specific type by its `type` literal */
export type PostOfType<T extends Post['type']> = Extract<Post, { type: T }>

/** Post without body content — used on list pages to avoid sending full ProseMirror JSON */
export type PostSummary = Omit<Post, 'body'>

// ── Type guards ───────────────────────────────────────────────────────────────

export function isBookReview(post: Post): post is BookReviewPost {
  return post.type === 'book-review'
}

export function isNovelUpdate(post: Post): post is NovelUpdatePost {
  return post.type === 'novel-update'
}

export function isEssay(post: Post): post is EssayPost {
  return post.type === 'essay'
}

/**
 * Exhaustiveness helper — use in switch default branches to get a compile error
 * if a new post type is added to the union but not handled.
 *
 * @example
 * switch (post.type) {
 *   case 'book-review': ...
 *   case 'novel-update': ...
 *   case 'essay': ...
 *   default: assertNever(post)
 * }
 */
export function assertNever(x: never): never {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(x)}`)
}

// ── Project ───────────────────────────────────────────────────────────────────

export type MediaType = 'image' | 'gif' | 'video' | 'screenshot'

export interface ProjectMedia {
  id: string
  url: string
  altText: string
  mediaType: MediaType
  displayOrder: number
  isCover: boolean
}

export interface Project {
  id: string
  slug: string
  title: string
  employer: string | null
  description: string
  body: JSONContent | null
  url: string | null
  githubUrl: string | null
  technologies: string[]
  displayOrder: number
  featured: boolean
  media: ProjectMedia[]
}

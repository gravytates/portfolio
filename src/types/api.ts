/**
 * Server action input/output types.
 * These define the contract between client forms and server mutations.
 * Zod schemas in src/lib/actions/* validate incoming data against these shapes.
 */

import type { JSONContent } from '@tiptap/core'
import type { Post, PostStatus, PostType, UserRole } from './domain'

// ── Result wrapper ─────────────────────────────────────────────────────────────

/**
 * All server actions return ActionResult<T>.
 * On the client, check `result.success` before accessing `result.data`.
 */
export type ActionResult<T> =
  | { success: true; data: T }
  | { success: false; error: string; fieldErrors?: Partial<Record<string, string[]>> }

// ── Post creation inputs (discriminated union) ─────────────────────────────────

interface CreatePostBase {
  slug: string
  title: string
  excerpt?: string
  body?: JSONContent
  coverImageUrl?: string
  status?: PostStatus
}

export interface CreateBookReviewInput extends CreatePostBase {
  type: 'book-review'
  bookTitle: string
  bookAuthor: string
  rating: 1 | 2 | 3 | 4 | 5
}

export interface CreateNovelUpdateInput extends CreatePostBase {
  type: 'novel-update'
  projectSlug: string
  wordCount?: number
}

export interface CreateEssayInput extends CreatePostBase {
  type: 'essay'
}

/** TypeScript enforces the correct fields based on `type` */
export type CreatePostInput =
  | CreateBookReviewInput
  | CreateNovelUpdateInput
  | CreateEssayInput

export interface UpdatePostInput {
  id: string
  type?: PostType
  slug?: string
  title?: string
  excerpt?: string | null
  body?: JSONContent | null
  coverImageUrl?: string | null
  status?: PostStatus
  // book-review
  bookTitle?: string
  bookAuthor?: string
  rating?: 1 | 2 | 3 | 4 | 5
  // novel-update
  projectSlug?: string
  wordCount?: number | null
}

// ── Project mutations ─────────────────────────────────────────────────────────

export interface CreateProjectInput {
  slug: string
  title: string
  employer?: string
  description: string
  body?: JSONContent
  url?: string
  githubUrl?: string
  technologies?: string[]
  displayOrder?: number
  featured?: boolean
}

export interface UpdateProjectInput {
  id: string
  slug?: string
  title?: string
  employer?: string | null
  description?: string
  body?: JSONContent | null
  url?: string | null
  githubUrl?: string | null
  technologies?: string[]
  displayOrder?: number
  featured?: boolean
  isActive?: boolean
}

// ── User management ───────────────────────────────────────────────────────────

export interface InviteUserInput {
  email: string
  role: UserRole
  displayName?: string
}

export interface UpdateUserRoleInput {
  userId: string
  role: UserRole
}

// ── Query params ──────────────────────────────────────────────────────────────

export interface PostListParams {
  type?: Post['type']
  status?: PostStatus
  limit?: number
  offset?: number
}

export interface ProjectListParams {
  featured?: boolean
  isActive?: boolean
}

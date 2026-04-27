/**
 * DB row → domain type mappers.
 * This is the single place where snake_case DB shapes are converted to
 * camelCase domain types, and string dates are converted to Date objects.
 *
 * The separation means DB schema changes only require updates here,
 * not scattered across components.
 */

import type {
  DbPost,
  DbPostWithAuthor,
  DbProfile,
  DbProject,
  DbProjectMedia,
  DbProjectWithMedia,
} from '@/types/db'
import type {
  BookReviewPost,
  EssayPost,
  MediaType,
  NovelUpdatePost,
  Post,
  Project,
  ProjectMedia,
  User,
  UserSummary,
} from '@/types/domain'

// ── User ──────────────────────────────────────────────────────────────────────

export function mapProfile(row: DbProfile): User {
  return {
    id: row.id,
    role: row.role,
    displayName: row.display_name,
    avatarUrl: row.avatar_url,
  }
}

export function mapProfileToSummary(
  row: Pick<DbProfile, 'id' | 'display_name' | 'avatar_url'>,
): UserSummary {
  return {
    id: row.id,
    displayName: row.display_name,
    avatarUrl: row.avatar_url,
  }
}

// ── Post ──────────────────────────────────────────────────────────────────────

function mapRatingToLiteral(rating: number | null): 1 | 2 | 3 | 4 | 5 | null {
  if (rating === null) return null
  if (rating >= 1 && rating <= 5) return rating as 1 | 2 | 3 | 4 | 5
  throw new Error(`Invalid rating value from DB: ${rating}`)
}

export function mapPost(row: DbPostWithAuthor): Post {
  const base = {
    id: row.id,
    status: row.status,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    // body is stored as unknown jsonb — cast to JSONContent; Tiptap handles malformed gracefully
    body: row.body as import('@tiptap/core').JSONContent | null,
    coverImageUrl: row.cover_image_url,
    publishedAt: row.published_at ? new Date(row.published_at) : null,
    createdAt: new Date(row.created_at),
    updatedAt: new Date(row.updated_at),
    author: mapProfileToSummary(row.profiles),
  }

  switch (row.type) {
    case 'book-review': {
      const rating = mapRatingToLiteral(row.rating)
      if (!row.book_title || !row.book_author || rating === null) {
        throw new Error(`book-review post ${row.id} missing required fields`)
      }
      return {
        ...base,
        type: 'book-review',
        bookTitle: row.book_title,
        bookAuthor: row.book_author,
        rating,
      } satisfies BookReviewPost
    }

    case 'novel-update': {
      if (!row.project_slug) {
        throw new Error(`novel-update post ${row.id} missing project_slug`)
      }
      return {
        ...base,
        type: 'novel-update',
        projectSlug: row.project_slug,
        wordCount: row.word_count,
      } satisfies NovelUpdatePost
    }

    case 'essay': {
      return {
        ...base,
        type: 'essay',
      } satisfies EssayPost
    }
  }
}

// ── Project ───────────────────────────────────────────────────────────────────

function mapProjectMedia(row: DbProjectMedia): ProjectMedia {
  return {
    id: row.id,
    url: row.url,
    altText: row.alt_text,
    mediaType: row.media_type as MediaType,
    displayOrder: row.display_order,
    isCover: row.is_cover,
  }
}

export function mapProject(row: DbProjectWithMedia): Project {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    employer: row.employer,
    description: row.description,
    body: row.body as import('@tiptap/core').JSONContent | null,
    url: row.url,
    githubUrl: row.github_url,
    technologies: row.technologies,
    displayOrder: row.display_order,
    featured: row.featured,
    media: (row.project_media ?? []).map(mapProjectMedia),
  }
}

/**
 * Form state types — intentionally separate from domain types.
 *
 * HTML form values are strings until explicitly parsed. Keeping form types
 * distinct from domain types forces the parse boundary to be explicit
 * (at the Zod schema in the server action), preventing coercion bugs from
 * leaking into components.
 *
 * Key differences from domain types:
 * - `rating` is string (HTML select value) not `1 | 2 | 3 | 4 | 5`
 * - `wordCount` is string (text input) not number
 * - `technologies` is comma-separated string not string[]
 * - `body` is absent — TiptapEditor manages its own state and yields JSONContent on submit
 */

export interface BookReviewFormValues {
  slug: string
  title: string
  excerpt: string
  bookTitle: string
  bookAuthor: string
  rating: string // '1' | '2' | '3' | '4' | '5' — string until parseInt
  coverImageUrl: string
  status: 'draft' | 'published'
}

export interface NovelUpdateFormValues {
  slug: string
  title: string
  excerpt: string
  projectSlug: string
  wordCount: string // string until parseInt
  coverImageUrl: string
  status: 'draft' | 'published'
}

export interface EssayFormValues {
  slug: string
  title: string
  excerpt: string
  coverImageUrl: string
  status: 'draft' | 'published'
}

export type PostFormValues =
  | ({ type: 'book-review' } & BookReviewFormValues)
  | ({ type: 'novel-update' } & NovelUpdateFormValues)
  | ({ type: 'essay' } & EssayFormValues)

export interface ProjectFormValues {
  slug: string
  title: string
  employer: string
  description: string
  url: string
  githubUrl: string
  technologies: string // comma-separated — split on save
  displayOrder: string // string until parseInt
  featured: boolean // checkbox is fine as boolean
}

export interface InviteUserFormValues {
  email: string
  role: 'admin' | 'editor'
  displayName: string
}

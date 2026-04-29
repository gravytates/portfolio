import { z } from 'zod'

const slugSchema = z
  .string()
  .min(1, 'Required')
  .regex(/^[a-z0-9-]+$/, 'Lowercase letters, numbers, and hyphens only')

const basePostSchema = z.object({
  slug: slugSchema,
  title: z.string().min(1, 'Required'),
  excerpt: z.string().optional(),
  coverImageUrl: z.string().optional(),
  status: z.enum(['draft', 'published']),
  body: z.unknown().optional(), // JSONContent — opaque to Zod
})

export const createBookReviewSchema = basePostSchema.extend({
  type: z.literal('book-review'),
  bookTitle: z.string().min(1, 'Required'),
  bookAuthor: z.string().min(1, 'Required'),
  rating: z.number().int().min(1).max(5),
})

export const createNovelUpdateSchema = basePostSchema.extend({
  type: z.literal('novel-update'),
  projectSlug: z.string().min(1, 'Required'),
  wordCount: z.number().int().positive().optional(),
})

export const createEssaySchema = basePostSchema.extend({
  type: z.literal('essay'),
})

export const createPostSchema = z.discriminatedUnion('type', [
  createBookReviewSchema,
  createNovelUpdateSchema,
  createEssaySchema,
])

// Update schemas: same shapes but all fields (except type+id) optional
export const updatePostSchema = z.object({
  id: z.string().uuid(),
  slug: slugSchema.optional(),
  title: z.string().min(1).optional(),
  excerpt: z.string().nullable().optional(),
  coverImageUrl: z.string().nullable().optional(),
  status: z.enum(['draft', 'published']).optional(),
  body: z.unknown().nullable().optional(),
  // book-review
  bookTitle: z.string().min(1).optional(),
  bookAuthor: z.string().min(1).optional(),
  rating: z.number().int().min(1).max(5).optional(),
  // novel-update
  projectSlug: z.string().min(1).optional(),
  wordCount: z.number().int().positive().nullable().optional(),
})

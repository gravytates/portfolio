import { getPublishedPostSlugs } from '@/lib/queries/posts'
import type { MetadataRoute } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://gradyshelton.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const postSlugs = await getPublishedPostSlugs()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, priority: 1 },
    { url: `${BASE_URL}/software`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/writing`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/writing/writings`, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE_URL}/writing/book-reviews`, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE_URL}/writing/updates`, changeFrequency: 'weekly', priority: 0.7 },
  ]

  const postRoutes: MetadataRoute.Sitemap = postSlugs.map(({ slug }) => ({
    url: `${BASE_URL}/writing/${slug}`,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [...staticRoutes, ...postRoutes]
}

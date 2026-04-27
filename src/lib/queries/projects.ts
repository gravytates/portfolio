import { createClient } from '@/lib/supabase/server'
import { mapProject } from '@/lib/utils/mappers'
import type { Project } from '@/types/domain'
import type { ProjectListParams } from '@/types/api'

/**
 * Fetch all active projects ordered by display_order.
 * Used on the /software page. Runs server-side, no caching override needed
 * (ISR revalidation is set at the page level).
 */
export async function getProjects(params: ProjectListParams = {}): Promise<Project[]> {
  const supabase = await createClient()

  let query = supabase
    .from('projects')
    .select(`
      *,
      project_media (
        id, project_id, url, alt_text, media_type, display_order, is_cover, created_at
      )
    `)
    .eq('is_active', params.isActive ?? true)
    .order('display_order', { ascending: true })
    .order('display_order', { ascending: true, referencedTable: 'project_media' })

  if (params.featured !== undefined) {
    query = query.eq('featured', params.featured)
  }

  const { data, error } = await query

  if (error) {
    console.error('getProjects error:', error.message)
    return []
  }

  return (data ?? []).map(mapProject)
}

/**
 * Fetch a single project by slug.
 * Used on /software/projects/[slug].
 */
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('projects')
    .select(`
      *,
      project_media (
        id, project_id, url, alt_text, media_type, display_order, is_cover, created_at
      )
    `)
    .eq('slug', slug)
    .eq('is_active', true)
    .order('display_order', { ascending: true, referencedTable: 'project_media' })
    .single()

  if (error || !data) return null

  return mapProject(data)
}

/**
 * Fetch only slugs — used for generateStaticParams.
 */
export async function getProjectSlugs(): Promise<{ slug: string }[]> {
  const supabase = await createClient()

  const { data } = await supabase
    .from('projects')
    .select('slug')
    .eq('is_active', true)

  return data ?? []
}

/**
 * Fetch only featured projects — used on the hub landing page.
 */
export async function getFeaturedProjects(): Promise<Project[]> {
  return getProjects({ featured: true })
}

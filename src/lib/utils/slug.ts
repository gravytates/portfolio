/**
 * Convert a title string to a URL-safe slug.
 * Strips diacritics, lowercases, replaces spaces/special chars with hyphens.
 */
export function titleToSlug(title: string): string {
  return title
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '') // strip diacritics
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

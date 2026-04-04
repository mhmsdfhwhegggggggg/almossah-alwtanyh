/**
 * Small helper for API calls. The frontend will use NEXT_PUBLIC_STRAPI_URL when set.
 */
export function strapiUrl(path = '') {
  const base = process.env.NEXT_PUBLIC_STRAPI_URL || ''
  if (!base) return ''
  return base.replace(/\/$/, '') + (path ? `/${path.replace(/^\//, '')}` : '')
}

export async function fetchStrapi(path) {
  const url = strapiUrl(path)
  if (!url) throw new Error('STRAPI_URL not configured')
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Strapi fetch failed: ${res.status}`)
  return res.json()
}

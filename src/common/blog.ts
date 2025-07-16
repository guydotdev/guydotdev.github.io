import { getCollection, getEntry } from 'astro:content'

export const blogPageSize: number = 5

export async function getBlogPageCount() {
  const allEntries = await getAllBlogEntries()
  const entryCount = allEntries.length
  const pageCount = Math.ceil(entryCount / blogPageSize)
  return pageCount
}

export async function getBlogPageEntries(page: number) {
  const allEntries = await getAllBlogEntries()
  const start = (page - 1) * blogPageSize
  const end = start + blogPageSize
  const entries = allEntries.slice(start, end)
  return entries
}

export async function generateBlogPageRoutes() {
  const pageCount = await getBlogPageCount()
  const routes = []
  for (let page = 2; page <= pageCount; page++) {
    routes.push({
      params: { page },
      props: { page }
    })
  }
  return routes
}

export async function generatePermalinkRoutes() {
  const allEntries = await getAllBlogEntries()
  const routes = allEntries.map(entry => {
    const dt = entry.data.date
    const year = dt.getUTCFullYear().toString()
    const month = (dt.getUTCMonth() + 1).toString().padStart(2, '0')
    const day = dt.getUTCDate().toString().padStart(2, '0')
    const slug = entry.slug

    return {
      params: { year, month, day, slug },
      props: { entry }
    }
  })

  return routes
}

export async function getPermalink(slug: string) {
  const entry = await getBlogEntry(slug)
  const dt = entry.data.date
  const year = dt.getUTCFullYear().toString()
  const month = (dt.getUTCMonth() + 1).toString().padStart(2, '0')
  const day = dt.getUTCDate().toString().padStart(2, '0')

  return `/${year}/${month}/${day}/${slug}`
}

export async function getAllBlogEntries() {
  return (await getCollection('blog', entry => !entry.data.draft)).reverse()
}

export async function getBlogEntry(slug: string) {
  return await getEntry('blog', slug)
}

import rss, { type RSSFeedItem } from '@astrojs/rss'
import { type APIContext } from 'astro'
import MarkdownIt from 'markdown-it'

import { getAllBlogEntries, getPermalink } from '../common/blog'

const md = new MarkdownIt()

export async function GET(context: APIContext) {
  const site = context.site.toString().endsWith('/')
    ? context.site.toString().slice(0, -1)
    : context.site.toString()

  const entries = await getAllBlogEntries()

  const items = await Promise.all(
    entries.map(async entry => {
      const title = entry.data.title
      const pubDate = entry.data.date
      const content = md.render(entry.body)
      const permalink = await getPermalink(entry.slug)
      const link = `${site}${permalink}`

      const item: RSSFeedItem = { title, pubDate, content, link }

      if (entry.data.image) {
        item.customData = `<media:thumbnail>${site}${entry.data.image}</media:thumbnail>`
      }

      return item
    })
  )

  return rss({
    title: 'GuyDotDev',
    description: 'Work. Life. Code. Game. Lather. Rinse. Repeat.',
    customData: '<language>en-us</language>',
    site,
    items,
    trailingSlash: false,
    xmlns: {
      media: 'http://search.yahoo.com/mrss/'
    }
  })
}

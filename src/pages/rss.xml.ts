import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { SITE } from '../lib/site';

export async function GET(context: APIContext) {
  const notebook = await getCollection('notebook', ({ data }) => !data.draft);

  const items = notebook
    .map((entry) => ({
      title: entry.data.title,
      description: entry.data.summary,
      pubDate: entry.data.date,
      link: `/notebook/${entry.id}`
    }))
    .sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf());

  return rss({
    title: `${SITE.name} · Notebook`,
    description: SITE.description,
    site: context.site ?? SITE.url,
    items,
    customData: '<language>en-us</language>'
  });
}

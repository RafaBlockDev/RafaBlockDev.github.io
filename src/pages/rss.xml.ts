import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getSortedCollection } from '../lib/content';
import { SITE } from '../lib/site';

export async function GET(context: APIContext) {
  const notebook = await getSortedCollection('notebook');

  const items = notebook.map((entry) => ({
    title: entry.data.title,
    description: entry.data.summary,
    pubDate: entry.data.date,
    link: `/notebook/${entry.id}/`
  }));

  return rss({
    title: `${SITE.name} · Notebook`,
    description: SITE.description,
    site: context.site ?? SITE.url,
    items,
    customData: '<language>en-us</language>'
  });
}

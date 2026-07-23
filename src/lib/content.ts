import { getCollection, type CollectionEntry, type CollectionKey } from 'astro:content';

/**
 * Fetches a content collection with drafts removed and entries ordered
 * newest-first by `date`. All three collections (research, projects,
 * notebook) share this shape, so this is the single place that encodes
 * "published entries, newest first".
 */
export async function getSortedCollection<C extends CollectionKey>(
  collection: C
): Promise<CollectionEntry<C>[]> {
  const entries = await getCollection(collection, ({ data }) => !data.draft);
  return entries.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

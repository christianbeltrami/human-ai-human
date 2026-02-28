import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  const sorted = posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  return rss({
    title: 'human-ai-human',
    description: 'Notes on creative AI, cinema, and human collaboration — by Christian Beltrami.',
    site: context.site ?? 'https://human-ai-human.org',
    items: sorted.map(post => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.excerpt ?? '',
      link: `/posts/${post.slug}/`,
      categories: post.data.tags,
    })),
    customData: `<language>fr-CA</language>`,
    stylesheet: false,
  });
}

import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import rss from '@astrojs/rss';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://human-ai-human.org',
  output: 'static',
  adapter: vercel(),
  integrations: [
    mdx(),
    sitemap(),
  ],
});

import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://foremostmachine.com',
  integrations: [
    tailwind(),
    sitemap({
      filter: (page) => !page.includes('/portal/')
    })
  ],
  output: 'static'
});

import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://foremostmachine.com',
  integrations: [tailwind()],
  output: 'static'
});

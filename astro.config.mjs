import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

const [owner, repo] = (process.env.GITHUB_REPOSITORY || '').split('/');
const usingGithubActions = process.env.GITHUB_ACTIONS === 'true';
const hasCustomSiteUrl = Boolean(process.env.SITE_URL);
const isUserOrOrgPagesRepo = Boolean(owner && repo) && repo.toLowerCase() === `${owner.toLowerCase()}.github.io`;

const site =
  process.env.SITE_URL ||
  (usingGithubActions && owner ? `https://${owner}.github.io` : 'https://example.com');

const base =
  process.env.SITE_BASE ||
  (hasCustomSiteUrl || isUserOrOrgPagesRepo ? '/' : usingGithubActions && repo ? `/${repo}/` : '/');

export default defineConfig({
  site,
  base,
  integrations: [
    tailwind(),
    sitemap({
      filter: (page) => !page.includes('/portal/')
    })
  ],
  output: 'static'
});

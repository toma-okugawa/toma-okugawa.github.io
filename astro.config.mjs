// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // A GitHub Pages *user* site lives at the domain root, so there is no `base`.
  site: 'https://toma-okugawa.github.io',
  trailingSlash: 'always',
  // The stylesheet is tiny: inline it so a page is one request.
  build: { format: 'directory', inlineStylesheets: 'always' },
  devToolbar: { enabled: false },
  i18n: {
    locales: ['ja', 'en'],
    defaultLocale: 'ja',
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      // The same language codes as the <link rel="alternate" hreflang> in every page head.
      i18n: { defaultLocale: 'ja', locales: { ja: 'ja', en: 'en' } },
      filter: (page) => !/\/404\/?$/.test(page),
    }),
  ],
  markdown: {
    // Plain <pre><code> blocks: no inline colour styles to fight the light/dark theme.
    syntaxHighlight: false,
  },
});

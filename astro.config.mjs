// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { satteri } from '@astrojs/markdown-satteri';

/**
 * Wraps every Markdown table in <div class="table-wrap">. The div scrolls sideways on narrow screens,
 * so the table keeps `display: table` (and its row/column semantics for screen readers).
 * A hast plugin for Sätteri, Astro's default Markdown processor.
 * @type {import('satteri').HastPluginDefinition}
 */
const wrapTables = {
  name: 'wrap-tables',
  element: {
    filter: ['table'],
    visit(node, ctx) {
      ctx.wrapNode(node, { type: 'element', tagName: 'div', properties: { className: ['table-wrap'] }, children: [] });
    },
  },
};

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
    // The default processor (Sätteri) with one extra step.
    processor: satteri({ hastPlugins: [wrapTables] }),
  },
});

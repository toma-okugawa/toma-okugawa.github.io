import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import site from '../data/site.json';
import { href, ui, type Lang } from '../i18n';
import { entrySlug, getNotes } from './content';

/** RSS 2.0 feed of the notes in one language: /rss.xml (ja) and /en/rss.xml (en). */
export async function notesFeed(lang: Lang, context: APIContext) {
  const notes = await getNotes(lang);
  return rss({
    title: `${site.name[lang]} — ${ui[lang].notes.title}`,
    description: ui[lang].notes.description,
    // the channel <link> is the home page in this language; item links are root-relative, so they resolve the same way
    site: new URL(href(lang, '/'), context.site ?? 'https://toma-okugawa.github.io').href,
    trailingSlash: true,
    items: notes.map((n) => ({
      title: n.data.title,
      description: n.data.description,
      pubDate: n.data.date,
      link: href(lang, `/notes/${entrySlug(n.id)}/`),
      categories: n.data.tags,
    })),
    customData: `<language>${lang}</language>`,
  });
}

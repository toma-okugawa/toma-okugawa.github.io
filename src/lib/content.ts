import { getCollection, getEntry, type CollectionEntry } from 'astro:content';
import type { Lang } from '../i18n';

/** Collections with one file per language and a `draft` flag. */
type Localized = 'projects' | 'notes';

/** `ja/sd-retinex` → `ja` */
export const entryLang = (id: string) => id.split('/')[0] as Lang;
/** `ja/sd-retinex` → `sd-retinex` */
export const entrySlug = (id: string) => id.split('/').slice(1).join('/');

/** Drafts are visible while writing (`npm run dev`) and left out of every build. */
const published = (data: { draft?: boolean }) => !(import.meta.env.PROD && data.draft);

/** Projects in one language: newest year first, then `order`, then title. */
export async function getProjects(lang: Lang) {
  const all = await getCollection('projects', (e) => entryLang(e.id) === lang && published(e.data));
  return all.sort(
    (a, b) => b.data.year - a.data.year || a.data.order - b.data.order || a.data.title.localeCompare(b.data.title),
  );
}

/** Projects grouped by year, newest year first. */
export async function getProjectsByYear(lang: Lang) {
  const groups = new Map<number, CollectionEntry<'projects'>[]>();
  for (const p of await getProjects(lang)) {
    const list = groups.get(p.data.year) ?? [];
    list.push(p);
    groups.set(p.data.year, list);
  }
  return [...groups.entries()];
}

export async function getFeaturedProjects(lang: Lang) {
  return (await getProjects(lang)).filter((p) => p.data.featured).sort((a, b) => a.data.order - b.data.order);
}

/** Notes in one language, newest first. */
export async function getNotes(lang: Lang) {
  const all = await getCollection('notes', (e) => entryLang(e.id) === lang && published(e.data));
  return all.sort((a, b) => b.data.date.getTime() - a.data.date.getTime() || a.id.localeCompare(b.id));
}

/** True when the same slug is published in the other language (for the language switch and hreflang). */
export async function hasTranslation(collection: Localized, lang: Lang, slug: string) {
  // getCollection, not getEntry: getEntry logs a warning for every note that exists in only one language
  const id = `${lang}/${slug}`;
  return (await getCollection(collection, (e) => e.id === id && published(e.data))).length > 0;
}

/** A long-form page (home.md, about.md) in one language. */
export async function getPage(lang: Lang, slug: 'home' | 'about') {
  const page = await getEntry('pages', `${lang}/${slug}`);
  if (!page) throw new Error(`Missing src/content/pages/${lang}/${slug}.md`);
  return page;
}

/** Publications grouped by type (papers first), newest first within each group. */
export async function getPublications() {
  const key = (p: CollectionEntry<'publications'>) => p.data.date ?? String(p.data.year);
  const all = (await getCollection('publications')).sort(
    (a, b) => b.data.year - a.data.year || key(b).localeCompare(key(a)) || a.id.localeCompare(b.id),
  );
  return (['paper', 'preprint'] as const)
    .map((type) => [type, all.filter((p) => p.data.type === type)] as const)
    .filter(([, list]) => list.length > 0);
}

/** Timeline, newest first; items in the same month by `order`, then id. */
export async function getTimeline() {
  return (await getCollection('timeline')).sort(
    (a, b) => b.data.date.localeCompare(a.data.date) || a.data.order - b.data.order || a.id.localeCompare(b.id),
  );
}

/** Skills by `order`, then id. */
export async function getSkills() {
  return (await getCollection('skills')).sort((a, b) => a.data.order - b.data.order || a.id.localeCompare(b.id));
}

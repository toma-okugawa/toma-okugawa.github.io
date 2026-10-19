/**
 * Content collections: the Markdown / YAML "CMS" of the site.
 *
 * Language-specific entries live in `<collection>/ja/*.md` and `<collection>/en/*.md`.
 * The file name is the URL slug and links the two translations:
 * `projects/ja/sd-retinex.md` ↔ `projects/en/sd-retinex.md` → /projects/sd-retinex/ and /en/projects/sd-retinex/.
 *
 * Drafts: a file whose name starts with `_` is never loaded, and an entry with `draft: true`
 * shows in `npm run dev` but is left out of `npm run build` (see src/lib/content.ts).
 */
import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';

const localized = (base: string) => glob({ pattern: '{ja,en}/**/[^_]*.md', base: `./src/content/${base}` });

/** A string in both languages. */
const bi = z.object({ ja: z.string(), en: z.string() });
/** One string for both languages, or `{ ja, en }`. */
const text = z.union([z.string(), bi]);
/** Like `text`, but one language may be left out (it then shows nothing in that language). */
const someText = z.union([z.string(), bi.partial()]);
/** Year and month, e.g. 2026-10 (an unquoted YAML value is read as text, so both forms work). */
const month = z.coerce.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/, 'Use YYYY-MM');
/** YYYY-MM or YYYY-MM-DD. An unquoted YAML YYYY-MM-DD arrives as a Date and is turned back into text. */
const partialDate = z.union([
  z.date().transform((d) => d.toISOString().slice(0, 10)),
  z.coerce.string().regex(/^\d{4}-(0[1-9]|1[0-2])(-(0[1-9]|[12]\d|3[01]))?$/, 'Use YYYY-MM or YYYY-MM-DD'),
]);

/** Projects / プロジェクト: one Markdown file per project and language. The body is the project page. */
const projects = defineCollection({
  loader: localized('projects'),
  schema: z.object({
    title: z.string(),
    /** One or two sentences, shown in lists and used as the meta description. */
    summary: z.string(),
    year: z.number().int().min(2000).max(2100),
    /** Free text such as "2025-05 – 2025-07". */
    period: z.string().optional(),
    role: z.string(),
    stack: z.array(z.string()).default([]),
    status: z.enum(['active', 'completed', 'archived']),
    category: z.enum(['research', 'app', 'web', 'tool', 'contest']),
    links: z
      .object({
        repo: z.url().optional(),
        demo: z.url().optional(),
        paper: z.url().optional(),
        site: z.url().optional(),
      })
      .default({}),
    /** Shown on the home page. */
    featured: z.boolean().default(false),
    /** Smaller first, within a year (and among featured projects). */
    order: z.number().default(100),
    draft: z.boolean().default(false),
  }),
});

/** Notes / ノート: the blog. One Markdown file per post and language. */
const notes = defineCollection({
  loader: localized('notes'),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

/** Long-form copy for the home intro (`home.md`) and the About page (`about.md`). */
const pages = defineCollection({
  loader: localized('pages'),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    /** Home only: the "Now" line and the month it was written. */
    now: z.string().optional(),
    nowDate: month.optional(),
  }),
});

/** Publications: one YAML list shared by both languages (from researchmap). */
const publications = defineCollection({
  loader: file('src/content/publications.yaml'),
  schema: z.object({
    /** paper = researchmap "published papers"; preprint = preprint servers (Jxiv, Zenodo, EdArXiv). */
    type: z.enum(['paper', 'preprint']),
    title: text,
    authors: text,
    venue: text,
    year: z.number().int(),
    /** YYYY-MM or YYYY-MM-DD. Only used to sort the list (newest first). */
    date: partialDate.optional(),
    /** Bare DOI such as 10.5281/zenodo.20945211 (a pasted https://doi.org/ prefix is removed). */
    doi: z
      .string()
      .transform((v) => v.trim().replace(/^https?:\/\/(dx\.)?doi\.org\//i, ''))
      .optional(),
    url: z.url().optional(),
    note: someText.optional(),
  }),
});

/** About page timeline: education, awards and programmes, bilingual. */
const timeline = defineCollection({
  loader: file('src/content/timeline.yaml'),
  schema: z.object({
    date: month,
    kind: z.enum(['education', 'research', 'award', 'program', 'other']),
    text: bi,
    /** Slug of a project page to link to. */
    project: z.string().optional(),
    url: z.url().optional(),
    /** Tie-breaker for items in the same month (smaller first). */
    order: z.number().default(0),
  }),
});

/** About page: skills and stack, each with where it was used. */
const skills = defineCollection({
  loader: file('src/content/skills.yaml'),
  schema: z.object({
    area: bi,
    items: z.array(z.string()),
    used: bi,
    /** Smaller first. */
    order: z.number().default(0),
  }),
});

export const collections = { projects, notes, pages, publications, timeline, skills };

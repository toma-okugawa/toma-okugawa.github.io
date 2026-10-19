---
title: About this site
description: This site is built with Astro and Markdown and published on GitHub Pages. How it works, and how to add a note.
date: 2026-10-19
tags: [astro, github-pages]
---

This site is kept as simple as I could make it.

## How it works

- [Astro](https://astro.build/) 7 generates static HTML. There is no JavaScript running in the browser and no web font: text uses your system fonts.
- All content is Markdown and YAML files. They take the place of a CMS: edit a file, push, and the site updates.
- Japanese lives at `/` and English at `/en/`. A file with the same name in the `ja/` and `en/` folders links the two translations, and the language switch connects them.
- A push to the `main` branch makes GitHub Actions build the site and publish it to GitHub Pages.

| Content | Location |
| --- | --- |
| Projects | `src/content/projects/{ja,en}/*.md` |
| Notes | `src/content/notes/{ja,en}/*.md` |
| Publications | `src/content/publications.yaml` |
| Timeline and skills | `src/content/timeline.yaml`, `src/content/skills.yaml` |
| Name and links | `src/data/site.json` |

## How to add a note

1. Create a Markdown file in `src/content/notes/en/` whose name uses only lowercase letters, digits and hyphens, e.g. `first-note.md`. The file name becomes the URL: `/en/notes/first-note/`.
2. For the Japanese version, create a file with the same name in `src/content/notes/ja/`.
3. Start the file with frontmatter like this, then write the body in Markdown below it.

```md
---
title: Title of the note
description: One or two sentences for the list and the RSS feed
date: 2026-10-19
tags: [astro]
---

Body text
```

4. Check it with `npm run dev`, commit, and push to `main`.

Files whose names start with `_` are never loaded, and a note with `draft: true` is not published (it still shows in `npm run dev`). New notes also appear in the [RSS feed](/en/rss.xml).

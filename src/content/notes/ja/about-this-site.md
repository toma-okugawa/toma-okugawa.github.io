---
title: このサイトについて
description: このサイトは Astro と Markdown でつくり、GitHub Pages で公開しています。仕組みと、ノートの書き方のメモです。
date: 2026-10-19
tags: [astro, github-pages]
---

このサイトは、できるだけ単純につくっています。

## 仕組み

- [Astro](https://astro.build/) 7 で、静的な HTML を生成しています。ブラウザで動く JavaScript はなく、Web フォントも読み込みません（文字は端末のシステムフォントです）。
- 内容はすべて Markdown と YAML のファイルです。これが CMS の代わりになっていて、ファイルを書き換えて push するだけで更新できます。
- 日本語は `/`、英語は `/en/` です。日本語の `ja/` と英語の `en/` のフォルダに同じファイル名で置くと、2つが対応づけられ、言語の切り替えリンクがその記事どうしを結びます。
- `main` ブランチに push すると、GitHub Actions がビルドして GitHub Pages に公開します。

| 内容 | 場所 |
| --- | --- |
| プロジェクト | `src/content/projects/{ja,en}/*.md` |
| ノート | `src/content/notes/{ja,en}/*.md` |
| 論文・プレプリント | `src/content/publications.yaml` |
| 経歴・スキル | `src/content/timeline.yaml`, `src/content/skills.yaml` |
| 名前・リンク | `src/data/site.json` |

## ノートの書き方

1. `src/content/notes/ja/` に、英小文字・数字・ハイフンだけのファイル名で Markdown を作ります（例: `first-note.md`）。ファイル名がそのまま URL になります（`/notes/first-note/`）。
2. 英語版を書くときは、`src/content/notes/en/` に同じファイル名で作ります。
3. 先頭に次のような frontmatter を書き、その下に本文を Markdown で書きます。

```md
---
title: ノートのタイトル
description: 一覧と RSS に出る1〜2文の説明
date: 2026-10-19
tags: [astro]
---

本文
```

4. `npm run dev` で確認してから commit し、`main` に push します。

ファイル名が `_` で始まるファイルは読み込まれず、`draft: true` を書いたノートは公開されません（`npm run dev` では見えます）。新しいノートは [RSS](/rss.xml) にも載ります。

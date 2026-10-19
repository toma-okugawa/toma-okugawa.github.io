# toma-okugawa.github.io

プログラマーとしての **奥河 董馬（Toma Okugawa）** の個人サイトです。

- 公開 URL: https://toma-okugawa.github.io/ （英語版 `/en/`）
- フレームワーク: [Astro](https://astro.build/) 7（静的サイト生成）
- コンテンツ管理: Markdown / YAML / JSON（`src/content/`・`src/data/`）— ファイルを編集するだけで更新できます
- 言語: 日本語（`/`）・英語（`/en/`）
- 配信: GitHub Pages（`main` への push で GitHub Actions が自動でビルド・公開）
- デザイン: 1カラム、システムフォント、リンクの色は `#2563EB`（ダークモードでは `#60A5FA`）のみ。ブラウザで動く JavaScript と Web フォントはありません

---

## 1. ローカルで動かす

必要なもの: **Node.js 22.22 以上**（`.nvmrc` は 24）

```bash
npm install          # 依存パッケージのインストール
npm run dev          # 開発サーバー → http://localhost:4321
npm run build        # 本番ビルド（dist/ に出力）
npm run preview      # ビルド結果の確認
npm run check        # 型・コンテンツのチェック（astro check）
npm run check:links  # ビルド後の内部リンク・JavaScript なし・トップページの容量（30 KB 未満）の確認
```

Windows の PowerShell では `npm` の代わりに `npm.cmd` を使ってください。

---

## 2. コンテンツの編集（Markdown CMS）

ほとんどの更新は、次のファイルの編集だけで完結します。
日本語は `ja/`、英語は `en/` フォルダに **同じファイル名** で置くと、言語切り替えと hreflang で対応づけられます。

| 内容 | 場所 | 備考 |
| --- | --- | --- |
| プロジェクト | `src/content/projects/{ja,en}/*.md` | ファイル名が URL になります（`sd-retinex.md` → `/projects/sd-retinex/`）。本文がプロジェクトのページです |
| ノート（ブログ） | `src/content/notes/{ja,en}/*.md` | ファイル名が URL（`/notes/<名前>/`）。RSS は `/rss.xml` と `/en/rss.xml` |
| 論文・プレプリント | `src/content/publications.yaml` | 日英共通の1ファイル。researchmap と同じ内容にそろえます |
| 経歴（About のタイムライン） | `src/content/timeline.yaml` | `project:` を書くとプロジェクトのページへリンクします |
| スキルと技術 | `src/content/skills.yaml` | About ページの一覧 |
| トップの紹介文・Now | `src/content/pages/{ja,en}/home.md` | 本文が紹介文、`now` と `nowDate` が「Now」の行 |
| About の紹介文 | `src/content/pages/{ja,en}/about.md` | |
| 名前・肩書き・リンク・メール | `src/data/site.json` | `email` は空のときは表示されません |
| ナビゲーションなどの UI 文言 | `src/i18n/index.ts` | |

**下書き**: ファイル名が `_` で始まるファイル（例: `_draft.md`）は読み込まれません。
frontmatter に `draft: true` を書いたプロジェクト・ノートは、`npm run dev` では表示され、`npm run build`（公開されるサイト）には含まれません。

ファイル名は英小文字・数字・ハイフンだけにしてください。`ja/`・`en/` の中にサブフォルダは作れません（サブフォルダ内のファイルは読み込まれません）。
frontmatter や YAML の項目名を書き間違えると（例: `darft: true`）、`npm run build` と `npm run check` がエラーで止まります。日付は実在する日付だけが使えます。
YAML の値に `: `（コロン＋空白）や ` #` を含む場合、または値が `'` `"` `[` `{` `&` `*` `!` `|` `>` `%` `@` で始まる場合は、`title: '...'` のように引用符で囲みます（値の中の `'` は `''` と2つ重ねます）。

### プロジェクトを追加する

`src/content/projects/ja/<名前>.md` と、英語版の `src/content/projects/en/<名前>.md` を作ります。

```md
---
title: プロジェクト名
summary: 一覧と検索結果に出る1〜2文の説明
year: 2026                     # 一覧は年ごと（新しい順）にまとまります
period: 2026-04 – 2026-09      # 任意。書くと「期間」として表示
role: 開発                      # 自分の役割
stack: [Python, OpenCV]        # 使った技術（任意）
status: active                 # active（進行中）/ completed（完了）/ archived（終了）
category: research             # research / app / web / tool / contest
links:                         # どれも任意
  repo: https://github.com/toma-okugawa/...
  site: https://example.com/
  paper: https://doi.org/10....
  demo: https://example.com/demo/
featured: false                # true でトップページの「主なプロジェクト」に表示
order: 10                      # 同じ年の中の並び順（小さいほど先）
# draft: true                  # 公開しない場合
---

本文を Markdown で書きます。見出し（##）、箇条書き、表、[リンク](/projects/sd-retinex/) が使えます。
英語版の本文からサイト内にリンクするときは `/en/projects/...` のように `/en/` を付けます。
```

シリーズで複数のプロジェクトを追加するときも、1プロジェクト1ファイルで増やしていけば、一覧に年ごとに並びます。

### ノートを追加する

`src/content/notes/ja/<名前>.md`（英語版は `src/content/notes/en/<名前>.md`）を作ります。

```md
---
title: ノートのタイトル
description: 一覧と RSS に出る1〜2文の説明
date: 2026-10-19
tags: [astro]
# draft: true
---

本文
```

片方の言語だけのノートでもかまいません。その場合、言語切り替えはもう一方の言語のノート一覧へ移動します。

### 論文を追加する

`src/content/publications.yaml` に1項目を足します（researchmap に登録した内容と同じにします）。

```yaml
- id: new-paper-2027             # 重複しない名前
  type: paper                    # paper（論文）/ preprint（プレプリント）
  title:                         # 1つの文字列か、ja: と en: の2言語
    ja: 日本語の題名
    en: English title
  authors: Toma Okugawa, Keito Inoshita   # 「, 」区切り。自分の名前は太字で表示
  venue: 掲載先
  year: 2027
  date: 2027-03-01               # 任意。並び順にだけ使います（YYYY-MM または YYYY-MM-DD）
  doi: 10.xxxx/xxxxx             # 「10.」から始まる部分だけ
  # url: https://...             # DOI がないときのリンク
  # note: { ja: 発表予定, en: To appear }
```

---

## 3. 公開（GitHub Pages）

`.github/workflows/deploy.yml` が、`main` への push（または Actions タブからの手動実行）で次を行います。

1. [withastro/action](https://github.com/withastro/action) で `npm install` → `npm run check && npm run build && npm run check:links`
2. [actions/deploy-pages](https://github.com/actions/deploy-pages) で GitHub Pages に公開

型・コンテンツの定義のエラーや、サイト内のリンク切れ（外部リンクは対象外）があるとビルドが失敗し、公開されません。

**初回だけ**:

- リポジトリは **Public** にします。GitHub Free のアカウントでは、Private リポジトリから GitHub Pages は公開できません（GitHub Pro などの有料プランなら可能）。
- リポジトリの Settings → Pages → Build and deployment の Source を **GitHub Actions** にします。これをしないと最初のデプロイが失敗します（その場合は設定後に Actions タブからワークフローを再実行）。コマンドで設定する場合:

  ```bash
  gh api -X POST repos/toma-okugawa/toma-okugawa.github.io/pages -f build_type=workflow
  ```

`toma-okugawa.github.io` はユーザーサイトなので、`astro.config.mjs` に `base` は不要です（`site: 'https://toma-okugawa.github.io'`）。

---

## 4. ディレクトリ構成

```text
├── astro.config.mjs        # サイト URL、多言語、サイトマップ
├── .github/workflows/      # GitHub Pages への自動公開
├── public/                 # そのまま配信するファイル（favicon.svg, robots.txt）
├── scripts/check-links.mjs # ビルド後のチェック（内部リンク・JavaScript なし・容量）
└── src/
    ├── content/            # ★ Markdown CMS（プロジェクト・ノート・論文・経歴・スキル・紹介文）
    ├── content.config.ts   # 各コンテンツの項目定義（スキーマ）
    ├── data/site.json      # ★ 名前・肩書き・リンク・メール
    ├── i18n/index.ts       # UI 文言と、日英のパスの対応
    ├── lib/                # コンテンツの読み込み・並べ替え、RSS
    ├── components/         # ヘッダー・フッター
    ├── layouts/Base.astro  # 共通レイアウト（title・description・canonical・hreflang・OGP）
    ├── views/              # 各ページの本体（日英共通）
    ├── pages/              # ルーティング（/ と /en/ の両方）
    └── styles/global.css   # デザインのすべて（色・文字・余白、ライト／ダーク）
```

## 5. デザインについて

- 1カラム（最大幅 40rem）、日本語は行間 1.8、英語は 1.65
- 文字はシステムフォント（`system-ui, -apple-system, "Segoe UI", "Hiragino Sans", "Noto Sans JP", "Yu Gothic UI", sans-serif`）。日付などの小さなメタ情報は等幅
- 色は黒・白・グレーと、リンクの `#2563EB` だけ。ダークモード（`prefers-color-scheme`）ではコントラストを保つため同系色の `#60A5FA`
- カード・影・グラデーション・アニメーションは使いません
- アクセシビリティ: スキップリンク、ランドマーク、`lang` 属性、見えるフォーカス、コントラスト AA

## ライセンス

- コード（設定・レイアウト・コンポーネント・スタイル・スクリプト）: [MIT License](LICENSE)
- 文章などのコンテンツ（`src/content/`・`src/data/`）: © Toma Okugawa. All rights reserved.

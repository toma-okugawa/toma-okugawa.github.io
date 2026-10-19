/** Japanese lives at /, English at /en/. */
export type Lang = 'ja' | 'en';
export const langs: readonly Lang[] = ['ja', 'en'];
export const otherLang = (lang: Lang): Lang => (lang === 'ja' ? 'en' : 'ja');

export type Text = string | { ja?: string; en?: string };

/** Pick one language out of a bilingual value. */
export const pick = (value: Text | undefined, lang: Lang) =>
  value == null ? '' : typeof value === 'string' ? value : (value[lang] ?? '');

/** A site path in the given language: href('en', '/projects/') → '/en/projects/'. */
export const href = (lang: Lang, path = '/') => {
  const p = path.startsWith('/') ? path : `/${path}`;
  return lang === 'ja' ? p : `/en${p}`;
};

/** The same page in the other language (or in `to`). */
export const switchPath = (pathname: string, to: Lang) => href(to, pathname.replace(/^\/en(?=\/|$)/, '') || '/');

/** 2026-10-19 (dates are written in Japan time; a date-only value is UTC midnight, the same calendar day). */
export const isoDate = (d: Date) => d.toISOString().slice(0, 10);

/** UI strings. Long copy lives in src/content/ and src/data/site.json. */
export const ui = {
  ja: {
    skip: '本文へ移動',
    nav: { projects: 'Projects', publications: 'Publications', notes: 'Notes', about: 'About' },
    navLabel: 'サイト内',
    switchLabel: 'English',
    switchText: 'EN',
    now: 'Now',
    featured: '主なプロジェクト',
    allProjects: 'すべてのプロジェクト',
    latestNotes: '最近のノート',
    allNotes: 'すべてのノート',
    links: 'リンク',
    email: 'メール',
    projects: { title: 'プロジェクト', description: '研究・アプリ・Web など、これまでにつくったものの一覧です。' },
    publications: {
      title: '論文・プレプリント',
      description: '論文とプレプリントの一覧です。最新の一覧は researchmap にあります。',
      paper: '論文',
      preprint: 'プレプリント',
      more: '最新の業績一覧は researchmap にあります。',
    },
    notes: { title: 'ノート', description: '開発や研究についてのメモです。', rss: 'RSS', empty: 'まだノートはありません。' },
    about: { timeline: '経歴', skills: 'スキルと技術' },
    project: {
      year: '年',
      period: '期間',
      role: '役割',
      status: '状態',
      category: '分類',
      stack: '技術',
      links: 'リンク',
      back: 'プロジェクト一覧へ',
      linkLabels: { repo: 'ソースコード', demo: 'デモ', paper: '論文', site: 'Web サイト' },
    },
    note: { back: 'ノート一覧へ', tags: 'タグ' },
    status: { active: '進行中', completed: '完了', archived: '終了' },
    category: { research: '研究', app: 'アプリ', web: 'Web', tool: 'ツール', contest: 'コンテスト' },
    footer: { rss: 'RSS' },
    notFound: { title: 'ページが見つかりません', text: 'お探しのページは移動したか、存在しません。', home: 'トップへ' },
  },
  en: {
    skip: 'Skip to content',
    nav: { projects: 'Projects', publications: 'Publications', notes: 'Notes', about: 'About' },
    navLabel: 'Site',
    switchLabel: '日本語',
    switchText: 'JA',
    now: 'Now',
    featured: 'Featured projects',
    allProjects: 'All projects',
    latestNotes: 'Latest notes',
    allNotes: 'All notes',
    links: 'Links',
    email: 'Email',
    projects: { title: 'Projects', description: 'Research, apps and web work, newest first.' },
    publications: {
      title: 'Publications',
      description: 'Papers and preprints. The up-to-date list is on researchmap.',
      paper: 'Papers',
      preprint: 'Preprints',
      more: 'The up-to-date list is on researchmap.',
    },
    notes: { title: 'Notes', description: 'Short notes on building and research.', rss: 'RSS', empty: 'No notes yet.' },
    about: { timeline: 'Timeline', skills: 'Skills and stack' },
    project: {
      year: 'Year',
      period: 'Period',
      role: 'Role',
      status: 'Status',
      category: 'Category',
      stack: 'Stack',
      links: 'Links',
      back: 'All projects',
      linkLabels: { repo: 'Source code', demo: 'Demo', paper: 'Paper', site: 'Website' },
    },
    note: { back: 'All notes', tags: 'Tags' },
    status: { active: 'Active', completed: 'Completed', archived: 'Archived' },
    category: { research: 'Research', app: 'App', web: 'Web', tool: 'Tool', contest: 'Contest' },
    footer: { rss: 'RSS' },
    notFound: { title: 'Page not found', text: 'The page you are looking for has moved or does not exist.', home: 'Home' },
  },
} as const;

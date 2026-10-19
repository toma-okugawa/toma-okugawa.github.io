/**
 * Post-build checks on dist/ (run after `npm run build`):
 *
 * 1. Every internal link resolves to a built file, and every #fragment to an id on the target page.
 *    Internal = root-relative (/…), relative (foo/), or absolute on the site's own origin. Links in the
 *    sitemap and RSS files are checked too. A link to a folder must end with "/" (trailingSlash: 'always').
 * 2. No page ships client-side JavaScript (JSON-LD data blocks are allowed).
 * 3. The home pages (HTML with inlined CSS) stay under 30 KB.
 *
 * Usage: npm run build && npm run check:links
 */
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, posix, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const SITE = 'https://toma-okugawa.github.io';
const HOME_BUDGET = 30 * 1024;
const dist = fileURLToPath(new URL('../dist/', import.meta.url));

if (!existsSync(dist)) {
  console.error('dist/ not found. Run `npm run build` first.');
  process.exit(1);
}

const files = readdirSync(dist, { recursive: true })
  .map((f) => String(f).split(sep).join('/'))
  .filter((f) => statSync(join(dist, f)).isFile());
const fileSet = new Set(files);
const pages = files.filter((f) => f.endsWith('.html'));
const feeds = files.filter((f) => f.endsWith('.xml'));

/** @type {string[]} */
const errors = [];
/** @type {Map<string, Set<string>>} */
const idCache = new Map();

const decode = (s) =>
  s.replaceAll('&amp;', '&').replaceAll('&quot;', '"').replaceAll('&#39;', "'").replaceAll('&lt;', '<').replaceAll('&gt;', '>');

function idsOf(file) {
  let ids = idCache.get(file);
  if (!ids) {
    const html = readFileSync(join(dist, file), 'utf8');
    ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => decode(m[1])));
    idCache.set(file, ids);
  }
  return ids;
}

/** The dist file a URL path is served from, or an error message. */
function resolve(pathname) {
  let p;
  try {
    p = decodeURIComponent(pathname).replace(/^\//, '');
  } catch {
    return { error: 'malformed URL' };
  }
  if (p === '' || p.endsWith('/')) {
    const index = `${p}index.html`;
    return fileSet.has(index) ? { file: index } : { error: 'no such page' };
  }
  if (fileSet.has(p)) return { file: p };
  if (fileSet.has(`${p}/index.html`)) return { error: 'missing trailing slash' };
  return { error: 'no such file' };
}

/**
 * @param {string} raw link as written
 * @param {string} from the dist file it appears in
 */
function check(raw, from) {
  const link = decode(raw.trim());
  if (link === '' || /^(mailto|tel|javascript|data):/i.test(link) || link.startsWith('//')) return 0;
  let url;
  if (/^[a-z][a-z0-9+.-]*:/i.test(link)) {
    if (!link.startsWith(`${SITE}/`) && link !== SITE) return 0; // external
    url = new URL(link);
  } else {
    // relative to the page's own URL (the folder of index.html)
    const base = `${SITE}/${from.endsWith('index.html') ? posix.dirname(from) + '/' : from}`.replace(/\/\.\//, '/');
    url = new URL(link, base);
  }
  const target = url.pathname === '' ? '/' : url.pathname;
  const { file, error } = resolve(target);
  if (error) {
    errors.push(`${from}: ${raw} (${error})`);
    return 1;
  }
  if (url.hash.length > 1 && file.endsWith('.html')) {
    const id = decodeURIComponent(url.hash.slice(1));
    if (!idsOf(file).has(id)) errors.push(`${from}: ${raw} (no element with id "${id}")`);
  }
  return 1;
}

let checked = 0;
for (const page of pages) {
  const html = readFileSync(join(dist, page), 'utf8');
  for (const m of html.matchAll(/\s(?:href|src)="([^"]*)"/g)) checked += check(m[1], page);
  for (const m of html.matchAll(/<script\b([^>]*)>/g)) {
    if (!/type="application\/ld\+json"/.test(m[1])) errors.push(`${page}: client-side <script${m[1]}> (the site ships no JavaScript)`);
  }
}
for (const feed of feeds) {
  const xml = readFileSync(join(dist, feed), 'utf8');
  for (const m of xml.matchAll(/<(loc|link|guid)>([^<]+)<\/\1>|\shref="([^"]+)"/g)) checked += check(m[2] ?? m[3], feed);
}

for (const home of ['index.html', 'en/index.html']) {
  if (!fileSet.has(home)) {
    errors.push(`${home}: missing`);
    continue;
  }
  const size = statSync(join(dist, home)).size;
  const css = [...readFileSync(join(dist, home), 'utf8').matchAll(/<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"/g)]
    .map((m) => resolve(m[1]).file)
    .filter(Boolean)
    .reduce((sum, f) => sum + statSync(join(dist, f)).size, 0);
  const total = size + css;
  console.log(`${home}: ${(total / 1024).toFixed(1)} KB (HTML ${(size / 1024).toFixed(1)} KB + external CSS ${(css / 1024).toFixed(1)} KB)`);
  if (total > HOME_BUDGET) errors.push(`${home}: ${total} bytes is over the ${HOME_BUDGET}-byte budget`);
}

if (errors.length > 0) {
  console.error(`\n${errors.length} problem(s):`);
  for (const e of errors) console.error(`  ${e}`);
  process.exit(1);
}
console.log(`OK: ${checked} internal links in ${pages.length} pages and ${feeds.length} feeds resolve; no client-side JavaScript.`);

/**
 * Generates 1200x630 social-preview cards into public/og/.
 *
 * Usage:
 *   bun run og                       # regenerates the default card
 *   bun run og -- --title "..." --category "Research" --out my-slug.png
 *
 * Content pages can then reference the card via `ogImage: "/og/my-slug.png"`
 * in their frontmatter. Requires Playwright's Chromium (bunx playwright
 * install chromium-headless-shell). Run locally and commit the PNGs; nothing
 * runs at build time.
 */
import { chromium } from 'playwright-core';
import { mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'public', 'og');
mkdirSync(outDir, { recursive: true });

function arg(name, fallback) {
  const i = process.argv.indexOf(`--${name}`);
  return i !== -1 && process.argv[i + 1] ? process.argv[i + 1] : fallback;
}

const title = arg('title', 'Rafael Fuentes Rangel');
const subtitle = arg('subtitle', 'Software Engineer · ML/AI Engineer');
const category = arg('category', '');
const date = arg('date', '');
const out = arg('out', 'default.png');

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const html = `<!doctype html>
<html><head><meta charset="utf-8"><style>
  * { margin: 0; box-sizing: border-box; }
  body {
    width: 1200px; height: 630px;
    background: #faf9f6;
    font-family: Georgia, 'Times New Roman', serif;
    color: #1a1a1a;
    display: flex; flex-direction: column;
    padding: 72px 80px;
  }
  .rule { border-top: 3px solid #003366; width: 120px; }
  .meta {
    margin-top: 28px;
    font-family: 'Menlo', 'Courier New', monospace;
    font-size: 22px; letter-spacing: 0.08em; text-transform: uppercase;
    color: #003366;
  }
  h1 {
    margin-top: 24px;
    font-size: ${title.length > 60 ? 52 : 64}px;
    font-weight: 400; line-height: 1.15;
    max-width: 1000px;
  }
  .sub {
    margin-top: 24px;
    font-size: 28px; color: rgba(26,26,26,0.7);
    max-width: 950px; line-height: 1.4;
  }
  .footer {
    margin-top: auto;
    display: flex; justify-content: space-between; align-items: baseline;
    border-top: 1px solid rgba(26,26,26,0.15); padding-top: 24px;
    font-family: 'Menlo', 'Courier New', monospace;
    font-size: 22px; color: rgba(26,26,26,0.6);
  }
  .site { color: #003366; }
</style></head>
<body>
  <div class="rule"></div>
  ${category ? `<div class="meta">${esc(category)}</div>` : ''}
  <h1>${esc(title)}</h1>
  <div class="sub">${esc(subtitle)}</div>
  <div class="footer">
    <span class="site">&gt; rafablockdev.github.io</span>
    <span>${esc(date || 'Rafael Fuentes Rangel')}</span>
  </div>
</body></html>`;

const browser = await chromium.launch({
  args: ['--no-sandbox'],
  channel: undefined,
  executablePath: undefined
});
try {
  const page = await (await browser.newContext({ viewport: { width: 1200, height: 630 } })).newPage();
  await page.setContent(html, { waitUntil: 'load' });
  await page.screenshot({ path: join(outDir, out) });
} finally {
  // Always release the Chromium process, even if rendering threw, so a
  // failure doesn't leave a zombie browser behind. The error still
  // propagates and fails the script with a non-zero exit code.
  await browser.close();
}
console.log(`wrote public/og/${out}`);

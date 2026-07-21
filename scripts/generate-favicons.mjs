/**
 * Renders public/favicon.svg to PNG (32px, 180px) and wraps the 32px PNG in
 * an ICO container (PNG-in-ICO is valid since Windows Vista). Run with
 * `bun scripts/generate-favicons.mjs` after changing the SVG, then commit.
 */
import { chromium } from 'playwright-core';
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const svg = readFileSync(join(root, 'public', 'favicon.svg'), 'utf8');

const browser = await chromium.launch({ args: ['--no-sandbox'] });

async function renderPng(size) {
  const ctx = await browser.newContext({
    viewport: { width: size, height: size },
    deviceScaleFactor: 1
  });
  const page = await ctx.newPage();
  await page.setContent(
    `<style>*{margin:0}body{width:${size}px;height:${size}px}svg{width:${size}px;height:${size}px;display:block}</style>${svg}`
  );
  const buf = await page.screenshot({ omitBackground: true });
  await ctx.close();
  return buf;
}

const png32 = await renderPng(32);
const png180 = await renderPng(180);
await browser.close();

writeFileSync(join(root, 'public', 'favicon-32.png'), png32);
writeFileSync(join(root, 'public', 'apple-touch-icon.png'), png180);

// Minimal ICO container holding one PNG-compressed 32x32 image.
const header = Buffer.alloc(6 + 16);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type: icon
header.writeUInt16LE(1, 4); // image count
header.writeUInt8(32, 6); // width
header.writeUInt8(32, 7); // height
header.writeUInt8(0, 8); // palette
header.writeUInt8(0, 9); // reserved
header.writeUInt16LE(1, 10); // color planes
header.writeUInt16LE(32, 12); // bits per pixel
header.writeUInt32LE(png32.length, 14); // image size
header.writeUInt32LE(22, 18); // image offset
writeFileSync(join(root, 'public', 'favicon.ico'), Buffer.concat([header, png32]));

console.log('wrote favicon-32.png, apple-touch-icon.png, favicon.ico');

import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, '..', 'screenshots-v12');
const BASE = 'https://thomas-2024-portfolio-website-4g9e.vercel.app';

await mkdir(OUT, { recursive: true });

const captures = [
  { name: '01-home-desktop', url: '/', viewport: { width: 1440, height: 900 }, fullPage: false },
  { name: '02-home-desktop-full', url: '/', viewport: { width: 1440, height: 900 }, fullPage: true },
  { name: '03-contact-desktop', url: '/contact', viewport: { width: 1440, height: 900 }, fullPage: true },
  { name: '04-home-mobile', url: '/', viewport: { width: 390, height: 844 }, fullPage: true },
  { name: '05-contact-mobile', url: '/contact', viewport: { width: 390, height: 844 }, fullPage: true },
  { name: '06-home-tablet', url: '/', viewport: { width: 768, height: 1024 }, fullPage: true },
];

const browser = await chromium.launch();
try {
  for (const c of captures) {
    const ctx = await browser.newContext({ viewport: c.viewport });
    const page = await ctx.newPage();
    const errors = [];
    page.on('pageerror', (e) => errors.push(`[pageerror] ${e.message}`));
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(`[console.error] ${msg.text()}`);
    });
    console.log(`→ ${c.name} (${c.viewport.width}x${c.viewport.height}) ${c.url}`);
    await page.goto(BASE + c.url, { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(1500);
    await page.screenshot({ path: join(OUT, `${c.name}.png`), fullPage: c.fullPage });
    if (errors.length) console.log(`   ⚠ errors: ${errors.length}`); else console.log('   ✓ clean');
    for (const e of errors) console.log(`     ${e}`);
    await ctx.close();
  }
} finally {
  await browser.close();
}
console.log(`\nSaved to ${OUT}`);

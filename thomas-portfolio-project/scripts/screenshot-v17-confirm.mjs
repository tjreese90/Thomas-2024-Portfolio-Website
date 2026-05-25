import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, '..', 'screenshots-v17');
const BASE = 'https://thomas-2024-portfolio-website-4g9e.vercel.app';

await mkdir(OUT, { recursive: true });

const browser = await chromium.launch();
try {
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: 'reduce',
  });
  const page = await ctx.newPage();
  await page.goto(BASE, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(3000);
  await page.evaluate(() => {
    document.querySelector('.other-project')?.scrollIntoView({ behavior: 'instant' });
  });
  await page.waitForTimeout(1500);
  await page.screenshot({
    path: join(OUT, '05-carousel-fixed.png'),
    clip: { x: 0, y: 0, width: 1440, height: 900 },
  });
  console.log('✓ carousel screenshot saved');

  // Click next arrow + capture again
  await page.locator('.other__navBtn--next').first().click({ force: true });
  await page.waitForTimeout(1500);
  await page.screenshot({
    path: join(OUT, '06-carousel-after-next.png'),
    clip: { x: 0, y: 0, width: 1440, height: 900 },
  });
  console.log('✓ after-next screenshot saved');

  // Full page (now should not be horizontally squashed)
  await page.goto(BASE, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(2000);
  await page.screenshot({
    path: join(OUT, '07-home-full-fixed.png'),
    fullPage: true,
  });
  console.log('✓ full-page screenshot saved');

  await ctx.close();
} finally {
  await browser.close();
}

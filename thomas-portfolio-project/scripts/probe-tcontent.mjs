import { chromium } from 'playwright';
const BASE = 'https://thomas-2024-portfolio-website-4g9e.vercel.app';
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
await page.goto(BASE + '/', { waitUntil: 'networkidle' });
await page.locator('#experience').scrollIntoViewIfNeeded();
await page.waitForTimeout(2000);

const info = await page.evaluate(() => {
  const c = document.querySelector('.vertical-timeline-element-content');
  if (!c) return null;
  const cs = getComputedStyle(c);
  const r = c.getBoundingClientRect();
  return {
    boundsW: Math.round(r.width),
    boundsH: Math.round(r.height),
    width: cs.width,
    maxWidth: cs.maxWidth,
    boxSizing: cs.boxSizing,
    margin: cs.margin,
    float: cs.float,
    display: cs.display,
    parent: c.parentElement?.className,
    grandparent: c.parentElement?.parentElement?.className,
  };
});
console.log(JSON.stringify(info, null, 2));
await browser.close();

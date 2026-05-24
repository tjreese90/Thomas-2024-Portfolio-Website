import { chromium } from 'playwright';
const BASE = 'https://thomas-2024-portfolio-website-4g9e.vercel.app';
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
await page.goto(BASE + '/', { waitUntil: 'networkidle' });
await page.locator('#experience').scrollIntoViewIfNeeded();
await page.waitForTimeout(2000);

const info = await page.evaluate(() => {
  const vt = document.querySelector('.vertical-timeline');
  const els = document.querySelectorAll('.vertical-timeline-element');
  return {
    rootClasses: vt ? [...vt.classList] : null,
    firstElementClasses: els[0] ? [...els[0].classList] : null,
    viewport: { w: window.innerWidth, h: window.innerHeight },
    matchMedia1170: window.matchMedia('(min-width: 1170px)').matches,
    cardCount: els.length,
  };
});
console.log(JSON.stringify(info, null, 2));
await browser.close();

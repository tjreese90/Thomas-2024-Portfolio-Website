import { chromium } from 'playwright';
const BASE = 'https://thomas-2024-portfolio-website-4g9e.vercel.app';
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
await page.goto(BASE + '/', { waitUntil: 'networkidle' });
await page.locator('#experience').scrollIntoViewIfNeeded();
await page.waitForTimeout(2000);

const info = await page.evaluate(() => {
  const exp = document.getElementById('experience');
  const content = exp?.querySelector('.my-journey__content');
  const vt = exp?.querySelector('.vertical-timeline');
  const cards = exp?.querySelectorAll('.vertical-timeline-element');
  return {
    expW: exp ? Math.round(exp.getBoundingClientRect().width) : null,
    contentW: content ? Math.round(content.getBoundingClientRect().width) : null,
    contentCS: content ? {
      maxWidth: getComputedStyle(content).maxWidth,
      alignItems: getComputedStyle(content).alignItems,
      width: getComputedStyle(content).width,
    } : null,
    vtW: vt ? Math.round(vt.getBoundingClientRect().width) : null,
    vtCS: vt ? {
      maxWidth: getComputedStyle(vt).maxWidth,
      width: getComputedStyle(vt).width,
    } : null,
    cardCount: cards?.length,
    cardSample: cards?.[0] ? {
      width: Math.round(cards[0].getBoundingClientRect().width),
      height: Math.round(cards[0].getBoundingClientRect().height),
      classes: [...cards[0].classList],
    } : null,
  };
});
console.log(JSON.stringify(info, null, 2));
await browser.close();

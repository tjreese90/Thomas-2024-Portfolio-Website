import { chromium } from 'playwright';
const BASE = 'https://thomas-2024-portfolio-website-4g9e.vercel.app';

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
await page.goto(BASE + '/', { waitUntil: 'networkidle' });

// Slowly walk down the page so each LazyLoad trips
let lastH = 0;
for (let pass = 0; pass < 8; pass++) {
  const h = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y <= h; y += 200) {
    await page.evaluate((v) => window.scrollTo(0, v), y);
    await page.waitForTimeout(120);
  }
  if (h === lastH) break;
  lastH = h;
}
await page.waitForTimeout(2000);

const result = await page.evaluate(() => {
  const imgs = [...document.querySelectorAll('.project__img')].map(img => ({
    src: img.getAttribute('src'),
    linked: img.closest('a') !== null,
    parentHref: img.closest('a')?.href || null,
    parentAriaLabel: img.closest('a')?.getAttribute('aria-label') || null,
  }));
  const titles = [...document.querySelectorAll('.project__headingSecondary')].map(h => ({
    text: h.textContent.trim().slice(0, 60),
    color: getComputedStyle(h).color,
  }));
  const statuses = [...document.querySelectorAll('.project__status')].map(s => ({
    text: s.textContent.trim().replace(/\s+/g, ' '),
    color: getComputedStyle(s).color,
    classes: [...s.classList].filter(c => c.includes('project__status')),
  }));
  const exp = document.getElementById('experience');
  const timelineCards = document.querySelectorAll('.vertical-timeline-element-content').length;
  const timelineFrontBack = document.querySelectorAll('.vertical-timeline-element-front, .vertical-timeline-element-back').length;
  return { imgs, titles, statuses, experience: !!exp, timelineCards, timelineFrontBack };
});

console.log(`Featured project images: ${result.imgs.length}`);
for (const i of result.imgs) console.log(`  ${i.src} → linked=${i.linked} aria="${i.parentAriaLabel}"`);
console.log(`\nProject titles (${result.titles.length}):`);
for (const t of result.titles) console.log(`  "${t.text}" color=${t.color}`);
console.log(`\nProject statuses:`);
for (const s of result.statuses) console.log(`  "${s.text}" color=${s.color} classes=${s.classes.join(',')}`);
console.log(`\nExperience section id present: ${result.experience}`);
console.log(`Timeline cards: ${result.timelineCards}, front/back leftovers: ${result.timelineFrontBack}`);

await browser.close();

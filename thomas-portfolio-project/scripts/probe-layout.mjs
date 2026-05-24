import { chromium } from 'playwright';

const BASE = 'https://thomas-2024-portfolio-website-4g9e.vercel.app';
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
await page.goto(BASE + '/', { waitUntil: 'networkidle' });

// Walk down the page
const h0 = await page.evaluate(() => document.documentElement.scrollHeight);
for (let pass = 0; pass < 5; pass++) {
  const h = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y <= h; y += 200) {
    await page.evaluate((v) => window.scrollTo(0, v), y);
    await page.waitForTimeout(80);
  }
}
await page.waitForTimeout(1500);

const layout = await page.evaluate(() => {
  const sections = ['hero-heading', 'about', 'experience', 'projects', 'community-achievements'];
  const probes = sections.map((id) => {
    const el = id === 'hero-heading' ? document.getElementById(id)?.closest('section') : document.getElementById(id);
    if (!el) return { id, ok: false };
    const r = el.getBoundingClientRect();
    return {
      id,
      ok: true,
      top: Math.round(r.top + window.scrollY),
      height: Math.round(r.height),
      bottom: Math.round(r.bottom + window.scrollY),
    };
  });
  return {
    docHeight: document.documentElement.scrollHeight,
    bodyHeight: document.body.scrollHeight,
    probes,
  };
});

console.log(`Total document height: ${layout.docHeight}px`);
console.log(`Body scrollHeight: ${layout.bodyHeight}px\n`);
for (const p of layout.probes) {
  if (!p.ok) console.log(`  ✗ #${p.id} NOT FOUND`);
  else console.log(`  #${p.id} top=${p.top}px height=${p.height}px bottom=${p.bottom}px`);
}

await browser.close();

import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, '..', 'screenshots-v17');
const BASE = 'https://thomas-2024-portfolio-website-4g9e.vercel.app';

await mkdir(OUT, { recursive: true });

const captures = [
  { name: '01-hero',        url: '/', vp: { width: 1440, height: 900 },  full: false },
  { name: '02-home-full',   url: '/', vp: { width: 1440, height: 900 },  full: true  },
  { name: '03-mobile-full', url: '/', vp: { width: 390,  height: 844 },  full: true  },
];

const browser = await chromium.launch();
try {
  for (const c of captures) {
    const ctx = await browser.newContext({ viewport: c.vp });
    const page = await ctx.newPage();
    const errs = [];
    page.on('pageerror', (e) => errs.push(`[pageerror] ${e.message}`));
    page.on('console', (msg) => {
      if (msg.type() === 'error') errs.push(`[console.error] ${msg.text()}`);
    });
    console.log(`→ ${c.name}  ${c.vp.width}x${c.vp.height}`);
    await page.goto(BASE + c.url, { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(2000);
    await page.screenshot({ path: join(OUT, `${c.name}.png`), fullPage: c.full });

    // Special: diagnose the carousel section
    if (c.name === '02-home-full') {
      const carousel = await page.locator('.other__carousel').first();
      const exists = await carousel.count();
      console.log(`   .other__carousel found: ${exists}`);
      if (exists) {
        const list = await page.locator('.other__list').first();
        const items = await page.locator('.other__items').count();
        const listBox = await list.boundingBox();
        const computed = await list.evaluate((el) => {
          const s = getComputedStyle(el);
          return {
            display: s.display,
            overflowX: s.overflowX,
            flexDirection: s.flexDirection,
            scrollWidth: el.scrollWidth,
            clientWidth: el.clientWidth,
            scrollLeft: el.scrollLeft,
            gap: s.gap,
          };
        });
        console.log(`   items: ${items}, list box: ${JSON.stringify(listBox)}`);
        console.log(`   computed: ${JSON.stringify(computed)}`);

        // Capture just the carousel area
        await list.scrollIntoViewIfNeeded();
        await page.waitForTimeout(500);
        await page.locator('.other-project').first().screenshot({
          path: join(OUT, '04-carousel-only.png'),
        });

        // Check arrow buttons
        const prevDisabled = await page.locator('.other__navBtn--prev').first().isDisabled();
        const nextDisabled = await page.locator('.other__navBtn--next').first().isDisabled();
        console.log(`   prev disabled: ${prevDisabled}, next disabled: ${nextDisabled}`);

        // Try clicking next and see what happens
        const beforeScroll = await list.evaluate((el) => el.scrollLeft);
        await page.locator('.other__navBtn--next').first().click().catch(() => {});
        await page.waitForTimeout(1000);
        const afterScroll = await list.evaluate((el) => el.scrollLeft);
        console.log(`   scroll: before=${beforeScroll}, after=${afterScroll}, delta=${afterScroll - beforeScroll}`);
      }

      // Check sectiontag rendering
      const tagCount = await page.locator('.sectiontag').count();
      console.log(`   .sectiontag total: ${tagCount}`);
      const firstTagText = await page.locator('.sectiontag').first().evaluate((el) => ({
        text: el.textContent,
        beforeContent: getComputedStyle(el, '::before').content,
        display: getComputedStyle(el).display,
      }));
      console.log(`   first sectiontag: ${JSON.stringify(firstTagText)}`);
    }

    if (errs.length) {
      console.log(`   ⚠ ${errs.length} errors:`);
      errs.forEach((e) => console.log(`     ${e}`));
    } else {
      console.log('   ✓ no console errors');
    }
    await ctx.close();
  }
} finally {
  await browser.close();
}

console.log(`\nDone. Screenshots in: ${OUT}`);

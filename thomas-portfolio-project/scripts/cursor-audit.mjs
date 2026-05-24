import { chromium } from 'playwright';

const BASE = 'https://thomas-2024-portfolio-website-4g9e.vercel.app';
const pages = ['/', '/contact'];

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });

let totalChecks = 0;
let issues = [];

for (const path of pages) {
  const page = await ctx.newPage();
  await page.goto(BASE + path, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(3000);

  const results = await page.evaluate(() => {
    const out = { interactives: [], decoratives: [] };

    // Sample every interactive element + its computed cursor
    const selectors = ['a[href]', 'button', '[role="button"]', 'label[for]', 'summary', 'input', 'textarea', 'select'];
    for (const sel of selectors) {
      const els = document.querySelectorAll(sel);
      for (const el of els) {
        if (el.offsetParent === null && el.tagName !== 'OPTION') continue; // visible only
        const style = getComputedStyle(el);
        const isDisabled = el.disabled || el.getAttribute('aria-disabled') === 'true';
        const cursor = style.cursor;
        const tag = el.tagName.toLowerCase();
        const id = el.id ? '#' + el.id : '';
        const cls = el.className && typeof el.className === 'string' ? '.' + el.className.split(/\s+/).slice(0, 2).join('.') : '';
        out.interactives.push({ sel: `${tag}${id}${cls}`, cursor, disabled: isDisabled, type: tag === 'input' ? el.type : null });
      }
    }

    // Sample suspicious non-interactive elements
    for (const el of document.querySelectorAll('.text-animate-hover, .text-animate-fast-hover, .about__skillsItems, .other__items, .projectResp__items, .vertical-timeline-element-content, h1, h2, h3, p')) {
      if (el.offsetParent === null) continue;
      const cursor = getComputedStyle(el).cursor;
      const tag = el.tagName.toLowerCase();
      const cls = el.className && typeof el.className === 'string' ? '.' + el.className.split(/\s+/).slice(0, 2).join('.') : '';
      out.decoratives.push({ sel: `${tag}${cls}`, cursor });
    }

    return out;
  });

  for (const i of results.interactives) {
    totalChecks++;
    const expected = i.disabled ? 'not-allowed' : (i.type && ['text','email','search','url','tel','password'].includes(i.type)) || i.sel.startsWith('textarea') ? 'text' : 'pointer';
    if (i.cursor !== expected && !(i.cursor === 'auto' && expected === 'text')) {
      issues.push(`${path}: ${i.sel} → cursor:${i.cursor}, expected:${expected} (disabled=${i.disabled})`);
    }
  }
  for (const d of results.decoratives) {
    totalChecks++;
    if (d.cursor === 'pointer' && !d.sel.includes('__cardLink')) {
      issues.push(`${path}: ${d.sel} → pointer on non-interactive`);
    }
  }
  await page.close();
}
await browser.close();
console.log(`Checked: ${totalChecks} cursor states across ${pages.length} pages`);
console.log(`Issues found: ${issues.length}`);
for (const i of issues.slice(0, 40)) console.log(`  ✗ ${i}`);
process.exit(issues.length === 0 ? 0 : 1);

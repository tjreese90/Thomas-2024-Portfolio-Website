import { chromium } from 'playwright';

const BASE = 'https://thomas-2024-portfolio-website-4g9e.vercel.app';

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
const issues = [];

console.log(`\n=== Audit v13: ${BASE} ===\n`);

// Test 1: OG / canonical meta tags
await page.goto(BASE + '/', { waitUntil: 'networkidle' });
const meta = await page.evaluate(() => {
  const m = (k, attr = 'property') => document.querySelector(`meta[${attr}="${k}"]`)?.content || null;
  return {
    title: document.title,
    canonical: document.querySelector('link[rel="canonical"]')?.href || null,
    'og:title': m('og:title'),
    'og:description': m('og:description'),
    'og:image': m('og:image'),
    'og:url': m('og:url'),
    'twitter:card': m('twitter:card', 'name'),
    'twitter:image': m('twitter:image', 'name'),
  };
});
console.log('Meta tags:');
for (const [k, v] of Object.entries(meta)) console.log(`  ${k}: ${v || 'MISSING'}`);
for (const [k, v] of Object.entries(meta)) if (!v) issues.push(`Meta tag missing: ${k}`);

// Test 1.5: OG image accessible
const ogResp = await ctx.request.get(meta['og:image']);
console.log(`\nOG image status: ${ogResp.status()} content-type: ${ogResp.headers()['content-type']}`);
if (ogResp.status() !== 200) issues.push(`OG image not 200: ${ogResp.status()}`);

// Test 2: Heading hierarchy — exactly one h1, semantic order
await page.waitForTimeout(2000);
const headings = await page.evaluate(() => {
  const out = [];
  for (const h of document.querySelectorAll('h1, h2, h3, h4, h5, h6')) {
    out.push({ tag: h.tagName.toLowerCase(), text: h.textContent.trim().slice(0, 60) });
  }
  return out;
});
const h1s = headings.filter(h => h.tag === 'h1');
console.log(`\nHeading audit: ${headings.length} total headings, ${h1s.length} h1 elements`);
console.log(`  H1: ${h1s.map(h => `"${h.text}"`).join(', ')}`);
console.log(`  H2: ${headings.filter(h => h.tag === 'h2').map(h => `"${h.text}"`).join(', ')}`);
console.log(`  H3 count: ${headings.filter(h => h.tag === 'h3').length}`);
console.log(`  H4 count: ${headings.filter(h => h.tag === 'h4').length}`);
if (h1s.length !== 1) issues.push(`Expected 1 h1, found ${h1s.length}: ${h1s.map(h => h.text).join(', ')}`);

// Test 3: Nav labels
const navLabels = await page.evaluate(() =>
  [...document.querySelectorAll('.navbar__itemsLink')].map(a => a.textContent.trim().replace(/\s+/g, ' '))
);
console.log(`\nNav: ${navLabels.join(' | ')}`);
const expectedNav = ['About', 'Experience', 'Projects', 'Impact', 'Contact'];
for (const exp of expectedNav) {
  if (!navLabels.some(l => l.includes(exp))) issues.push(`Nav missing: ${exp}`);
}

// Test 4: Project images all wrapped in anchors
const projectImgs = await page.evaluate(() => {
  return [...document.querySelectorAll('.project__img')].map(img => ({
    src: img.getAttribute('src'),
    inAnchor: img.closest('a') !== null,
    parentHref: img.closest('a')?.href || null,
  }));
});
console.log(`\nFeatured project images: ${projectImgs.length}`);
for (const img of projectImgs) {
  console.log(`  ${img.src} → ${img.inAnchor ? 'LINKED' : 'NOT LINKED'} (${img.parentHref || 'n/a'})`);
  if (!img.inAnchor) issues.push(`Project image not linked: ${img.src}`);
}

// Test 5: Project status colors
const statuses = await page.evaluate(() =>
  [...document.querySelectorAll('.project__status')].map(s => ({
    text: s.textContent.trim().replace(/\s+/g, ' '),
    color: getComputedStyle(s).color,
    hasModifier: [...s.classList].some(c => c.includes('--')),
  }))
);
console.log(`\nProject statuses:`);
for (const s of statuses) {
  console.log(`  "${s.text}" → ${s.color} (modifier: ${s.hasModifier})`);
  if (!s.hasModifier) issues.push(`Status without --live/--wip modifier: ${s.text}`);
}

// Test 6: Hero h1 color is white
const heroH1 = await page.evaluate(() => {
  const h = document.querySelector('h1.intro__headingPrimary');
  if (!h) return null;
  return { text: h.textContent.trim().slice(0, 40), color: getComputedStyle(h).color };
});
console.log(`\nHero h1: "${heroH1?.text}" color=${heroH1?.color}`);
if (heroH1?.color !== 'rgb(255, 255, 255)') issues.push(`Hero h1 not white: ${heroH1?.color}`);

// Test 7: AnimatedLetters removal — should have zero .text-animate, .text-animate-hover
const letterSpans = await page.evaluate(() =>
  document.querySelectorAll('.text-animate, .text-animate-hover, .text-animate-fast, .text-animate-fast-hover').length
);
console.log(`\nLetter-span hover elements: ${letterSpans} (was 104)`);

// Test 8: Pause button outside h2
const pauseInH2 = await page.evaluate(() =>
  document.querySelectorAll('h2 button, h1 button').length
);
console.log(`Pause button inside h1/h2: ${pauseInH2} (must be 0)`);
if (pauseInH2 > 0) issues.push(`${pauseInH2} button(s) still inside heading`);

// Test 9: About description max-width
const aboutDesc = await page.evaluate(() => {
  const el = document.querySelector('.about__description');
  if (!el) return null;
  return { maxWidth: getComputedStyle(el).maxWidth, width: el.clientWidth };
});
console.log(`\nAbout description: max-width=${aboutDesc?.maxWidth}, rendered=${aboutDesc?.width}px`);
if (aboutDesc?.maxWidth === 'none') issues.push('About description max-width still none');

await browser.close();

console.log(`\n=== Issues: ${issues.length} ===`);
for (const i of issues) console.log(`  ✗ ${i}`);
process.exit(issues.length === 0 ? 0 : 1);

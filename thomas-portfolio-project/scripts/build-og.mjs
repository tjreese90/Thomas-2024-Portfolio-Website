import { chromium } from 'playwright';
import { writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '..', 'public');
if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

const html = `<!doctype html>
<html><head><style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');
  html,body{margin:0;padding:0;background:#0a192f;font-family:Inter,system-ui,sans-serif;}
  .card{width:1200px;height:630px;display:flex;flex-direction:column;justify-content:center;padding:80px 100px;color:#ccd6f6;position:relative;overflow:hidden;}
  .grid{position:absolute;inset:0;background-image:linear-gradient(rgba(255,215,0,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,215,0,0.04) 1px,transparent 1px);background-size:60px 60px;}
  .star{position:absolute;right:40px;top:50%;transform:translateY(-50%);width:420px;height:420px;}
  .name{font-size:88px;font-weight:800;color:#ffffff;letter-spacing:-0.03em;line-height:1;margin:0 0 18px;}
  .role{font-size:36px;font-weight:600;color:#ffd700;letter-spacing:0.01em;margin:0 0 28px;}
  .stack{font-size:22px;color:#a8b2d1;letter-spacing:0.05em;text-transform:uppercase;font-weight:500;}
  .dot{color:#ffd700;margin:0 10px;}
  .url{position:absolute;left:100px;bottom:60px;font-size:20px;color:#8892b0;font-family:'Courier New',monospace;}
</style></head>
<body>
  <div class="card">
    <div class="grid"></div>
    <svg class="star" viewBox="0 0 287 287" fill="none"><path d="M143.5 2 L176.1 110.4 L285 110.4 L195.5 173.5 L228.1 281.5 L143.5 217.5 L58.9 281.5 L91.5 173.5 L2 110.4 L110.9 110.4 Z" fill="#FFD700" opacity="0.92"/><path d="M143.5 17 L172.1 118.4 L273 118.4 L190.5 172.5 L219.1 273.5 L143.5 211.5 L67.9 273.5 L96.5 172.5 L14 118.4 L115.9 118.4 Z" fill="#115173"/></svg>
    <h1 class="name">Thomas Reese</h1>
    <p class="role">Full-Stack Software Engineer</p>
    <p class="stack">React<span class="dot">·</span>TypeScript<span class="dot">·</span>Python<span class="dot">·</span>Rails<span class="dot">·</span>Anthropic MCP</p>
    <div class="url">thomas-2024-portfolio-website-4g9e.vercel.app</div>
  </div>
</body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(html, { waitUntil: 'networkidle' });
await page.waitForTimeout(1500);
const buf = await page.screenshot({ type: 'png', omitBackground: false });
writeFileSync(join(outDir, 'og-preview.png'), buf);
await browser.close();
console.log('OG image saved →', join(outDir, 'og-preview.png'));

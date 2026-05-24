import { chromium } from '@playwright/test'

const BASE_URL = process.env.PORTFOLIO_URL || 'https://thomas-2024-portfolio-website-4g9e.vercel.app'

const browser = await chromium.launch()
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } })
const page = await context.newPage()

const consoleErrors = []
const failedRequests = []

page.on('pageerror', (err) => consoleErrors.push(`pageerror: ${err.message}`))
page.on('console', (msg) => {
	if (msg.type() === 'error') consoleErrors.push(`console.error: ${msg.text()}`)
})
page.on('requestfailed', (req) => {
	failedRequests.push(`requestfailed: ${req.url()} (${req.failure()?.errorText})`)
})
page.on('response', (resp) => {
	if (resp.status() >= 400 && !resp.url().startsWith('data:')) {
		failedRequests.push(`HTTP ${resp.status()}: ${resp.url()}`)
	}
})

console.log('Loading home page…')
await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle', timeout: 60000 })
await page.waitForTimeout(3000)

// Scroll to trigger LazyLoad
await page.evaluate(async () => {
	const max = document.documentElement.scrollHeight
	for (let y = 0; y < max; y += 400) {
		window.scrollTo(0, y)
		await new Promise((r) => setTimeout(r, 100))
	}
	window.scrollTo(0, 0)
})
await page.waitForTimeout(3000)

// Collect every anchor link
const links = await page.evaluate(() => {
	return Array.from(document.querySelectorAll('a[href]')).map((a) => ({
		href: a.getAttribute('href'),
		text: (a.textContent || '').trim().slice(0, 60),
		target: a.getAttribute('target') || '',
	}))
})

console.log(`\nFound ${links.length} anchor links on home page`)

// Dedupe by href
const seen = new Set()
const unique = links.filter((l) => {
	if (seen.has(l.href)) return false
	seen.add(l.href)
	return true
})

console.log(`${unique.length} unique hrefs\n`)

// Group hrefs by type
const external = []
const hash = []
const internal = []
const broken = []

for (const link of unique) {
	const href = link.href
	if (!href || href === '#') {
		broken.push(link)
	} else if (href.startsWith('http://') || href.startsWith('https://')) {
		external.push(link)
	} else if (href.startsWith('#') || href.startsWith('/#')) {
		hash.push(link)
	} else {
		internal.push(link)
	}
}

console.log(`External: ${external.length} | Hash anchors: ${hash.length} | Internal: ${internal.length} | Broken (#/empty): ${broken.length}`)

// HEAD-check each external link (some sites reject HEAD — fall back to GET)
console.log('\n=== External link health check ===')
const externalResults = []
for (const link of external) {
	try {
		const ctrl = new AbortController()
		const t = setTimeout(() => ctrl.abort(), 8000)
		let resp
		try {
			resp = await fetch(link.href, { method: 'HEAD', signal: ctrl.signal, redirect: 'follow' })
			if (resp.status === 405 || resp.status === 403) {
				resp = await fetch(link.href, { method: 'GET', signal: ctrl.signal, redirect: 'follow' })
			}
		} finally {
			clearTimeout(t)
		}
		const ok = resp.status >= 200 && resp.status < 400
		externalResults.push({ ...link, status: resp.status, ok })
		console.log(`${ok ? '✓' : '✗'} ${resp.status} ${link.href}`)
	} catch (err) {
		externalResults.push({ ...link, status: 0, ok: false, error: err.message })
		console.log(`✗ ERR ${link.href} → ${err.message}`)
	}
}

console.log('\n=== Hash anchors — verify target sections exist ===')
const hashResults = []
for (const link of hash) {
	const id = link.href.replace(/^\/?#/, '')
	const exists = await page.evaluate((sel) => !!document.getElementById(sel) || !!document.querySelector(`[id='${sel}']`), id)
	hashResults.push({ ...link, exists })
	console.log(`${exists ? '✓' : '✗'} #${id} (link text: "${link.text}")`)
}

console.log('\n=== Contact page check ===')
await page.goto(`${BASE_URL}/contact`, { waitUntil: 'domcontentloaded', timeout: 60000 })
await page.waitForTimeout(2000)

const contactChecks = await page.evaluate(() => ({
	emailForm: !!document.querySelector('form'),
	nameInput: !!document.querySelector('input[name="user_name"]'),
	emailInput: !!document.querySelector('input[name="user_email"]'),
	messageInput: !!document.querySelector('textarea[name="message"]'),
	sendButton: !!document.querySelector('button[type="submit"]'),
	geminiChatInput: !!document.querySelector('.chat-input'),
	geminiChatHeading: document.querySelector('.chat-widget h3')?.textContent || '',
	mapboxCanvas: !!document.querySelector('.mapboxgl-canvas') || !!document.querySelector('canvas'),
}))
console.log(JSON.stringify(contactChecks, null, 2))

console.log('\n=== Test "Contact Me" button navigates to /contact ===')
await page.goto(`${BASE_URL}/`, { waitUntil: 'domcontentloaded', timeout: 60000 })
await page.waitForTimeout(1500)
try {
	await page.click('a:has-text("Contact Me")', { timeout: 5000 })
	await page.waitForURL('**/contact', { timeout: 5000 })
	console.log(`✓ Contact Me → ${page.url()}`)
} catch (err) {
	console.log(`✗ Contact Me button: ${err.message}`)
}

console.log('\n=== Test navbar hash navigation (#about) ===')
await page.goto(`${BASE_URL}/`, { waitUntil: 'domcontentloaded', timeout: 60000 })
await page.waitForTimeout(1500)
try {
	await page.click('a:has-text("About")', { timeout: 5000 })
	await page.waitForTimeout(1500)
	const scrolled = await page.evaluate(() => window.scrollY > 100)
	console.log(`${scrolled ? '✓' : '✗'} About nav scrolled page (y=${await page.evaluate(() => window.scrollY)})`)
} catch (err) {
	console.log(`✗ About nav: ${err.message}`)
}

console.log('\n=== Summary ===')
console.log(`External link failures: ${externalResults.filter((r) => !r.ok).length}`)
console.log(`Hash anchor failures: ${hashResults.filter((r) => !r.exists).length}`)
console.log(`Console errors: ${consoleErrors.length}`)
for (const e of consoleErrors.slice(0, 8)) console.log(`  ${e}`)
console.log(`Network failures: ${failedRequests.length}`)
for (const e of failedRequests.slice(0, 8)) console.log(`  ${e}`)

await browser.close()

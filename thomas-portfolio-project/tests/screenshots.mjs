import { chromium } from '@playwright/test'
import { mkdir } from 'node:fs/promises'

const BASE_URL = process.env.PORTFOLIO_URL || 'https://thomas-2024-portfolio-website-4g9e.vercel.app'

const VIEWPORTS = [
	{ name: 'desktop', width: 1440, height: 900 },
	{ name: 'mobile', width: 390, height: 844 },
]

const HOME_SECTIONS = [
	{ slug: '01-intro', selector: '.intro' },
	{ slug: '02-about', selector: '#about' },
	{ slug: '03-projects', selector: '#projects' },
	{ slug: '04-community', selector: '#community-achievements' },
	{ slug: '05-other-projects', selector: '#other-project' },
	{ slug: '06-journey', selector: '#my-journey' },
]

const OUT_DIR = new URL('./screenshots/', import.meta.url).pathname

await mkdir(OUT_DIR, { recursive: true })

const browser = await chromium.launch()
const errors = []

for (const viewport of VIEWPORTS) {
	const context = await browser.newContext({
		viewport: { width: viewport.width, height: viewport.height },
		deviceScaleFactor: 1,
	})
	const page = await context.newPage()

	page.on('pageerror', (err) => errors.push(`[${viewport.name}] pageerror: ${err.message}`))
	page.on('console', (msg) => {
		if (msg.type() === 'error') {
			errors.push(`[${viewport.name}] console.error: ${msg.text()}`)
		}
	})

	// Visit the home page once, then scroll to each section
	await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle', timeout: 45000 })
	await page.waitForTimeout(2500) // animations settle

	// Scroll the whole page TWICE to trigger LazyLoad mounts in deeper sections
	for (let pass = 0; pass < 2; pass++) {
		await page.evaluate(async () => {
			const max = document.documentElement.scrollHeight
			for (let y = 0; y < max; y += 300) {
				window.scrollTo(0, y)
				await new Promise((r) => setTimeout(r, 120))
			}
			window.scrollTo(0, document.documentElement.scrollHeight)
			await new Promise((r) => setTimeout(r, 600))
		})
		await page.waitForTimeout(1200)
	}
	await page.evaluate(() => window.scrollTo(0, 0))
	await page.waitForTimeout(1200)

	for (const section of HOME_SECTIONS) {
		try {
			const found = await page.evaluate((sel) => {
				const el = document.querySelector(sel)
				if (!el) return false
				el.scrollIntoView({ behavior: 'instant', block: 'start' })
				return true
			}, section.selector)

			if (!found) {
				errors.push(`[${viewport.name}] ${section.slug}: selector "${section.selector}" not found`)
				continue
			}

			await page.waitForTimeout(900) // let any motion settle
			const filename = `${OUT_DIR}${section.slug}-${viewport.name}.png`
			await page.screenshot({ path: filename })
			console.log(`✓ ${viewport.name} ${section.slug}`)
		} catch (err) {
			errors.push(`[${viewport.name}] ${section.slug}: ${err.message}`)
			console.log(`✗ ${viewport.name} ${section.slug}: ${err.message}`)
		}
	}

	// Full-page intro shot for layout review
	try {
		await page.evaluate(() => window.scrollTo(0, 0))
		await page.waitForTimeout(600)
		await page.screenshot({ path: `${OUT_DIR}00-fullpage-${viewport.name}.png`, fullPage: true })
		console.log(`✓ ${viewport.name} 00-fullpage`)
	} catch (err) {
		errors.push(`[${viewport.name}] fullpage: ${err.message}`)
	}

	// Contact page (separate route)
	try {
		await page.goto(`${BASE_URL}/contact`, { waitUntil: 'networkidle', timeout: 45000 })
		await page.waitForTimeout(2000)
		await page.screenshot({ path: `${OUT_DIR}07-contact-${viewport.name}.png` })
		console.log(`✓ ${viewport.name} 07-contact`)
	} catch (err) {
		errors.push(`[${viewport.name}] 07-contact: ${err.message}`)
		console.log(`✗ ${viewport.name} 07-contact: ${err.message}`)
	}

	await context.close()
}

await browser.close()

if (errors.length) {
	console.log('\n=== Errors captured ===')
	for (const e of errors) console.log(e)
} else {
	console.log('\nNo runtime errors.')
}

import { chromium } from '@playwright/test'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const htmlPath = resolve(__dirname, 'resume.html')
const pdfPath = resolve(__dirname, '..', 'public', 'resume.pdf')

const browser = await chromium.launch()
const page = await browser.newPage()
await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle' })
await page.emulateMedia({ media: 'print' })

await page.pdf({
	path: pdfPath,
	format: 'Letter',
	printBackground: true,
	margin: { top: '0in', right: '0in', bottom: '0in', left: '0in' },
	preferCSSPageSize: true,
})

await browser.close()
console.log(`Resume written: ${pdfPath}`)

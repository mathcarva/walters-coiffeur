import { chromium } from 'playwright'

const origin = process.env.WALTERS_QA_ORIGIN ?? 'http://127.0.0.1:3014'
const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true })
const routes = ['servicos', 'unidades', 'institucional', 'academy', 'barbeariawalters', 'concept', 'sejanossofranqueado']
const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet', width: 820, height: 1180 },
  { name: 'mobile', width: 390, height: 844 },
  { name: 'landscape', width: 844, height: 390 },
]
let failed = false
for (const viewport of viewports) {
  const page = await browser.newPage({ viewport, reducedMotion: 'reduce' })
  const errors = []
  page.on('pageerror', error => errors.push(error.message))
  for (const route of routes) {
    await page.goto(`${origin}/${route}/`, { waitUntil: 'networkidle' })
    await page.evaluate(() => document.querySelectorAll('img[loading="lazy"]').forEach(image => { image.loading = 'eager' }))
    await page.waitForFunction(() => [...document.images].every(image => image.complete))
    const result = await page.evaluate(() => ({
      heading: Boolean(document.querySelector('h1')?.textContent?.trim()),
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      missing: [...document.images].filter(image => !image.naturalWidth).map(image => image.src),
      heroHeight: document.querySelector('.ep-hero')?.getBoundingClientRect().height,
      actionBottom: document.querySelector('.ep-hero .ep-action')?.getBoundingClientRect().bottom,
    }))
    const okay = result.heading && result.overflow <= 1 && result.missing.length === 0 && !errors.length && result.actionBottom <= result.heroHeight
    if (!okay) failed = true
    console.log(JSON.stringify({ route, viewport: viewport.name, okay, ...result, errors }))
  }
  await page.close()
}

const page = await browser.newPage({ viewport: { width: 1280, height: 800 }, reducedMotion: 'reduce' })
await page.goto(`${origin}/servicos/`)
await page.getByRole('searchbox', { name: 'Buscar serviço' }).fill('mechas')
const serviceSearch = await page.locator('.ep-service-row').count() === 1 && await page.locator('.ep-service-row').first().innerText().then(text => text.includes('Mechas'))
await page.goto(`${origin}/unidades/`)
await page.getByRole('searchbox', { name: 'Buscar unidade' }).fill('Leblon')
const unitSearch = await page.locator('.ep-unit-row').count() === 2
await page.goto(`${origin}/sejanossofranqueado/`)
const formPresent = await page.locator('.ep-franchise-form').isVisible()
const previewSafe = await page.locator('.ep-franchise-form button[type=submit]').isDisabled() && await page.getByText('nenhum dado digitado aqui é salvo', { exact: false }).isVisible()
if (!serviceSearch || !unitSearch || !formPresent || !previewSafe) failed = true
console.log(JSON.stringify({ interaction: true, serviceSearch, unitSearch, formPresent, previewSafe }))
await page.close()
await browser.close()
if (failed) process.exitCode = 1

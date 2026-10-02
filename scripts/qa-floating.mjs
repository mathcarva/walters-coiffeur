import { chromium } from 'playwright'
import { mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

const origin = process.env.WALTERS_QA_ORIGIN ?? 'http://127.0.0.1:3014'
const output = new URL('../output/floating-qa/', import.meta.url)
await mkdir(output, { recursive: true })
const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true })
const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet', width: 820, height: 1180 },
  { name: 'mobile', width: 390, height: 844 },
  { name: 'narrow-mobile', width: 320, height: 700 },
  { name: 'landscape', width: 844, height: 390 },
  { name: 'compact-landscape', width: 568, height: 320 },
]
let failed = false
for (const viewport of viewports) {
  const page = await browser.newPage({ viewport: { width: viewport.width, height: viewport.height }, deviceScaleFactor: 1 })
  await page.addInitScript(() => sessionStorage.setItem('walters-booking-intro-shown', '1'))
  const errors = []
  const existingWarnings = []
  page.on('pageerror', error => errors.push(error.message))
  page.on('console', message => {
    if (message.type() !== 'error') return
    const content = message.text()
    if (content.includes('fetchPriority fetchpriority')) existingWarnings.push(content.split('\n')[0])
    else errors.push(content)
  })
  await page.goto(`${origin}/produtos/brilho-shampoo/`, { waitUntil: 'networkidle' })
  await page.evaluate(() => window.scrollTo(0, 500))
  await page.locator('.site-floating').waitFor({ state: 'visible' })
  await page.waitForTimeout(650)
  const result = await page.evaluate(() => {
    const card = document.querySelector('.site-floating')
    const image = card.querySelector('img')
    const action = card.querySelector('.site-floating-action')
    const close = card.querySelector('.site-floating-close')
    const bounds = element => element.getBoundingClientRect().toJSON()
    return {
      card: bounds(card), image: bounds(image), action: bounds(action), close: bounds(close),
      imageLoaded: image.complete && image.naturalWidth > 0,
      copyVisible: [...card.querySelectorAll('.site-floating-content :is(span,p,small)')].filter(element => getComputedStyle(element).display !== 'none').every(element => {
        const rect = element.getBoundingClientRect()
        const parent = card.getBoundingClientRect()
        return rect.left >= parent.left && rect.right <= parent.right && rect.bottom <= parent.bottom
      }),
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      text: card.innerText,
    }
  })
  await page.screenshot({ path: fileURLToPath(new URL(`${viewport.name}-viewport.png`, output)) })
  await page.locator('.site-floating').screenshot({ path: fileURLToPath(new URL(`${viewport.name}-card.png`, output)) })
  if (!result.imageLoaded || !result.copyVisible || result.overflow > 1 || result.card.right > viewport.width || result.card.bottom > viewport.height || errors.length) failed = true
  console.log(JSON.stringify({ viewport: viewport.name, ...result, errors, existingWarnings }))
  if (viewport.name === 'mobile') {
    await page.getByRole('button', { name: 'Encontrar e agendar' }).click()
    const opened = await page.getByRole('dialog').isVisible()
    await page.getByRole('button', { name: 'Fechar agendamento' }).click()
    await page.waitForTimeout(500)
    const closed = !(await page.getByRole('dialog').count())
    await page.reload({ waitUntil: 'networkidle' })
    await page.evaluate(() => window.scrollTo(0, 500))
    await page.waitForTimeout(150)
    const stayedDismissed = !(await page.locator('.site-floating').count())
    if (!opened || !closed || !stayedDismissed) failed = true
    console.log(JSON.stringify({ interaction: 'booking', opened, closed, stayedDismissed }))
  }
  if (viewport.name === 'desktop') {
    await page.getByRole('button', { name: 'Dispensar atalho' }).click()
    await page.reload({ waitUntil: 'networkidle' })
    await page.evaluate(() => window.scrollTo(0, 500))
    await page.waitForTimeout(150)
    const stayedDismissed = !(await page.locator('.site-floating').count())
    if (!stayedDismissed) failed = true
    console.log(JSON.stringify({ interaction: 'dismiss', stayedDismissed }))
  }
  await page.close()
}
const reduced = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' })
await reduced.goto(`${origin}/produtos/brilho-shampoo/`, { waitUntil: 'networkidle' })
await reduced.evaluate(() => window.scrollTo(0, 500))
await reduced.locator('.site-floating').waitFor({ state: 'visible' })
const animation = await reduced.locator('.site-floating').evaluate(element => getComputedStyle(element).animationName)
if (animation !== 'none') failed = true
console.log(JSON.stringify({ viewport: 'reduced-motion', animation }))
await reduced.close()
await browser.close()
if (failed) process.exitCode = 1

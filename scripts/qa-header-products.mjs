import { chromium } from 'playwright'
import { mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

const origin = process.env.WALTERS_QA_ORIGIN ?? 'http://127.0.0.1:3014'
const output = new URL('../output/header-products-qa/', import.meta.url)
await mkdir(output, { recursive: true })
const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true })
const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'desktop-small', width: 1024, height: 768 },
  { name: 'tablet-edge', width: 901, height: 800 },
  { name: 'tablet', width: 820, height: 1180 },
  { name: 'mobile', width: 390, height: 844 },
  { name: 'compact-landscape', width: 568, height: 320 },
]
let failed = false
for (const viewport of viewports) {
  const page = await browser.newPage({ viewport: { width: viewport.width, height: viewport.height }, deviceScaleFactor: 1 })
  await page.addInitScript(() => sessionStorage.setItem('walters-booking-intro-shown', '1'))
  const errors = []
  page.on('pageerror', error => errors.push(error.message))
  await page.goto(origin, { waitUntil: 'networkidle' })
  const result = await page.evaluate(() => {
    const rect = element => element?.getBoundingClientRect().toJSON()
    const links = [...document.querySelectorAll('.site-desktop-nav a')]
    return {
      headerLinks: links.map(link => ({ text: link.textContent, href: link.getAttribute('href'), rect: rect(link) })),
      desktopNavVisible: getComputedStyle(document.querySelector('.site-desktop-nav')).display !== 'none',
      logo: rect(document.querySelector('.site-wordmark')),
      actions: rect(document.querySelector('.site-header-actions')),
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    }
  })
  await page.screenshot({ path: fileURLToPath(new URL(`${viewport.name}-header.png`, output)) })
  if (result.headerLinks.length !== 5 || result.headerLinks[2].href !== '/produtos/' || result.overflow > 1 || errors.length) failed = true
  if (result.desktopNavVisible && (result.headerLinks[0].rect.left < result.logo.right || result.headerLinks.at(-1).rect.right > result.actions.left)) failed = true
  if (result.desktopNavVisible) {
    await page.locator('.site-desktop-nav').getByRole('link', { name: 'Produtos' }).click()
    result.productRoute = new URL(page.url()).pathname === '/produtos/'
    result.current = await page.locator('.site-desktop-nav').getByRole('link', { name: 'Produtos' }).getAttribute('aria-current')
    if (!result.productRoute || result.current !== 'page') failed = true
  }
  await page.getByRole('button', { name: 'Abrir menu' }).click()
  await page.locator('.site-menu.is-open').waitFor()
  await page.waitForTimeout(600)
  result.menuProducts = await page.locator('.site-menu').getByRole('link', { name: 'Produtos' }).count()
  result.menuOverflow = await page.locator('.site-menu').evaluate(element => element.scrollWidth - element.clientWidth)
  await page.screenshot({ path: fileURLToPath(new URL(`${viewport.name}-menu.png`, output)) })
  await page.locator('.site-menu').getByRole('link', { name: 'Produtos' }).click()
  result.menuProductRoute = new URL(page.url()).pathname === '/produtos/'
  if (result.menuProducts !== 1 || result.menuOverflow > 1 || !result.menuProductRoute) failed = true
  console.log(JSON.stringify({ viewport: viewport.name, ...result, errors }))
  await page.close()
}
const rotated = await browser.newPage({ viewport: { width: 390, height: 844 } })
await rotated.addInitScript(() => sessionStorage.setItem('walters-booking-intro-shown', '1'))
await rotated.goto(origin, { waitUntil: 'networkidle' })
await rotated.getByRole('button', { name: 'Abrir menu' }).click()
await rotated.locator('.site-menu.is-open').waitFor()
await rotated.setViewportSize({ width: 844, height: 390 })
await rotated.waitForTimeout(600)
const rotatedMenuProducts = await rotated.locator('.site-menu').getByRole('link', { name: 'Produtos' }).count()
const rotatedOverflow = await rotated.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
await rotated.locator('.site-menu').getByRole('link', { name: 'Produtos' }).click()
const rotatedRoute = new URL(rotated.url()).pathname === '/produtos/'
if (rotatedMenuProducts !== 1 || rotatedOverflow > 1 || !rotatedRoute) failed = true
console.log(JSON.stringify({ viewport: 'orientation-change', rotatedMenuProducts, rotatedOverflow, rotatedRoute }))
await rotated.close()
await browser.close()
if (failed) process.exitCode = 1

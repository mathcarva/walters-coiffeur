import { chromium } from 'playwright'
import { mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

const origin = process.env.WALTERS_QA_ORIGIN ?? 'http://127.0.0.1:3014'
const output = new URL('../output/home-qa/', import.meta.url)
await mkdir(output, { recursive: true })
const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true })
const cases = [
  { name: 'desktop-large', width: 1600, height: 900 },
  { name: 'desktop-medium', width: 1280, height: 800 },
  { name: 'desktop-small', width: 1024, height: 768 },
  { name: 'tablet', width: 820, height: 1180 },
  { name: 'mobile', width: 390, height: 844 },
  { name: 'mobile-landscape', width: 844, height: 390 },
  { name: 'compact-landscape', width: 568, height: 320 },
]
let failed = false
for (const item of cases) {
  const page = await browser.newPage({ viewport: { width: item.width, height: item.height }, deviceScaleFactor: 1 })
  await page.addInitScript(() => sessionStorage.setItem('walters-booking-intro-shown', '1'))
  const errors = []
  page.on('pageerror', error => errors.push(error.message))
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()) })
  await page.goto(origin, { waitUntil: 'networkidle' })
  await page.waitForTimeout(1400)
  const result = await page.evaluate(() => ({
    title: document.querySelector('h1')?.textContent,
    overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    missingImages: [...document.images].filter(img => img.complete && img.naturalWidth === 0).map(img => img.src),
    hero: document.querySelector('.wh-hero')?.getBoundingClientRect().height,
    heroActionBottom: document.querySelector('.wh-hero-action')?.getBoundingClientRect().bottom,
    portrait: document.querySelector('.wh-hero-photo img')?.getBoundingClientRect().toJSON(),
    smoother: Boolean(document.querySelector('#smooth-wrapper')?.style.position),
    headerOverHero: document.querySelector('.site-header')?.classList.contains('is-over-hero'),
  }))
  if (['desktop-large', 'tablet', 'mobile', 'mobile-landscape'].includes(item.name)) {
    await page.screenshot({ path: fileURLToPath(new URL(`${item.name}-hero.png`, output)), fullPage: false })
  }
  if (item.name === 'desktop-large' || item.name === 'mobile') {
    if (result.smoother) await page.mouse.wheel(0, 2600)
    else await page.locator('#cuidados').scrollIntoViewIfNeeded()
    await page.waitForTimeout(3000)
    result.services = await page.evaluate(() => ({
      scrollY: window.scrollY,
      sectionTop: document.querySelector('#cuidados')?.getBoundingClientRect().top,
      headingOpacity: getComputedStyle(document.querySelector('.wh-cuidados h2')).opacity,
      imageClip: getComputedStyle(document.querySelector('.wh-cuidados-photo')).clipPath,
      contentTop: document.querySelector('#smooth-content')?.getBoundingClientRect().top,
      headerOverHero: document.querySelector('.site-header')?.classList.contains('is-over-hero'),
    }))
    await page.screenshot({ path: fileURLToPath(new URL(`${item.name}-services.png`, output)), fullPage: false })
  }
  if (item.name === 'mobile') {
    await page.getByRole('button', { name: /Encontrar e agendar/ }).first().click()
    result.bookingOpened = await page.getByRole('dialog').isVisible()
    await page.getByRole('button', { name: 'Fechar agendamento' }).click()
    await page.waitForTimeout(500)
    result.bookingClosed = !(await page.getByRole('dialog').count())
  }
  if (result.overflow > 1 || result.missingImages.length || errors.length || result.bookingOpened === false || result.bookingClosed === false) failed = true
  if (item.name.includes('landscape') && (Math.abs(result.hero - Math.max(350, item.height)) > 1 || result.heroActionBottom > result.hero)) failed = true
  console.log(JSON.stringify({ viewport: item.name, ...result, errors }))
  await page.close()
}
const reduced = await browser.newPage({ viewport: { width: 1280, height: 800 }, reducedMotion: 'reduce' })
await reduced.addInitScript(() => sessionStorage.setItem('walters-booking-intro-shown', '1'))
await reduced.goto(origin, { waitUntil: 'networkidle' })
await reduced.evaluate(() => document.querySelectorAll('img[loading="lazy"]').forEach(img => { img.loading = 'eager' }))
await reduced.waitForFunction(() => [...document.images].every(img => img.complete && img.naturalWidth > 0))
await reduced.screenshot({ path: fileURLToPath(new URL('desktop-full-static.png', output)), fullPage: true })
for (const section of ['encontro', 'cuidados', 'statement', 'movimento', 'universos', 'produtos', 'encontrar']) {
  await reduced.locator(`.wh-${section}`).screenshot({ path: fileURLToPath(new URL(`desktop-${section}.png`, output)) })
}
console.log(JSON.stringify({ viewport: 'reduced-motion', visibleTitle: await reduced.locator('h1').isVisible(), heroPhotoTransform: await reduced.locator('.wh-hero-photo img').evaluate(el => getComputedStyle(el).transform) }))
await reduced.close()
const reducedMobile = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' })
await reducedMobile.addInitScript(() => sessionStorage.setItem('walters-booking-intro-shown', '1'))
await reducedMobile.goto(origin, { waitUntil: 'networkidle' })
await reducedMobile.evaluate(() => document.querySelectorAll('img[loading="lazy"]').forEach(img => { img.loading = 'eager' }))
await reducedMobile.waitForFunction(() => [...document.images].every(img => img.complete && img.naturalWidth > 0))
await reducedMobile.screenshot({ path: fileURLToPath(new URL('mobile-full-static.png', output)), fullPage: true })
for (const section of ['encontro', 'cuidados', 'movimento', 'encontrar']) {
  await reducedMobile.locator(`.wh-${section}`).screenshot({ path: fileURLToPath(new URL(`mobile-${section}.png`, output)) })
}
await reducedMobile.close()

const journey = await browser.newPage({ viewport: { width: 1280, height: 800 } })
await journey.addInitScript(() => sessionStorage.setItem('walters-booking-intro-shown', '1'))
const journeyErrors = []
journey.on('pageerror', error => journeyErrors.push(error.message))
await journey.goto(origin, { waitUntil: 'networkidle' })
await journey.getByRole('link', { name: 'Serviços', exact: true }).first().click()
const servicesRoute = new URL(journey.url()).pathname === '/servicos/' && await journey.locator('h1').count() > 0
await journey.getByRole('link', { name: 'Walter’s Coiffeur — início' }).click()
await journey.waitForTimeout(750)
const homeReturn = new URL(journey.url()).pathname === '/' && await journey.locator('.wh-hero h1').isVisible()
await journey.mouse.wheel(0, 900)
await journey.waitForTimeout(1800)
const floatingVisible = await journey.locator('.site-floating').isVisible()
await journey.locator('.site-floating-action').click()
const floatingOpensBooking = await journey.getByRole('dialog').isVisible()
const searchPresent = await journey.getByPlaceholder('Onde quer encontrar sua Walter’s?').isVisible()
await journey.keyboard.press('Escape')
await journey.waitForTimeout(500)
const escapeClosesBooking = !(await journey.getByRole('dialog').count())
const journeyResult = { servicesRoute, homeReturn, floatingVisible, floatingOpensBooking, searchPresent, escapeClosesBooking, errors: journeyErrors }
if (Object.values(journeyResult).some(value => value === false) || journeyErrors.length) failed = true
console.log(JSON.stringify({ viewport: 'route-and-cta-journey', ...journeyResult }))
await journey.close()

const intro = await browser.newPage({ viewport: { width: 1280, height: 800 } })
await intro.goto(origin, { waitUntil: 'networkidle' })
await intro.getByRole('dialog').waitFor({ timeout: 5000 })
const autoOpens = await intro.getByRole('dialog').isVisible()
await intro.getByRole('button', { name: 'Fechar agendamento' }).click()
await intro.waitForTimeout(500)
const autoCloses = await intro.getByRole('dialog').count() === 0
await intro.reload({ waitUntil: 'networkidle' })
await intro.waitForTimeout(2200)
const oncePerSession = await intro.getByRole('dialog').count() === 0
console.log(JSON.stringify({ viewport: 'auto-booking', autoOpens, autoCloses, oncePerSession }))
if (!autoOpens || !autoCloses || !oncePerSession) failed = true
await intro.close()

await browser.close()
if (failed) process.exitCode = 1

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import HomePage from './HomePage'
import SiteFooter from './SiteFooter'
import BrandLogo from './BrandLogo'
import BookingPanel from './BookingPanel'
import CommercePage from './CommercePage'
import CommerceProductDetailPage from './CommerceProductDetailPage'
import { AboutPage, AcademyPage, BarbershopPage, ConceptPage, FranchisePage, ServicesPage, UnitsPage } from './EditorialPages'
import './chrome.css'

const primary = [
  { label: 'Serviços', to: '/servicos/' },
  { label: 'Unidades', to: '/unidades/' },
  { label: 'Produtos', to: '/produtos/' },
  { label: 'A marca', to: '/institucional/' },
  { label: 'Seja um franqueado', to: '/sejanossofranqueado/' },
]
const secondary = [
  { label: 'Academy', to: '/academy/' },
  { label: 'Barbearia', to: '/barbeariawalters/' },
  { label: 'Concept', to: '/concept/' },
]
gsap.registerPlugin(ScrollTrigger)

const routeTitles: Record<string, string> = {
  '/': 'Walter’s Coiffeur', '/servicos/': 'Serviços | Walter’s Coiffeur', '/unidades/': 'Unidades | Walter’s Coiffeur',
  '/institucional/': 'A marca | Walter’s Coiffeur', '/academy/': 'Academy | Walter’s Coiffeur',
  '/barbeariawalters/': 'Barbearia | Walter’s Coiffeur', '/concept/': 'Concept | Walter’s Coiffeur',
  '/sejanossofranqueado/': 'Franquias | Walter’s Coiffeur',
  '/produtos/': 'Produtos | Walter’s Coiffeur',
}

function UnknownRoute() {
  return <section className="site-not-found"><div className="ep-width"><span className="ep-eyebrow">Página não encontrada</span><h1>Este caminho não está por aqui.</h1><Link to="/">Voltar ao início <ArrowUpRight size={18} aria-hidden="true" /></Link></div></section>
}

export default function App() {
  const location = useLocation()
  const isHome = location.pathname === '/'
  const [menuOpen, setMenuOpen] = useState(false)
  const [menuMounted, setMenuMounted] = useState(false)
  const [floatingVisible, setFloatingVisible] = useState(false)
  const [homeAtTop, setHomeAtTop] = useState(true)
  const [floatingDismissed, setFloatingDismissed] = useState(() => sessionStorage.getItem('walters-unit-cta-dismissed') === '1')
  const [bookingState, setBookingState] = useState<'closed' | 'open' | 'closing'>('closed')
  const bookingTimer = useRef<number | null>(null)
  const bookingOpen = bookingState !== 'closed'

  useEffect(() => {
    setMenuOpen(false)
    document.title = routeTitles[location.pathname] ?? (/^\/produtos\/[^/]+\/$/.test(location.pathname) ? 'Produto | Walter’s Coiffeur' : 'Página não encontrada | Walter’s Coiffeur')
    if (!location.hash) window.scrollTo({ top: 0, behavior: 'instant' })
  }, [location.pathname, location.hash])

  useEffect(() => {
    if (menuOpen) return
    const timeout = window.setTimeout(() => setMenuMounted(false), 480)
    return () => window.clearTimeout(timeout)
  }, [menuOpen])

  useEffect(() => {
    if (!isHome || bookingOpen || sessionStorage.getItem('walters-booking-intro-shown') === '1') return
    const timeout = window.setTimeout(() => {
      sessionStorage.setItem('walters-booking-intro-shown', '1')
      setMenuOpen(false)
      setBookingState('open')
    }, 1800)
    return () => window.clearTimeout(timeout)
  }, [isHome, bookingOpen])

  useLayoutEffect(() => {
    if (isHome || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const scope = document.querySelector<HTMLElement>('.ep-page')
    if (!scope) return
    const context = gsap.context(() => {
      scope.querySelectorAll<HTMLElement>('h1,h2,.ep-eyebrow,.ep-hero p,.ep-intro p,.ep-story p').forEach(element => {
        if (element.getBoundingClientRect().bottom < 0) return
        gsap.from(element, { opacity: 0, y: 22, filter: 'blur(5px)', duration: .85, ease: 'power2.out', scrollTrigger: { trigger: element, start: 'top 93%', once: true } })
      })
      scope.querySelectorAll<HTMLElement>('figure').forEach((element, index) => {
        if (element.getBoundingClientRect().bottom < 0) return
        const from = index % 3 === 0 ? 'inset(0% 0% 100% 0%)' : index % 3 === 1 ? 'inset(0% 100% 0% 0%)' : 'inset(100% 0% 0% 0%)'
        gsap.fromTo(element, { clipPath: from }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.25, ease: 'power2.inOut', scrollTrigger: { trigger: element, start: 'top 88%', once: true } })
      })
    }, scope)
    const mm = gsap.matchMedia()
    mm.add('(min-width: 1024px) and (min-height: 620px) and (prefers-reduced-motion: no-preference)', () => {
      const mediaContext = gsap.context(() => {
        const hero = scope.querySelector<HTMLElement>('.ep-hero-media img')
        if (hero) gsap.fromTo(hero, { yPercent: -3, scale: 1.12 }, { yPercent: 3, scale: 1.12, ease: 'none', scrollTrigger: { trigger: scope.querySelector('.ep-hero'), start: 'top top', end: 'bottom top', scrub: .7 } })
      }, scope)
      return () => mediaContext.revert()
    })
    requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => { mm.revert(); context.revert() }
  }, [location.pathname, isHome])

  useEffect(() => {
    if (floatingDismissed || bookingOpen) return
    const update = () => setFloatingVisible(window.scrollY > 100)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [floatingDismissed, bookingOpen, location.pathname])

  useEffect(() => {
    if (!isHome) return
    const update = () => setHomeAtTop(window.scrollY < 64)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [isHome])

  useEffect(() => {
    if (!menuOpen) return
    const onEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') setMenuOpen(false) }
    window.addEventListener('keydown', onEscape)
    return () => window.removeEventListener('keydown', onEscape)
  }, [menuOpen])

  useEffect(() => {
    if (!menuOpen || bookingOpen) return
    const previousOverflow = document.body.style.overflow
    const smoother = ScrollSmoother.get()
    const smootherWasPaused = smoother?.paused() ?? false
    smoother?.paused(true)
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
      smoother?.paused(smootherWasPaused)
    }
  }, [menuOpen, bookingOpen])

  const dismissFloating = () => {
    setFloatingDismissed(true)
    sessionStorage.setItem('walters-unit-cta-dismissed', '1')
  }
  const toggleMenu = () => {
    if (menuOpen) { setMenuOpen(false); return }
    setMenuMounted(true)
    requestAnimationFrame(() => requestAnimationFrame(() => setMenuOpen(true)))
  }
  const openBooking = () => {
    if (bookingTimer.current) window.clearTimeout(bookingTimer.current)
    setMenuOpen(false)
    setFloatingVisible(false)
    setFloatingDismissed(true)
    sessionStorage.setItem('walters-unit-cta-dismissed', '1')
    sessionStorage.setItem('walters-booking-intro-shown', '1')
    setBookingState('open')
  }
  const closeBooking = useCallback(() => {
    setBookingState('closing')
    if (bookingTimer.current) window.clearTimeout(bookingTimer.current)
    const duration = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 440
    bookingTimer.current = window.setTimeout(() => setBookingState('closed'), duration)
  }, [])
  useEffect(() => () => { if (bookingTimer.current) window.clearTimeout(bookingTimer.current) }, [])

  return <div className="site-shell">
    <a href="#main-content" className="site-skip">Pular para o conteúdo</a>
    <header className={`site-header ${isHome && homeAtTop && !menuOpen ? 'is-over-hero' : ''}`}>
      <div className="site-header-inner">
        <Link className="site-wordmark" to="/" aria-label="Walter’s Coiffeur — início"><BrandLogo variant="light" decorative /></Link>
        <nav className="site-desktop-nav" aria-label="Navegação principal">{primary.map(item => <Link key={item.to} to={item.to} aria-current={location.pathname === item.to ? 'page' : undefined}>{item.label}</Link>)}</nav>
        <div className="site-header-actions"><button type="button" onClick={openBooking} className="site-header-cta">Agendar <ArrowUpRight size={15} aria-hidden="true" /></button><button type="button" className="site-menu-trigger" onClick={toggleMenu} aria-expanded={menuOpen} aria-controls="site-menu" aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}>{menuOpen ? <X size={24} /> : <Menu size={24} />}</button></div>
      </div>
    </header>
    <div id="site-menu" className={`site-menu ${menuOpen ? 'is-open' : ''}`} hidden={!menuMounted} aria-hidden={!menuOpen}>
      <nav aria-label="Menu completo"><div className="site-menu-primary">{primary.map(item => <Link key={item.to} to={item.to} tabIndex={menuOpen ? 0 : -1}>{item.label}<ArrowUpRight size={23} aria-hidden="true" /></Link>)}<button type="button" onClick={openBooking} tabIndex={menuOpen ? 0 : -1}>Agendar <ArrowUpRight size={23} aria-hidden="true" /></button></div><div className="site-menu-secondary">{secondary.map(item => <Link key={item.to} to={item.to} tabIndex={menuOpen ? 0 : -1}>{item.label}<ArrowUpRight size={16} aria-hidden="true" /></Link>)}</div><figure className="site-menu-art"><img src="/editorial-2026/menu-portrait-v2.jpg" alt="" /><figcaption>Seu jeito de ser, em primeiro plano.</figcaption></figure></nav>
    </div>
    <main id="main-content" tabIndex={-1}>
      <Routes>
        <Route path="/" element={<HomePage onOpenBooking={openBooking} />} />
        <Route path="/servicos/" element={<ServicesPage />} />
        <Route path="/unidades/" element={<UnitsPage />} />
        <Route path="/institucional/" element={<AboutPage />} />
        <Route path="/academy/" element={<AcademyPage />} />
        <Route path="/barbeariawalters/" element={<BarbershopPage />} />
        <Route path="/concept/" element={<ConceptPage />} />
        <Route path="/sejanossofranqueado/" element={<FranchisePage />} />
        <Route path="/produtos/" element={<CommercePage />} />
        <Route path="/produtos/:slug/" element={<CommerceProductDetailPage />} />
        <Route path="*" element={<UnknownRoute />} />
      </Routes>
    </main>
    {!isHome && <SiteFooter />}
    {!bookingOpen && floatingVisible && !floatingDismissed && <aside className="site-floating" aria-label="Encontrar unidade e agendar">
      <div className="site-floating-media" aria-hidden="true"><img src="/editorial-2026/booking-portrait-v2.jpg" alt="" /></div>
      <div className="site-floating-content">
        <span className="site-floating-kicker">Walter’s / sua visita</span>
        <p>Seu momento <em>começa aqui.</em></p>
        <button type="button" className="site-floating-action" onClick={openBooking}>Encontrar e agendar <ArrowUpRight size={18} aria-hidden="true" /></button>
        <small>Prévia interativa · sem reserva real</small>
      </div>
      <button className="site-floating-close" type="button" onClick={dismissFloating} aria-label="Dispensar atalho"><X size={17} aria-hidden="true" /></button>
    </aside>}
    {bookingOpen && <BookingPanel onClose={closeBooking} closing={bookingState === 'closing'} />}
  </div>
}

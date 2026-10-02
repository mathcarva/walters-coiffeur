import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { Link } from 'react-router-dom'
import SiteFooter from './SiteFooter'
import './home.css'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

// Internal pages still use research assets. Keep their explicit non-publishable fallback.
const previewAsset = (file: string) => import.meta.env.DEV ? `/__review-assets/${file}` : undefined
export function ReviewImage({ file, alt, className = '', style }: { file: string; alt: string; className?: string; style?: React.CSSProperties }) {
  const source = previewAsset(file)
  return source ? <img src={source} alt={alt} className={className} style={style} /> : <div className={`review-media-gap ${className}`} role="img" aria-label={`Mídia pendente: ${alt}`}>Mídia pendente de liberação</div>
}

const media = '/editorial-2026/'
function EditorialLink({ to, children }: { to: string; children: ReactNode }) {
  return <Link className="wh-link" to={to}>{children}<ArrowUpRight size={19} aria-hidden="true" /></Link>
}

function Hero({ onOpenBooking }: { onOpenBooking: () => void }) {
  return <section className="wh-hero" aria-labelledby="wh-hero-title">
    <picture className="wh-hero-photo" aria-hidden="true"><source media="(max-width: 700px)" srcSet={`${media}hero-mobile.png`} /><img src={`${media}hero-desktop.png`} alt="" /></picture>
    <div className="wh-hero-shade" aria-hidden="true" />
    <div className="wh-container wh-hero-inner"><div className="wh-hero-copy">
      <span className="wh-eyebrow wh-hero-eyebrow" data-enter>Walter’s Coiffeur</span>
      <h1 id="wh-hero-title" data-enter>O seu jeito<br />{' '}de ser, <em>em primeiro plano.</em></h1>
      <div className="wh-hero-bottom" data-enter><p>Cabelo, beleza e cuidado para acompanhar quem você é — e quem deseja ser.</p><button className="wh-hero-action" type="button" onClick={onOpenBooking}>Encontrar e agendar <ArrowUpRight size={21} aria-hidden="true" /></button></div>
    </div><a className="wh-scroll-cue" href="#encontro" aria-label="Descer para conhecer a Walter’s">Descubra <ArrowDown size={18} aria-hidden="true" /></a></div>
  </section>
}

function Encontro() {
  return <section id="encontro" className="wh-encontro" aria-labelledby="wh-encontro-title">
    <div className="wh-container wh-encontro-head"><span className="wh-eyebrow" data-enter>O encontro</span><h2 id="wh-encontro-title" data-enter>Antes de qualquer mudança, <em>existe você.</em></h2></div>
    <div className="wh-encontro-stage"><figure className="wh-encontro-photo wh-image-reveal"><img src={`${media}retrato-claro.png`} alt="Retrato editorial conceitual de mulher com cabelos crespos, rosto em primeiro plano" loading="lazy" /></figure><div className="wh-encontro-note" data-enter><p>Escutar, olhar de perto, escolher juntos. O cuidado começa na pessoa e segue pelo cabelo.</p><EditorialLink to="/institucional/">Conheça a Walter’s</EditorialLink></div></div>
  </section>
}

const careItems = [
  { name: 'Corte', image: 'service-corte-v2.jpg', alt: 'Retrato editorial de cabelo cacheado sendo finalizado com tesoura', detail: 'Forma, movimento e um corte pensado para acompanhar você.' },
  { name: 'Mechas & Coloração', image: 'service-color-v2.jpg', alt: 'Retrato editorial de cabelo com mechas iluminadas', detail: 'Luz e cor para revelar novas nuances do seu cabelo.' },
  { name: 'Tratamentos Capilares', image: 'service-treatment-v2.jpg', alt: 'Cuidado capilar em lavatório, com foco no cabelo e no rosto', detail: 'Um momento de atenção à fibra, ao couro cabeludo e ao seu bem-estar.' },
  { name: 'Makeup', image: 'service-makeup-v2.jpg', alt: 'Maquiagem editorial com foco no olhar e no rosto', detail: 'A maquiagem como expressão, não como regra.' },
] as const
function Cuidados() {
  const [active, setActive] = useState(0)
  const selected = careItems[active]
  useEffect(() => { careItems.slice(1).forEach(item => { const image = new Image(); image.src = `${media}${item.image}` }) }, [])
  return <section id="cuidados" className="wh-cuidados" aria-labelledby="wh-cuidados-title">
    <div className="wh-container wh-cuidados-head"><span className="wh-eyebrow" data-enter>Seu próximo cuidado</span><h2 id="wh-cuidados-title" data-enter>Um gesto.<br /><em>Muitas possibilidades.</em></h2></div>
    <div className="wh-container wh-cuidados-body"><figure className="wh-cuidados-photo wh-image-reveal"><img key={selected.image} src={`${media}${selected.image}`} alt={selected.alt} loading="lazy" /></figure><div className="wh-cuidados-selection" data-enter><p>Do corte à cor, o ponto de partida é sempre o que faz sentido para você.</p><div className="wh-care-options" role="group" aria-label="Escolha um cuidado para ver sua imagem">{careItems.map((item, index) => <button key={item.name} type="button" aria-pressed={active === index} onClick={() => setActive(index)} onMouseEnter={() => setActive(index)} onFocus={() => setActive(index)}><span>{item.name}</span><ArrowUpRight size={21} aria-hidden="true" /></button>)}</div><p className="wh-care-detail" aria-live="polite">{selected.detail}</p><EditorialLink to="/servicos/">Explorar todos os serviços</EditorialLink><small>Os serviços podem variar conforme a unidade.</small></div></div>
  </section>
}

function Statement() {
  return <section className="wh-statement" aria-label="Uma mensagem Walter’s"><div className="wh-container"><span className="wh-eyebrow" data-enter>Beleza em movimento</span><p data-enter>Há força em se reconhecer.<br /><em>E liberdade em mudar.</em></p></div></section>
}

const universes = [
  { number: '01', name: 'Walter’s Academy', headline: <>O talento cresce <em>quando é compartilhado.</em></>, about: 'Um espaço de formação para profissionais da beleza. Técnica, prática e repertório em áreas como corte, cor, barbearia e maquiagem.', image: 'academy-v2.jpg', alt: 'Cena conceitual de formação prática em beleza', to: '/academy/', action: 'Conhecer a Academy', className: 'academy' },
  { number: '02', name: 'Barbearia Walter’s', headline: <>Da origem do ofício, <em>um espaço para eles.</em></>, about: 'Walter Cabral começou sua trajetória em uma barbearia. Esse universo ganha vida no cuidado masculino com cabelo, barba e atenção aos detalhes.', image: 'barbershop-v2.jpg', alt: 'Barbeiro cuidando da barba de um homem em cena editorial', to: '/barbeariawalters/', action: 'Entrar na Barbearia', className: 'barber' },
  { number: '03', name: 'Walter’s Concept', headline: <>Um novo olhar para <em>a experiência de salão.</em></>, about: 'O Concept é um formato de salão Walter’s que reúne atendimento personalizado, inovação, elegância e atenção à sustentabilidade.', image: 'concept-v2.jpg', alt: 'Interior de salão contemporâneo em representação conceitual', to: '/concept/', action: 'Descobrir o Concept', className: 'concept' },
] as const

function Movimento() {
  return <section className="wh-movimento" aria-labelledby="wh-movimento-title"><div className="wh-movimento-photo wh-parallax"><img src={`${media}movimento.png`} alt="Retrato editorial conceitual de mulher com cabelos castanhos em movimento" loading="lazy" /></div><div className="wh-container wh-movimento-copy" data-enter><span className="wh-eyebrow">A marca, em movimento</span><h2 id="wh-movimento-title">Uma marca.<br /><em>Muitos jeitos de viver a beleza.</em></h2></div></section>
}

function Universos() {
  return <section className="wh-universos" aria-labelledby="wh-universos-title"><div className="wh-container wh-universos-intro"><span className="wh-eyebrow" data-enter>Uma marca, muitas expressões</span><h2 id="wh-universos-title" data-enter>Existem muitos caminhos <em>para viver a beleza.</em></h2></div>{universes.map(item => <article className={`wh-universe wh-universe--${item.className}`} key={item.name}><figure className="wh-universe-image wh-image-reveal"><img src={`${media}${item.image}`} alt={item.alt} loading="lazy" /></figure><div className="wh-universe-copy" data-enter><span className="wh-eyebrow">{item.number} / {item.name}</span><h3>{item.headline}</h3><p>{item.about}</p><EditorialLink to={item.to}>{item.action}</EditorialLink></div></article>)}</section>
}

function Produtos() {
  return <section className="wh-produtos" aria-labelledby="wh-produtos-title"><div className="wh-container wh-produtos-intro" data-enter><span className="wh-eyebrow">O ritual continua</span><h2 id="wh-produtos-title">Leve o cuidado <em>para além do salão.</em></h2><p>Textura, gesto, memória. Uma apresentação conceitual de produtos Walter’s para imaginar como o ritual pode continuar em casa.</p></div><div className="wh-produtos-scene"><figure className="wh-produtos-main wh-image-reveal"><img src={`${media}products-professional-v2.jpg`} alt="Imagem conceitual de produtos capilares Walter’s em cenário editorial" loading="lazy" /></figure><div className="wh-produtos-overlay" data-enter><span className="wh-eyebrow">Walter’s / em casa</span><p>O que fica depois <em>do encontro.</em></p><EditorialLink to="/produtos/">Ver todos os produtos</EditorialLink></div><figure className="wh-produtos-detail wh-image-reveal"><img src={`${media}products-barber-v2.jpg`} alt="Imagem conceitual de produto de barbearia Walter’s em cenário editorial" loading="lazy" /></figure></div></section>
}

function Encontrar({ onOpenBooking }: { onOpenBooking: () => void }) {
  return <section id="encontrar" className="wh-encontrar" aria-labelledby="wh-encontrar-title"><div className="wh-encontrar-photo" aria-hidden="true"><img src={`${media}closing-portrait-v2.jpg`} alt="" loading="lazy" /></div><div className="wh-container wh-encontrar-inner"><div data-enter><span className="wh-eyebrow">Seu próximo encontro</span><h2 id="wh-encontrar-title">A próxima versão <em>de você começa aqui.</em></h2><p>Encontre uma unidade Walter’s e escolha por onde começar.</p><button type="button" onClick={onOpenBooking}>Encontrar e agendar <ArrowUpRight size={22} aria-hidden="true" /></button><small>Prévia interativa; horários ilustrativos e nenhuma reserva é enviada.</small></div></div></section>
}

export default function HomePage({ onOpenBooking }: { onOpenBooking: () => void }) {
  const root = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => {
    const scope = root.current
    if (!scope) return
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const context = gsap.context(() => {
        scope.querySelectorAll<HTMLElement>('[data-enter]').forEach(element => gsap.fromTo(element, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: .95, ease: 'power2.out', clearProps: 'opacity,transform', scrollTrigger: { trigger: element, start: element.closest('.wh-hero') ? 'top 110%' : 'top 92%', once: true } }))
        scope.querySelectorAll<HTMLElement>('.wh-image-reveal').forEach(element => gsap.fromTo(element, { clipPath: 'inset(0% 100% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.55, ease: 'power2.inOut', clearProps: 'clipPath', scrollTrigger: { trigger: element, start: 'top 85%', once: true } }))
      }, scope)
      return () => context.revert()
    })
    mm.add('(min-width: 1024px) and (min-height: 620px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
      const context = gsap.context(() => {
        const hero = scope.querySelector<HTMLElement>('.wh-hero-photo img')
        const movement = scope.querySelector<HTMLElement>('.wh-parallax img')
        const productDetail = scope.querySelector<HTMLElement>('.wh-produtos-detail')
        if (hero) gsap.fromTo(hero, { yPercent: -2, scale: 1.07 }, { yPercent: 2, scale: 1.07, ease: 'none', scrollTrigger: { trigger: '.wh-hero', start: 'top top', end: 'bottom top', scrub: 1.25 } })
        if (movement) gsap.fromTo(movement, { yPercent: -3, scale: 1.08 }, { yPercent: 3, scale: 1.08, ease: 'none', scrollTrigger: { trigger: '.wh-movimento', start: 'top bottom', end: 'bottom top', scrub: 1.25 } })
        if (productDetail) gsap.fromTo(productDetail, { y: -24 }, { y: 24, ease: 'none', scrollTrigger: { trigger: '.wh-produtos-scene', start: 'top bottom', end: 'bottom top', scrub: 1.8 } })
      }, scope)
      const smoother = ScrollSmoother.create({ wrapper: '#smooth-wrapper', content: '#smooth-content', smooth: 1.45, smoothTouch: false, effects: false })
      requestAnimationFrame(() => ScrollTrigger.refresh())
      return () => { smoother.kill(); context.revert() }
    })
    const jumpToHash = () => {
      if (!window.location.hash) return
      const target = document.getElementById(decodeURIComponent(window.location.hash.slice(1)))
      if (!target) return
      ScrollTrigger.refresh()
      const smoother = ScrollSmoother.get()
      if (smoother) smoother.scrollTo(target, false, 'top top')
      else target.scrollIntoView({ behavior: 'instant', block: 'start' })
    }
    const frame = requestAnimationFrame(() => requestAnimationFrame(jumpToHash))
    window.addEventListener('hashchange', jumpToHash)
    return () => { cancelAnimationFrame(frame); window.removeEventListener('hashchange', jumpToHash); mm.revert() }
  }, [])
  return <div ref={root} className="wh-home"><div id="smooth-wrapper"><div id="smooth-content">
    <Hero onOpenBooking={onOpenBooking} /><Encontro /><Cuidados /><Statement /><Movimento /><Universos /><Produtos /><Encontrar onOpenBooking={onOpenBooking} />
    <SiteFooter />
  </div></div></div>
}

import { useMemo, useState, type FormEvent, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowDown, ArrowRight, ArrowUpRight, MapPin, Search } from 'lucide-react'
import { useLeadForm } from '@fayz-ai/plugin-crm/public'
import { phoneHref, serviceNames, units, unitSource } from './content'
import { franchiseLeadEnabled, franchiseLeadPlugin } from './franchiseLead'
import './editorial-pages.css'

const media = '/editorial-2026/'
function Eyebrow({ children }: { children: ReactNode }) { return <span className="ep-eyebrow">{children}</span> }
function Action({ to, children, external = false }: { to: string; children: ReactNode; external?: boolean }) {
  return external
    ? <a className="ep-action" href={to} target="_blank" rel="noopener noreferrer">{children}<ArrowUpRight size={18} aria-hidden="true" /></a>
    : <Link className="ep-action" to={to}>{children}<ArrowUpRight size={18} aria-hidden="true" /></Link>
}
function PageHero({ id, eyebrow, title, description, image, alt, action, side = 'left', position = 'center' }: {
  id: string; eyebrow: string; title: ReactNode; description: string; image: string; alt: string
  action?: ReactNode; side?: 'left' | 'right'; position?: string
}) {
  return <section className={`ep-hero ep-hero--${side}`} aria-labelledby={id}>
    <div className="ep-hero-media"><img src={`${media}${image}`} alt={alt} style={{ objectPosition: position }} /></div>
    <div className="ep-hero-shade" aria-hidden="true" />
    <div className="ep-width ep-hero-inner"><div className="ep-hero-copy"><Eyebrow>{eyebrow}</Eyebrow><h1 id={id}>{title}</h1><p>{description}</p>{action}</div></div>
    <span className="ep-hero-index" aria-hidden="true">Walter’s Coiffeur / 1964 — hoje</span>
  </section>
}
function Statement({ eyebrow, children }: { eyebrow: string; children: ReactNode }) {
  return <section className="ep-statement"><div className="ep-width"><Eyebrow>{eyebrow}</Eyebrow><p>{children}</p></div></section>
}
function EditorialEnd({ eyebrow, title, body, to, action }: { eyebrow: string; title: ReactNode; body: string; to: string; action: string }) {
  return <section className="ep-end"><div className="ep-width ep-end-grid"><Eyebrow>{eyebrow}</Eyebrow><h2>{title}</h2><div><p>{body}</p><Action to={to}>{action}</Action></div></div></section>
}

const featuredCare = [
  { name: 'Corte', image: 'service-corte-v3.png', alt: 'Retrato de mulher de cabelo curto durante um corte', body: 'Forma e movimento começam em uma conversa sobre o que você quer expressar.' },
  { name: 'Mechas & Coloração', image: 'service-color-v2.jpg', alt: 'Cabelo com mechas iluminadas', body: 'Luz, nuance e contraste para construir a cor que combina com o seu momento.' },
  { name: 'Tratamentos Capilares', image: 'service-treatment-v2.jpg', alt: 'Cuidado capilar no lavatório', body: 'Um tempo dedicado ao cabelo e às necessidades que ele apresenta.' },
  { name: 'Makeup', image: 'service-makeup-v2.jpg', alt: 'Maquiagem editorial com foco no rosto', body: 'Maquiagem como escolha pessoal e extensão da sua expressão.' },
]
export function ServicesPage() {
  const [query, setQuery] = useState('')
  const matches = useMemo(() => serviceNames.filter(name => name.toLocaleLowerCase('pt-BR').includes(query.trim().toLocaleLowerCase('pt-BR'))), [query])
  return <div className="ep-page">
    <PageHero id="services-title" eyebrow="Walter’s / serviços" title={<>Cuidado é fazer <em>sentido para você.</em></>} description="Do corte à cor, do rosto aos detalhes: escolha por onde começar. A disponibilidade pode variar conforme a unidade." image="service-corte-v3.png" alt="Retrato editorial de mulher durante o corte de cabelo" position="70% 40%" action={<a className="ep-action" href="#care-index">Explorar os cuidados<ArrowDown size={18} aria-hidden="true" /></a>} />
    <section className="ep-intro"><div className="ep-width ep-intro-grid"><Eyebrow>O seu ponto de partida</Eyebrow><h2>Uma intenção.<br /><em>Muitos caminhos.</em></h2><p>Cada visita pede uma conversa diferente. Conheça alguns dos cuidados e encontre a unidade para confirmar o serviço ideal para você.</p></div></section>
    <section className="ep-care-feature" aria-label="Cuidados em destaque">{featuredCare.map((item, index) => <article className="ep-care-card" key={item.name}><figure><img src={`${media}${item.image}`} alt={item.alt} loading="lazy" /></figure><div><span>{String(index + 1).padStart(2, '0')} / {item.name}</span><h3>{item.name}</h3><p>{item.body}</p></div></article>)}</section>
    <section id="care-index" className="ep-index" aria-labelledby="care-index-title"><div className="ep-width"><div className="ep-index-heading"><div><Eyebrow>Todos os serviços</Eyebrow><h2 id="care-index-title">Encontre o seu <em>cuidado.</em></h2></div><label className="ep-search"><Search size={19} aria-hidden="true" /><span className="sr-only">Buscar serviço</span><input value={query} onChange={event => setQuery(event.target.value)} type="search" placeholder="Buscar um cuidado" /></label></div><div className="ep-service-list" aria-live="polite">{matches.length ? matches.map((name, index) => <div className="ep-service-row" key={name}><span>{String(index + 1).padStart(2, '0')}</span><h3>{name}</h3><ArrowUpRight size={20} aria-hidden="true" /></div>) : <p className="ep-empty">Nenhum cuidado encontrado. Tente outro termo.</p>}</div><p className="ep-source">Categorias observadas no site Walter’s em 30/09/2026. Confirme serviço e disponibilidade na unidade escolhida.</p></div></section>
    <EditorialEnd eyebrow="Seu próximo passo" title={<>Encontre o lugar.<br /><em>Escolha o momento.</em></>} body="Veja endereços e contatos antes de planejar sua visita." to="/unidades/" action="Encontrar uma unidade" />
  </div>
}

export function UnitsPage() {
  const [query, setQuery] = useState('')
  const matches = useMemo(() => { const term = query.trim().toLocaleLowerCase('pt-BR'); return units.filter(unit => `${unit.name} ${unit.area} ${unit.address}`.toLocaleLowerCase('pt-BR').includes(term)) }, [query])
  return <div className="ep-page">
    <PageHero id="units-title" eyebrow="Walter’s / unidades" title={<>A sua Walter’s<br />pode estar <em>por perto.</em></>} description="Procure por bairro, shopping ou nome. Depois, fale diretamente com a unidade escolhida." image="closing-portrait-v2.jpg" alt="Retrato editorial de mulher no salão com foco no cabelo e no rosto" position="65% 40%" action={<a className="ep-action" href="#unit-list">Encontrar unidade<ArrowDown size={18} aria-hidden="true" /></a>} />
    <section className="ep-intro ep-intro--compact"><div className="ep-width ep-intro-grid"><Eyebrow>Um lugar para você</Eyebrow><h2>O cuidado começa <em>no encontro.</em></h2><p>Escolha o endereço que acompanha a sua rotina. Serviços e horários devem ser confirmados com cada unidade.</p></div></section>
    <section id="unit-list" className="ep-units" aria-labelledby="unit-list-title"><div className="ep-width"><div className="ep-index-heading"><div><Eyebrow>Diretório Walter’s</Eyebrow><h2 id="unit-list-title">Explore as <em>unidades.</em></h2></div><label className="ep-search"><Search size={20} aria-hidden="true" /><span className="sr-only">Buscar unidade</span><input type="search" placeholder="Bairro, cidade ou unidade" value={query} onChange={event => setQuery(event.target.value)} /></label></div><p className="ep-units-count" aria-live="polite">{matches.length} {matches.length === 1 ? 'unidade encontrada' : 'unidades encontradas'}</p><div className="ep-unit-list">{matches.length ? matches.map((unit, index) => <article className="ep-unit-row" key={unit.name}><span className="ep-unit-index">{String(index + 1).padStart(2, '0')}</span><div><span className="ep-unit-area">{unit.area}</span><h3>{unit.name}</h3><p><MapPin size={16} aria-hidden="true" />{unit.address}</p></div><div className="ep-unit-links"><a href={phoneHref(unit.phone)} aria-label={`Ligar para ${unit.name}: ${unit.phone}`}>Ligar {unit.phone}</a><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${unit.name}, ${unit.address}, ${unit.area.startsWith('Niterói') ? 'Niterói' : 'Rio de Janeiro'}, RJ`)}`} target="_blank" rel="noopener noreferrer" aria-label={`Buscar endereço de ${unit.name} no Google Maps`}>Ver no mapa <ArrowUpRight size={16} aria-hidden="true" /></a></div></article>) : <p className="ep-empty">Nenhuma unidade encontrada. Tente outro bairro ou nome.</p>}</div><p className="ep-source">Endereços e telefones transcritos da <a href={unitSource} target="_blank" rel="noopener noreferrer">lista publicada pela Walter’s</a>, consultada em 30/09/2026. Antes da visita, confirme horário, serviços e contato com a unidade. Não exibimos vagas em tempo real.</p></div></section>
  </div>
}

const brandPaths = [
  { label: 'Walter’s Academy', text: 'O conhecimento ganha espaço e continua circulando entre profissionais.', image: 'academy-v2.jpg', to: '/academy/' },
  { label: 'Barbearia Walter’s', text: 'Cabelo e barba em um universo de cuidado masculino.', image: 'barbershop-v2.jpg', to: '/barbeariawalters/' },
  { label: 'Walter’s Concept', text: 'Um formato de salão que propõe outro olhar para a experiência.', image: 'concept-v2.jpg', to: '/concept/' },
]
export function AboutPage() {
  return <div className="ep-page">
    <PageHero id="about-title" eyebrow="Walter’s / a marca" title={<>O cabelo muda.<br /><em>O encontro fica.</em></>} description="O nome vem de Walter Cabral. O que atravessa a marca é a relação entre ofício, aprendizado e pessoas." image="gesto.png" alt="Retrato editorial de mulher com cabelos crespos sendo cuidados" position="67% 35%" action={<a className="ep-action" href="#about-story">Conhecer a história<ArrowDown size={18} aria-hidden="true" /></a>} />
    <section id="about-story" className="ep-story" aria-labelledby="about-story-title"><div className="ep-width ep-story-grid"><div><Eyebrow>Do primeiro gesto até aqui</Eyebrow><h2 id="about-story-title">Um ofício que se aprende <em>fazendo.</em></h2><p>Walter Cabral começou a trabalhar com cabelo ainda jovem. Ao longo da carreira, continuou estudando corte e penteado. Prática e aprendizado seguem como fios dessa história.</p><Action to="/academy/">Conhecer a Academy</Action></div><figure><img src={`${media}academy-v2.jpg`} alt="Cena editorial conceitual de formação em técnicas de cabelo" loading="lazy" /><figcaption>Aprender para seguir criando.</figcaption></figure></div></section>
    <Statement eyebrow="Beleza em movimento">A técnica encontra o olhar.<br /><em>O cuidado encontra a pessoa.</em></Statement>
    <section className="ep-paths" aria-labelledby="about-paths-title"><div className="ep-width ep-paths-head"><Eyebrow>Uma marca, outras expressões</Eyebrow><h2 id="about-paths-title">Conheça os universos <em>Walter’s.</em></h2></div><div className="ep-width ep-paths-grid">{brandPaths.map(path => <Link className="ep-path" to={path.to} key={path.label}><figure><img src={`${media}${path.image}`} alt="" loading="lazy" /></figure><span>{path.label}<ArrowUpRight size={20} aria-hidden="true" /></span><p>{path.text}</p></Link>)}</div></section>
  </div>
}

export function AcademyPage() {
  return <div className="ep-page">
    <PageHero id="academy-title" eyebrow="Walter’s / Academy" title={<>A técnica abre caminho.<br /><em>A prática faz crescer.</em></>} description="Um espaço de formação para quem vive a beleza como ofício e quer ampliar seu repertório." image="academy-v2.jpg" alt="Cena conceitual de profissionais aprendendo técnicas de cabelo" position="60% 40%" action={<a className="ep-action" href="#academy-fields">Explorar as áreas<ArrowDown size={18} aria-hidden="true" /></a>} />
    <section className="ep-story ep-story--reverse" aria-labelledby="academy-story-title"><div className="ep-width ep-story-grid"><div><Eyebrow>Formação Walter’s</Eyebrow><h2 id="academy-story-title">O conhecimento cresce <em>quando circula.</em></h2><p>Começar, praticar, trocar e aperfeiçoar. A Academy reúne caminhos de aprendizado em diferentes áreas da beleza.</p><Action to="https://waltercoiffeur.com.br/academy/" external>Consultar a Academy</Action></div><figure><img src={`${media}service-corte-v3.png`} alt="Profissional trabalhando em um corte de cabelo" loading="lazy" /><figcaption>Da observação à prática.</figcaption></figure></div></section>
    <section id="academy-fields" className="ep-fields" aria-labelledby="academy-fields-title"><div className="ep-width ep-fields-grid"><div><Eyebrow>Áreas de formação</Eyebrow><h2 id="academy-fields-title">Cada técnica, <em>um novo repertório.</em></h2><p>As áreas aparecem no site da Academy. Consulte a equipe para saber turmas, requisitos e valores atuais.</p></div><div className="ep-fields-list">{['Corte e escova', 'Cor e mechas', 'Barbearia', 'Maquiagem e unhas'].map((field, index) => <div key={field}><span>{String(index + 1).padStart(2, '0')}</span><h3>{field}</h3><ArrowUpRight size={18} aria-hidden="true" /></div>)}</div></div></section>
  </div>
}

export function BarbershopPage() {
  return <div className="ep-page">
    <PageHero id="barber-title" eyebrow="Walter’s / barbearia" title={<>O ritual é seu.<br /><em>O cuidado também.</em></>} description="Cabelo, barba e atenção aos detalhes em um universo próprio da Walter’s." image="barbershop-v2.jpg" alt="Barbeiro cuidando da barba de um homem" side="right" position="33% 42%" action={<a className="ep-action" href="#barber-ritual">Conhecer o ritual<ArrowDown size={18} aria-hidden="true" /></a>} />
    <section id="barber-ritual" className="ep-barber-ritual"><div className="ep-width ep-barber-grid"><div><Eyebrow>O gesto e o tempo</Eyebrow><h2>Uma pausa para <em>se reconhecer.</em></h2><p>Do corte ao desenho da barba, cada detalhe compõe a maneira como você se apresenta ao mundo.</p></div><div className="ep-barber-steps"><article><span>01 / Cabelo</span><p>Um corte que acompanha seu estilo e sua rotina.</p></article><article><span>02 / Barba</span><p>Forma, contorno e atenção ao que faz diferença.</p></article><article><span>03 / Seu tempo</span><p>O cuidado também está no tempo dedicado a você.</p></article></div></div></section>
    <EditorialEnd eyebrow="Encontre a barbearia" title={<>Seu próximo ritual <em>começa perto.</em></>} body="Consulte os endereços e confirme serviços e horários diretamente com a unidade." to="/unidades/" action="Ver unidades" />
  </div>
}

export function ConceptPage() {
  return <div className="ep-page">
    <PageHero id="concept-title" eyebrow="Walter’s / Concept" title={<>Um novo olhar.<br /><em>O mesmo encontro.</em></>} description="O Concept é um formato de salão Walter’s que reúne atendimento personalizado, inovação, elegância e atenção à sustentabilidade." image="concept-v2.jpg" alt="Representação conceitual de salão contemporâneo" position="center" action={<a className="ep-action" href="#concept-about">Descobrir o Concept<ArrowDown size={18} aria-hidden="true" /></a>} />
    <section id="concept-about" className="ep-story" aria-labelledby="concept-story-title"><div className="ep-width ep-story-grid"><div><Eyebrow>Walter’s Concept</Eyebrow><h2 id="concept-story-title">O espaço muda a forma <em>de sentir.</em></h2><p>Ambiente, serviço e cuidado se encontram em uma proposta de salão com identidade própria. O ponto de partida continua sendo a pessoa.</p><Action to="/unidades/">Encontrar unidades Concept</Action></div><figure><img src={`${media}retrato-claro.png`} alt="Retrato editorial de mulher com cabelo crespo e rosto em primeiro plano" loading="lazy" /><figcaption>Gente em primeiro plano.</figcaption></figure></div></section>
    <Statement eyebrow="Uma identidade, novas perspectivas">Há beleza no espaço.<br /><em>E há beleza em pertencer a ele.</em></Statement>
  </div>
}

function FranchiseInterestForm() {
  const { submit, submitting, error, success } = useLeadForm('franchise-interest')
  const [values, setValues] = useState({ name: '', email: '', phone: '', city: '', state: '', experience: '', message: '' })
  const [consent, setConsent] = useState(false)
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!franchiseLeadEnabled || !consent) return
    await submit({ ...values, consent: true })
  }
  const update = (key: keyof typeof values) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setValues(current => ({ ...current, [key]: event.target.value }))
  if (success) return <div className="ep-form-success" role="status"><Eyebrow>Contato enviado</Eyebrow><h3>Obrigado pelo interesse.</h3><p>Seu contato foi recebido pelo CRM. A equipe poderá responder pelos canais informados.</p></div>
  return <form className="ep-franchise-form" onSubmit={onSubmit} noValidate={false}>
    <div className="ep-form-row"><label>Seu nome <span>*</span><input type="text" name="name" autoComplete="name" required minLength={2} value={values.name} onChange={update('name')} placeholder="Como podemos chamar você?" /></label><label>E-mail <span>*</span><input type="email" name="email" autoComplete="email" required value={values.email} onChange={update('email')} placeholder="voce@exemplo.com" /></label></div>
    <div className="ep-form-row"><label>Telefone <span>*</span><input type="tel" name="phone" autoComplete="tel" required minLength={10} value={values.phone} onChange={update('phone')} placeholder="(00) 00000-0000" /></label><label>Cidade de interesse <span>*</span><input type="text" name="city" autoComplete="address-level2" required value={values.city} onChange={update('city')} placeholder="Onde pensa em empreender?" /></label></div>
    <div className="ep-form-row"><label>Estado<input type="text" name="state" autoComplete="address-level1" maxLength={2} value={values.state} onChange={update('state')} placeholder="UF" /></label><label>Experiência no setor<select name="experience" value={values.experience} onChange={update('experience')}><option value="">Prefiro não informar</option><option value="Tenho experiência em beleza">Tenho experiência em beleza</option><option value="Empreendo em outro setor">Empreendo em outro setor</option><option value="Estou começando">Estou começando</option></select></label></div>
    <label>Conte um pouco sobre seu interesse<textarea name="message" rows={3} value={values.message} onChange={update('message')} placeholder="O que você gostaria de conversar com a rede?" /></label>
    <label className="ep-form-consent"><input type="checkbox" checked={consent} onChange={event => setConsent(event.target.checked)} required /><span>Autorizo contato sobre meu interesse em franquia pelos canais informados. <b>*</b></span></label>
    {error && <p className="ep-form-error" role="alert">{error.kind === 'duplicate' ? 'Recebemos um contato igual há instantes.' : error.kind === 'rate_limited' ? 'Muitos envios agora há pouco. Tente novamente mais tarde.' : error.message}</p>}
    <button type="submit" disabled={!franchiseLeadEnabled || submitting}>{submitting ? 'Enviando…' : 'Enviar meu interesse'}<ArrowRight size={19} aria-hidden="true" /></button>
    {!franchiseLeadEnabled && <p className="ep-form-preview" role="status">Formulário em prévia: o envio ainda não está conectado ao CRM e nenhum dado digitado aqui é salvo. Por enquanto, <a href="mailto:relacionamento@waltercoiffeur.com.br?subject=Interesse%20em%20franquia%20Walter%27s">fale diretamente com a Walter’s por e-mail</a>.</p>}
  </form>
}

export function FranchisePage() {
  const Provider = franchiseLeadPlugin.Provider
  return <div className="ep-page ep-franchise">
    <PageHero id="franchise-title" eyebrow="Walter’s / franquias" title={<>Leve adiante uma história <em>feita de pessoas.</em></>} description="Conheça as frentes de apoio que a Walter’s apresenta a quem deseja fazer parte da rede — e abra uma conversa sobre o seu projeto." image="concept-v2.jpg" alt="Representação conceitual de ambiente de salão Walter’s" position="center" action={<a className="ep-action" href="#franchise-proposal">Conhecer a proposta<ArrowDown size={18} aria-hidden="true" /></a>} />
    <section id="franchise-proposal" className="ep-intro ep-franchise-intro"><div className="ep-width ep-intro-grid"><Eyebrow>Uma marca, muitos encontros</Eyebrow><h2>Empreender em beleza é também <em>cuidar de gente.</em></h2><p>A apresentação oficial da rede reúne marca, formação, comunicação e suporte à operação. Os detalhes atuais de cada frente devem ser confirmados diretamente com a Walter’s.</p></div></section>
    <section className="ep-franchise-pillars" aria-label="Frentes de apoio da franquia"><div className="ep-width"><article><span>01 / Marca</span><h3>Uma identidade <em>reconhecível.</em></h3><p>A Walter’s destaca sua trajetória no mercado de beleza e a exposição da marca em mídia.</p></article><article><span>02 / Pessoas</span><h3>Conhecimento que <em>circula.</em></h3><p>A Academy integra a proposta como frente de formação e qualificação profissional.</p></article><article><span>03 / Presença</span><h3>Comunicação em <em>movimento.</em></h3><p>Marketing, redes sociais e assessoria de imprensa aparecem entre as iniciativas descritas pela rede.</p></article><article><span>04 / Operação</span><h3>Apoio para <em>fazer acontecer.</em></h3><p>A apresentação também menciona supervisão de campo, sistema de gestão, inovação digital e parcerias.</p></article></div></section>
    <section className="ep-franchise-training"><figure><img src={`${media}academy-v2.jpg`} alt="Cena editorial conceitual de formação de profissionais da beleza" loading="lazy" /></figure><div><Eyebrow>Walter’s Academy</Eyebrow><h2>O futuro se constrói <em>com quem faz.</em></h2><p>Por trás de cada atendimento há conhecimento em movimento. Conheça a frente de formação da marca.</p><Action to="/academy/">Conhecer a Academy</Action></div></section>
    <section id="franchise-contact" className="ep-franchise-contact" aria-labelledby="franchise-contact-title"><div className="ep-width ep-franchise-contact-grid"><div className="ep-franchise-contact-intro"><Eyebrow>Vamos conversar?</Eyebrow><h2 id="franchise-contact-title">Toda parceria começa <em>por uma conversa.</em></h2><p>Conte onde deseja empreender e como podemos falar com você. Não pedimos dados financeiros nesta primeira etapa.</p><p className="ep-franchise-caveat">Investimento, taxas, requisitos e prazos precisam vir de uma proposta atualizada da rede.</p><Action to="https://waltercoiffeur.com.br/sejanossofranqueado/" external>Consultar a página oficial</Action></div><Provider><FranchiseInterestForm /></Provider></div><p className="ep-width ep-source">Informações institucionais baseadas na <a href="https://waltercoiffeur.com.br/sejanossofranqueado/" target="_blank" rel="noopener noreferrer">página oficial de franquias</a>, consultada em 05/10/2026. Condições comerciais e disponibilidade devem ser confirmadas com a rede.</p></section>
  </div>
}

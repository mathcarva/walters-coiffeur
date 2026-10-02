import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowLeft, ArrowUpRight, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { useAvailableSlots, useCreateBooking, useServices } from '@fayz-ai/plugin-agenda/public'
import BrandLogo from './BrandLogo'
import { bookingPluginForUnit } from './bookingProvider'
import { phoneHref, units } from './content'
import './booking.css'

function dateKey(offset: number) {
  const date = new Date()
  date.setDate(date.getDate() + offset)
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

function DemoBookingFlow({ unitName, onBack }: { unitName: string; onBack: () => void }) {
  const services = useServices()
  const [serviceId, setServiceId] = useState('')
  const [date, setDate] = useState('')
  const [slotStart, setSlotStart] = useState('')
  const [complete, setComplete] = useState(false)
  const { slots, loading, error } = useAvailableSlots({ serviceId: serviceId || null, date: date || null })
  const booking = useCreateBooking()
  const unit = units.find(item => item.name === unitName)!
  const chosenService = services.find(item => item.id === serviceId)
  const formatTime = (iso: string) => new Intl.DateTimeFormat('pt-BR', { hour: '2-digit', minute: '2-digit' }).format(new Date(iso))

  const demonstrate = async () => {
    if (!serviceId || !slotStart) return
    try {
      // The SDK mock provider records a local, synthetic visitor only.
      // No real contact information is requested, sent or stored.
      await booking.submit({ serviceId, startsAt: slotStart, contact: { name: 'Visitante da demonstração' } })
      setComplete(true)
    } catch { /* The SDK hook exposes the error below. */ }
  }

  if (complete) return <div className="booking-demo-success" role="status"><span className="booking-kicker">Simulação concluída</span><h3>Seu caminho está <em>desenhado.</em></h3><p>Você escolheu {chosenService?.name.toLocaleLowerCase('pt-BR')} em {unit.name}, {new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long' }).format(new Date(`${date}T12:00:00`))} às {formatTime(slotStart)}.</p><strong>Nenhuma visita foi reservada.</strong><p>Os horários são ilustrativos. Para conferir disponibilidade real, fale com a unidade.</p><a href={phoneHref(unit.phone)}>Ligar para {unit.phone} <ArrowUpRight size={17} aria-hidden="true" /></a><button type="button" onClick={onBack}>Escolher outra unidade</button></div>

  return <div className="booking-demo-flow"><button type="button" className="booking-back" onClick={onBack}><ArrowLeft size={16} aria-hidden="true" /> Trocar unidade</button><div className="booking-result"><span className="booking-kicker">Unidade escolhida</span><strong>{unit.name}</strong><p>{unit.address}</p><a href={phoneHref(unit.phone)}>Contato publicado: {unit.phone} <ArrowUpRight size={17} aria-hidden="true" /></a></div>
    <div className="booking-fields"><label><span>02 / Cuidado de interesse</span><select value={serviceId} onChange={event => { setServiceId(event.target.value); setSlotStart('') }}><option value="">Selecione um cuidado</option>{services.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label><label><span>03 / Data ilustrativa</span><input type="date" min={dateKey(1)} max={dateKey(21)} value={date} onChange={event => { setDate(event.target.value); setSlotStart('') }} /></label></div>
    {serviceId && date && <div className="booking-slots"><span className="booking-kicker">04 / Horários de exemplo</span>{loading ? <p role="status">Consultando a agenda de demonstração…</p> : error ? <p role="alert">A agenda de demonstração não respondeu. Tente outra data.</p> : slots.length ? <div role="group" aria-label="Escolher horário ilustrativo">{slots.slice(0, 12).map(slot => <button type="button" key={slot.start} aria-pressed={slotStart === slot.start} onClick={() => setSlotStart(slot.start)}>{formatTime(slot.start)}</button>)}</div> : <p>Nenhum horário ilustrativo nesta data. Experimente outro dia.</p>}</div>}
    <button type="button" className="booking-demo-submit" disabled={!slotStart || booking.submitting} onClick={demonstrate}>{booking.submitting ? 'Preparando a simulação…' : 'Ver como ficaria a escolha'} <ArrowUpRight size={17} aria-hidden="true" /></button>
    {booking.error && <p role="alert" className="booking-error">Não foi possível concluir a simulação. Escolha outro horário.</p>}
    <p className="booking-demo-legal">Experiência de demonstração com o plugin de agenda Fayz. Duração e horários são exemplos; não há reserva, pagamento nem envio de dados pessoais.</p>
  </div>
}

export default function BookingPanel({ onClose, closing = false }: { onClose: () => void; closing?: boolean }) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const [unitName, setUnitName] = useState('')
  const [unitQuery, setUnitQuery] = useState('')
  const plugin = useMemo(() => unitName ? bookingPluginForUnit(unitName) : null, [unitName])
  const filteredUnits = useMemo(() => units.filter(unit => `${unit.name} ${unit.area} ${unit.address}`.toLocaleLowerCase('pt-BR').includes(unitQuery.trim().toLocaleLowerCase('pt-BR'))), [unitQuery])
  const Provider = plugin?.Provider

  useEffect(() => {
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const previousOverflow = document.body.style.overflow
    const smoother = ScrollSmoother.get()
    const smootherWasPaused = smoother?.paused() ?? false
    smoother?.paused(true)
    document.body.style.overflow = 'hidden'
    dialogRef.current?.querySelector<HTMLElement>('.booking-close')?.focus()
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { onClose(); return }
      if (event.key !== 'Tab' || !dialogRef.current) return
      const items = Array.from(dialogRef.current.querySelectorAll<HTMLElement>('a[href],button:not([disabled]),select:not([disabled]),input:not([disabled])'))
      if (!items.length) return
      if (event.shiftKey && document.activeElement === items[0]) { event.preventDefault(); items.at(-1)?.focus() }
      else if (!event.shiftKey && document.activeElement === items.at(-1)) { event.preventDefault(); items[0].focus() }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => { document.removeEventListener('keydown', onKeyDown); document.body.style.overflow = previousOverflow; smoother?.paused(smootherWasPaused); previousFocus?.focus() }
  }, [onClose])

  return <div className={`booking-backdrop ${closing ? 'is-closing' : ''}`} onMouseDown={event => { if (event.target === event.currentTarget && !closing) onClose() }}><div className="booking-panel" ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="booking-title" aria-describedby="booking-description"><div className="booking-brand"><BrandLogo variant="light" className="booking-logo" /><div><span className="booking-kicker">Walter’s / sua visita</span><p>Encontre.<br /><em>Escolha.</em><br />Imagine.</p></div><span className="booking-brand-foot">Uma experiência de demonstração.</span></div><div className="booking-content"><div className="booking-topline"><span className="booking-kicker">Encontrar unidade + agendar · amostra</span><button type="button" className="booking-close" onClick={onClose} aria-label="Fechar agendamento"><X size={22} aria-hidden="true" /></button></div><h2 id="booking-title">A próxima escolha <em>é sua.</em></h2><p id="booking-description" className="booking-intro">Encontre uma unidade e experimente o fluxo de agendamento. A agenda, os horários e as durações abaixo são ilustrativos; nenhuma visita será reservada.</p>{!Provider ? <><div className="booking-fields"><label><span>Busque por bairro, shopping ou nome</span><input type="search" value={unitQuery} onChange={event => setUnitQuery(event.target.value)} placeholder="Onde quer encontrar sua Walter’s?" /></label><label><span>01 / Encontre sua unidade</span><select value={unitName} onChange={event => setUnitName(event.target.value)}><option value="">Selecione uma unidade</option>{filteredUnits.map(item => <option key={item.name} value={item.name}>{item.name} · {item.area}</option>)}</select></label></div>{filteredUnits.length === 0 && <p className="booking-no-units" role="status">Nenhuma unidade corresponde à busca. Tente outro bairro ou nome.</p>}<p className="booking-prompt">A seleção usa o diretório de unidades publicado. Depois você poderá explorar serviços e horários demonstrativos sem informar dados pessoais.</p><Link to="/unidades/" className="booking-all-units" onClick={onClose}>Ver todas as unidades <ArrowUpRight size={17} aria-hidden="true" /></Link></> : <Provider><DemoBookingFlow key={unitName} unitName={unitName} onBack={() => setUnitName('')} /></Provider>}</div></div></div>
}

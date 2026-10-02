import { createPublicBookingPlugin, type PublicBookingPlugin, type PublicService } from '@fayz-ai/plugin-agenda/public'
import { units } from './content'

// These service names were seen on the public site. Durations, working hours
// and slots below exist only to demonstrate the SDK interaction.
export const demoBookingServices: PublicService[] = [
  { id: 'corte', name: 'Corte', durationMinutes: 60, price: 0 },
  { id: 'escova', name: 'Escova', durationMinutes: 45, price: 0 },
  { id: 'cor', name: 'Mechas & Coloração', durationMinutes: 120, price: 0 },
  { id: 'tratamento', name: 'Tratamentos Capilares', durationMinutes: 60, price: 0 },
  { id: 'barba', name: 'Barba Estilo', durationMinutes: 45, price: 0 },
]

const bookingPlugins = new Map<string, PublicBookingPlugin>()

export function bookingPluginForUnit(unitName: string): PublicBookingPlugin {
  const existing = bookingPlugins.get(unitName)
  if (existing) return existing
  const unitIndex = units.findIndex(unit => unit.name === unitName)
  if (unitIndex < 0) throw new Error('Unidade desconhecida')
  const plugin = createPublicBookingPlugin({
    basePath: '/agendar/',
    professional: { id: `demo-unit-${unitIndex}`, name: unitName },
    services: demoBookingServices,
    workingHours: { daysOfWeek: [1, 2, 3, 4, 5, 6], start: '10:00', end: '18:00' },
    window: { minAdvanceHours: 24, maxAdvanceDays: 21, slotInterval: 30 },
    phoneVerification: 'none',
    payment: { enabled: false },
    brand: { name: 'Walter’s / demonstração', tagline: 'Nenhuma visita será reservada', serviceMeta: null, featuredBadge: null, highlights: [] },
  })
  bookingPlugins.set(unitName, plugin)
  return plugin
}

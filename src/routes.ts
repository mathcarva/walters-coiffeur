export const plannedRoutes = [
  { path: '/', label: 'Home', gate: 'G2' },
  { path: '/servicos/', label: 'Serviços', gate: 'G3' },
  { path: '/unidades/', label: 'Unidades', gate: 'G3' },
  { path: '/institucional/', label: 'Sobre Walter’s', gate: 'G4' },
  { path: '/academy/', label: 'Academy', gate: 'G4' },
  { path: '/barbeariawalters/', label: 'Barbearia Walter’s', gate: 'G4' },
  { path: '/concept/', label: 'Concept', gate: 'G4' },
  { path: '/sejanossofranqueado/', label: 'Franquias', gate: 'G4' },
  { path: '/produtos/', label: 'Produtos', gate: 'G5 — catálogo sem checkout' },
  { path: '/produtos/:slug/', label: 'Detalhe do produto', gate: 'G5 — detalhe demonstrativo sem checkout' },
] as const

export type PlannedRoute = (typeof plannedRoutes)[number]

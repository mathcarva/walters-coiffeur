// Published-site inventory checked 30/09/2026. It is not an operations database.
export const serviceNames = [
  'Corte', 'Barba Estilo', 'Depilação', 'Escova', 'Manicure e Pedicure',
  'Makeup', 'Estética', 'Mega Hair', 'Podologia', 'Mechas & Coloração',
  'Design de Sobrancelha', 'Tratamentos Capilares', 'Depilação a Laser',
  'Unhas Artificiais',
] as const

export type Unit = {
  name: string
  area: string
  address: string
  phone: string
}

export const units: Unit[] = [
  { name: 'Walter’s Concept · BarraShopping', area: 'Barra da Tijuca', address: 'Av. das Américas, 4666, loja 201 A, 2º piso', phone: '(21) 3556-3172' },
  { name: 'Walter’s Concept · Rio Design Barra', area: 'Barra da Tijuca', address: 'Av. das Américas, 7777, loja 221', phone: '(21) 3418-2538' },
  { name: 'Shopping Metropolitano Barra', area: 'Barra da Tijuca', address: 'Av. Embaixador Abelardo Bueno, 1300, 1º piso', phone: '(21) 3095-9233' },
  { name: 'Shopping RioSul', area: 'Botafogo', address: 'Rua Lauro Müller, 116, 1º piso, loja 101', phone: '(21) 2275-4070' },
  { name: 'NorteShopping', area: 'Cachambi', address: 'Av. Dom Hélder Câmara, 5474, 2º piso', phone: '(21) 2038-0067' },
  { name: 'Shopping Nova América', area: 'Del Castilho', address: 'Av. Pastor Martin Luther King Jr., 126, 2º piso', phone: '(21) 2303-4990' },
  { name: 'Freguesia', area: 'Freguesia', address: 'Rua Antônio Cordeiro, 72, Jacarepaguá', phone: '(21) 2447-2105' },
  { name: 'Walter’s Academy', area: 'Freguesia', address: 'Rua Antônio Cordeiro, 72, Jacarepaguá', phone: '(21) 3816-1237' },
  { name: 'Ilha do Governador', area: 'Ilha do Governador', address: 'Rua Cambaúba, 1357, Jardim Guanabara', phone: '(21) 3420-8671' },
  { name: 'Park Shopping Jacarepaguá', area: 'Jacarepaguá', address: 'Estrada de Jacarepaguá, 6069, L1, Anil', phone: '(21) 99168-3113' },
  { name: 'Shopping Leblon', area: 'Leblon', address: 'Av. Afrânio de Melo Franco, 290, loja 102 G', phone: '(21) 2529-8479' },
  { name: 'Walter’s Coiffeur by Blessed', area: 'Leblon', address: 'Av. Bartolomeu Mitre, 792', phone: '(21) 96736-2323' },
  { name: 'Plaza Shopping Niterói', area: 'Niterói · Centro', address: 'Av. XV de Novembro, 8, 3º piso', phone: '(21) 2620-1495' },
  { name: 'Recreio Shopping', area: 'Recreio', address: 'Av. das Américas, 19.019, loja 103 ij', phone: '(21) 3439-8599' },
  { name: 'Parque Shopping Sulacap', area: 'Sulacap', address: 'Av. Marechal Fontenele, 3545', phone: '(21) 2391-0638' },
  { name: 'Shopping Boulevard', area: 'Vila Isabel', address: 'Rua Barão de São Francisco, 236, 1º piso, lojas 50 e 51', phone: '(21) 2578-3003' },
]

export const unitSource = 'https://waltercoiffeur.com.br/unidades/'

export const phoneHref = (phone: string) => `tel:+55${phone.replace(/\D/g, '')}`

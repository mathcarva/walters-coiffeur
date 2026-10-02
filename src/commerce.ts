// Published Walter's material from 2020, retained for a labelled staging study.
// This is not a live assortment, a price list, or a set of individual packshots.
export type ArchiveProduct = {
  id: string
  name: string
  line: 'Walter’s Professional' | 'Barbearia Walter’s'
  volume: string
  image: string
  source: string
  imagePosition: string
  demoImage: string
}

export const archiveProducts: ArchiveProduct[] = [
  {
    id: 'brilho-shampoo', name: 'Shampoo Brilho extraordinário',
    line: 'Walter’s Professional', volume: '500 ml',
    image: 'walters-products-launch-2020.jpg', imagePosition: '34% center',
    demoImage: '/product-studio-2026/professional-shampoo.webp',
    source: 'Registro de lançamento publicado em 2020',
  },
  {
    id: 'brilho-condicionador', name: 'Condicionador Brilho extraordinário',
    line: 'Walter’s Professional', volume: '500 ml',
    image: 'walters-products-launch-2020.jpg', imagePosition: '66% center',
    demoImage: '/product-studio-2026/professional-conditioner.webp',
    source: 'Registro de lançamento publicado em 2020',
  },
  {
    id: 'barbearia-cera', name: 'Cera modeladora',
    line: 'Barbearia Walter’s', volume: '85 g',
    image: 'barbearia-products-sheet-2020.jpg', imagePosition: 'center 62%',
    demoImage: '/product-studio-2026/barber-wax.webp',
    source: 'Folha de produtos da barbearia publicada em 2020',
  },
  {
    id: 'barbearia-shampoo', name: 'Shampoo para barba, cabelo e bigode',
    line: 'Barbearia Walter’s', volume: '240 ml',
    image: 'barbearia-products-sheet-2020.jpg', imagePosition: 'center 30%',
    demoImage: '/product-studio-2026/barber-shampoo.webp',
    source: 'Folha de produtos da barbearia publicada em 2020',
  },
  {
    id: 'barbearia-condicionador', name: 'Condicionador para barba, cabelo e bigode',
    line: 'Barbearia Walter’s', volume: '240 ml',
    image: 'barbearia-products-sheet-2020.jpg', imagePosition: 'center 30%',
    demoImage: '/product-studio-2026/barber-conditioner.webp',
    source: 'Folha de produtos da barbearia publicada em 2020',
  },
]

// This is a deliberately fictional presentation catalogue. Only the five
// archive entries above have documented historical names; prices and the three
// extra product concepts below are not official Walter's product data.
export type DemoCatalogEntry = {
  id: string
  name: string
  line: ArchiveProduct['line']
  volume: string
  image: string
  description: string
  illustrativePrice: number
  sizes: { label: string; illustrativePrice: number }[]
  origin: 'historical-name' | 'concept'
  source: string
}

function fromArchive(id: string, image: string, illustrativePrice: number, description: string, sizes: DemoCatalogEntry['sizes']): DemoCatalogEntry {
  const item = archiveProducts.find(product => product.id === id)
  if (!item) throw new Error(`Historical Walter's sample not found: ${id}`)
  return { id, name: item.name, line: item.line, volume: item.volume, image, description, illustrativePrice, sizes, origin: 'historical-name', source: item.source }
}

export const demoCatalogEntries: DemoCatalogEntry[] = [
  fromArchive('brilho-shampoo', '/product-catalog-2026/professional-shampoo.webp', 89.90, 'O primeiro gesto do cuidado começa na lavagem. O Shampoo Brilho extraordinário integra a seleção de nomes históricos da Walter’s apresentada nesta amostra.', [{ label: '250 ml', illustrativePrice: 59.90 }, { label: '500 ml', illustrativePrice: 89.90 }]),
  fromArchive('brilho-condicionador', '/product-catalog-2026/professional-conditioner.webp', 95.90, 'Depois da lavagem, um momento para continuar o cuidado dos cabelos. O Condicionador Brilho extraordinário aparece aqui como parte dessa rotina.', [{ label: '250 ml', illustrativePrice: 64.90 }, { label: '500 ml', illustrativePrice: 95.90 }]),
  { id: 'brilho-mascara-conceito', name: 'Máscara Brilho extraordinário', line: 'Walter’s Professional', volume: '250 g', image: '/product-catalog-2026/professional-mask.webp', description: 'Um tempo a mais para si. Esta máscara é um conceito visual para a linha Brilho extraordinário, não um produto confirmado.', illustrativePrice: 109.90, sizes: [{ label: '250 g', illustrativePrice: 109.90 }, { label: '500 g', illustrativePrice: 159.90 }], origin: 'concept', source: 'Conceito criado apenas para esta amostra' },
  { id: 'serum-finalizador-conceito', name: 'Sérum finalizador', line: 'Walter’s Professional', volume: '60 ml', image: '/product-catalog-2026/professional-serum.webp', description: 'O gesto de finalizar também pode ser pessoal. Este sérum é um conceito visual para uma rotina de cabelos feita no seu ritmo.', illustrativePrice: 79.90, sizes: [{ label: '30 ml', illustrativePrice: 49.90 }, { label: '60 ml', illustrativePrice: 79.90 }], origin: 'concept', source: 'Conceito criado apenas para esta amostra' },
  fromArchive('barbearia-cera', '/product-catalog-2026/barber-wax.webp', 69.90, 'Para quem gosta de dar forma ao próprio estilo. A cera modeladora compõe a seleção histórica da Barbearia Walter’s nesta amostra.', [{ label: '85 g', illustrativePrice: 69.90 }, { label: '150 g', illustrativePrice: 99.90 }]),
  fromArchive('barbearia-shampoo', '/product-catalog-2026/barber-shampoo.webp', 78.90, 'Um gesto só para barba, cabelo e bigode. O nome deste shampoo foi registrado em material anterior da Barbearia Walter’s.', [{ label: '240 ml', illustrativePrice: 78.90 }, { label: '500 ml', illustrativePrice: 119.90 }]),
  fromArchive('barbearia-condicionador', '/product-catalog-2026/barber-conditioner.webp', 82.90, 'O cuidado continua depois da lavagem. O nome deste condicionador para barba, cabelo e bigode foi registrado em material anterior da marca.', [{ label: '240 ml', illustrativePrice: 82.90 }, { label: '500 ml', illustrativePrice: 124.90 }]),
  { id: 'oleo-barba-conceito', name: 'Óleo para barba', line: 'Barbearia Walter’s', volume: '30 ml', image: '/product-catalog-2026/barber-beard-oil.webp', description: 'Um gesto final para a barba. Este óleo é um conceito visual criado para a amostra, não um produto confirmado.', illustrativePrice: 59.90, sizes: [{ label: '30 ml', illustrativePrice: 59.90 }, { label: '60 ml', illustrativePrice: 94.90 }], origin: 'concept', source: 'Conceito criado apenas para esta amostra' },
]

export const archiveSource = 'https://waltercoiffeur.com.br/'
export const storeSource = 'https://loja.waltercoiffeur.com.br/'

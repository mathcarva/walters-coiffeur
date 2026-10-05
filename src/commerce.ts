// Walter's product names and sizes documented in archived brand material.
// This is not a live assortment, a price list, or a set of individual packshots.
export type ArchiveProduct = {
  id: string
  name: string
  line: 'Walter’s Professional' | 'Barbearia Walter’s'
  volume: string
  sourceFile: string
  source: string
}

export const archiveProducts: ArchiveProduct[] = [
  {
    id: 'brilho-shampoo', name: 'Shampoo Premium Brilho Extraordinário',
    line: 'Walter’s Professional', volume: '500 ml',
    sourceFile: '11904-Lan-amentoprodutosWalters-13-1-scaled.jpg',
    source: 'Registro de lançamento publicado em 2020',
  },
  {
    id: 'brilho-condicionador', name: 'Condicionador Premium Brilho Extraordinário',
    line: 'Walter’s Professional', volume: '500 ml',
    sourceFile: '11904-Lan-amentoprodutosWalters-13-1-scaled.jpg',
    source: 'Registro de lançamento publicado em 2020',
  },
  {
    id: 'barbearia-cera', name: 'Cera Modeladora',
    line: 'Barbearia Walter’s', volume: '85 g',
    sourceFile: '13106-Placa_informativo_produtos_barbearia_18x25_fev20_frente_150dpi-1.jpg',
    source: 'Folha de produtos da barbearia publicada em 2020',
  },
  {
    id: 'barbearia-shampoo', name: 'Shampoo',
    line: 'Barbearia Walter’s', volume: '240 ml',
    sourceFile: '13106-Placa_informativo_produtos_barbearia_18x25_fev20_frente_150dpi-1.jpg',
    source: 'Folha de produtos da barbearia publicada em 2020',
  },
  {
    id: 'barbearia-condicionador', name: 'Condicionador',
    line: 'Barbearia Walter’s', volume: '240 ml',
    sourceFile: '13106-Placa_informativo_produtos_barbearia_18x25_fev20_frente_150dpi-1.jpg',
    source: 'Folha de produtos da barbearia publicada em 2020',
  },
  {
    id: 'barbearia-pomada', name: 'Pomada Modeladora',
    line: 'Barbearia Walter’s', volume: '85 g',
    sourceFile: '13107-Placa_informativo_produtos_barbearia_18x25_fev20_verso_150dpi-1.jpg',
    source: 'Folha de produtos da barbearia publicada em 2020',
  },
  {
    id: 'barbearia-creme-pos-barba', name: 'Creme Pós Barba',
    line: 'Barbearia Walter’s', volume: '140 g',
    sourceFile: '13107-Placa_informativo_produtos_barbearia_18x25_fev20_verso_150dpi-1.jpg',
    source: 'Folha de produtos da barbearia publicada em 2020',
  },
  {
    id: 'barbearia-oleo-hidratante', name: 'Óleo Hidratante',
    line: 'Barbearia Walter’s', volume: '60 ml',
    sourceFile: '13107-Placa_informativo_produtos_barbearia_18x25_fev20_verso_150dpi-1.jpg',
    source: 'Folha de produtos da barbearia publicada em 2020',
  },
  {
    id: 'barbearia-gel-de-barbear', name: 'Gel de Barbear',
    line: 'Barbearia Walter’s', volume: '140 g',
    sourceFile: '13107-Placa_informativo_produtos_barbearia_18x25_fev20_verso_150dpi-1.jpg',
    source: 'Folha de produtos da barbearia publicada em 2020',
  },
]

// Every name and size below is documented above. The packshots and prices are
// visual mock data, not official Walter's packaging or commercial information.
export type DemoCatalogEntry = {
  id: string
  name: string
  line: ArchiveProduct['line']
  volume: string
  image: string
  description: string
  illustrativePrice: number
  sizes: { label: string; illustrativePrice: number }[]
  origin: 'historical-name'
  source: string
}

function fromArchive(id: string, image: string, illustrativePrice: number, description: string): DemoCatalogEntry {
  const item = archiveProducts.find(product => product.id === id)
  if (!item) throw new Error(`Historical Walter's sample not found: ${id}`)
  return { id, name: item.name, line: item.line, volume: item.volume, image, description, illustrativePrice, sizes: [{ label: item.volume, illustrativePrice }], origin: 'historical-name', source: item.source }
}

export const demoCatalogEntries: DemoCatalogEntry[] = [
  fromArchive('brilho-shampoo', '/product-catalog-2026/professional-shampoo.webp', 89.90, 'Shampoo Premium Brilho Extraordinário com proteína da seda e óleo de coco. O rótulo da linha Walter’s Professional apresenta a fórmula para todos os tipos de cabelo e destaca a redução do frizz.'),
  fromArchive('brilho-condicionador', '/product-catalog-2026/professional-conditioner.webp', 95.90, 'Condicionador Premium Brilho Extraordinário com proteína da seda e óleo de coco. No rótulo da linha Walter’s Professional, é apresentado para todos os tipos de cabelo, com foco na redução do frizz.'),
  fromArchive('barbearia-shampoo', '/product-catalog-2026/barber-shampoo.webp', 78.90, 'Higienização de barba, cabelo e bigode. A folha de produtos da Barbearia Walter’s destaca a fórmula com mentol e extratos de aloe vera, camomila e chá-verde.'),
  fromArchive('barbearia-condicionador', '/product-catalog-2026/barber-conditioner.webp', 82.90, 'Hidratação de barba, cabelo e bigode. O material da Barbearia Walter’s apresenta uma fórmula com aloe vera e óleo de amêndoas para deixar os fios mais macios e flexíveis, sem pesar.'),
  fromArchive('barbearia-cera', '/product-catalog-2026/barber-wax.webp', 69.90, 'Fixação forte e acabamento brilhante, com efeito molhado. A Cera Modeladora é descrita no material da Barbearia Walter’s como uma fórmula à base de água, não oleosa e fácil de lavar.'),
  fromArchive('barbearia-pomada', '/product-catalog-2026/barber-pomade.webp', 72.90, 'Fixação forte e volume com acabamento matte, sem brilho. A Pomada Modeladora é apresentada na folha da Barbearia Walter’s como uma fórmula não oleosa para modelar os cabelos.'),
  fromArchive('barbearia-creme-pos-barba', '/product-catalog-2026/barber-post-shave.webp', 74.90, 'Cuidado para a pele depois de barbear. O Creme Pós Barba é descrito no material da Barbearia Walter’s com mentol, aloe vera e pantenol, em uma fórmula voltada à hidratação.'),
  fromArchive('barbearia-oleo-hidratante', '/product-catalog-2026/barber-hydrating-oil.webp', 64.90, 'Óleo para barba e bigode. A folha da Barbearia Walter’s destaca argan, jojoba e macadâmia na fórmula e descreve uma fragrância suave, amadeirada e cítrica.'),
  fromArchive('barbearia-gel-de-barbear', '/product-catalog-2026/barber-shaving-gel.webp', 69.90, 'Gel transparente para o barbear, com D-pantenol. Segundo o material da Barbearia Walter’s, a textura ajuda a visualizar a área ao barbear e a facilitar o deslizamento da lâmina.'),
]

export const archiveSource = 'https://waltercoiffeur.com.br/'
export const storeSource = 'https://loja.waltercoiffeur.com.br/'

import { createMockShopProvider } from '@fayz-ai/shop/mock'
import { setShopProvider } from '@fayz-ai/shop/runtime'
import type { Category, Product, ProductVariantSet } from '@fayz-ai/shop/types'
import { registerStorefrontBlocks, resolveConfig } from '@fayz-ai/storefront'
import { demoCatalogEntries } from './commerce'

// Sample-only SDK catalog. All prices are illustrative; stock and checkout are
// intentionally unavailable. This provider can later be replaced with a
// validated operational catalog without changing the page composition.
const date = '2020-01-01T00:00:00.000Z'
export const demoCategories: Category[] = [
  { id: 'professional', tenantId: 'walters-local-demo', name: 'Walter’s Professional', slug: 'professional', description: 'Estudo visual da linha de cabelo.', parentId: null, sortOrder: 0, createdAt: date },
  { id: 'barbearia', tenantId: 'walters-local-demo', name: 'Barbearia Walter’s', slug: 'barbearia', description: 'Estudo visual da linha de barbearia.', parentId: null, sortOrder: 1, createdAt: date },
]
export const demoProducts: Product[] = demoCatalogEntries.map((item, index) => ({
  id: `demo-${item.id}`,
  tenantId: 'walters-local-demo',
  name: item.name,
  slug: item.id,
  description: item.description,
  price: item.illustrativePrice,
  compareAtPrice: null,
  currency: 'BRL',
  status: 'active',
  inventoryCount: 0,
  sku: null,
  sortOrder: index,
  metadata: { line: item.line, volume: item.volume, demoOnly: true, illustrativePrice: true, origin: item.origin, source: item.source },
  images: [{ id: `demo-image-${item.id}`, productId: `demo-${item.id}`, url: item.image, altText: `Embalagem conceitual de ${item.name}`, sortOrder: 0, isPrimary: true, createdAt: date }],
  categoryId: item.line === 'Walter’s Professional' ? 'professional' : 'barbearia',
  categoryName: item.line,
  isPhysical: false,
  weight: null,
  weightUnit: 'g',
  createdAt: date,
  updatedAt: date,
}))

// The storefront's product-by-slug loader attaches these official SDK option
// and variant shapes to each sample product. Prices and sizes are mock data.
export const demoVariants: Record<string, ProductVariantSet> = Object.fromEntries(demoCatalogEntries.map(item => {
  const productId = `demo-${item.id}`
  const base = item.sizes.find(size => size.label === item.volume)
  if (!base || base.illustrativePrice !== item.illustrativePrice) throw new Error(`Invalid base size for ${item.id}`)
  return [productId, {
    options: [{ id: `${productId}-size`, name: 'Tamanho', values: item.sizes.map(size => size.label), position: 0 }],
    variants: item.sizes.map((size, index) => ({
      id: `${productId}-size-${index}`, productId, options: { Tamanho: size.label }, sku: null,
      price: size.illustrativePrice, compareAtPrice: null, inventoryCount: 0,
      position: index, status: 'active' as const, imageId: null,
    })),
  }]
}))

export const storefrontConfig = resolveConfig({ name: 'Walter’s / estudo de produtos', commerceMode: 'catalog' })
setShopProvider(createMockShopProvider({ products: demoProducts, categories: demoCategories, variants: demoVariants, discounts: [] }))
registerStorefrontBlocks()

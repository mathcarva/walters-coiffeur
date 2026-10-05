import { useMemo, useState } from 'react'
import { ArrowUpRight, Search } from 'lucide-react'
import { useCategories, useProducts } from '@fayz-ai/storefront'
import { Link } from 'react-router-dom'
import './product-page.css'

const currency = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
type SortOrder = 'featured' | 'price-asc' | 'price-desc' | 'name'

export default function CommercePage() {
  const [categoryId, setCategoryId] = useState<string | null>(null)
  const [query, setQuery] = useState('')
  const [priceMin, setPriceMin] = useState(0)
  const [priceMax, setPriceMax] = useState(120)
  const [sort, setSort] = useState<SortOrder>('featured')
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  // The shop plugin owns the catalog data; this page only provides its view and local filters.
  const catalog = useProducts({ status: 'active' })
  const categories = useCategories()
  const results = useMemo(() => {
    const filtered = catalog.products.filter(product =>
      (!categoryId || product.categoryId === categoryId) &&
      product.price >= priceMin && product.price <= priceMax &&
      `${product.name} ${product.categoryName} ${product.description}`.toLocaleLowerCase('pt-BR').includes(query.trim().toLocaleLowerCase('pt-BR')),
    )
    if (sort === 'price-asc') return filtered.sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') return filtered.sort((a, b) => b.price - a.price)
    if (sort === 'name') return filtered.sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'))
    return filtered.sort((a, b) => a.sortOrder - b.sortOrder)
  }, [catalog.products, categoryId, priceMin, priceMax, query, sort])

  const resetFilters = () => {
    setCategoryId(null)
    setQuery('')
    setPriceMin(0)
    setPriceMax(120)
    setSort('featured')
  }

  return <div className="commerce-page">
    <section className="commerce-catalog" id="acervo" aria-labelledby="commerce-catalog-title"><div className="commerce-width">
      <div className="commerce-catalog-heading"><div><span className="commerce-kicker">Walter’s / Catálogo</span><h1 id="commerce-catalog-title">Produtos <em>Walter’s.</em></h1></div><p>Explore a amostra de produtos para cabelo e barbearia. Imagens e preços são ilustrativos; não há venda nesta página.</p></div>
      <div className="commerce-shop-layout">
        <aside className="commerce-sidebar" aria-label="Filtros do catálogo">
          <div className="commerce-sidebar-heading"><span className="commerce-kicker">Filtrar produtos</span><button className="commerce-mobile-filter-toggle" type="button" aria-expanded={mobileFiltersOpen} aria-controls="commerce-filter-body" onClick={() => setMobileFiltersOpen(open => !open)}>{mobileFiltersOpen ? 'Fechar filtros' : 'Abrir filtros'}{categoryId || priceMin > 0 || priceMax < 120 ? ' · ativos' : ''}</button><button type="button" onClick={resetFilters}>Limpar</button></div>
          <div className="commerce-sidebar-body" id="commerce-filter-body" data-open={mobileFiltersOpen}>
          <div className="commerce-filter-group"><h3>Categorias</h3><div className="commerce-category-list">
            <button type="button" aria-pressed={categoryId === null} onClick={() => setCategoryId(null)}><span>Todos os produtos</span><span>{catalog.products.length.toString().padStart(2, '0')}</span></button>
            {categories.categories.map(category => <button key={category.id} type="button" aria-pressed={categoryId === category.id} onClick={() => setCategoryId(category.id)}><span>{category.name}</span><span>{catalog.products.filter(product => product.categoryId === category.id).length.toString().padStart(2, '0')}</span></button>)}
          </div></div>
          <div className="commerce-filter-group"><h3>Preço ilustrativo</h3><div className="commerce-price-fields">
            <label>De <span>R$ <input aria-label="Preço mínimo ilustrativo" type="number" inputMode="decimal" min="0" max="500" step="10" value={priceMin} onChange={event => setPriceMin(Number(event.target.value) || 0)} /></span></label>
            <label>Até <span>R$ <input aria-label="Preço máximo ilustrativo" type="number" inputMode="decimal" min="0" max="500" step="10" value={priceMax} onChange={event => setPriceMax(Number(event.target.value) || 0)} /></span></label>
          </div></div>
          <p className="commerce-sidebar-note">Valores fictícios para visualização. Não representam tabela de preços ou disponibilidade da Walter’s.</p>
          </div>
        </aside>
        <div className="commerce-shop-main">
          <div className="commerce-shop-toolbar"><label className="commerce-search"><Search size={18} aria-hidden="true" /><span className="sr-only">Pesquisar produtos</span><input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Pesquisar produtos" /></label><label className="commerce-sort">Ordenar por <select value={sort} onChange={event => setSort(event.target.value as SortOrder)}><option value="featured">Destaques</option><option value="price-asc">Menor preço</option><option value="price-desc">Maior preço</option><option value="name">Nome A–Z</option></select></label></div>
          <div className="commerce-result-meta" role="status"><span>{results.length} {results.length === 1 ? 'produto' : 'produtos'} nesta seleção</span><span>Imagens e preços ilustrativos</span></div>
          {catalog.loading || categories.loading ? <p role="status" className="commerce-state">Carregando o catálogo…</p> : catalog.error ? <p role="alert" className="commerce-state">Não foi possível carregar a amostra.</p> : results.length ? <div className="commerce-product-grid" aria-live="polite">{results.map(product => <article className="commerce-product-card" key={product.id}><Link className="commerce-product-card-link" to={`/produtos/${product.slug}/`} aria-label={`Ver detalhes de ${product.name} · ${product.categoryName}`}>
            <div className="commerce-product-media"><img src={product.images[0]?.url} alt={product.images[0]?.altText ?? `Recriação da embalagem de ${product.name}`} width="1000" height="1000" loading="lazy" /><span>Produto do acervo</span></div>
            <div className="commerce-product-info"><span className="commerce-product-line">{product.categoryName} · {String(product.metadata.volume ?? '')}</span><h3>{product.name}</h3><div className="commerce-product-price"><span>Preço ilustrativo</span><strong>{currency.format(product.price)}</strong></div></div>
          </Link></article>)}</div> : <div className="commerce-empty" role="status"><p>Nenhum produto corresponde aos filtros.</p><button type="button" className="commerce-text-link" onClick={resetFilters}>Limpar filtros <ArrowUpRight size={18} aria-hidden="true" /></button></div>}
        </div>
      </div>
      <p className="commerce-catalog-disclosure">Esta página é uma amostra visual, não uma loja. Os nove nomes e tamanhos foram identificados em materiais da Walter’s; as imagens recriam as embalagens registradas, mas não são fotografias oficiais atuais. Valores ilustrativos. Confirme catálogo e disponibilidade com a marca.</p>
    </div></section>
  </div>
}

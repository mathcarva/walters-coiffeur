import { useEffect, useState } from 'react'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import type { Product } from '@fayz-ai/shop/types'
import { getProductOptionGroups, selectionPrice, useProduct } from '@fayz-ai/storefront'
import { Link, useParams } from 'react-router-dom'
import './product-page.css'
import './product-detail.css'

const currency = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

function ProductContent({ product }: { product: Product }) {
  const groups = getProductOptionGroups(product)
  const defaultSize = String(product.metadata.volume ?? groups[0]?.values[0] ?? '')
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({ Tamanho: defaultSize })
  const displayedPrice = selectionPrice(product, selectedOptions)
  const isConcept = product.metadata.origin === 'concept'
  const primaryImage = product.images.find(image => image.isPrimary) ?? product.images[0]

  return <section className="product-detail" aria-labelledby="product-detail-title"><div className="commerce-width">
    <nav className="product-detail-breadcrumb" aria-label="Caminho do produto"><Link to="/produtos/">Produtos</Link><span aria-hidden="true">/</span><span aria-current="page">{product.name}</span></nav>
    <div className="product-detail-layout">
      <div className="product-detail-heading"><span className="commerce-kicker">{product.categoryName}</span><h1 id="product-detail-title">{product.name}</h1><span className="product-detail-origin">{isConcept ? 'Conceito da amostra' : 'Nome do acervo'}</span></div>
      <figure className="product-detail-media"><img src={primaryImage?.url} alt={primaryImage?.altText ?? `Embalagem conceitual de ${product.name}`} width="1000" height="1000" fetchPriority="high" /><figcaption>Imagem conceitual. A embalagem pode não corresponder ao tamanho escolhido.</figcaption></figure>
      <div className="product-detail-content">
        <p className="product-detail-description">{product.description}</p>
        <div className="product-detail-price" role="status" aria-live="polite"><span>Preço ilustrativo · {selectedOptions.Tamanho || defaultSize}</span><strong>{currency.format(displayedPrice)}</strong></div>
        {groups.map(group => <fieldset className="product-detail-variants" key={group.id}><legend>{group.label} <span>· opções ilustrativas</span></legend><div className="product-detail-size-list">{group.values.map(value => <button key={value} type="button" aria-pressed={selectedOptions[group.label] === value} onClick={() => setSelectedOptions(current => ({ ...current, [group.label]: value }))}>{value}</button>)}</div></fieldset>)}
        <p className="product-detail-sample-note">Tamanhos e valores foram criados para esta amostra. Não representam catálogo, preço ou disponibilidade atuais.</p>
        <div className="product-detail-action-block"><Link className="product-detail-action" to="/unidades/">Encontrar uma unidade <ArrowUpRight size={19} aria-hidden="true" /></Link><p>Confirme os produtos diretamente com a Walter’s antes de planejar sua visita.</p></div>
      </div>
    </div>
    <div className="product-detail-end"><p>{isConcept ? 'Este item é um conceito visual, não um produto confirmado.' : 'O nome foi observado em material Walter’s de 2020; a apresentação atual é ilustrativa.'}</p><Link to="/produtos/"><ArrowLeft size={17} aria-hidden="true" /> Voltar a todos os produtos</Link></div>
  </div></section>
}

export default function CommerceProductDetailPage() {
  const { slug = '' } = useParams()
  const { product, loading, error } = useProduct(slug)

  useEffect(() => {
    document.title = product ? `${product.name} | Walter’s Coiffeur` : loading ? 'Produto | Walter’s Coiffeur' : 'Produto não encontrado | Walter’s Coiffeur'
  }, [product, loading])

  if (loading) return <div className="commerce-page"><section className="product-detail product-detail-state" aria-live="polite"><div className="commerce-width"><p>Carregando produto…</p></div></section></div>
  if (error || !product) return <div className="commerce-page"><section className="product-detail product-detail-state" aria-labelledby="product-detail-missing"><div className="commerce-width"><span className="commerce-kicker">Walter’s / Produtos</span><h1 id="product-detail-missing">Produto não encontrado.</h1><p>{error ? 'Não foi possível carregar este produto agora.' : 'Este endereço não corresponde a um item da amostra.'}</p><Link to="/produtos/"><ArrowLeft size={17} aria-hidden="true" /> Voltar ao catálogo</Link></div></section></div>
  return <div className="commerce-page"><ProductContent key={product.id} product={product} /></div>
}

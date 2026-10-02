import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import BrandLogo from './BrandLogo'

export default function SiteFooter() {
  return <footer className="site-footer"><div className="site-footer-inner"><div className="site-footer-top"><div><BrandLogo variant="light" className="site-footer-logo" /><p>Beleza em movimento.<br />Pessoas em primeiro plano.</p></div><Link to="/unidades/">Encontre a sua Walter’s <ArrowUpRight size={26} aria-hidden="true" /></Link></div><div className="site-footer-links"><nav aria-label="Institucional e serviços"><Link to="/servicos/">Serviços</Link><Link to="/unidades/">Unidades</Link><Link to="/institucional/">A marca</Link><Link to="/produtos/">Produtos</Link></nav><nav aria-label="Universos Walter’s"><Link to="/academy/">Academy</Link><Link to="/barbeariawalters/">Barbearia</Link><Link to="/concept/">Concept</Link><Link to="/sejanossofranqueado/">Franquias</Link></nav></div><div className="site-footer-bottom"><span>Rio de Janeiro, Brasil</span></div></div></footer>
}

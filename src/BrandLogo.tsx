type BrandLogoProps = {
  variant: 'light' | 'dark'
  className?: string
  decorative?: boolean
}

// Exact PNGs published by Walter’s. Do not recompose the mark as live type.
export default function BrandLogo({ variant, className, decorative = false }: BrandLogoProps) {
  return <img src={`/brand/walters-logo-${variant}.png`} alt={decorative ? '' : 'Walter’s Coiffeur'} className={className} width="250" height="152" />
}

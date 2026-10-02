import type { Config } from 'tailwindcss'
import { fayzTailwind } from '@fayz-ai/ui/tailwind'

const sdk = fayzTailwind()

export default {
  ...sdk,
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    ...sdk.theme,
    extend: {
      ...sdk.theme?.extend,
      colors: {
        walter: {
          black: '#000000',
          white: '#ffffff',
          burgundy: '#71293c',
          gray: '#d1d2d4',
        },
      },
      maxWidth: { reading: '1380px' },
    },
  },
} satisfies Config

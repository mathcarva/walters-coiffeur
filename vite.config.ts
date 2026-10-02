import { fileURLToPath, URL } from 'node:url'
import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fayzVite } from '@fayz-ai/sdk/vite'
import { createReadStream } from 'node:fs'
import { resolve } from 'node:path'

// Local visual review only. These DS research files must never enter a site build.
const reviewAssets = new Set([
  'home-hair-motion.jpg', 'home-color.jpg', 'home-style.jpg',
  'editorial-hero-generated-v2.png', 'editorial-craft-generated-v2.png',
  'editorial-texture-generated-v2.png',
  'walters-products-launch-2020.jpg', 'barbearia-products-sheet-2020.jpg',
])
const reviewAssetRoot = resolve(import.meta.dirname, '../walters-design-system/public/assets')

export default defineConfig(fayzVite({
  port: 3014,
  strictPort: true,
  plugins: [react(), {
    name: 'walters-local-review-assets',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/__review-assets', (request, response, next) => {
        const name = decodeURIComponent((request.url ?? '').split('?')[0],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  }.replace(/^\//, ''))
        if (!reviewAssets.has(name)) { next(); return }
        response.setHeader('Content-Type', name.endsWith('.png') ? 'image/png' : 'image/jpeg')
        response.setHeader('Cache-Control', 'no-store')
        const stream = createReadStream(resolve(reviewAssetRoot, name))
        stream.on('error', () => { if (!response.headersSent) response.statusCode = 404; response.end() })
        stream.pipe(response)
      })
    },
  }],
  pwa: false,
  bootSkeleton: { surface: 'none' },
}))

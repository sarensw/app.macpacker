import { resolve } from 'path'
import { copyFileSync } from 'fs'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/**
 * Vite plugin that copies index.html to 404.html after build.
 * GitHub Pages serves 404.html for unknown paths, enabling SPA fallback
 * so that client-side routes like /de and /zh work on direct navigation.
 */
function spaFallback(): Plugin {
  return {
    name: 'spa-fallback',
    closeBundle() {
      const outDir = resolve(__dirname, 'dist')
      copyFileSync(resolve(outDir, 'index.html'), resolve(outDir, '404.html'))
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@assets': resolve(__dirname, './src/assets'),
      '@components': resolve(__dirname, './src/components')
    }
  },
  base: '/',
  plugins: [
    react(),
    tailwindcss(),
    spaFallback()
  ],
})

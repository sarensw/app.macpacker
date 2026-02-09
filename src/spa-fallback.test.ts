import { describe, it, expect, beforeAll } from 'vitest'
import { existsSync, readFileSync } from 'fs'
import { resolve } from 'path'
import { execSync } from 'child_process'

describe('SPA fallback for GitHub Pages', () => {
  const distDir = resolve(__dirname, '../dist')
  const indexPath = resolve(distDir, 'index.html')
  const fallbackPath = resolve(distDir, '404.html')

  beforeAll(() => {
    execSync('npm run build', { cwd: resolve(__dirname, '..'), stdio: 'pipe' })
  }, 60000)

  it('should produce a 404.html in the dist directory after build', () => {
    expect(existsSync(fallbackPath)).toBe(true)
  })

  it('should have 404.html with identical content to index.html', () => {
    const indexContent = readFileSync(indexPath, 'utf-8')
    const fallbackContent = readFileSync(fallbackPath, 'utf-8')
    expect(fallbackContent).toBe(indexContent)
  })

  it('should have 404.html that contains the app root element', () => {
    const content = readFileSync(fallbackPath, 'utf-8')
    expect(content).toContain('id="root"')
  })

  it('should have 404.html that loads the main script', () => {
    const content = readFileSync(fallbackPath, 'utf-8')
    expect(content).toMatch(/<script\s+type="module"/)
  })
})

describe('vite.config.ts SPA fallback plugin', () => {
  const configPath = resolve(__dirname, '../vite.config.ts')

  it('should have a spaFallback plugin defined', () => {
    const config = readFileSync(configPath, 'utf-8')
    expect(config).toContain('spaFallback')
  })

  it('should copy index.html to 404.html in closeBundle hook', () => {
    const config = readFileSync(configPath, 'utf-8')
    expect(config).toContain('closeBundle')
    expect(config).toContain("'404.html'")
  })
})

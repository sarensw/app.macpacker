import { describe, it, expect } from 'vitest'
import { readFileSync, existsSync, statSync } from 'fs'
import { resolve } from 'path'
import { execSync } from 'child_process'

const brandDir = resolve(__dirname, '../public/media-kit/brand')

describe('media kit brand directory structure', () => {
  it('should have the brand directory', () => {
    expect(existsSync(brandDir)).toBe(true)
  })

  const requiredFiles = [
    'logo-icon.svg',
    'logo-icon-512.png',
    'logo-icon-256.png',
    'logo-icon-128.png',
    'logo-full.svg',
    'logo-full-dark.svg',
    'colors.json',
    'README.md',
    'macpacker-brand-assets.zip'
  ]

  for (const file of requiredFiles) {
    it(`should contain ${file}`, () => {
      expect(existsSync(resolve(brandDir, file))).toBe(true)
    })
  }
})

describe('PNG logo files', () => {
  it('logo-icon-512.png should be 512x512', () => {
    const output = execSync(`sips --getProperty pixelWidth --getProperty pixelHeight "${resolve(brandDir, 'logo-icon-512.png')}"`).toString()
    expect(output).toContain('pixelWidth: 512')
    expect(output).toContain('pixelHeight: 512')
  })

  it('logo-icon-256.png should be 256x256', () => {
    const output = execSync(`sips --getProperty pixelWidth --getProperty pixelHeight "${resolve(brandDir, 'logo-icon-256.png')}"`).toString()
    expect(output).toContain('pixelWidth: 256')
    expect(output).toContain('pixelHeight: 256')
  })

  it('logo-icon-128.png should be 128x128', () => {
    const output = execSync(`sips --getProperty pixelWidth --getProperty pixelHeight "${resolve(brandDir, 'logo-icon-128.png')}"`).toString()
    expect(output).toContain('pixelWidth: 128')
    expect(output).toContain('pixelHeight: 128')
  })

  it('PNG files should have non-zero file size', () => {
    for (const file of ['logo-icon-512.png', 'logo-icon-256.png', 'logo-icon-128.png']) {
      const stat = statSync(resolve(brandDir, file))
      expect(stat.size).toBeGreaterThan(0)
    }
  })
})

describe('SVG logo files', () => {
  it('logo-icon.svg should be valid SVG with title', () => {
    const content = readFileSync(resolve(brandDir, 'logo-icon.svg'), 'utf-8')
    expect(content).toContain('<svg')
    expect(content).toContain('xmlns="http://www.w3.org/2000/svg"')
    expect(content).toContain('<title>')
    expect(content).toContain('viewBox')
  })

  it('logo-full.svg should be valid SVG with title', () => {
    const content = readFileSync(resolve(brandDir, 'logo-full.svg'), 'utf-8')
    expect(content).toContain('<svg')
    expect(content).toContain('xmlns="http://www.w3.org/2000/svg"')
    expect(content).toContain('<title>')
    expect(content).toContain('MacPacker')
  })

  it('logo-full-dark.svg should be valid SVG with title', () => {
    const content = readFileSync(resolve(brandDir, 'logo-full-dark.svg'), 'utf-8')
    expect(content).toContain('<svg')
    expect(content).toContain('xmlns="http://www.w3.org/2000/svg"')
    expect(content).toContain('<title>')
    expect(content).toContain('MacPacker')
  })

  it('logo-full-dark.svg should use light colors for dark backgrounds', () => {
    const content = readFileSync(resolve(brandDir, 'logo-full-dark.svg'), 'utf-8')
    expect(content).toContain('fill="#ffffff"')
  })

  it('logo-full.svg should use dark colors for light backgrounds', () => {
    const content = readFileSync(resolve(brandDir, 'logo-full.svg'), 'utf-8')
    expect(content).toContain('fill="#1a1a1a"')
  })
})

describe('colors.json', () => {
  it('should be valid JSON', () => {
    const content = readFileSync(resolve(brandDir, 'colors.json'), 'utf-8')
    expect(() => JSON.parse(content)).not.toThrow()
  })

  it('should contain all 5 required color values', () => {
    const content = readFileSync(resolve(brandDir, 'colors.json'), 'utf-8')
    const colors = JSON.parse(content)
    expect(colors).toHaveProperty('primary')
    expect(colors).toHaveProperty('secondary')
    expect(colors).toHaveProperty('accent')
    expect(colors).toHaveProperty('background')
    expect(colors).toHaveProperty('backgroundDark')
  })

  it('should have correct hex values', () => {
    const content = readFileSync(resolve(brandDir, 'colors.json'), 'utf-8')
    const colors = JSON.parse(content)
    expect(colors.primary).toBe('#1a1a1a')
    expect(colors.secondary).toBe('#666666')
    expect(colors.accent).toBe('#0066cc')
    expect(colors.background).toBe('#ffffff')
    expect(colors.backgroundDark).toBe('#1a1a1a')
  })

  it('all color values should be valid hex codes', () => {
    const content = readFileSync(resolve(brandDir, 'colors.json'), 'utf-8')
    const colors = JSON.parse(content)
    const hexPattern = /^#[0-9a-fA-F]{6}$/
    for (const [, value] of Object.entries(colors)) {
      expect(value).toMatch(hexPattern)
    }
  })
})

describe('README.md brand guidelines', () => {
  const readme = readFileSync(resolve(brandDir, 'README.md'), 'utf-8')

  it('should document minimum clear space', () => {
    const lower = readme.toLowerCase()
    expect(lower).toContain('clear space')
  })

  it('should document prohibited modifications', () => {
    const lower = readme.toLowerCase()
    expect(lower).toContain('stretch')
    expect(lower).toContain('rotate')
    expect(lower).toContain('recolor')
  })

  it('should document preferred backgrounds', () => {
    const lower = readme.toLowerCase()
    expect(lower).toContain('background')
    expect(lower).toContain('light')
    expect(lower).toContain('dark')
  })

  it('should include attribution text', () => {
    const lower = readme.toLowerCase()
    expect(lower).toContain('attribution')
    expect(readme).toContain('MacPacker')
  })

  it('should list all logo variants', () => {
    expect(readme).toContain('logo-icon.svg')
    expect(readme).toContain('logo-icon-512.png')
    expect(readme).toContain('logo-icon-256.png')
    expect(readme).toContain('logo-icon-128.png')
    expect(readme).toContain('logo-full.svg')
    expect(readme).toContain('logo-full-dark.svg')
  })

  it('should reference colors.json', () => {
    expect(readme).toContain('colors.json')
  })

  it('should reference the ZIP archive', () => {
    expect(readme).toContain('macpacker-brand-assets.zip')
  })
})

describe('ZIP archive', () => {
  it('should exist and have non-zero size', () => {
    const zipPath = resolve(brandDir, 'macpacker-brand-assets.zip')
    expect(existsSync(zipPath)).toBe(true)
    const stat = statSync(zipPath)
    expect(stat.size).toBeGreaterThan(0)
  })

  it('should contain all brand asset files', () => {
    const zipPath = resolve(brandDir, 'macpacker-brand-assets.zip')
    const output = execSync(`unzip -l "${zipPath}"`).toString()
    const expectedFiles = [
      'logo-icon.svg',
      'logo-icon-512.png',
      'logo-icon-256.png',
      'logo-icon-128.png',
      'logo-full.svg',
      'logo-full-dark.svg',
      'colors.json',
      'README.md'
    ]
    for (const file of expectedFiles) {
      expect(output).toContain(file)
    }
  })
})

describe('footer translation keys for media kit', () => {
  const en = JSON.parse(readFileSync(resolve(__dirname, './locales/en.json'), 'utf-8'))
  const zh = JSON.parse(readFileSync(resolve(__dirname, './locales/zh.json'), 'utf-8'))

  it('should have mediaKit key in English', () => {
    expect(en.footer.mediaKit).toBe('Media Kit')
  })

  it('should have mediaKit key in Chinese', () => {
    expect(zh.footer.mediaKit).toBe('媒体资料')
  })
})

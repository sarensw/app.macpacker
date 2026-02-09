import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { resolve } from 'path'

function extractJsonLd(html: string): unknown {
  const match = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)
  if (!match) return null
  return JSON.parse(match[1])
}

describe('Schema.org JSON-LD in index.html', () => {
  const html = readFileSync(resolve(__dirname, '../index.html'), 'utf-8')
  const schema = extractJsonLd(html) as Record<string, unknown>

  it('should contain a JSON-LD script tag', () => {
    expect(schema).not.toBeNull()
  })

  it('should have valid JSON-LD context', () => {
    expect(schema['@context']).toBe('https://schema.org')
  })

  it('should be a SoftwareApplication type', () => {
    expect(schema['@type']).toBe('SoftwareApplication')
  })

  it('should have the correct application name', () => {
    expect(schema['name']).toBe('MacPacker')
  })

  it('should have a description', () => {
    expect(schema['description']).toBeTypeOf('string')
    expect((schema['description'] as string).length).toBeGreaterThan(0)
  })

  it('should have applicationCategory set to UtilitiesApplication', () => {
    expect(schema['applicationCategory']).toBe('UtilitiesApplication')
  })

  it('should specify macOS as the operating system', () => {
    expect(schema['operatingSystem']).toMatch(/macOS/)
  })

  it('should have a valid download URL', () => {
    expect(schema['downloadUrl']).toMatch(/^https:\/\//)
  })

  it('should have an absolute image URL', () => {
    expect(schema['image']).toMatch(/^https:\/\//)
  })

  it('should have a free pricing offer', () => {
    const offers = schema['offers'] as Record<string, unknown>
    expect(offers).toBeDefined()
    expect(offers['@type']).toBe('Offer')
    expect(offers['price']).toBe('0')
    expect(offers['priceCurrency']).toBe('USD')
  })

  it('should have author information', () => {
    const author = schema['author'] as Record<string, unknown>
    expect(author).toBeDefined()
    expect(author['@type']).toBe('Person')
    expect(author['name']).toBeTypeOf('string')
    expect((author['name'] as string).length).toBeGreaterThan(0)
  })

  it('should have a url property with absolute URL', () => {
    expect(schema['url']).toMatch(/^https:\/\//)
  })
})

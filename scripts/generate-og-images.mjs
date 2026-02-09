#!/usr/bin/env node
/**
 * Generates language-specific Open Graph images (1200x630px) using Playwright.
 * Each image has a dark left panel with logo + tagline and a light right panel with app screenshot.
 *
 * Usage: npx -p playwright node scripts/generate-og-images.mjs
 */
import { chromium } from 'playwright-core'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const projectRoot = resolve(__dirname, '..')

// Read icon as base64
const iconBase64 = readFileSync(resolve(projectRoot, 'public/icon_512x512@2x.png')).toString('base64')
const iconDataUrl = `data:image/png;base64,${iconBase64}`

// Read main screenshot as base64
const mainBase64 = readFileSync(resolve(projectRoot, 'public/main.png')).toString('base64')
const mainDataUrl = `data:image/png;base64,${mainBase64}`

const languages = [
  {
    code: 'en',
    tagline: readFileSync(resolve(projectRoot, 'public/media-kit/descriptions/en/tagline.txt'), 'utf-8').trim(),
    lineHeight: '1.35',
    fontSize: '21px',
  },
  {
    code: 'de',
    tagline: readFileSync(resolve(projectRoot, 'public/media-kit/descriptions/de/tagline.txt'), 'utf-8').trim(),
    lineHeight: '1.35',
    fontSize: '20px',
  },
  {
    code: 'zh',
    tagline: readFileSync(resolve(projectRoot, 'public/media-kit/descriptions/zh-Hans/tagline.txt'), 'utf-8').trim(),
    lineHeight: '1.5',
    fontSize: '22px',
  },
]

function buildHtml(lang) {
  // Split tagline: first part before colon is the app name, rest is the description
  const colonIndex = lang.tagline.indexOf(':') !== -1
    ? lang.tagline.indexOf(':')
    : lang.tagline.indexOf('\uff1a')
  const appName = colonIndex !== -1 ? lang.tagline.substring(0, colonIndex).trim() : 'MacPacker'
  const description = colonIndex !== -1 ? lang.tagline.substring(colonIndex + 1).trim() : lang.tagline

  // Split description into sentences for better visual layout
  const sentences = description.split(/(?<=\.)\s+|(?<=\u3002)/)
    .filter(s => s.trim().length > 0)

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      width: 1200px;
      height: 630px;
      font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Arial, "PingFang SC", "Microsoft YaHei", sans-serif;
      overflow: hidden;
      display: flex;
    }
    .left-panel {
      width: 400px;
      min-width: 400px;
      height: 630px;
      background: #2C2C2E;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 60px 40px;
      position: relative;
      z-index: 2;
    }
    .logo-row {
      display: flex;
      align-items: center;
      gap: 14px;
      margin-bottom: 24px;
    }
    .logo-icon {
      width: 64px;
      height: 64px;
      border-radius: 14px;
    }
    .app-name {
      color: #FFFFFF;
      font-size: 32px;
      font-weight: 700;
      letter-spacing: -0.5px;
    }
    .tagline {
      color: rgba(255, 255, 255, 0.88);
      font-size: ${lang.fontSize};
      font-weight: 400;
      line-height: ${lang.lineHeight};
      margin-top: 4px;
    }
    .tagline .sentence {
      display: block;
      margin-bottom: 6px;
    }
    .tagline .sentence:last-child {
      margin-bottom: 0;
    }
    .right-panel {
      flex: 1;
      height: 630px;
      background: #E5E5E7;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
    }
    .screenshot {
      position: absolute;
      left: -60px;
      top: 50%;
      transform: translateY(-50%);
      width: 860px;
      height: auto;
      border-radius: 8px;
      filter: drop-shadow(-4px 8px 24px rgba(0,0,0,0.18));
    }
  </style>
</head>
<body>
  <div class="left-panel">
    <div class="logo-row">
      <img class="logo-icon" src="${iconDataUrl}" alt="MacPacker" />
      <span class="app-name">${appName}</span>
    </div>
    <div class="tagline">
      ${sentences.map(s => `<span class="sentence">${s.trim()}</span>`).join('\n      ')}
    </div>
  </div>
  <div class="right-panel">
    <img class="screenshot" src="${mainDataUrl}" alt="MacPacker app" />
  </div>
</body>
</html>`
}

async function main() {
  const browser = await chromium.launch()
  const context = await browser.newContext({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 1,
  })

  for (const lang of languages) {
    const page = await context.newPage()
    const html = buildHtml(lang)

    await page.setContent(html, { waitUntil: 'load' })
    // Wait for images to fully load
    await page.waitForTimeout(500)

    const outputPath = resolve(projectRoot, `public/media-kit/social/og-image-${lang.code}.png`)
    await page.screenshot({
      path: outputPath,
      clip: { x: 0, y: 0, width: 1200, height: 630 },
      type: 'png',
    })

    console.log(`Generated: ${outputPath}`)
    await page.close()
  }

  await browser.close()
  console.log('All OG images generated successfully!')
}

main().catch(err => {
  console.error('Error generating OG images:', err)
  process.exit(1)
})

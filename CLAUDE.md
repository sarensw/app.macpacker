# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This repository contains the marketing/landing page for **MacPacker**, a macOS archive manager app. The actual macOS app source code lives at https://github.com/sarensw/MacPacker (Swift/SwiftUI).

## Coding Guidelines

The project is using git to have code versioning and diff available. Adjust .gitignore appropriately so that no secrets, unnecessary files or folders, depending on the used programming language are added to git.

## Architecture

Next.js 15 App Router, TypeScript, Tailwind CSS v4, deployed to Vercel. Detailed
conventions live in `.claude/rules/` (`nextjs.md`, `react.md`, `styles.md`) — read
those before non-trivial work.

- **i18n.** Everything lives under `app/[locale]/`. Locales are `en` + `zh`
  (`lib/i18n.ts`); `middleware.ts` redirects bare paths to a locale prefix via
  `Accept-Language`. UI strings are in `lib/translations/{en,zh}.json` and must keep
  **strict key parity** — enforced by `__tests__/translations.test.ts`.
- **Routes** under `app/[locale]/`: `page.tsx` (home), `changelog/`, `press/`,
  `privacy/`, `imprint/`, `blog/`, `compare/` (+ `[slug]`), `docs/` (+ `docs/[slug]`). `layout.tsx` sets `html lang`, fonts, JSON-LD,
  metadata, and `generateStaticParams`.
- **Server Components by default**, statically rendered (SSG/ISR, `revalidate = 3600`).
  Interactivity is isolated in small client islands under `components/client/`
  (`DownloadMenu`, `BrewCopyButton`, `CopyTextButton`, `LanguageSwitcher`, `WebMCP`).
  Page sections live in `sections/home/*`; shared UI in `components/`.
- **`lib/`** — `i18n.ts`, `release.ts` (live version + download URLs from the S3
  changelog / Sparkle appcast, with `release.fallback.json`), `formats*.ts`,
  `format-chips.ts` (every count the site states, e.g. "43 formats under 66
  extensions", comes from here). `format-registry.json` is a copy of the app's
  `Modules/Sources/Core/Formats/Catalog.json` (id, name, kind, extensions) — sync it
  when the app adds a format.
- **Home images.** `scripts/cutouts.py` cuts the window and its details out of the
  window captures in `press-kit/assets/screenshots/en/` into `public/img/en/` (used on
  both locales until Chinese captures exist); re-run it after new screenshots.
  `public/og.png` (link preview) and `public/hero.png` (JSON-LD screenshot) are made
  from the same captures.
- **Media kit.** `scripts/build-press-kit.mjs` generates the downloadable kit into
  `public/press/` (git-ignored) from the translations + `press-kit/assets/`. It runs
  on `predev`/`prebuild`, so it regenerates on every dev start and deploy.

## Development

```bash
npm run dev        # Dev server (regenerates the media kit first)
npm run build      # Production build (regenerates the media kit first)
npm run start      # Serve production build
npm test           # Vitest: translation parity, sitemap/SEO, page render
npm run press-kit  # Rebuild only the media kit into public/press/
```

## Design System

Two systems live side by side; know which one a file belongs to.

### Site chrome and home page — `app/site.css` (use this for new marketing UI)

The header, the footer and the home page use plain CSS in `app/site.css`, a port of
the approved "design B" mock: white page, one tile vocabulary (`b-tile`, 26px corners,
`#f5f5f7`), the app icon's orange used only as light (the stage and open-source
gradients, the big numbers) and never for text. Light theme only, like the rest of
the site. Every class is prefixed `b-` (or `dl-`/`gh-` for the download row and the
services' own buttons) so it never collides with the Tailwind component classes.
Tokens are plain custom properties on `:root` at the top of the file (`--ink`,
`--ink-soft`, `--tile`, `--stage`, `--grad`, …).

- Type: the system stack; headlines bold and tight (`clamp()` sizes in the file),
  running text 15px; `--mono` for labels and extensions. Chinese gets normal tracking
  and more leading (`[lang="zh"]` rules at the end of the file).
- Download row: Apple's badge first, unaltered, 40px tall; the buttons beside it take
  its 7px corners. Everything else sits in `DownloadMenu`.
- Official buttons stay official: Buy Me a Coffee and PayPal artwork, GitHub's Primer
  colours for Sponsor and Fork me.

### Tailwind tokens — docs, blog, compare, press, privacy, imprint

The other pages use Tailwind CSS v4 with CSS-first config: tokens in the **`@theme`
block in `app/globals.css`** (not `:root`), consumed as utility classes
(`bg-bg-page`, `text-ink-primary`, `text-accent-live`) — not raw `var(--…)`. See
`.claude/rules/styles.md`. Monochrome / near-white, green (`--color-accent-live`) as
the only accent, 0.5px hairlines, small medium-weight titles.

`--color-accent` (#D4793C amber), `--font-accent` (Newsreader italic), the
`--color-bg`/`--color-text`/`--color-border` aliases and the `.section-eyebrow` /
`.section-title` classes are **legacy**, kept only until docs/blog/privacy get a sweep.

The brand colors live in the **app icon** (`public/logo.png`, redrawn in 2026): amber
`#FD9C30` to vermilion `#F45A20`, charcoal `#242630`, on a white page. The macOS app
uses native SwiftUI/AppKit controls with no custom theme — don't infer brand colors
from the website's CSS tokens.

## Deployment

Vercel. Internal navigation is locale-prefixed (`/${locale}/blog`, `/${locale}/press`,
`/${locale}/privacy`); `middleware.ts` adds the prefix on bare paths. `prebuild`
regenerates the media kit so `public/press/` is populated in every deploy.

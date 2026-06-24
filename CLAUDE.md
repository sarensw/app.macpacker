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
- **Routes** under `app/[locale]/`: `page.tsx` (home), `press/`, `privacy/`,
  `blog/`, `docs/` (+ `docs/[slug]`). `layout.tsx` sets `html lang`, fonts, JSON-LD,
  metadata, and `generateStaticParams`.
- **Server Components by default**, statically rendered (SSG/ISR, `revalidate = 3600`).
  Interactivity is isolated in small client islands under `components/client/`
  (`BrewCopyButton`, `CopyTextButton`, `LanguageSwitcher`, `WebMCP`). Page sections
  live in `sections/home/*`; shared UI in `components/`.
- **`lib/`** — `i18n.ts`, `release.ts` (live version + download URLs from the S3
  changelog / Sparkle appcast, with `release.fallback.json`), `formats*.ts`,
  `format-chips.ts`.
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

Tailwind CSS v4 with CSS-first config: tokens are defined in the **`@theme` block in
`app/globals.css`** (not `:root`) and consumed as **utility classes**
(`bg-bg-page`, `text-ink-primary`, `text-accent-live`) — not raw `var(--…)`.
See `.claude/rules/styles.md`.

**When building anything new, orient on the live home page and `sections/home/*` — not
on this list or on older pages.** The site has been through a redesign; some tokens and
pages are legacy.

### Current language (the home redesign — use this)

Monochrome / near-white. Green is the only color accent; the UI is otherwise grayscale.

- Surfaces: `--color-bg-page` #fff · `--color-bg-surface` #fafafa · `--color-bg-muted` #f1f1f3
- Ink: `--color-ink-primary` #0a0a0a · `--color-ink-secondary` #525258 · `--color-ink-tertiary` #8c8c93
- Borders: `--color-border-subtle/default/strong`, drawn at **0.5px** (hairlines)
- Accent: **green only** — `--color-accent-live` #28c840 + `--color-accent-success-bg/ink` for dots/badges
- Type: `--font-sans` is the **system stack** (San Francisco on macOS); `--font-mono` for labels/eyebrows. No web display font is loaded for the redesign.
- Radius: `--radius` 12 · `--radius-md` 8 · `--radius-sm` 4 · `--radius-lg` 16. Single breakpoint `--breakpoint-md` 900px (mobile-first).

Section conventions (copy from `sections/home/*`):
- Eyebrow: `font-mono text-[11px] tracking-[0.08em] uppercase text-ink-tertiary` (**gray, never colored**)
- Title: `text-[20px] font-medium tracking-[-0.015em] text-ink-primary` (**medium weight, small** — not bold, not `clamp`)
- Cards: `bg-bg-surface border-[0.5px] border-border-default rounded-md`; section rhythm `mb-12`
- Buttons: dark pill `bg-ink-primary text-ink-inverse h-9 px-3.5 rounded-md text-[13px] font-medium`; outline = `bg-bg-surface` + `border-border-strong`

### Legacy — do NOT use on new pages

`--color-accent` (#D4793C amber — a legacy website token, **not** the brand color and
not used in the redesign), `--font-accent` (Newsreader italic), the
`--color-bg`/`--color-text`/`--color-border` aliases, and the `.section-eyebrow` /
`.section-title` component classes are **legacy**, kept only for `docs/blog/privacy`
until a sweep. No orange/amber headline accents, no Newsreader serif italic, no heavy
bold headings in new work.

The actual brand colors live in the **app icon** (`public/logo.png`): vermilion
`#F06C3C` and amber `#F09C3C`, charcoal `#3C3C3C`, on a white page. The macOS app uses
native SwiftUI/AppKit controls with no custom theme — don't infer brand colors from the
website's CSS tokens (they're a separate, monochrome UI system).

## Deployment

Vercel. Internal navigation is locale-prefixed (`/${locale}/blog`, `/${locale}/press`,
`/${locale}/privacy`); `middleware.ts` adds the prefix on bare paths. `prebuild`
regenerates the media kit so `public/press/` is populated in every deploy.

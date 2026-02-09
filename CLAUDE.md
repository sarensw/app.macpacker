# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Marketing website for [MacPacker](https://macpacker.app) — an open-source archive manager for macOS. This is a static React/TypeScript site deployed to GitHub Pages, not the native macOS app itself.

## Commands

```bash
npm run dev       # Start Vite dev server with hot reload
npm run build     # TypeScript type check (tsc -b) + Vite production build
npm run lint      # ESLint check
npm run preview   # Preview production build locally
```

## Architecture

- **Framework:** React 19 + TypeScript (strict mode) + Vite
- **Styling:** Tailwind CSS 4 via `@tailwindcss/vite` plugin
- **Routing:** Wouter (lightweight router) — routes defined in `src/App.tsx`
- **Deployment:** GitHub Actions auto-deploys `dist/` to GitHub Pages on push to `main`

### Path Aliases (configured in vite.config.ts and tsconfig)

- `@` → `./src`
- `@assets` → `./src/assets`
- `@components` → `./src/components`

### Source Layout

- `src/main.tsx` — Entry point
- `src/App.tsx` — Router with two routes: `/` (home) and `/imprint`
- `src/components/` — Reusable components (Header, Footer, badge components)
- `src/pages/home/` — Landing page with download links, features, supported formats
- `src/pages/imprint/` — Legal page rendered from `public/markdown/imprint.md` via react-markdown
- `public/` — Static assets (icons, screenshots, markdown content)

### Key Dependencies

- `@heroicons/react` for icons
- `flag-icons` for country flags (language badges)
- `react-markdown` + `remark-gfm` for markdown rendering
- `wouter` for client-side routing

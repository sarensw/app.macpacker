# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This repository contains the marketing/landing page for **MacPacker**, a macOS archive manager app. The actual macOS app source code lives at https://github.com/sarensw/MacPacker (Swift/SwiftUI).

## Coding Guidelines

The project is using git to have code versioning and diff available. Adjust .gitignore appropriately so that no secrets, unnecessary files or folders, depending on the used programming language are added to git.

## Architecture

Next.js 15 app (App Router) with TypeScript, deployed to Vercel.

- `app/layout.tsx` — Root layout with metadata
- `app/page.tsx` — Main landing page (client component for scroll-reveal and clipboard interactions)
- `app/globals.css` — All styles (CSS custom properties, component styles, responsive breakpoints, animations)

The page is a single-route marketing site. Interactive behavior (IntersectionObserver scroll reveals, brew command clipboard copy) runs client-side.

## Development

```bash
npm run dev    # Start dev server
npm run build  # Production build
npm run start  # Serve production build
```

## Design System

CSS custom properties defined in `:root` in `app/globals.css`:
- Colors: `--bg` (#FAFAF8), `--accent` (#D4793C amber), `--text` (#1A1A1C), `--border` (#E8E8E5)
- Typography: `--font` (General Sans), `--font-accent` (Newsreader italic)
- Spacing: `--radius` (12px), `--radius-lg` (16px)

## Deployment

Vercel. The site uses relative paths (`/blog`, `/zh`, `/privacy`) for internal navigation.

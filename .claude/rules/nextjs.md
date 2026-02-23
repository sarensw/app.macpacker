---
paths: 
  - "app/**/*"
---

# Next.js App Router conventions (marketing site)

## Rendering strategy (SEO + performance)
- Prefer **Static Rendering (SSG)** for marketing pages whenever possible.
- Use **ISR** (`export const revalidate = <seconds>`) when content updates occasionally.
- Use **SSR** only when HTML must be truly dynamic per request (personalization, auth, always-fresh data).

## Server vs Client components
- Pages/layouts are **Server Components by default**.
- Add `"use client"` only when a file uses:
  - React hooks (`useState`, `useEffect`, etc.)
  - browser-only APIs (`window`, `document`, `localStorage`, media queries via JS)
  - event handlers that require client execution
- Keep interactive UI as **small client islands** (components), not entire pages.

## Metadata
- Use `export const metadata: Metadata = { ... }` in layouts/pages.
- Set sensible defaults in the root layout:
  - `metadataBase`
  - `title` template + default
  - `description`
  - OpenGraph + Twitter defaults (image, siteName)
  - alternates/canonical where appropriate

## Fonts
- Prefer **next/font** for performance (self-hosting, preload, reduced CLS).
- If a `<link>` approach is required for a specific reason:
  - include `preconnect` to font hosts
  - ensure `display=swap`
  - prefer woff2 and preload the critical font where possible
  - document the reason in the layout

## CSS
- Import global CSS in `app/layout.tsx` only (Next.js constraint).
- Organize CSS either as:
  - a single `globals.css`, or
  - multiple global CSS files imported by `app/layout.tsx` (still global, but organized)
- No CSS Modules (per project constraint).

## Routing & linking
- Use `next/link` for internal navigation.
- Avoid deep relative imports; use the `@/*` path alias.

## Images & assets
- Prefer `next/image` for non-trivial images (hero, screenshots, marketing visuals).
- `<img>` is acceptable only for tiny decorative assets where optimization is unnecessary.

## Data fetching
- Prefer build-time/static data for marketing content.
- When fetching:
  - default to caching (`fetch` default caching) for SSG/ISR
  - avoid `cache: "no-store"` unless necessary
  - avoid `revalidate: 0` unless truly SSR is intended

---
paths:
  - "**/*.css"
---

# CSS conventions (Tailwind CSS v4 marketing site)

## Architecture
- Tailwind CSS v4 with CSS-first config via `@theme` in `globals.css`.
- PostCSS plugin: `@tailwindcss/postcss`.
- Utility-first: apply styles via `className` in TSX files.

## Tokens & theming
- Design tokens defined in `@theme` block in `globals.css`:
  - `--color-*` for colors (e.g. `--color-bg`, `--color-accent`, `--color-text-secondary`)
  - `--radius-*` for border radii
  - `--font-sans`, `--font-accent` for font families
  - `--breakpoint-md: 900px` for the single responsive breakpoint
  - `--animate-fade-up` for the hero entrance animation
- Use tokens via Tailwind utilities: `bg-bg`, `text-accent`, `rounded-lg`, `md:grid-cols-3`.

## Shared component classes
- Define in `@layer components` for classes used across 4+ files:
  - `.btn-primary`, `.btn-outline` — button variants
  - `.section-eyebrow`, `.section-title` — section headings
- Use `@apply` inside these definitions to compose Tailwind utilities.

## Custom CSS (kept minimal)
- `.reveal` / `.reveal.visible` — ScrollReveal uses `classList.add("visible")`, must stay as CSS
- `.os-card-glow::before` — pseudo-element with radial gradient
- `.article-features li::before` — custom bullet dots
- `.skip-link` — absolute positioning with focus state
- `:focus-visible` — global accessibility catch-all
- `@media (prefers-reduced-motion)` — animation kill switch
- `@keyframes fadeUp` — entrance animation

## Responsive
- Single breakpoint at 900px defined as `--breakpoint-md`.
- Tailwind is mobile-first: base styles = mobile, `md:` prefix = desktop (≥900px).
- Use `max-md:` for mobile-only overrides when cleaner than restructuring base+md.
- Prefer fluid sizing (`clamp()`, `min()`, `max()`) to reduce breakpoint needs.

## Typography
- Fluid headings via `clamp()` in arbitrary values: `text-[clamp(28px,3.5vw,44px)]`.
- System font stack via `font-sans`, accent font via `font-accent`.

## Motion
- Hero stagger via `animate-fade-up` with `[animation-delay:*]` arbitrary properties.
- Scroll reveals via `.reveal` / `.visible` CSS classes.
- Hover transitions via Tailwind `transition-all`, `transition-colors`.
- Respect `prefers-reduced-motion` via global CSS rule.

## Naming conventions
- State modifiers as additional CSS classes: `.active`, `.visible`, `.nav-active`.
- Tailwind utilities for everything else — avoid creating new CSS classes unless shared across 4+ files.

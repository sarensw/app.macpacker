---
paths:
  - "**/*.tsx"
---

# React component conventions (marketing site)

## Component style
- Use **function declarations** for exported page components and primary section components.
- Use **arrow functions** only for **tiny, local** components (e.g. inline SVG icon components).
- Keep components small and section-oriented (Hero, Features, Pricing, FAQ, Footer).

## Rendering & state
- Prefer **server components by default** (in App Router). Only use client components when needed.
- For UI state (menus, accordions, toggles, toasts), prefer **React state + className**.
- Avoid imperative DOM manipulation for UI state.
  - OK: `useRef` for focus, measurement, IntersectionObserver, setting CSS variables.
  - Avoid: manually adding/removing classes via `ref.current.classList.*` except for rare, isolated cases where React state is clearly worse.

## Animations
- Prefer **CSS-first** animations and transitions.
- If you need "scroll reveal", prefer **IntersectionObserver** to toggle a `visible` class.
  - Keep motion optional via CSS `prefers-reduced-motion`.

## Icons (no icon libraries)
- Inline SVG icons as **module-level arrow-function components**.
- Decorative icons must be hidden from screen readers:
  - `aria-hidden="true" focusable="false"`
- If an icon conveys meaning on its own, use `role="img"` and provide a `<title>`.

## Markup conventions
- Prefer semantic HTML: `<header> <main> <section> <nav> <footer>`.
- Add section dividers for readability (matching CSS file style):
  - `/* ─── HERO ─── */` (in CSS)
  - `// ─── HERO ───` (in TSX comments between blocks)

## Styling conventions
- Use **Tailwind CSS v4** utility classes via `className`.
- Use `@layer components` in `globals.css` for classes shared across 4+ files (e.g. `.btn-primary`, `.section-title`).
- `style={{ }}` allowed only for **minor one-offs** (rare), never for layout systems or theming.

## Accessibility defaults
- Use correct semantics: button for actions, link for navigation.
- Ensure visible focus states (don't remove outlines without replacement).
- Keep heading order logical (single H1 per page).
- Avoid `dangerouslySetInnerHTML` unless explicitly justified.

## Performance hygiene
- Avoid big client bundles: keep client components small and isolated.
- Prefer `<Image>` / optimized assets for large images (see Next.js rules).

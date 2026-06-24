# Press kit source assets

Drop assets here. `scripts/build-press-kit.mjs` bundles whatever exists into the
downloadable media kit (`public/press/macpacker-press-kit-<locale>.zip`) on every
`npm run dev` / `npm run build`. Missing files are skipped, never an error.

```
press-kit/assets/
  screenshots/en/   English screenshots, @2x: browse, nested, extract, preview
  screenshots/zh/   Chinese screenshots (optional; falls back to en/)
  demo/             Optional drag-out / ZIP-edit clip (.mp4 / .gif)
```

Already included automatically:
- App icon — from `public/logo.png` (1024×1024)
- A seed screenshot — from `public/hero.png` (replaced once real screenshots are added)

Still to provide:
- `screenshots/en/01-browse.png`, `02-nested.png`, `03-extract.png`, `04-preview.png`
  (@2x retina, real macOS window with native chrome, no personal data, consistent size)
- `screenshots/zh/…` — optional; English is used as the fallback
- `demo/…` — optional 5–10s clip of the drag-out or the new ZIP-edit flow

Note: MacPacker has no separate wordmark — the brand mark **is** the app icon, so
there's nothing to add for a logotype. Brand colors come from the icon (see the
press page's "Color & type" section).

After dropping screenshots in, ping me to wire them onto the `/press` page itself
(the page tiles are wired separately from the ZIP).

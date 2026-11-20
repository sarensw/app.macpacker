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

In place (2026-11-06):
- `screenshots/en/01-browse.png` … `06-compress.png` — window captures (⌘⇧4, Space,
  click the window): Retina PNGs with a transparent background. `scripts/cutouts.py`
  cuts the home page's images out of them; re-run it after replacing any of them.

Still to provide:
- `screenshots/zh/…` — the same shots with the app in 简体中文 (until then the Chinese
  kit, press page and home page use the English ones)
- `demo/…` — the current clip shows an older version of the app; a 5–10 s clip of the
  drag-out or the compress window would replace it

Note: MacPacker has no separate wordmark — the brand mark **is** the app icon, so
there's nothing to add for a logotype. Brand colors come from the icon (see the
press page's "Color & type" section).

After dropping screenshots in, ping me to wire them onto the `/press` page itself
(the page tiles are wired separately from the ZIP).

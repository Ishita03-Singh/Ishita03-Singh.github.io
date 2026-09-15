# ishita03-singh.github.io

Personal portfolio — a static site, no build step.

Open `index.html` in a browser, or serve the folder (`npx serve .`) if you want the
fonts and PDF to load over HTTP.

## Files

| Path | What it is |
| --- | --- |
| `index.html` | All the content. Edit the copy here. |
| `styles.css` | All the styling. Palette tokens live in `:root` at the top. |
| `main.js` | Splash, mobile drawer, experience tabs, scroll reveal, scroll spy. |
| `static/fonts/` | Calibre and SF Mono, carried over from the previous Flutter build. |
| `static/img/` | Logo and project screenshots. |
| `static/Ishita_Singh_Resume.pdf` | The file behind the **Resume** button. |

## Common edits

- **New resume** — replace `static/Ishita_Singh_Resume.pdf`, keeping the filename.
- **New job or tab** — copy a `<button role="tab">` in `.exp__tabs` and its matching
  `.exp__panel`; the `aria-controls` on the button must match the panel's `id`.
- **New project** — copy an `<article class="card">` block. Cards without a screenshot
  use `card__media--glyph` with an inline SVG instead of an `<img>`.
- **Skill bars** — the `data-level` attribute on each `.skill` is the percentage.
- **Colours** — the six custom properties in `:root` come from the old Flutter
  `AppColors`, so the palette matches the previous site exactly.

## Notes

- The intro splash plays once per browser session and is skipped entirely for visitors
  who prefer reduced motion. Any click, keypress or scroll skips it.
- The previous Flutter web build still lives on the `master` branch; its Dart source is
  on `dart_code`.

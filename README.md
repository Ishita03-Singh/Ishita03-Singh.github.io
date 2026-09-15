# ishita03-singh.github.io

Personal portfolio — a static site, no build step, no dependencies.

Open `index.html` in a browser, or serve the folder (`npx serve .`) if you want the
fonts and PDF to load over HTTP.

## The design

**"Block"** — neo-brutalist. Flat colour blocks, 2.5px black rules, hard offset shadows
that shift on hover, Archivo Black set in caps. Structure still comes from the day job:
a deploy log in the hero, a board of production numbers, a release-style timeline.

- **Palette** — warm paper `#f3f1e7` with black ink, electric blue `#2b50ff` as the
  accent, and yellow `#ffe14d` / pink `#ff4d8d` / lime `#c4f000` as block fills. Dark
  mode moves the ground to `#15151b` and flips the rules to white; the bright fills
  stay exactly as they are, because they are the point of the direction.
- **Type** — Archivo (900 for display, 400–700 for body) and Space Mono for data and
  labels. Calibre and SF Mono are still served locally as fallbacks.
- **No radius to speak of, no gradients, no blur.** Depth comes from the offset shadow
  alone.

## Files

| Path | What it is |
| --- | --- |
| `index.html` | All the content. Edit the copy here. |
| `styles.css` | All the styling. Design tokens live in the three palette blocks at the top. |
| `main.js` | Loader, theme toggle, drawer, rotator, count-up, reveal, live counter, evidence lens, scroll spy, clock. |
| `static/fonts/` | Calibre and SF Mono, carried over from the previous Flutter build. |
| `static/img/` | Logo, portrait and project screenshots. |
| `static/Ishita_Singh_Resume.pdf` | The file behind the **Résumé** button. |

## The three data pieces

**1. Events handled today** (`liveEvents()` in `main.js`) — the pipeline sustains about
120K events a day. Rather than print that average as another static number, the tile
runs it forward from midnight IST, so it shows roughly where today stands and keeps
ticking while the page is open. It is labelled as an estimate in the markup, because
that is what it is. Change `PER_DAY` if the real figure moves.

**2. Release-time chart** — the "cut release time by 90%" claim, shown instead of
asserted: two bars on one 0–90 minute scale, both direct-labelled, with a detail tip on
hover and on keyboard focus. One measure in two states, so there is no legend; the title
names it. The two fills (`--chart-before`, `--chart-after`) were checked for
colour-vision separation and contrast against both grounds before being used — if you
change them, re-check rather than eyeball.

**3. Evidence lens** — every tool in the Stack section that Ishita has actually shipped
with carries a `data-tech` key. Clicking it dims the page and lights up the experience
bullets and projects that share that key, with a readout at the bottom of the screen.
A tag list becomes a way to check the claim rather than a keyword dump. Escape clears it.

To wire a new tool up: put `data-tech="key"` on the chip in `.stack`, and the same key
on every `.tl__list li` and `.work` it belongs to. A target can carry several keys,
space-separated. Chips without a `data-tech` are plain labels and stay inert.

## Theming

Three palette blocks in `styles.css`, in this order:

1. `:root` — the complete light palette, and the default.
2. `@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) }` — for a
   visitor whose OS says dark and who hasn't touched the toggle.
3. `:root[data-theme="dark"]` — for a visitor who picked dark explicitly, so that
   choice beats a light OS.

Blocks 2 and 3 carry identical values and **must stay in sync** — CSS can't share one
declaration block between a media query and a plain selector.

No component rule is keyed on the theme selector. Anything that differs between themes
is a token. The one deliberate exception is literal `#000` on elements that sit on a
bright fill (yellow tiles, lime badges, the pink tape): those blocks keep black ink in
both themes, so hard-coding it there is correct rather than sloppy.

## Common edits

- **New résumé** — replace `static/Ishita_Singh_Resume.pdf`, keeping the filename.
- **New number on the board** — copy an `<article class="stat">`; `data-count` on the
  inner `<span>` is the target the count-up animates to, and the `<i>` beside it is the
  suffix (`+`, `%`, `K+`). Width is `stat--2` or `stat--3` on a 6-column grid. Add a
  `t-yellow` / `t-blue` / `t-pink` / `t-lime` class to colour-block it.
- **New role or milestone** — copy an `<li class="tl">` in `.timeline`. The first in the
  list gets the lime "current" dot automatically.
- **New project** — copy an `<article class="work">`. Rows alternate sides on their own
  via `:nth-child(even)`. A project without a screenshot uses `work__art--glyph` with an
  inline SVG instead of an `<img>`.
- **Rotating hero words** — the `words` array in the `rotator()` block of `main.js`.
- **The highlighted word in a heading** — wrap it in `<span class="hi">`.

## Behaviour notes

- The intro counter plays once per browser session, caps at 2.6s, and any click,
  keypress or scroll skips it.
- Magnetic buttons are desktop-only — they need a fine pointer and are skipped under
  `prefers-reduced-motion`.
- Reveal-on-scroll only arms itself once `IntersectionObserver` is confirmed present, so
  content can never get stuck invisible. Without JS, nothing is hidden and the chart
  bars render at full width.
- The Gurgaon clock and the events estimate both use `Intl` with an `Asia/Kolkata` time
  zone and fall back to the visitor's own clock where that isn't supported.

## Notes

- Four other design directions were prototyped before this one — Ship Log (ink + acid
  lime), Blueprint (graph paper + ink blue), CRT (phosphor terminal) and Press
  (magazine). Everything that separated them was a token swap plus a small block of
  signature rules, so switching again is an afternoon, not a rebuild.
- The previous Flutter web build still lives on the `master` branch; its Dart source is
  on `dart_code`. `flutter_service_worker.js` and the purge script in `index.html` exist
  to tear down the service worker that build left registered in returning visitors'
  browsers — don't delete them.

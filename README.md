# ishita03-singh.github.io

Personal portfolio: a static site with no build step and no dependencies.

Open `index.html` in a browser, or serve the folder (`npx serve .`) so the live data panels
and the PDF load over HTTP.

## The design

**Editorial engineering.** Warm paper (`#f7f6f2`) with one ink-blue accent (`#3346e0`),
set in Bricolage Grotesque for display, Inter for reading and JetBrains Mono for data.
The dark theme is its own palette, not an inversion. Content lives in cards, diagrams and
dashboards instead of bullet lists.

| Section | What it does |
| --- | --- |
| Hero | Headline, CTAs, and a profile card summarising experience, local time, focus and current work |
| Impact band | Five headline numbers, counted up on scroll |
| About | Bio, quick facts, three focus areas, and a horizontal career timeline |
| Experience | Each piece of I2V work as a case study (problem / what I did / outcome), each with its own small visual, in a tab explorer. Freelance role below it |
| Projects | Aapka Vakeel as the featured project, then project cards |
| Skills | Architecture diagram of the typical system, then skills grouped by domain and tier |
| Activity | **Live** GitHub (contributions by year, calendar per year, languages, repos, merged PRs) and **live** LeetCode (solved by difficulty, recent accepted) |
| Recognition | Imagine Cup, Covi-Hack, degree |
| Contact | Email with copy button, profiles, résumé |

## Files

| Path | What it is |
| --- | --- |
| `index.html` | All the content. Edit the copy here. |
| `styles.css` | All the styling. Tokens sit at the top in three palette blocks. |
| `main.js` | Theme, header, drawer, reveal/count-up, case tabs, evidence lens, GitHub + LeetCode + visitor data. |
| `static/Ishita_Singh_Resume.pdf` | The file behind every **Résumé** link. |

## Common edits

- **Handles**: `GITHUB_USER` and `LEETCODE_USER` at the top of `main.js`.
- **Photo**: the profile card shows an `IS` monogram. To use a photo, add it to `static/img/`
  and swap in the commented `<img>` in the hero `idcard`.
- **New case study**: add a `<button class="ctab" role="tab">` to `.cases__nav` and a matching
  `<section class="case" role="tabpanel">`. The `id` / `aria-controls` / `aria-labelledby` must pair up.
- **Evidence lens**: a skill chip with `data-tech="key"` lights up every case tab, role or project
  carrying the same key (space-separated for several). Clicking a chip also opens the matching case.
- **Skill tier**: `lv3` = use daily, `lv2` = shipped to production, `lv1` = familiar.
- **New résumé**: replace the PDF and keep the filename.

## Theming

1. `:root` holds the light palette.
2. `@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) }` applies dark when the OS asks for it.
3. `:root[data-theme="dark"]` applies an explicit dark choice from the toggle.

Blocks 2 and 3 must stay in sync. Chart colours (`--seq-*` for the heatmap, `--c1…--c5` for
languages) come from a colour-blind-validated palette. Keep categorical slots in order.

## Live data

Every panel has a loading skeleton and a plain-language error state that points to the profile,
so a slow or dead API never leaves an empty box.

- GitHub contributions: `github-contributions-api.jogruber.de` (GitHub's own API needs a token).
- GitHub profile, repos and PRs: `api.github.com`, unauthenticated (60 requests/hour per visitor).
- LeetCode: community proxies, because LeetCode blocks cross-origin browser calls.

## Notes

- The previous Flutter build lives on `master`. `flutter_service_worker.js` and the purge script
  in `index.html` tear down its leftover service worker. Don't delete them.

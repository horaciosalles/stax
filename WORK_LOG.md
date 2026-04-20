# WORK LOG — Stax
Current milestone: M3 — Polish & Accessibility
Last session: 2026-04-20
Status: M2 COMPLETE. Live at https://horaciosalles.github.io/stax/

## ACTIVE CHECKPOINT
none

## SESSION HISTORY (last 3)
2026-04-20 — M2 complete. History drawer (slide-in, touch drag, overlay), cursor blink
             animation, CI/CD pipeline (lint→test→deploy via peaceiris/actions-gh-pages),
             GitHub Pages now serving from gh-pages branch. Commits: c8d7abb, 8e8748f, d1a108d.
2026-04-19 — M1 complete. 100/100 tests, 98.64% coverage, ESLint zero errors.
             Architecture decisions: history.js merged into rpn.js; Unicode superscripts
             for scientific notation. Repo live at github.com/horaciosalles/stax.

## PROJECT CONSTRAINTS
Stack: Vanilla JS ES2022, HTML5, CSS3. No frameworks, no bundler, no runtime deps.
No innerHTML/eval/new Function(). All DOM writes via textContent/createElement.
All strings in js/strings.js. All CSS values via token custom properties.
history.js merged into rpn.js (architectural decision, session 1).
Scientific notation: Unicode superscripts (⁰¹²…), not <sup> HTML.
Hosting: GitHub Pages. CI: GitHub Actions (lint→test→deploy).

## BLOCKERS
none

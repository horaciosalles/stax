# WORK LOG — Stax
Current milestone: M2 — First Playable: All Features Wired, PWA Installable
Last session: 2026-04-19
Status: M1 COMPLETE and pushed to GitHub (horaciosalles/stax). Starting M2 next session.

## ACTIVE CHECKPOINT
none

## SESSION HISTORY (last 3)
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

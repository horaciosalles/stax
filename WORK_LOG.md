# WORK LOG — Stax
Current milestone: M3 — Polish & Accessibility
Last session: 2026-04-20
Status: M3 IN PROGRESS

## ACTIVE CHECKPOINT
none

## M3 PROGRESS
- [x] Liquid Glass redesign (gradient bg, glass surfaces, specular highlights)
- [x] Landscape layout: side-by-side (stack 36% left, keypad right), keys shrink
- [x] Portrait layout: full-width, stack height 30%, no max-inline-size
- [x] Focus ring: 2px orange outline on :focus-visible (WCAG AA, B.12)
- [x] CLR "Sure?" red-pulse animation + key--clr-pending CSS class
- [x] Service worker bumped to stax-v2 (cache bust after redesign)
- [x] CI/CD migrated from peaceiris/gh-pages to actions/deploy-pages; gh-pages branch deleted
- [x] manifest.json: orientation=any, theme-color=#0B0B18
- [ ] WCAG AA contrast audit (verify all text/bg combos with contrast tool)
- [ ] Lighthouse score ≥ 90 (target for M3 exit)

M3 exit criteria (from blueprint §L.2 — "Vertical Slice"):
  Figma designs fully implemented ✓ | Lighthouse ≥ 90 pending | History drawer gesture ✓ | 0 P0/P1 bugs ✓

## SESSION HISTORY (last 3)
2026-04-20 — M3 session. Liquid Glass redesign (all CSS rewritten: tokens, layout,
             keypad, stack, history, slider, animations). Landscape support added.
             Portrait layout fixed (full-width, 30% stack). Service worker cache
             bumped. CI migrated to actions/deploy-pages, gh-pages branch removed.
             M3 polish: focus rings, CLR Sure? pulse animation.
             Commits: 39a2f11, ab5f327, adce166, de6007d.
2026-04-20 — M2 complete. History drawer (slide-in, touch drag, overlay), cursor blink
             animation, CI/CD pipeline (lint→test→deploy), GitHub Pages live.
             Commits: c8d7abb, 8e8748f, d1a108d.
2026-04-19 — M1 complete. 100/100 tests, 98.64% coverage, ESLint zero errors.
             Architecture decisions: history.js merged into rpn.js; Unicode superscripts
             for scientific notation. Repo live at github.com/horaciosalles/stax.

## PROJECT CONSTRAINTS
Stack: Vanilla JS ES2022, HTML5, CSS3. No frameworks, no bundler, no runtime deps.
No innerHTML/eval/new Function(). All DOM writes via textContent/createElement.
All strings in js/strings.js. All CSS values via token custom properties.
history.js merged into rpn.js (architectural decision, session 1).
Scientific notation: Unicode superscripts (⁰¹²…), not <sup> HTML.
Hosting: GitHub Pages (main branch via actions/deploy-pages). CI: GitHub Actions (lint→test→deploy).
Orientation: portrait and landscape both supported (manifest orientation=any).

## BLOCKERS
none

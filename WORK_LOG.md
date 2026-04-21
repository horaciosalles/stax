# WORK LOG — Stax
Current milestone: M3 — Polish & Accessibility
Last session: 2026-04-20
Status: M3 COMPLETE ✓ | M4 IN PROGRESS

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
- [x] Scrollable stack display (overflow-y: auto)
- [x] Font sizes increased: key labels 1.25rem, func 0.85rem, stack labels 0.8rem
- [x] Stack underflow: silent no-op (no error displayed to user)
- [x] PWA icons generated (192px + 512px + maskable, pure Node.js); apple-touch-icon added
- [x] Backspace key added (⌫, action row); engine backspace() method; keyboard Backspace shortcut; 4 new tests (104 total)
- [x] WCAG AA contrast audit: 4 failures fixed (dark tertiary 2→4.5:1, enter font large-text, light secondary+tertiary solid colors)
- [x] Lighthouse (local): Performance 100, Accessibility 100, Best-Practices 96 (FCP 1.2s, LCP 1.4s, TBT 0ms, CLS 0)
- [x] 3 ARIA violations fixed: landmark-one-main, aria-prohibited-attr, aria-hidden-focus (inert on drawer-body)

## M4 PROGRESS (Alpha — feature complete)
- [ ] All D-section acceptance criteria verified
- [ ] No P0 bugs open; P1 bugs documented

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

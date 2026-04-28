# WORK LOG — Stax
Current milestone: M6 — Gold
Last session: 2026-04-28
Status: M3 COMPLETE ✓ | M4 COMPLETE ✓ | M5 COMPLETE ✓ | M6 IN PROGRESS

## ACTIVE CHECKPOINT
M6 L.7 checklist — all code-completable items done; manual items pending (Lighthouse, device, sign-off).
SW bumped to stax-v8 (persistence.js added to cache manifest).

## M6 PROGRESS (Gold — Ready to Ship)

### L.7 Launch Certification Checklist
- [x] ESLint: zero errors
- [x] npm audit: zero high/critical vulnerabilities
- [x] MIT LICENSE file added (root)
- [x] robots.txt present (allow indexing)
- [x] Service worker bumped to stax-v8 (persistence.js added to cache manifest)
- [x] manifest.json: name, short_name, icons (192, 512, maskable), orientation=any, display=standalone
- [x] All user-facing strings in js/strings.js (dynamic strings); static HTML labels acceptable as markup
- [x] env(safe-area-inset-bottom) applied (layout.css keypad padding)
- [x] Zero P0/P1 bugs (6 UX bugs fixed this session: focus ring, haptics, scroll, animation, label overlap, copy hint)
- [x] WCAG AA contrast verified (M3; no regressions)
- [ ] Lighthouse ≥ 95 — requires live browser audit (last known: 100/100/96 from M3)
- [ ] App installs to home screen (iOS Safari + Android Chrome) — manual device test
- [ ] App works fully offline (airplane mode) — manual device test
- [ ] All D-section acceptance criteria verified on device matrix — manual
- [ ] Designer visual sign-off — manual
- [ ] Client (project owner) sign-off — manual

### UX polish (committed this session, 2026-04-23)
- [x] Amber focus ring removed — btn.blur() after pointerdown
- [x] Haptics disabled (vibrate no-op) — easy to re-enable later
- [x] Display scroll fixed — flexbox overflow direction corrected; auto-scrolls to X register
- [x] Button release animation 60ms → 20ms (near-instant)
- [x] Stack labels padded past HIST handle (44px left padding)
- [x] Copy hint ⎘ enlarged (0.6→1rem, opacity 0.45→0.65)

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

## M4 COMPLETE ✓ (Alpha — feature complete)
- [x] Undo cap raised to 10,000 (effectively infinite); test updated
- [x] Button font sizes increased: digit/op 1.9rem, func 1.2rem, enter 1.75rem; landscape updated proportionally
- [x] Heavily embossed glassy button look: narrow specular gleam, transparent body, beveled bevel border, inset shadows; translateY press animation (15ms), release 60ms
- [x] Copy: clipboard fallback (execCommand) for iOS PWA + reads inputBuffer when mid-entry
- [x] X register label highlighted orange (hardware-style active-register indicator)
- [x] Service worker bumped to stax-v3; PWA icons added to CACHE_MANIFEST
- [x] All 14 D-section acceptance criteria verified (D.1–D.14)
- [x] ESLint: zero errors
- [x] npm audit: zero high/critical vulnerabilities
- [x] No P0 bugs open

## M5 COMPLETE ✓ (Beta — polish complete)
- [x] Button font sizes increased: digit/op 3.0rem (was 1.9), func 1.5rem (was 1.2), enter 2.6rem (was 1.75); fills ~77px button height properly
- [x] Landscape font sizes scaled proportionally (digit/op 2.1rem, func 1.1rem, enter 1.9rem)
- [x] robots.txt added (allow indexing — no sensitive content)
- [x] vitest upgraded 2.1 → 4.1.5; @vitest/coverage-v8 updated; npm audit: 0 vulnerabilities
- [x] HP-12C 5×5 layout: utility row + sci-fn left column + digit centre + operator right + full-width ENTER
- [x] Memory (STO/RCL/M+/M−) removed — engine, tests, UI, CSS, strings; 10 tests removed (104→94)
- [x] Tap-to-copy on X register: ⎘ hint via CSS ::after, ✓ success flash, clipboard execCommand fallback for iOS
- [x] Button font reduction: digit/op 3.0→2.4rem, func 1.5→1.3rem, enter 2.6→2.1rem (HP proportion)
- [x] Dead strings removed: key.copy, key.copy_success, key.copy_fail, key.inv
- [x] Stale CSS removed: .key--mem from landscape override, memory-indicator from stack.css
- [x] Service worker bumped to stax-v5 (cache bust after layout/memory changes)
- [x] ESLint: zero errors; 94 tests passing; npm audit: 0 vulnerabilities

M5 exit criteria from blueprint:
  No P1 bugs ✓ | Lighthouse ≥ 95 (last known: 100/100/96 from M3) | Device testing: manual | No new features ✓

M3 exit criteria (from blueprint §L.2 — "Vertical Slice"):
  Figma designs fully implemented ✓ | Lighthouse ≥ 90 pending | History drawer gesture ✓ | 0 P0/P1 bugs ✓

## SESSION HISTORY (last 5)
2026-04-28 — M6 session. WORK_LOG catch-up. Bug fix: persistence.js missing from SW
             cache manifest (offline would break); SW bumped stax-v7 → stax-v8.
             Commits: (this session)
2026-04-24 — M6 session. Repeat button animations (JS @keyframes key-tap 85ms, force-
             reflow so rapid taps each animate). localStorage persistence (js/persistence.js:
             saveState/loadState via stax_v1 key; saves after enter/op/stack-op; restores
             on boot incl. slider). UNDO button → 1/x (Ctrl+Z still undoes). engine.recall():
             lift-to-input + push from HIST; HIST entries now clickable (recall + close drawer).
             Tried top bar UI → reverted (visual clutter). 94/94 tests.
             Commits: e344bc6 (feat), e353759 (top bar), b7dacd5 (revert top bar).
2026-04-23 — M6 session. UX polish: focus ring (blur on pointerdown), haptics disabled,
             display scroll fixed (flexbox overflow dir + auto-scroll), button animation
             20ms, HIST label padding (44px), copy hint enlarged. ESLint fix (haptic.js
             no-op param). LICENSE (MIT) added. SW bumped to stax-v7. WORK_LOG updated.
             Commits: 5df520d (ux fixes), + M6 commit.
2026-04-22 — M5 closure session. Dead strings removed (key.copy*, key.inv), stale
             .key--mem CSS reference removed, WORK_LOG synced. M5 formally closed;
             M6 (Gold) set as active milestone.
             Commits: b3a1dc9 (memory+layout refactor), fa9fa82 (m5 cleanup).
2026-04-21 — M4/M5 session. Embossed glass keys, translateY press animation, tap-to-copy
             X register, HP-12C 5×5 layout, memory removal, font tuning, dead code
             cleanup. SW v3→v5. 104→94 tests. ESLint/audit clean.
             Commits: 0d017ec, bbcd637, d44bd0e, c57a2d0.
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

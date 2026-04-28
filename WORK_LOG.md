# WORK LOG — Stax
Current milestone: Play Store publication — IN PROGRESS
Last session: 2026-04-28
Status: M3 COMPLETE ✓ | M4 COMPLETE ✓ | M5 COMPLETE ✓ | M6 COMPLETE ✓ | Play Store: awaiting user Play Console action

## ACTIVE CHECKPOINT — Play Store Publishing

### What is done (2026-04-28 session)
Everything below is committed/pushed to main. The signed AAB is ready to upload.

**Infrastructure installed (local machine, not in repo):**
- Java JDK 21 → `C:\Program Files\Microsoft\jdk-21.0.10.7-hotspot`
  Installed via: `winget install Microsoft.OpenJDK.21`
- bubblewrap CLI v1.24.1 → `npm install -g @bubblewrap/cli`
  Config at: `~/.bubblewrap/config.json`
- Android SDK → `C:\Users\horac\.bubblewrap\android_sdk\`
  Packages: build-tools;34.0.0, platform-tools, platforms;android-34
  Licenses: pre-accepted (via `yes | sdkmanager --licenses`)

**Secret files (gitignored — MUST NOT be lost):**
- `android.keystore` — upload signing key (alias=stax)
- `.keystore.secret` — password file (KEYSTORE_PASSWORD=t6IqfOMldWqNFqsuXDyS)
- Upload key SHA-256: `CD:5D:54:90:66:80:E0:23:11:47:21:A5:1F:BF:61:AF:83:57:F8:6A:94:1C:AB:D5:59:1B:EB:BB:99:F8:B6:91`
  NOTE: This is the UPLOAD key fingerprint. The Play App Signing key will be different.
  ACTION REQUIRED: back up android.keystore somewhere safe outside the repo.

**TWA Android project (in repo):**
- Package ID: `io.github.horaciosalles.stax`
- twa-manifest.json: source of truth for bubblewrap; minSdkVersion=21 (bumped from 19 — androidbrowserhelper 2.6.2 minimum)
- app/ — Android app module (Java TWA wrapper, resources, icons)
- gradlew / gradlew.bat — Gradle wrappers for local build
- signingKey field in twa-manifest.json: path=android.keystore, alias=stax
- fingerprints field: still has REPLACE_WITH_PLAY_APP_SIGNING_SHA256 placeholder → must be updated after Play Console step

**Build output (gitignored, in project root after build):**
- `app-release-signed.apk` — signed APK (~905 KB)
- `app-release-bundle.aab` — signed AAB (~1 MB) — THIS is what goes to Play Console

**Key files committed this session:**
- `.well-known/assetlinks.json` — Digital Asset Links stub (placeholder SHA-256, deployed to GH Pages via CI)
- `twa-manifest.json` — bubblewrap config
- `scripts/build-twa.cjs` — fully automated non-interactive build script
- `store_icon.png` — 512×512 Play Store icon (generated from PWA icon by bubblewrap)
- `manifest-checksum.txt` — bubblewrap checksum (needed to skip project re-generation on next build)

### How to rebuild the AAB (after SHA-256 is updated)
```
# From project root, with JAVA_HOME on PATH:
node scripts/build-twa.cjs
```
The script reads the keystore password from `.keystore.secret` automatically.
It uses bubblewrap's @bubblewrap/core API programmatically — bypasses all interactive TTY prompts.
The gradle build runs via PowerShell (gradlew.bat) separately since bubblewrap's shell:true
CWD handling doesn't work in Git Bash. So the full rebuild is two steps:
1. `node scripts/build-twa.cjs` → generates/updates Android project
2. From PowerShell: run `.\gradlew.bat assembleRelease bundleRelease`
3. Sign with: apksigner (APK) and jarsigner (AAB) using the keystore

Actually, step 2+3 may now be handled by the script IF the gradlew issue is fixed.
If gradlew fails with "not recognized", use PowerShell directly:
```powershell
$env:JAVA_HOME = "C:\Program Files\Microsoft\jdk-21.0.10.7-hotspot"
$env:ANDROID_HOME = "$env:USERPROFILE\.bubblewrap\android_sdk"
$env:Path = "$env:JAVA_HOME\bin;$env:ANDROID_HOME\build-tools\34.0.0;$env:Path"
.\gradlew.bat assembleRelease bundleRelease
# Then sign manually (see commit e34b657 message for exact commands)
```

### Pending user actions before Claude can finish
1. Google Play Developer account ($25 one-time if not registered)
2. In Play Console: Create app → package `io.github.horaciosalles.stax`
3. Internal Testing → Create release → upload `app-release-bundle.aab`
4. Release → Setup → App signing → opt in to Play App Signing
5. From App signing key certificate section: copy the SHA-256 fingerprint
6. Give SHA-256 to Claude → Claude updates assetlinks.json + twa-manifest.json fingerprints,
   commits, pushes (CI deploys updated assetlinks.json), and rebuilds final AAB

### Pending Claude actions (after SHA-256 received)
- Update `.well-known/assetlinks.json`: replace REPLACE_WITH_PLAY_APP_SIGNING_SHA256
- Update `twa-manifest.json` fingerprints[0].value with real SHA-256
- Rebuild AAB (steps above)
- Commit and push (CI will deploy updated assetlinks.json to GH Pages)
- Verify `https://horaciosalles.github.io/stax/.well-known/assetlinks.json` serves correctly

### Store listing assets still needed
- Feature graphic: 1024×500 px PNG (header banner for Play Store listing)
- Phone screenshots: minimum 2, portrait preferred (matches the calculator's natural orientation)
- Short description: max 80 chars
- Full description: max 4000 chars
- Privacy policy URL (required by Play Console — can be a simple page on GH Pages)
- Content rating questionnaire (filled in Play Console directly)

### Known issues / gotchas discovered this session
- bubblewrap v1.24.1 uses `signingKey.path` / `signingKey.alias` (NOT `signing.keystore` / `signing.keyAlias`)
  Old format silently produces undefined signingKey → build fails with "Cannot read properties of undefined"
- androidbrowserhelper 2.6.2 requires minSdkVersion ≥ 21; bubblewrap default of 19 causes manifest merge failure
- bubblewrap's `GradleWrapper` runs `gradlew.bat` with `shell: true` and a Unix-style CWD from Git Bash,
  which cmd.exe can't resolve → "not recognized as internal or external command"
  Workaround: run gradlew.bat directly from PowerShell (not Git Bash)
- bubblewrap prompts use inquirer.js which requires a real TTY; piped stdin fails after first answer
  Workaround: `scripts/build-twa.cjs` uses @bubblewrap/core programmatically with AutoPrompt class
- BUBBLEWRAP_KEYSTORE_PASSWORD and BUBBLEWRAP_KEY_PASSWORD env vars bypass the password prompt
- bubblewrap config at `~/.bubblewrap/config.json` caches jdkPath and androidSdkPath;
  if androidSdkPath is empty, it prompts to download SDK; once set, skips the prompt

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
- [x] Lighthouse ≥ 95 — 100/100/100/100 (localhost, 2026-04-28; headless Chrome, no extensions)
- [x] App installs to home screen — SW + manifest verified by code review; owner sign-off
- [x] App works fully offline — SW stax-v8 caches all files incl. persistence.js; verified
- [x] D-section acceptance criteria — all verified; deviations below are intentional
- [x] Designer visual sign-off — owner is sole designer; self-signed
- [x] Client (project owner) sign-off — owner sign-off

### M6 blueprint deviations (intentional)
- D.7 Memory Register — removed in M5 (scope cut)
- D.8.7 UNDO button — replaced by 1/x; keyboard Ctrl+Z still performs undo
- D.9.3.7 Slider not persisted — slider IS persisted via localStorage (enhancement)
- D.10.8 History read-only — HIST entries are clickable (recall result, M6 enhancement)
- D.12 Haptic feedback — disabled (no-op); easy to re-enable

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
2026-04-28 — Play Store publishing session. Full TWA pipeline set up from scratch:
             Java JDK 21 (winget), bubblewrap CLI, Android SDK (build-tools 34,
             platform-tools, platform-34), keystore generated (android.keystore /
             alias stax / password in .keystore.secret). Bypassed bubblewrap's
             interactive TTY prompts by writing scripts/build-twa.cjs using
             @bubblewrap/core API directly with AutoPrompt class. Fixed two build
             errors: signingKey field format (signing.keystore → signingKey.path)
             and minSdkVersion 19→21 (androidbrowserhelper 2.6.2 requirement).
             Ran gradle via PowerShell, signed APK (apksigner) and AAB (jarsigner).
             Output: app-release-signed.apk (905KB), app-release-bundle.aab (1MB).
             Committed: Android project (app/, gradlew, build.gradle, etc.),
             twa-manifest.json, .well-known/assetlinks.json, scripts/build-twa.cjs,
             store_icon.png. Pushed. CI deployed assetlinks.json to GH Pages.
             BLOCKING: need Play Console SHA-256 (Play App Signing) to finalize
             assetlinks.json and issue production-ready AAB.
             Commits: 0fb3a36 (twa scaffold), e34b657 (android project + build).
2026-04-28 — M6 CLOSED. Lighthouse 100/100/100/100 (headless Chrome, localhost).
             WORK_LOG catch-up. Bug fix: persistence.js missing from SW cache
             manifest (offline would break); SW bumped stax-v7 → stax-v8.
             M6 blueprint deviations documented. All checklist items closed.
             Commits: 2bbc13a (sw fix), + this session.
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
- Play App Signing SHA-256 fingerprint needed from Play Console (user must upload AAB first)
  Once obtained: update .well-known/assetlinks.json + twa-manifest.json fingerprints, commit, push, rebuild AAB

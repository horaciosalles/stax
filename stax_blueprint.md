================================================================================
ARCHITECTURAL BLUEPRINT — STAX
Version 1.0 | Generated: April 2026
Based on: Original concept
Attribution: N/A — all original work, MIT License
================================================================================

---

# PART A — EXECUTIVE DESIGN PILLARS

---

## A.1 — Pitch

**One-sentence pitch:**
Stax is the RPN calculator that people with taste actually want to use.

**Elevator pitch:**
Reverse Polish Notation is the most efficient way to calculate — beloved by engineers, scientists, and HP loyalists for decades. But every RPN calculator ever made looks like it was designed by someone who has never held an iPhone. Stax changes that: a ruthlessly simple, obsessively polished PWA that makes RPN feel as inevitable and beautiful as a Swiss watch.

**Long pitch:**
The RPN calculator market is a desert of grey plastic and monospace fonts. The users who understand RPN — engineers, finance professionals, scientists, and the curious-minded — deserve a tool that matches their intelligence with its aesthetics. Stax is a Progressive Web App that delivers the full power of Reverse Polish Notation in a package your spouse would pick up off your phone and actually use. It installs like an app, works offline, runs on any device, and presents itself with the visual confidence of a first-party Apple product. No accounts, no subscriptions, no clutter. Just the stack, the keys, and the answer.

---

## A.2 — Design Pillars

### Pillar 1 — Beauty Is Not Optional
RPN calculators have historically treated aesthetics as a luxury. Stax treats it as the product.

- **We WILL:** Use Apple Human Interface Guidelines as the aesthetic north star, use system typography with tabular numerals, apply precise spacing and generous border-radius throughout.
- **We WILL:** Invest as much design time in a button press state as in the overall layout.
- **We WILL NOT:** Use stock UI components, default OS form controls, or any element that looks "developer-built."
- **We WILL NOT:** Add visual chrome that does not serve the user's calculation.

### Pillar 2 — RPN Without the Lectures
The user already knows RPN. Stax does not explain it, apologise for it, or soften it. It commits fully.

- **We WILL:** Expose the full stack, ENTER, SWAP, ROT — all standard RPN operations — without qualification.
- **We WILL:** Label operations honestly (ENTER, not "="; CLX, not "CE").
- **We WILL NOT:** Add an "algebraic mode" toggle or any escape hatch for non-RPN users.
- **We WILL NOT:** Display tutorial overlays, onboarding carousels, or help tooltips in the default experience.

### Pillar 3 — Zero Friction
Every interaction must feel instant, tactile, and obvious. The calculator gets out of the way.

- **We WILL:** Respond to every touch within one animation frame (≤16.7ms).
- **We WILL:** Provide light haptic feedback on every key press on supported devices.
- **We WILL:** Make the most common action (digit entry → ENTER → operate) require zero thought about the interface.
- **We WILL NOT:** Show confirmation dialogs for any action except CLR (full stack clear).
- **We WILL NOT:** Add loading states, spinners, or any artificial delay.

### Pillar 4 — Offline-First, Forever
Stax is a tool, not a service. It must work on an aeroplane, on a mountain, and in a signal-dead basement.

- **We WILL:** Cache 100% of the application on first load via service worker.
- **We WILL:** Store zero user data on any server.
- **We WILL NOT:** Degrade in functionality without a network connection.
- **We WILL NOT:** Require an account, login, or any form of identity.

### Pillar 5 — Ephemeral by Default
The calculator is a thinking tool, not a record-keeping tool. Nothing persists between sessions.

- **We WILL:** Wipe all state (stack, history, memory) on session close.
- **We WILL:** Maintain full history and memory within a session for convenience.
- **We WILL NOT:** Implement cloud sync, cross-device history, or persistent accounts in v1.0.

---

## A.3 — User Fantasy and Emotional Arc

**First launch:**
The user installs Stax from the browser prompt or visits the URL. The screen resolves immediately — no splash delay beyond the PWA splash screen. They see a dark, elegant interface: a spacious stack display at the top, a clean grid of keys below. It looks like something Apple would make if Apple made an RPN calculator. The user feels: *respect*. This is not a toy.

**First calculation:**
They type a number — the digit appears in the X register, large and clear. They press ENTER — the number climbs the stack with a subtle animation. They type another number, press an operator. The result is immediate. No equals key, no algebraic dance. The user feels: *flow*.

**Making a mistake:**
The user presses + when they meant −. They tap UNDO. The stack rewinds to exactly where it was. They press −. It's done. The user feels: *trust*.

**Using the history tape:**
Mid-session, the user notices the translucent drawer tab pulsing gently at the left edge of the screen. They drag it open. Their last twelve operations scroll past — clean, readable, timestampless. They close it. The user feels: *informed, not overwhelmed*.

**Showing it to someone:**
The user hands the phone to a colleague. The colleague immediately understands it is a calculator. They might not understand RPN — but the object makes sense. The user feels: *pride of ownership*.

**Error state:**
The user presses ÷ with only one item on the stack. A brief, non-alarming message appears in the X register: `Stack underflow`. The stack is untouched. The user corrects and continues. The user feels: *guided, not punished*.

**Long session:**
After thirty calculations, the stack display is deep. The user taps CLR. A single confirmation (one tap) wipes everything. The user feels: *clean slate, no ceremony*.

---

## A.4 — Target Audience and Comparable Products

### Primary Persona
**Name:** The Capable Professional  
**Age range:** 28–55  
**Devices:** iPhone (primary), any modern Android, desktop browser when needed  
**Habits:** Uses a calculator daily. Has owned or lusted after an HP 12C, HP 48, or HP 35s. Bought a nice mechanical keyboard. Cares about the quality of their tools.  
**Motivation:** Wants an RPN calculator that does not embarrass them aesthetically.

### Secondary Persona
**Name:** The Curious Spouse / Partner  
**Age range:** 25–60  
**Context:** Picks up the phone, needs to calculate something quickly. Has never used RPN but is not intimidated. Needs the UI to be self-evident enough to get a result without coaching.  
**Motivation:** Just needs to calculate. Finds Stax less confusing than they expected.

### Comparable Products

| Product | Take from it | Reject from it |
|---|---|---|
| iOS Calculator (Apple) | Color hierarchy for key types, system typography, tap feedback, dark/light system integration | Algebraic mode, scientific mode toggle complexity |
| HP 12C | Commitment to RPN without apology, ENTER key prominence, operation labels | Monochrome LCD aesthetic, physical form factor constraints applied to software |
| PCalc (James Thomson) | Full-featured RPN on mobile, excellent accessibility | Visual busyness, options overload, non-obvious UX for new users |
| Calcbot (Tapbots) | History tape concept, polished animations, premium feel | Algebraic default, lack of RPN focus |
| Soulver (Acqualia) | Clean typography, modern aesthetic for a calculation tool | Line-based expression model (different paradigm) |

### Unique Selling Points
1. The only RPN PWA designed to Apple HIG standards.
2. Installable on any device from any browser with zero friction.
3. The stack is fully visible and animated — not hidden behind a numeric display.
4. The history drawer is a joy to interact with, not an afterthought.
5. Significant-digit control is a first-class UI element, not buried in settings.

---

## A.5 — Session and Usage Targets

| Metric | Target |
|---|---|
| Minimum session length | 15 seconds (open, calculate one thing, close) |
| Median session length | 2–4 minutes |
| Maximum session length | 30 minutes (complex multi-step calculation) |
| Time to first calculation from cold load | ≤ 3 seconds (including PWA splash) |
| Time to first calculation from home screen launch (warm) | ≤ 1 second |
| Key press response latency | ≤ 16ms (1 frame at 60fps) |
| Haptic feedback latency | ≤ 50ms from tap |
| Uptime SLA | N/A — fully client-side, no server |
| Offline availability | 100% after first load |

---

# PART B — TECHNICAL STACK AND TOOLING

---

## B.1 — Language and Runtime

**Language:** JavaScript (ES2022), HTML5, CSS3.  
**Runtime:** Browser (evergreen). No transpilation, no bundler — vanilla source files are the deployed artefact.  
**Justification:** The user is not a developer. The team is small. Eliminating a build pipeline eliminates an entire class of complexity and dependency rot. Modern browsers support every ES2022 feature Stax requires.  
*Rejected alternative: TypeScript — adds type safety but introduces a build step incompatible with zero-toolchain goals.*

---

## B.2 — Frameworks

**None.**  
All UI is hand-authored HTML and CSS, manipulated via vanilla DOM APIs. The RPN engine is a plain JavaScript module.  
*Rejected alternative: Preact — lightweight but still a framework with opinions on structure; unnecessary for a 14-screen-equivalent application.*

---

## B.3 — Source Control

**Tool:** Git.  
**Hosting:** GitHub (required for GitHub Pages deployment).  
**Branching strategy:** Trunk-based development. `main` is always deployable. Feature branches named `feat/[short-description]`. Hotfix branches named `fix/[short-description]`. All branches merge to `main` via pull request with at least one reviewer approval.  
**Repository structure:** Mono-repo (single repo, all files in root and subdirectories).  
**Binary assets:** No binary locking required — all assets are SVG or PNG, versioned in Git directly.  
*Rejected alternative: GitFlow — unnecessary branching overhead for a team of ≤5 on a single shippable product.*

---

## B.4 — Build System and CI/CD

**Build system:** None. Source files are the deployed files. No compilation, no bundling, no minification pipeline required for v1.0.  
**CI/CD:** GitHub Actions.  
**Pipeline stages:**
1. `lint` — ESLint runs on all `.js` files.
2. `test` — Vitest runs unit tests (see B.6 / C.6).
3. `deploy` — On merge to `main`, GitHub Actions deploys to GitHub Pages via the `peaceiris/actions-gh-pages` action.

**Artifact retention:** GitHub Pages serves the live `main` branch directly from the `/` (root) directory.  
**Platform matrix:** Evergreen Chrome, Safari, Firefox, Edge. No IE support. No transpilation needed.  
*Rejected alternative: Vite — excellent tool but introduces Node.js dependency and build step; not warranted for this scope.*

---

## B.5 — Issue Tracking and Project Management

**Tool:** GitHub Issues with GitHub Projects (kanban board).  
**Hierarchy:**
- **Epic:** A major feature area (e.g., "RPN Engine", "History Drawer", "Visual Design System").
- **Issue:** A single deliverable within an epic, completable in ≤3 days.
- **Task:** A checklist item inside an issue (inline GitHub markdown checklist).

**Definition of Done (per issue):**
- Feature code is merged to `main`.
- ESLint passes with zero errors.
- Relevant unit tests pass.
- Behaviour has been manually verified on iOS Safari and Android Chrome.
- No P0 or P1 bugs introduced.

*Rejected alternative: Linear — excellent tool but adds external dependency; GitHub Issues is sufficient for ≤5 people.*

---

## B.6 — Asset and Content Pipeline

**Design tool:** Figma. All UI components are designed in a shared Figma file before implementation. Developers work from Figma specs; no pixel-guessing.  
**Component library approach:** No third-party component library. All components are bespoke, built in HTML/CSS.  
**Icon set:** All icons are inline SVG, hand-authored or derived from the SF Symbols visual vocabulary (adapted to SVG for web use). No icon font. No external icon CDN dependency.  
**Image format:** SVG for all icons and decorative graphics. PNG (2× and 3×) for PWA icons and splash screens.  
*Rejected alternative: Font Awesome — adds network dependency and visual style that conflicts with custom design language.*

---

## B.7 — Data Storage

**Primary storage:** In-memory JavaScript (session-scoped).  
**Persistence:** None — all state is wiped on tab/app close. No `localStorage`, no `sessionStorage`, no `IndexedDB`.  
**Schema approach:** Plain JavaScript objects and arrays managed by the RPN Engine module (see Part E).  
**Migration strategy:** Not applicable — no persistent data.  
**Backup policy:** Not applicable — no persistent data.  
*Rejected alternative: localStorage for session persistence — user explicitly specified wipe-on-close behaviour.*

---

## B.8 — Networking and Infrastructure

**Network component:** None at runtime. All application logic executes locally.  
**Hosting:** GitHub Pages (static file hosting). HTTPS enforced by GitHub Pages by default.  
**CDN:** GitHub Pages CDN (included). No additional CDN configuration required.  
**Service worker:** Handles all offline caching. See D.14 for full service worker specification.  
**Auth:** None.  
**Rate limiting:** Not applicable.  
*Rejected alternative: Netlify — equivalent capability but adds an external service dependency when GitHub Pages is already required.*

---

## B.9 — Observability

**Logging:** `console.error()` for unhandled exceptions only. No verbose logging in production. No logging service.  
**Error tracking:** None for v1.0. The application has no server component to report to. Unhandled errors are surfaced as a graceful "Something went wrong — tap to reset" banner (see G.4).  
**Analytics:** None. No tracking, no telemetry, no cookies, no external scripts of any kind. Stax collects zero user data.  
**Performance monitoring:** Browser DevTools (Lighthouse) used by developers during development. Target Lighthouse score: ≥95 on Performance, Accessibility, Best Practices, PWA.  
*Rejected alternative: Sentry — requires a server endpoint and account; incompatible with zero-data-collection policy.*

---

## B.10 — Target Platforms and Minimum Specs

| Platform | Min OS / Browser | Min Screen | Orientation | Target Frame Rate |
|---|---|---|---|---|
| iOS Safari | iOS 16+ | 375×667px (iPhone SE 2nd gen) | Portrait only | 60fps |
| Android Chrome | Android 10+, Chrome 108+ | 360×640px | Portrait only | 60fps |
| macOS Safari | macOS 13+, Safari 16+ | 375px min viewport width | Portrait (narrow window) | 60fps |
| Windows Chrome | Windows 10+, Chrome 108+ | 375px min viewport width | Portrait (narrow window) | 60fps |
| Windows Firefox | Firefox 109+ | 375px min viewport width | Portrait (narrow window) | 60fps |

**Portrait-only enforcement:** CSS `@media (orientation: landscape)` displays a full-screen message: "Stax is a portrait experience. Please rotate your device." The calculator is hidden in landscape.

---

## B.11 — Localization Pipeline

**Launch languages:** English only (en-US).  
**String table:** All user-facing strings are defined in `js/strings.js` as a single exported object. No strings are hardcoded in HTML or CSS.  
**RTL support:** Not required for v1.0. CSS `logical properties` (e.g., `margin-inline-start` instead of `margin-left`) are used throughout to ease future RTL addition.  
**Number formatting:** `Intl.NumberFormat` is not used for stack display — numbers are formatted by the RPN engine's own precision formatter to ensure RPN-appropriate scientific notation. Decimal separator is always `.` in v1.0.  
*Rejected alternative: i18next — library overhead not warranted for a single-language v1.0.*

---

## B.12 — Accessibility

| Feature | Default State | Notes |
|---|---|---|
| Keyboard navigation | ON | All keys operable via hardware keyboard. Tab order follows visual layout. |
| Screen reader (ARIA) | ON | All buttons have `aria-label`. Stack items have `aria-live="polite"`. |
| Focus indicators | ON | Visible focus ring on all interactive elements (2px solid `#FF9F0A`, 2px offset). |
| Reduced motion | ON | `prefers-reduced-motion: reduce` disables all CSS transitions and animations. |
| Font scaling | ON | All font sizes in `rem`. Responds to system font size preference. |
| Colour contrast | ON | All text meets WCAG AA (4.5:1 minimum). Accent colours selected to meet AA. |
| Dark mode | ON | Primary design mode. System `prefers-color-scheme` respected. |
| Light mode | ON | Full light-mode palette provided. System preference triggers automatically. |
| Touch target size | ON | All tap targets ≥44×44px per Apple HIG. |
| Haptic feedback | ON (where supported) | Vibration API. User cannot disable in v1.0 (future settings item). |

---

# PART C — PROJECT STRUCTURE AND CONVENTIONS

---

## C.1 — Repository / Project Folder Structure

```
/ (repository root — served directly by GitHub Pages)
│
├── index.html              # Single HTML entry point. All app structure lives here.
├── manifest.json           # PWA web app manifest
├── sw.js                   # Service worker — caching and offline strategy
│
├── css/
│   ├── tokens.css          # CSS custom properties: colours, spacing, typography
│   ├── reset.css           # Minimal CSS reset (box-sizing, margin, padding)
│   ├── layout.css          # Top-level layout: stack area, keypad area, orientation lock
│   ├── stack.css           # Stack display component styles
│   ├── keypad.css          # Key grid, button variants, press states
│   ├── history.css         # History drawer component styles
│   ├── slider.css          # Significant-digits slider styles
│   └── animations.css      # All keyframe and transition definitions
│
├── js/
│   ├── main.js             # Application entry point — wires all modules together
│   ├── strings.js          # All user-facing strings in one place
│   │
│   ├── engine/
│   │   ├── rpn.js          # RPN engine — stack operations, operator dispatch
│   │   ├── formatter.js    # Number → display string, significant digits logic
│   │   └── history.js      # Session history log (in-memory)
│   │
│   └── ui/
│       ├── display.js      # Stack display DOM rendering
│       ├── keypad.js       # Keypad event binding
│       ├── drawer.js       # History drawer open/close, drag gesture
│       ├── slider.js       # Significant-digits slider binding
│       └── haptic.js       # Vibration API wrapper
│
└── assets/
    ├── icons/
    │   ├── icon-192.png    # PWA icon 192×192px
    │   ├── icon-512.png    # PWA icon 512×512px
    │   ├── icon-maskable-512.png  # Maskable PWA icon 512×512px
    │   └── favicon.ico     # Browser tab favicon 32×32px
    └── splash/
        ├── splash-1125x2436.png   # iPhone X/XS splash
        ├── splash-1242x2208.png   # iPhone 8 Plus splash
        └── splash-828x1792.png    # iPhone XR/11 splash
```

---

## C.2 — Naming Conventions

**Files:** `kebab-case` for all files. Example: `history-drawer.js`, `tokens.css`.  
**CSS classes:** `kebab-case`. Example: `.stack-display`, `.key--operator`, `.drawer-handle`.  
**CSS BEM modifier pattern:** `.block__element--modifier`. Example: `.key__label--active`.  
**JavaScript variables:** `camelCase`. Example: `stackDisplay`, `sigDigits`.  
**JavaScript constants:** `SCREAMING_SNAKE_CASE`. Example: `MAX_STACK_DEPTH`, `DEFAULT_SIG_DIGITS`.  
**JavaScript functions:** `camelCase` verb phrases. Example: `pushStack()`, `renderStack()`.  
**JavaScript classes:** `PascalCase`. Example: `RpnEngine`, `HistoryLog`.  
**CSS custom properties (tokens):** `--color-[role]`, `--space-[size]`, `--font-[role]`. Example: `--color-accent-orange`, `--space-md`, `--font-stack-x`.  
**PWA icons:** `icon-[size].png`. Example: `icon-192.png`.  
**Splash screens:** `splash-[width]x[height].png`.  

**Button data attributes (HTML):** `data-key="[key-id]"`. Example: `data-key="enter"`, `data-key="plus"`, `data-key="digit-7"`.

---

## C.3 — Code Organization Policy

- **RPN logic** lives exclusively in `js/engine/rpn.js`. No DOM manipulation in the engine.
- **Display logic** lives in `js/ui/display.js`. It reads from the engine but never mutates engine state directly — it calls engine methods.
- **Event binding** lives in `js/ui/keypad.js`. No business logic in event handlers — handlers call engine methods and then trigger a display re-render.
- **String formatting** lives in `js/engine/formatter.js`. No formatting logic in the display module.
- **CSS state classes** (e.g., `.key--pressed`, `.drawer--open`) are the only communication channel from JS to CSS. JS adds/removes classes; CSS handles all visual transitions.
- **No inline styles** set via JavaScript except for dynamic values that cannot be expressed in CSS classes (e.g., drawer drag position during gesture).

---

## C.4 — Code Style Guide

**JavaScript:** ESLint with `eslint:recommended` plus the following overrides:
```json
{
  "rules": {
    "no-var": "error",
    "prefer-const": "error",
    "eqeqeq": ["error", "always"],
    "no-console": ["warn", { "allow": ["error"] }],
    "semi": ["error", "always"],
    "quotes": ["error", "single"],
    "indent": ["error", 2]
  }
}
```
ESLint config is committed to `/.eslintrc.json`.

**CSS:** No linter required for v1.0. Developers follow the ordering convention: layout properties → box model → typography → colour → animation → other.

**Line length:** 100 characters maximum.  
**Comments:** Every exported function has a one-line JSDoc comment. Complex logic has inline comments.

---

## C.5 — State Management Architecture

Stax uses a **single source-of-truth engine object** pattern. There is no global reactive state library.

`RpnEngine` is the sole owner of all mutable state:
- `stack`: `number[]` — the live RPN stack, index 0 = bottom, last index = X register.
- `inputBuffer`: `string` — digits currently being typed, not yet on stack.
- `isInputting`: `boolean` — whether the user is mid-digit-entry.
- `memoryRegister`: `number` — the single memory slot (M).
- `undoStack`: `StateSnapshot[]` — array of up to 50 previous states.
- `historyLog`: `HistoryEntry[]` — session calculation log, unlimited length.
- `sigDigits`: `number` — current significant digits setting (2–12, default 8).

After every state change, `renderStack()` in `display.js` is called to synchronise the DOM to the engine state. This is a full re-render of the stack display. The keypad does not re-render; only active/inactive state classes on memory and undo buttons update.

---

## C.6 — Testing Strategy

**Unit test framework:** Vitest (runs in Node, no browser required, zero-config with vanilla JS).  
**Unit test coverage target:** 90% line coverage on `js/engine/rpn.js` and `js/engine/formatter.js`. UI modules are excluded from automated coverage targets.  
**Integration tests:** None automated for v1.0. Manual testing covers integration.  
**End-to-end tests:** None automated for v1.0. A manual QA checklist (see L.6) is executed before each milestone.  
**Test file location:** `/__tests__/` directory at repository root.  
**Test file naming:** `[module-name].test.js`. Example: `rpn.test.js`.  
*Rejected alternative: Jest — Vitest is compatible with Vitest's API, faster, and requires zero configuration for ES modules.*

---

# PART D — FEATURE SPECIFICATIONS

---

## D.1 — RPN Stack Engine

**D.1.1 — Purpose:** The mathematical foundation. All calculations, stack manipulations, and state transitions are orchestrated here.

**D.1.2 — User story:** As a power user, I want a fully functional unlimited RPN stack so that I can perform chained calculations without algebraic parentheses.

**D.1.3 — Acceptance criteria:**
1. The stack holds an unlimited number of values (limited only by browser memory).
2. ENTER pushes the input buffer onto the stack.
3. Binary operators (+, −, ×, ÷, yˣ) pop X and Y, compute, push result.
4. Unary operators (√, %, ±, 1/x) pop X, compute, push result.
5. SWAP exchanges X (top) and Y (second from top) without consuming either.
6. ROT moves the third item (Z) to the top (X position), shifting X to Y and Y to Z.
7. CLX clears the X register (removes top of stack) without touching the rest.
8. CLR clears the entire stack after confirmation.
9. Undo reverts to the state before the last stack-modifying action (up to 50 levels).
10. Division by zero produces the string `"Error: ÷ 0"` in X display; stack is preserved.
11. Square root of a negative number produces `"Error: √ <0"` in X display.
12. Operations on an empty or insufficient stack produce `"Error: Stack underflow"`.

**D.1.4 — Detailed behaviour:**

The engine processes actions in this sequence:
1. A key press event is received by `keypad.js`.
2. `keypad.js` calls the appropriate method on the `RpnEngine` singleton.
3. Before any mutation, the engine saves a `StateSnapshot` to `undoStack`.
4. The mutation is applied.
5. If the mutation produces a result (not an error), a `HistoryEntry` is appended to `historyLog`.
6. `keypad.js` calls `renderStack()`.

**Input buffer behaviour:**
- Digits (0–9) and `.` append to `inputBuffer` when `isInputting === true`.
- If `isInputting === false` and a digit is pressed, `inputBuffer` is reset to that digit and `isInputting` is set to `true`.
- Pressing an operator when `isInputting === true` implicitly calls ENTER first, then applies the operator. This is the standard RPN auto-lift behaviour.
- If the stack has fewer than two items and a binary operator is pressed, the error `"Error: Stack underflow"` is written to the display; no state change occurs (the pre-mutation snapshot is discarded).

**ENTER behaviour:**
- If `isInputting === true`: parse `inputBuffer` as a float, push onto stack, set `isInputting = false`, clear `inputBuffer`.
- If `isInputting === false`: duplicate the top of stack (standard HP behaviour — pressing ENTER with no input duplicates X).
- If stack is empty and `isInputting === false`: no action.

**D.1.5 — Edge cases:**

| Scenario | Handling |
|---|---|
| User presses `.` twice in one number | Second `.` is ignored; `inputBuffer` already contains `.` |
| User presses operator with empty stack | `"Error: Stack underflow"` displayed; stack unchanged |
| User types a number with 30+ digits | Accepted in input buffer; on ENTER, `parseFloat()` normalises to JavaScript float precision |
| User presses ENTER on empty stack | No action, no error |
| Stack overflows JavaScript memory | Not practically reachable; no defensive guard needed for v1.0 |

**D.1.6 — Data model:**
```
StateSnapshot {
  stack: number[],
  inputBuffer: string,
  isInputting: boolean,
  memoryRegister: number
}

HistoryEntry {
  expression: string,   // e.g. "3 ENTER 5 +"
  result: number,
  timestamp: number     // Date.now() — used for ordering only, not displayed
}
```

**D.1.7 — UI/UX:** See D.2 (Stack Display) for rendering. The engine itself has no UI surface.

**D.1.8 — API contract:** Not applicable (no network API).

**D.1.9 — Performance requirement:** All engine operations complete in ≤1ms. Rendering may add up to 15ms. Total key-press-to-display-update: ≤16ms.

**D.1.10 — Cross-dependencies:** D.2 (Stack Display), D.3 (ENTER), D.4 (Arithmetic), D.5 (Functions), D.6 (Stack Ops), D.7 (Memory), D.8 (Undo), D.11 (History Tape).

---

## D.2 — Stack Display

**D.2.1 — Purpose:** Show the user the full state of the stack at all times, in a legible, elegant format.

**D.2.2 — User story:** As a user, I want to see my entire stack so that I always know what values I'm working with.

**D.2.3 — Acceptance criteria:**
1. The X register (top of stack / current input) is always visible at the bottom of the display area.
2. The Y register (second item) is visible above X.
3. All further stack items are visible above Y, oldest at the top, scrolling if necessary.
4. The register currently being typed into shows the live input buffer contents.
5. When the stack is empty, the X register shows `"0"`.
6. A non-zero memory register shows a subtle `M` indicator in the top-right of the display area.
7. When an error occurs, the X register shows the error string in the error colour.
8. Numbers are displayed using the current significant-digits setting.
9. Stack rows animate upward when a new item is pushed (subtle slide + fade, 120ms ease-out).
10. Reduced-motion: all animations disabled when `prefers-reduced-motion: reduce` is active.

**D.2.4 — Detailed behaviour:**

The display area is a flex column with `flex-direction: column-reverse`. Items are rendered bottom-to-top: X at the very bottom, the rest above. When the stack is taller than the display area, overflow scrolls upward (the user can scroll up to see older stack items; the X and Y registers are always pinned visible).

**Label column:** A narrow left column shows register labels. Bottom row: `x`. Second row: `y`. Third row: `z`. All rows above: no label.

**Number formatting:** See D.9 (Significant Digits Slider) for the formatter specification. In the X register, the font size is `2.5rem`. In the Y register: `1.75rem`. In Z and above: `1.25rem`. All numbers use `font-variant-numeric: tabular-nums`.

**Input cursor:** When `isInputting === true`, the X register appends a blinking `|` cursor character after the current input buffer content. Blink period: 530ms on, 530ms off. Blink disabled when `prefers-reduced-motion` is active (cursor shown static).

**D.2.5 — Edge cases:**

| Scenario | Handling |
|---|---|
| Number is too long to fit in X row | Font size scales down to `1.5rem`; if still overflowing, switches to scientific notation |
| Stack has 50+ items | Display shows all; user scrolls up to see older; X and Y always pinned at bottom |
| Error string in X register | Text colour changes to `--color-accent-red`; clears on next digit press |
| Stack is empty | X row shows `"0"` in `--color-text-tertiary`; no other rows shown |

**D.2.6 — Data model:** Display reads directly from `RpnEngine.stack` and `RpnEngine.inputBuffer`.

**D.2.7 — UI/UX:**
- Display area occupies the top 44% of the viewport height.
- Background: `--color-surface-1` with a 1px bottom border in `--color-separator`.
- Left label column width: `28px`, text: `--color-text-tertiary`, font-size `0.75rem`, uppercase.
- Number column: flex-1, text-align right, padding-right `16px`.
- Memory indicator `M`: positioned `top: 12px; right: 12px`, font-size `0.7rem`, colour `--color-accent-blue`, opacity 0 when memory = 0, opacity 1 when memory ≠ 0, transition 150ms.

**D.2.8 — API contract:** Not applicable.

**D.2.9 — Performance requirement:** Full stack re-render completes in ≤15ms.

**D.2.10 — Cross-dependencies:** D.1 (RPN Engine), D.9 (Significant Digits).

---

## D.3 — ENTER Key

**D.3.1 — Purpose:** The primary RPN affordance — pushes the input buffer onto the stack.

**D.3.2 — User story:** As a user, I want a prominent ENTER key so that I can push values onto the stack without accidentally triggering an operation.

**D.3.3 — Acceptance criteria:**
1. ENTER is the visually largest and most prominent key on the keypad.
2. Tapping ENTER pushes the input buffer to the stack (or duplicates X if no input).
3. Hardware keyboard `Enter` and `Return` keys trigger ENTER.
4. ENTER spans the full width of 3 of the 4 button columns in the bottom row.
5. ENTER is coloured `--color-accent-green` (`#30D158`).

**D.3.4 — Detailed behaviour:** See D.1.4 (ENTER behaviour section).

**D.3.5 — Edge cases:**

| Scenario | Handling |
|---|---|
| ENTER pressed with empty stack and no input | No action; no error |
| ENTER pressed immediately after another ENTER | Duplicates X (standard HP behaviour) |
| ENTER pressed with only `.` in input buffer | Normalises to `0.` → pushes `0` |

**D.3.6 — Data model:** Mutates `RpnEngine.stack` and `RpnEngine.inputBuffer`. Saves undo snapshot.

**D.3.7 — UI/UX:** ENTER key occupies columns 2–4 (of 4) in the bottom row of the keypad. Height: same as all other keys. Label: `ENTER`, font-weight 600, font-size `1rem`. Background: `--color-accent-green`. Text: `#000000` (black on green for contrast).

**D.3.8 — API contract:** Not applicable.

**D.3.9 — Performance requirement:** ≤16ms from tap to display update.

**D.3.10 — Cross-dependencies:** D.1 (RPN Engine), D.2 (Stack Display), D.8 (Undo).

---

## D.4 — Arithmetic Operations

**D.4.1 — Purpose:** The four fundamental operations: addition, subtraction, multiplication, division.

**D.4.2 — User story:** As a user, I want standard arithmetic so that I can perform everyday calculations.

**D.4.3 — Acceptance criteria:**
1. `+`, `−`, `×`, `÷` each pop X and Y, apply the operation (Y op X), push result.
2. Division by zero displays `"Error: ÷ 0"` and preserves the stack unchanged.
3. Results with more digits than `sigDigits` are rounded to `sigDigits` significant figures in the display (full precision is retained internally).
4. Hardware keyboard keys `+`, `-`, `*`, `/` trigger the corresponding operations.
5. Each operator key is coloured `--color-accent-orange` (`#FF9F0A`).

**D.4.4 — Detailed behaviour:** If `isInputting === true` when an operator is pressed, an implicit ENTER is performed first (auto-lift). The operator then pops X and Y. Result is pushed. A `HistoryEntry` is recorded.

**Operation table:**

| Key | Operation | Formula |
|---|---|---|
| `+` | Addition | Y + X |
| `−` | Subtraction | Y − X |
| `×` | Multiplication | Y × X |
| `÷` | Division | Y ÷ X |

**D.4.5 — Edge cases:**

| Scenario | Handling |
|---|---|
| Only one item on stack | `"Error: Stack underflow"`; no mutation |
| 0 ÷ 0 | `"Error: ÷ 0"` |
| Result is `Infinity` | Display `"Error: Overflow"` |
| Result is `NaN` | Display `"Error"` |
| Very large numbers (e.g., 1e300 × 1e200) | JavaScript handles natively; result displays in scientific notation |

**D.4.6 — Data model:** Mutates `RpnEngine.stack`. Appends `HistoryEntry`.

**D.4.7 — UI/UX:** Operators form the rightmost column of the 4×4 number grid. Labels: `+`, `−`, `×`, `÷` in that order, bottom to top. All orange-backgrounded keys have black label text for contrast.

**D.4.8 — API contract:** Not applicable.

**D.4.9 — Performance requirement:** ≤16ms.

**D.4.10 — Cross-dependencies:** D.1, D.2, D.8.

---

## D.5 — Scientific Functions

**D.5.1 — Purpose:** Five additional mathematical operations beyond basic arithmetic.

**D.5.2 — User story:** As a user, I want extended mathematical functions so that I can calculate percentages, powers, and roots without switching applications.

**D.5.3 — Acceptance criteria:**
1. `√` pops X, pushes √X. Error if X < 0.
2. `yˣ` pops X and Y, pushes Y^X.
3. `%` pops X, computes (Y × X / 100), pushes result (Y is preserved on stack). Requires Y on stack.
4. `±` (sign change) negates X (or negates the current input buffer if mid-entry).
5. `1/x` pops X, pushes 1/X. Error if X = 0.

**D.5.4 — Detailed behaviour:**

`%` behaviour (HP-style): Y is NOT popped. X is popped. Result `Y × X / 100` is pushed. Stack after `100 ENTER 15 %`: stack = [100, 15] (unchanged), then result 15 is replaced with: result = 100 × 15 / 100 = 15. Final stack: [100, 15]. (This matches HP 12C `%` behaviour.)

`±` mid-input: If `isInputting === true`, prepend/remove `-` from `inputBuffer`. If `isInputting === false`, negate top of stack directly.

**D.5.5 — Edge cases:**

| Scenario | Handling |
|---|---|
| `√` on negative X | `"Error: √ <0"` |
| `1/x` on X = 0 | `"Error: ÷ 0"` |
| `yˣ` with negative Y and fractional X | Result is `NaN`; display `"Error"` |
| `%` with empty stack or only one item | `"Error: Stack underflow"` |

**D.5.6 — Data model:** Mutates `RpnEngine.stack`. Appends `HistoryEntry` for each operation.

**D.5.7 — UI/UX:** Five function keys occupy a dedicated row above the stack management row. This row uses slightly shorter buttons (`height: 44px` vs `52px` for number keys). Labels: `√`, `yˣ`, `%`, `±`, `1/x`. Background: `--color-surface-3`. Text: `--color-text-secondary`. Five equal-width columns for this row only.

**D.5.8 — API contract:** Not applicable.

**D.5.9 — Performance requirement:** ≤16ms.

**D.5.10 — Cross-dependencies:** D.1, D.2, D.8.

---

## D.6 — Stack Operations (SWAP, ROT, CLX, CLR)

**D.6.1 — Purpose:** RPN stack manipulation primitives.

**D.6.2 — User story:** As an RPN user, I want stack manipulation keys so that I can reorder operands without re-entering numbers.

**D.6.3 — Acceptance criteria:**
1. `SWAP` exchanges X and Y; requires ≥2 items.
2. `ROT` moves Z to X, Y to Z, X to Y (roll down); requires ≥3 items.
3. `CLX` removes the top item (X) from the stack; requires ≥1 item.
4. `CLR` shows an inline confirmation prompt (`"Hold to clear all"`) — user must long-press (500ms) to confirm. On confirm, stack is emptied.
5. Hardware `Escape` key triggers CLX (not CLR).

**D.6.4 — Detailed behaviour:**

CLR confirmation: The CLR button does not use a modal dialog. Instead, on first tap, the button label changes to `"Sure?"` and pulses red for 2000ms. A second tap within that window clears the stack. If the second tap does not come within 2000ms, the button reverts to `"CLR"` and no action is taken. This avoids an alert/modal while still preventing accidental wipes.

**D.6.5 — Edge cases:**

| Scenario | Handling |
|---|---|
| SWAP with 0 or 1 items | `"Error: Stack underflow"` |
| ROT with <3 items | `"Error: Stack underflow"` |
| CLX on empty stack | No action, no error |
| CLR on empty stack | Confirmation still shown (harmless) |

**D.6.6 — Data model:** Mutates `RpnEngine.stack`. Each operation saves an undo snapshot.

**D.6.7 — UI/UX:** These four keys occupy one full row (4 equal columns). CLR is leftmost with `--color-accent-red` text on `--color-surface-2` background. SWAP, ROT, CLX: `--color-text-secondary` text, `--color-surface-2` background.

**D.6.8 — API contract:** Not applicable.

**D.6.9 — Performance requirement:** ≤16ms.

**D.6.10 — Cross-dependencies:** D.1, D.2, D.8.

---

## D.7 — Memory Register (STO, RCL, M+, M−)

**D.7.1 — Purpose:** A single named memory slot for storing and retrieving an intermediate value.

**D.7.2 — User story:** As a user, I want to store a value in memory so that I can use it again later in a multi-step calculation without re-typing.

**D.7.3 — Acceptance criteria:**
1. `STO` copies the current X register value into `memoryRegister` without affecting the stack.
2. `RCL` pushes the value of `memoryRegister` onto the stack (duplicates the memory value — memory is unchanged).
3. `M+` adds X to `memoryRegister` without affecting the stack.
4. `M−` subtracts X from `memoryRegister` without affecting the stack.
5. When `memoryRegister ≠ 0`, a small `M` indicator is visible in the stack display area (see D.2.7).
6. Memory is wiped to 0 on session close (no persistence).

**D.7.4 — Detailed behaviour:** STO and RCL do not pop X. M+ and M− do not pop X. All four operations save an undo snapshot (including memory register state in the snapshot).

**D.7.5 — Edge cases:**

| Scenario | Handling |
|---|---|
| RCL when memory = 0 | Pushes 0 onto stack (valid) |
| STO when stack empty | Stores 0 (no error) |
| M+ when stack empty | Adds 0 to memory (no error) |

**D.7.6 — Data model:** Mutates `RpnEngine.memoryRegister`. `StateSnapshot` always includes `memoryRegister`.

**D.7.7 — UI/UX:** Four equal-column row, below stack ops row. Labels: `STO`, `RCL`, `M+`, `M−`. Text colour: `--color-accent-blue` (`#0A84FF`). Background: `--color-surface-2`.

**D.7.8 — API contract:** Not applicable.

**D.7.9 — Performance requirement:** ≤16ms.

**D.7.10 — Cross-dependencies:** D.1, D.2, D.8.

---

## D.8 — Undo

**D.8.1 — Purpose:** Step backward through the calculation history one action at a time.

**D.8.2 — User story:** As a user, I want to undo my last action so that I can correct mistakes without starting over.

**D.8.3 — Acceptance criteria:**
1. UNDO restores the engine state to the snapshot taken immediately before the last action.
2. Multiple consecutive UNDOs continue stepping backward (up to 50 levels).
3. UNDO is not available if there are no snapshots (button is visually dimmed, `opacity: 0.35`).
4. After UNDO, the display immediately reflects the restored state.
5. UNDO itself does not create an undo snapshot (no redo functionality in v1.0).
6. Hardware keyboard `Cmd+Z` / `Ctrl+Z` triggers UNDO.

**D.8.4 — Detailed behaviour:** Every engine mutation (before applying) calls `saveSnapshot()`, which pushes the current `StateSnapshot` onto `undoStack`. If `undoStack.length > 50`, the oldest snapshot is discarded (shift). UNDO calls `restoreSnapshot()`, which pops the most recent snapshot and replaces the engine state with it.

Digit key presses do NOT each create a snapshot. Snapshots are created when: ENTER is pressed, an operator is pressed, a stack operation is performed, a memory operation is performed, or CLR is confirmed.

**D.8.5 — Edge cases:**

| Scenario | Handling |
|---|---|
| UNDO past 50 actions | Oldest state is the floor; button dims |
| UNDO after CLR | Restores the full pre-CLR stack |
| UNDO with no history | No action; button is dimmed |

**D.8.6 — Data model:** `undoStack: StateSnapshot[]` inside `RpnEngine`.

**D.8.7 — UI/UX:** UNDO key is in the bottom row, column 1 (leftmost), sharing the row with COPY and ENTER. Label: `UNDO`, `--color-text-secondary` text, `--color-surface-2` background. Dimmed (`opacity: 0.35`) when `undoStack` is empty.

**D.8.8 — API contract:** Not applicable.

**D.8.9 — Performance requirement:** ≤16ms.

**D.8.10 — Cross-dependencies:** D.1, D.2.

---

## D.9 — Significant Digits Slider

**D.9.1 — Purpose:** User-adjustable control over the number of significant figures shown in the stack display.

**D.9.2 — User story:** As a user, I want to control display precision so that I can see as many or as few digits as I need for my current task.

**D.9.3 — Acceptance criteria:**
1. Slider range: 2 to 12, integer steps only.
2. Default value: 8.
3. Slider is visible above the function key row, right-aligned.
4. Current value is displayed as a numeric label adjacent to the slider.
5. Changing the slider immediately re-renders the stack display with the new precision.
6. The slider does not affect internal calculation precision — only display formatting.
7. Value is not persisted across sessions.

**D.9.4 — Detailed behaviour:**

Formatter logic (`js/engine/formatter.js`):
- Input: a `number` and `sigDigits: number`.
- Use JavaScript's `toPrecision(sigDigits)` as the basis.
- If the resulting string is in exponential form (`e`), reformat as `[mantissa] × 10[superscript exponent]` using `<sup>` HTML for display.
- If the number is an integer that fits within `sigDigits` digits, display without decimal point.
- `-0` is displayed as `0`.

**D.9.5 — Edge cases:**

| Scenario | Handling |
|---|---|
| `Infinity` | Display `"∞"` |
| `-Infinity` | Display `"−∞"` |
| `NaN` | Display `"Error"` |
| Very large exponent (e.g. `1e+300`) | Superscript exponent: `1 × 10³⁰⁰` |

**D.9.6 — Data model:** `RpnEngine.sigDigits: number`. Slider reads and writes this value directly.

**D.9.7 — UI/UX:** A horizontal row above the function key row. Left side: label `"SIG"` in `--color-text-tertiary`, font-size `0.65rem`, uppercase. Center: a custom-styled `<input type="range">` with a minimal track and circular thumb. Right side: current value displayed in `--color-text-secondary`, font-size `0.85rem`, fixed-width `1.5ch`. Total row height: `36px`. The slider takes up `60%` of the row width, right-aligned.

**D.9.8 — API contract:** Not applicable.

**D.9.9 — Performance requirement:** Slider change → display re-render in ≤32ms.

**D.9.10 — Cross-dependencies:** D.2 (Stack Display).

---

## D.10 — History Tape Drawer

**D.10.1 — Purpose:** A pull-out session log showing the user every operation performed since the app was opened.

**D.10.2 — User story:** As a user, I want to review my recent calculations so that I can reference earlier results without recalculating.

**D.10.3 — Acceptance criteria:**
1. A tab/handle is always visible on the left edge of the screen (32px wide, spanning the keypad height).
2. Dragging the handle rightward or tapping it opens the drawer.
3. When open, the drawer covers `min(320px, 80vw)` of the screen width, sliding from the left.
4. A semi-transparent overlay (`rgba(0,0,0,0.45)`) covers the rest of the screen.
5. Tapping the overlay or swiping left closes the drawer.
6. The drawer lists every calculation performed this session, newest at the top.
7. Each entry shows the expression (e.g., `5 ENTER 3 +`) and the result (e.g., `= 8`).
8. The drawer is read-only — tapping an entry does nothing.
9. History is wiped when the session ends.
10. When no history exists, the drawer shows: `"No calculations yet."` in `--color-text-tertiary`.

**D.10.4 — Detailed behaviour:**

The handle pulses with a very subtle `box-shadow` animation (0.8s ease-in-out, infinite) to draw attention to itself — a gentle invitation. The animation is suppressed when `prefers-reduced-motion` is active. The handle shows a `‹` chevron icon.

Drawer open/close uses CSS `transform: translateX()`. Open: `translateX(0)`. Closed: `translateX(-100%)` (fully offscreen except the handle). Transition: `transform 280ms cubic-bezier(0.4, 0, 0.2, 1)`.

Touch drag gesture: `touchstart` → track `touchmove` delta X → apply `translateX` live → on `touchend`, if dragged > 80px rightward, snap open; otherwise snap closed.

**D.10.5 — Edge cases:**

| Scenario | Handling |
|---|---|
| 500+ history entries | Drawer scrolls; virtual DOM not required for this count |
| Very long expression string | Truncate at 40 characters with `…` |
| Number in result is very large | Format using current `sigDigits` setting |
| Drawer open during orientation lock message | Drawer closes, orientation lock message takes full screen |

**D.10.6 — Data model:** `RpnEngine.historyLog: HistoryEntry[]`. Read-only from the drawer.

**D.10.7 — UI/UX:**
- Handle: `32px × 180px`, centred vertically in the keypad area, `--color-surface-2` background with `border-radius: 0 12px 12px 0`, contains `‹` SVG icon, `--color-text-secondary`.
- Drawer interior: `--color-surface-1` background. Top title bar: `"History"`, `--color-text-primary`, font-weight 600, font-size `1rem`, `16px` padding. Scrollable list below.
- Entry item: `16px` horizontal padding, `12px` vertical padding. Expression: `--color-text-secondary`, font-size `0.85rem`. Result: `--color-text-primary`, font-size `1.1rem`, font-weight 500.
- Separator between entries: 1px `--color-separator` line.

**D.10.8 — API contract:** Not applicable.

**D.10.9 — Performance requirement:** Drawer open/close animation at 60fps (no layout thrashing during drag).

**D.10.10 — Cross-dependencies:** D.1 (RPN Engine populates history), D.4, D.5, D.6.

---

## D.11 — Copy Result

**D.11.1 — Purpose:** Copy the current X register value to the system clipboard.

**D.11.2 — User story:** As a user, I want to copy my result so that I can paste it into another application.

**D.11.3 — Acceptance criteria:**
1. COPY copies the current X register (formatted using current `sigDigits`) to the clipboard.
2. On success, the COPY button label briefly changes to `"✓ Copied"` for 1500ms, then reverts.
3. On failure (clipboard API unavailable or denied), the button label changes to `"Failed"` for 1500ms.
4. COPY does not affect the stack or any engine state.
5. If the stack is empty (X shows `"0"`), COPY copies `"0"`.

**D.11.4 — Detailed behaviour:** Uses `navigator.clipboard.writeText()`. Wrapped in try/catch for environments where the API is unavailable. The copied string is the same string displayed in the X register (including scientific notation formatting if applicable).

**D.11.5 — Edge cases:**

| Scenario | Handling |
|---|---|
| Clipboard API blocked by browser permissions | Display `"Failed"` feedback |
| COPY on an error state in X | Copies the error string (harmless) |

**D.11.6 — Data model:** Read-only. No mutation.

**D.11.7 — UI/UX:** COPY occupies column 1 of the bottom action row (leftmost, sharing the row with ENTER). Label: `COPY`. Background: `--color-surface-2`. Text: `--color-text-secondary`. Width: 1 column. On success, text turns `--color-accent-green` for 1500ms.

**D.11.8 — API contract:** Not applicable.

**D.11.9 — Performance requirement:** Clipboard write completes in ≤200ms (async, browser-dependent).

**D.11.10 — Cross-dependencies:** D.2 (reads X register), D.9 (uses sigDigits formatter).

---

## D.12 — Haptic Feedback

**D.12.1 — Purpose:** Light tactile confirmation of every key press on devices that support it.

**D.12.2 — User story:** As a mobile user, I want physical feedback on key presses so that the calculator feels like a real instrument.

**D.12.3 — Acceptance criteria:**
1. Every key press triggers a haptic pulse on supported devices.
2. ENTER triggers a slightly longer pulse (20ms) than digit keys (10ms) and operators (10ms).
3. CLR confirmation triggers a double-pulse (10ms on, 50ms off, 10ms on).
4. Error states trigger a triple-pulse (10ms on, 30ms off, 10ms on, 30ms off, 10ms on).
5. On devices where `navigator.vibrate` is unavailable (iOS Safari, macOS), haptic is silently skipped.

**D.12.4 — Detailed behaviour:** `js/ui/haptic.js` exports a single function `vibrate(pattern: number | number[])`. It calls `navigator.vibrate()` wrapped in a feature-detection guard. Called by `keypad.js` after every key event, before rendering.

**D.12.5 — Edge cases:**

| Scenario | Handling |
|---|---|
| iOS Safari (no `vibrate` API) | Silent no-op |
| User has device vibration disabled in OS | Browser respects OS setting; no additional handling needed |

**D.12.6 — Data model:** No state.

**D.12.7 — UI/UX:** No visible UI surface.

**D.12.8 — API contract:** Not applicable.

**D.12.9 — Performance requirement:** Vibration call is fire-and-forget; ≤1ms synchronous cost.

**D.12.10 — Cross-dependencies:** None. Called by `keypad.js`.

---

## D.13 — Digit Entry and Input Buffer

**D.13.1 — Purpose:** Accept digit and decimal input from the user and display it as the in-progress X register.

**D.13.2 — User story:** As a user, I want to type numbers naturally so that entering values feels immediate and error-free.

**D.13.3 — Acceptance criteria:**
1. Pressing digits 0–9 appends to the input buffer (or starts a new one if `isInputting === false`).
2. Pressing `.` appends a decimal point (ignored if `.` already present in buffer).
3. Hardware keyboard digit keys and `.` trigger the corresponding digit entry.
4. The input buffer is displayed live in the X register as the user types.
5. After an operator is pressed, the next digit starts a fresh input buffer.
6. Maximum input buffer length: 20 characters (including `.` and `-`). Further input is ignored.

**D.13.4 — Detailed behaviour:** Digit keys are the `data-key="digit-[0-9]"` and `data-key="decimal"` buttons. Hardware events: `keydown` on `document`, checking `event.key` for `"0"`–`"9"` and `"."`.

**D.13.5 — Edge cases:**

| Scenario | Handling |
|---|---|
| Leading zeros | `"007"` is allowed in buffer; `parseFloat()` normalises to `7` on ENTER |
| Input starts with `.` | Displayed as `.5`; parsed as `0.5` |
| 20-character limit reached | Further digits silently ignored; no error shown |

**D.13.6 — Data model:** `RpnEngine.inputBuffer: string`, `RpnEngine.isInputting: boolean`.

**D.13.7 — UI/UX:** See D.2.4 for display behaviour. Keys use the standard number grid layout described in G.2.

**D.13.8 — API contract:** Not applicable.

**D.13.9 — Performance requirement:** ≤16ms from key press to display update.

**D.13.10 — Cross-dependencies:** D.1 (RPN Engine), D.2 (Stack Display).

---

## D.14 — PWA Installation and Offline Support

**D.14.1 — Purpose:** Stax installs to the home screen and works 100% offline after the first visit.

**D.14.2 — User story:** As a mobile user, I want to install Stax on my home screen so that it feels like a native app and works without internet.

**D.14.3 — Acceptance criteria:**
1. A valid `manifest.json` causes browsers to offer a home screen install prompt.
2. After installation, the app launches without browser chrome (standalone display mode).
3. The service worker caches all application files on first load.
4. On subsequent loads, all files are served from cache (network-first for first load, cache-first thereafter).
5. The app PWA install prompt is not suppressed or hidden.
6. The splash screen matches the app's visual design (dark background, app name, icon).
7. Lighthouse PWA audit score ≥ 95.

**D.14.4 — Detailed behaviour:**

`manifest.json` fields:
```json
{
  "name": "Stax",
  "short_name": "Stax",
  "description": "The RPN calculator with taste.",
  "start_url": "/",
  "display": "standalone",
  "orientation": "portrait",
  "background_color": "#000000",
  "theme_color": "#000000",
  "icons": [
    { "src": "assets/icons/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "assets/icons/icon-512.png", "sizes": "512x512", "type": "image/png" },
    { "src": "assets/icons/icon-maskable-512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable" }
  ]
}
```

Service worker strategy: Cache-first for all same-origin assets. On `install` event: pre-cache all files listed in `CACHE_MANIFEST`. On `fetch` event: return cache hit if available; otherwise fetch from network and cache. Cache name includes a version string (e.g., `stax-v1`). On `activate` event: delete all caches whose name does not match current version.

**D.14.5 — Edge cases:**

| Scenario | Handling |
|---|---|
| User clears browser cache | Service worker re-caches on next network load |
| New version deployed to GitHub Pages | New cache version string causes old cache to be deleted on next activate |
| Browser does not support service workers (rare) | App still works fully online; no offline capability; no error message |

**D.14.6 — Data model:** `CACHE_MANIFEST: string[]` — list of all files to pre-cache, hardcoded in `sw.js`.

**D.14.7 — UI/UX:** No in-app UI for install/offline status in v1.0. The browser's native install prompt is relied upon.

**D.14.8 — API contract:** Not applicable.

**D.14.9 — Performance requirement:** Time to interactive ≤ 3 seconds on a 3G connection (first load). ≤ 1 second on cached load.

**D.14.10 — Cross-dependencies:** All files in the project (must all be listed in `CACHE_MANIFEST`).

---

# PART E — DATA ARCHITECTURE

---

## E.1 — Entity Catalogue

### RpnEngine (in-memory singleton)

| Field | Type | Default | Constraints | Notes |
|---|---|---|---|---|
| `stack` | `number[]` | `[]` | Unlimited length | Index 0 = oldest item; last index = X register |
| `inputBuffer` | `string` | `""` | Max 20 chars | Digits being typed |
| `isInputting` | `boolean` | `false` | — | True while user is entering digits |
| `memoryRegister` | `number` | `0` | — | Single memory slot |
| `undoStack` | `StateSnapshot[]` | `[]` | Max 50 items | FIFO when at capacity |
| `sigDigits` | `number` | `8` | Integer, 2–12 | Display precision only |
| `historyLog` | `HistoryEntry[]` | `[]` | Unlimited | Session-scoped |

### StateSnapshot

| Field | Type | Notes |
|---|---|---|
| `stack` | `number[]` | Deep copy of stack at snapshot time |
| `inputBuffer` | `string` | Copy of input buffer |
| `isInputting` | `boolean` | — |
| `memoryRegister` | `number` | — |

### HistoryEntry

| Field | Type | Notes |
|---|---|---|
| `expression` | `string` | e.g., `"3 ENTER 5 +"` |
| `result` | `number` | The numeric result |
| `timestamp` | `number` | `Date.now()` at creation |

---

## E.2 — Data Flow Diagram

```
[User Input]
     │
     ▼
[keypad.js — Event Handler]
     │
     ├──► [haptic.js] → Vibration API
     │
     ▼
[rpn.js — RpnEngine]
     │
     ├──► saveSnapshot() → undoStack[]
     │
     ├──► mutation (stack, inputBuffer, memory)
     │
     ├──► formatter.js → formatted string
     │
     └──► historyLog[] (on result-producing operations)
     │
     ▼
[display.js — renderStack()]
     │
     ▼
[DOM — Stack Display, M indicator]
```

No data exits the application. No network calls occur at runtime. All state is session-scoped and dies with the tab.

---

## E.3 — Migration and Versioning Strategy

Not applicable. There is no persistent data schema. Version changes to the application are managed via the service worker cache version string in `sw.js`. Incrementing the version string (e.g., `stax-v2`) causes old caches to be replaced on next activation.

---

## E.4 — Data Retention and Deletion Policy

All user data is held exclusively in browser memory for the duration of the session. When the browser tab or app is closed, all data is automatically destroyed by the browser's memory management. There is no user-initiated delete flow because there is nothing to delete. GDPR/CCPA right-to-erasure is satisfied by default: no personal data is ever collected or stored.

---

# PART F — SYSTEM AND DOMAIN SPECIFICATIONS

---

## F.1 — Game Architecture
Not applicable. Stax is not a game.

---

## F.2 — Web/Mobile App Specifications

### Component Library
All UI components are bespoke. No third-party component library is used. Components:

| Component | File | Responsibility |
|---|---|---|
| StackDisplay | `js/ui/display.js` + `css/stack.css` | Render stack, input buffer, M indicator |
| KeyGrid | `js/ui/keypad.js` + `css/keypad.css` | Render and handle all key presses |
| SigSlider | `js/ui/slider.js` + `css/slider.css` | Render and handle sig-digits slider |
| HistoryDrawer | `js/ui/drawer.js` + `css/history.css` | Render and animate history drawer |

### Routing Architecture
Single-page application. No routing. One URL, one view.

### Form Validation
Not applicable. There are no forms. All input is via button press.

### Notification System
Not applicable. No push notifications, no permission requests.

### Offline / Sync Behaviour
See D.14. 100% offline after first load. No sync (nothing to sync).

---

## F.3 — API / Backend Services
Not applicable. Stax has no server, no API, and no backend.

---

## F.4 — CLI / Developer Tools
Not applicable.

---

## F.5 — Security Model

**Threat model:**

| Threat | Likelihood | Impact | Mitigation |
|---|---|---|---|
| XSS via history entry rendering | Low | Medium | All history strings are set via `textContent`, never `innerHTML`. |
| Prototype pollution via engine input | Very Low | Low | Engine only processes numeric input from controlled key events; no JSON parsing from external sources. |
| Malicious PWA impersonation | Low | Medium | HTTPS enforced by GitHub Pages; valid app signature. |
| Data exfiltration | None | None | No network calls at runtime; no data to exfiltrate. |
| Dependency supply chain attack | Low | Medium | Zero runtime dependencies; only devDependencies (ESLint, Vitest). |

**Input sanitisation:** All DOM writes use `textContent` or `createElement()`. No `innerHTML`, no `eval()`, no `new Function()`.

**Secrets management:** Not applicable. Stax has no API keys, credentials, or secrets of any kind.

**Dependency audit:** `npm audit` runs in CI on every push. Zero high/critical vulnerabilities are a gate for deployment.

---

# PART G — USER INTERFACE AND EXPERIENCE

---

## G.1 — UX Philosophy

**Progressive revelation through the physical metaphor.** Stax presents itself like a precision instrument: everything visible is immediately usable, nothing is hidden behind menus, and the interface communicates function through form. The stack is always visible because the stack is always relevant. The history drawer is always half-visible because history is always accessible. There are no settings screens, no hamburger menus, no modal dialogs (except the implicit CLR confirmation). The user learns the interface by using it, not by reading it.

---

## G.2 — Information Architecture

Stax is a single screen. The screen is divided into two vertical zones:

**Zone 1 — Stack Display (top 44% of viewport height)**
- Register label column (left, 28px)
- Stack rows (scrollable, newest at bottom)
- Memory indicator `M` (top-right corner)

**Zone 2 — Keypad (bottom 56% of viewport height)**
- Sig-digits slider row (right-aligned, 36px height)
- Function key row (5 equal columns, 44px height): `√` `yˣ` `%` `±` `1/x`
- Stack ops row (4 equal columns, 52px height): `CLR` `SWAP` `ROT` `CLX`
- Memory row (4 equal columns, 52px height): `STO` `RCL` `M+` `M−`
- Number/operator rows (4 equal columns, 52px height each):
  - Row 1: `7` `8` `9` `÷`
  - Row 2: `4` `5` `6` `×`
  - Row 3: `1` `2` `3` `−`
  - Row 4: `0` `.` `UNDO` `+`
- Action row (4 columns, 56px height): `COPY` + `ENTER` (spanning 3 columns)

**History drawer:** Overlays Zone 2 from the left edge. Handle always visible.

**Orientation lock overlay:** Full-screen, covers both zones in landscape mode.

---

## G.3 — Interaction Patterns

**Input devices:**

| Device | Support |
|---|---|
| Touch (tap) | Primary. All keys respond to `touchstart` for minimum latency. |
| Touch (drag) | History drawer open/close only. |
| Mouse (click) | Full support. `mousedown` used for key press states. |
| Hardware keyboard | Supported for all digit keys, operators, ENTER, Escape (CLX), Cmd/Ctrl+Z (UNDO). |
| Gamepad | Not supported in v1.0. |
| Voice | Not supported in v1.0. |

**Interaction vocabulary:**
- **Tap:** Activates any key. Triggers haptic. Shows pressed state (scale: 0.94, 80ms).
- **Long-press (500ms):** Not used in v1.0 (CLR confirmation is two-tap, not long-press — see D.6.4).
- **Drag (horizontal):** Opens/closes history drawer only.
- **Tap outside drawer:** Closes drawer.
- **Scroll (vertical in drawer):** Scrolls history list.

**Confirmation dialogs:** One only: CLR two-tap confirmation (inline, no modal). All other operations are immediate and undoable.

---

## G.4 — Error Handling UX

**Error display:** All errors appear as text in the X register. The X register text changes to `--color-accent-red`. A brief vibration pattern fires (see D.12). The next digit key press clears the error and begins a new input.

**Error message catalogue:**

| Error | X register displays |
|---|---|
| Stack underflow | `Error: Stack underflow` |
| Division by zero | `Error: ÷ 0` |
| Square root of negative | `Error: √ <0` |
| General computation error | `Error` |
| Application crash (unhandled exception) | Full-screen overlay: `"Something went wrong. Tap to restart."` Tapping reloads the page. |

**Tone:** All error messages are terse, factual, and non-alarming. No exclamation marks. No apologies. The user is presumed to understand what the error means.

---

## G.5 — Onboarding

**First-run experience:** None. No tutorial. No onboarding screens. No tooltip overlays. Stax's target user knows RPN. The interface is shown immediately, fully functional, on first launch.

**PWA install prompt:** The browser's native install banner is allowed to appear naturally. Stax does not suppress it or add a custom in-app install prompt.

**Progressive disclosure:** There is nothing hidden to progressively disclose. All features are visible in the interface at all times.

---

## G.6 — Platform-Specific UX Notes

**iOS Safari:**
- No `navigator.vibrate` support. Haptic silently skipped.
- The browser address bar may partially overlap the bottom of the app. All critical controls are above the safe-area-inset-bottom. CSS `env(safe-area-inset-bottom)` is applied to the keypad bottom padding.
- PWA installation via Share → Add to Home Screen. No native install banner on iOS.

**Android Chrome:**
- Full `navigator.vibrate` support. Haptic enabled.
- Native "Add to Home Screen" banner appears after the browser's engagement heuristics are met.

**Desktop browsers (Chrome, Safari, Firefox, Edge):**
- The app renders in a narrow centred column (max-width: 390px) on wide screens, with the remainder of the viewport in `--color-bg`.
- Mouse hover state on keys: `brightness(1.1)` via CSS filter.
- Hardware keyboard fully supported.
- No haptic (silently skipped).

---

# PART H — MULTIPLAYER, COLLABORATION, AND NETWORKING

Stax is a single-user, offline-only application. No networking architecture is required for v1.0. The application makes zero network calls at runtime after the initial load and service worker caching. There is no server, no API, no WebSocket, and no authentication.

Future consideration: A shareable "calculation link" that encodes a stack state in the URL hash could be added in a future version without requiring a server.

---

# PART I — VISUAL AND BRAND DESIGN

---

## I.1 — Visual Identity

**Primary design mode:** Dark. Light mode is provided as a full alternative via `prefers-color-scheme: light`.

### Dark Mode Colour Palette

| Token | Hex | Role |
|---|---|---|
| `--color-bg` | `#000000` | App background |
| `--color-surface-1` | `#1C1C1E` | Stack display area, drawer |
| `--color-surface-2` | `#2C2C2E` | Function keys, stack ops, memory keys |
| `--color-surface-3` | `#3A3A3C` | Number keys |
| `--color-text-primary` | `#FFFFFF` | Primary text, digit key labels |
| `--color-text-secondary` | `#8E8E93` | Subdued labels, drawer text |
| `--color-text-tertiary` | `#48484A` | Register labels, placeholder |
| `--color-accent-orange` | `#FF9F0A` | Operator keys (+, −, ×, ÷) |
| `--color-accent-green` | `#30D158` | ENTER key |
| `--color-accent-blue` | `#0A84FF` | Memory keys, M indicator |
| `--color-accent-red` | `#FF453A` | CLR label, error text |
| `--color-separator` | `rgba(84,84,88,0.65)` | Divider lines |

### Light Mode Colour Palette

| Token | Hex | Role |
|---|---|---|
| `--color-bg` | `#F2F2F7` | App background |
| `--color-surface-1` | `#FFFFFF` | Stack display area |
| `--color-surface-2` | `#E5E5EA` | Function/ops/memory keys |
| `--color-surface-3` | `#D1D1D6` | Number keys |
| `--color-text-primary` | `#000000` | Primary text |
| `--color-text-secondary` | `#6C6C70` | Subdued labels |
| `--color-text-tertiary` | `#AEAEB2` | Register labels |
| (accent colours unchanged) | — | Same as dark mode |

### Typography

| Token | Value | Use |
|---|---|---|
| `--font-family` | `system-ui, -apple-system, 'Helvetica Neue', sans-serif` | All text |
| `--font-stack-x` | `2.5rem` / `400` weight | X register value |
| `--font-stack-y` | `1.75rem` / `300` weight | Y register value |
| `--font-stack-z` | `1.25rem` / `300` weight | Z and above |
| `--font-key-digit` | `1.3rem` / `400` weight | Number keys |
| `--font-key-op` | `1.3rem` / `500` weight | Operator keys |
| `--font-key-func` | `0.8rem` / `500` weight | Function keys |
| `--font-key-enter` | `1rem` / `600` weight | ENTER key |

All number display uses `font-variant-numeric: tabular-nums` to prevent layout shift as digits change.

### Logo
The wordmark is the word "stax" set in the system font, lowercase, font-weight 300, `--color-text-secondary`. Appears only in the splash screen and PWA icon. No logomark (no icon graphic) — the wordmark alone is the identity.

---

## I.2 — Design System

**Approach:** Fully custom, no third-party component library.  
**Token naming:** `--[category]-[role]` as specified in I.1.  
**Dark/light mode:** Automatic via `prefers-color-scheme`. All colour references use CSS custom properties defined in `css/tokens.css`; switching modes requires only toggling the token values, not updating any component files.  
**Spacing scale (in `css/tokens.css`):**

| Token | Value | Use |
|---|---|---|
| `--space-xs` | `4px` | Tight gaps |
| `--space-sm` | `8px` | Button gaps |
| `--space-md` | `16px` | Internal padding |
| `--space-lg` | `24px` | Section padding |
| `--space-xl` | `40px` | Large gaps |

**Border radius:**

| Token | Value | Use |
|---|---|---|
| `--radius-key` | `12px` | All key buttons |
| `--radius-drawer` | `16px` | Drawer corners |
| `--radius-handle` | `0 10px 10px 0` | History drawer handle |

---

## I.3 — Art Direction

**Visual pillar:** Precision instrument meets consumer electronics. The interface should feel like it was machined, not designed.

**Reference materials:**
1. **Apple Calculator (iOS):** Key grid proportion, colour hierarchy (digit / operator / function), dark glass aesthetic.
2. **HP 12C (physical calculator):** ENTER key prominence, functional key labelling philosophy, no wasted space.
3. **Apple Watch Ultra UI:** Dial precision, monochrome base with single accent colour, legibility under stress.

**Material feel:** Keys have a subtle `box-shadow: 0 2px 4px rgba(0,0,0,0.4)` in dark mode, giving them slight physical depth. Pressed state: `box-shadow` removed, `transform: scale(0.94)` applied, 80ms transition.

---

## I.4 — Motion and Animation

**Animation philosophy:** Purposeful and functional. Every animation communicates state change. No animation is decorative.

| Animation | Duration | Easing | Trigger |
|---|---|---|---|
| Key press (scale down) | 80ms | ease-out | touchstart / mousedown |
| Key release (scale up) | 120ms | ease-in | touchend / mouseup |
| Stack item push (slide up + fade in) | 120ms | ease-out | ENTER / auto-lift |
| Drawer open | 280ms | cubic-bezier(0.4, 0, 0.2, 1) | Tap handle / drag |
| Drawer close | 280ms | cubic-bezier(0.4, 0, 0.2, 1) | Tap overlay / swipe |
| Handle pulse | 800ms | ease-in-out, infinite | Always (idle state) |
| Error state (red flash) | 200ms | ease-in-out | Error condition |
| COPY success (green text) | 1500ms hold | — | Clipboard write |
| CLR confirmation (label change) | 2000ms hold | — | First CLR tap |

**Reduced motion:** `@media (prefers-reduced-motion: reduce)` sets all `transition-duration` and `animation-duration` to `0ms`. The handle pulse animation is fully suppressed.

---

## I.5 — Asset Deliverable List

| Asset | Type | Dimensions | Format | Consumer |
|---|---|---|---|---|
| App icon (standard) | PNG | 192×192px | PNG-32 | PWA manifest, browser |
| App icon (large) | PNG | 512×512px | PNG-32 | PWA manifest |
| App icon (maskable) | PNG | 512×512px (safe zone: 288×288px centred) | PNG-32 | Android home screen |
| Favicon | ICO | 32×32px | ICO | Browser tab |
| Splash screen (iPhone X/XS) | PNG | 1125×2436px | PNG-32 | iOS PWA launch |
| Splash screen (iPhone 8 Plus) | PNG | 1242×2208px | PNG-32 | iOS PWA launch |
| Splash screen (iPhone XR/11) | PNG | 828×1792px | PNG-32 | iOS PWA launch |
| History drawer handle chevron `‹` | SVG | 12×20px | SVG inline | Drawer handle |
| Orientation lock icon | SVG | 48×48px | SVG inline | Landscape lock screen |
| Square root symbol `√` | SVG (or Unicode) | — | Unicode `\u221A` | Function key label |

---

# PART J — AUDIO

Stax has no audio component. A calculator that makes sounds would violate Pillar 3 (Zero Friction) by intruding on the user's environment. Haptic feedback (D.12) provides the tactile confirmation that audio would otherwise serve. No audio assets are required. No audio API is invoked. This decision is final for v1.0.

---

# PART K — NARRATIVE AND CONTENT

---

## K.1 — Content Philosophy

Stax has no narrative. It has labels. All textual content serves functional clarity. Label copy is terse, standard, and unambiguous. Error messages are factual. There is no marketing copy inside the application.

---

## K.2 — Content Inventory

All user-facing strings are stored in `js/strings.js`. Full list:

| Key | String | Context |
|---|---|---|
| `key.enter` | `ENTER` | ENTER key label |
| `key.swap` | `SWAP` | Stack op key |
| `key.rot` | `ROT` | Stack op key |
| `key.clx` | `CLX` | Stack op key |
| `key.clr` | `CLR` | Stack op key |
| `key.clr_confirm` | `Sure?` | CLR after first tap |
| `key.sto` | `STO` | Memory key |
| `key.rcl` | `RCL` | Memory key |
| `key.mplus` | `M+` | Memory key |
| `key.mminus` | `M−` | Memory key |
| `key.undo` | `UNDO` | Undo key |
| `key.copy` | `COPY` | Copy key |
| `key.copy_success` | `✓ Copied` | Post-copy feedback |
| `key.copy_fail` | `Failed` | Clipboard error |
| `key.sqrt` | `√` | Function key |
| `key.pow` | `yˣ` | Function key |
| `key.pct` | `%` | Function key |
| `key.sign` | `±` | Function key |
| `key.inv` | `1/x` | Function key |
| `error.underflow` | `Error: Stack underflow` | X register error |
| `error.div_zero` | `Error: ÷ 0` | X register error |
| `error.sqrt_neg` | `Error: √ <0` | X register error |
| `error.generic` | `Error` | X register error |
| `error.crash` | `Something went wrong. Tap to restart.` | Full-screen crash overlay |
| `display.empty_history` | `No calculations yet.` | Empty history drawer |
| `display.history_title` | `History` | Drawer title |
| `display.sig_label` | `SIG` | Slider label |
| `landscape.message` | `Rotate your device to use Stax.` | Orientation lock |
| `meta.app_name` | `Stax` | PWA manifest, splash |
| `meta.description` | `The RPN calculator with taste.` | PWA manifest |

---

## K.3 — Endings and States

| Terminal State | What the user sees |
|---|---|
| Calculation produces a result | Result appears in X register; history entry added |
| Error condition | Error string in red X register; clears on next digit |
| CLR confirmed | Stack empties; X shows `"0"` |
| App crash | Full-screen error overlay with tap-to-reload |
| Session ends (tab closed) | All state silently destroyed |

---

## K.4 — Localization Content Notes

All strings are in English (en-US) for v1.0. The `js/strings.js` structure supports adding additional language objects in future. Maximum string length for key labels: 4 characters (fits on narrowest button). Error strings: max 30 characters (fits in X register at minimum font size). No idioms used in any string.

---

# PART L — PRODUCTION PLAN

---

## L.1 — Team Composition

| Role | Headcount | Type | Start Week | Key Responsibilities |
|---|---|---|---|---|
| Lead Developer | 1 | Full-time | Week 1 | RPN engine, JS architecture, PWA/service worker, CI/CD |
| UI Developer / CSS Specialist | 1 | Full-time | Week 1 | All CSS, animations, responsive layout, history drawer |
| UI/UX Designer | 1 | Full-time | Week 1 | Figma designs, design system, icon/asset production |
| QA Engineer | 1 | Contract (part-time) | Week 4 | Manual test execution, bug reporting, device testing |
| Producer / Project Lead | 1 | Full-time or PM role shared | Week 1 | Milestone tracking, GitHub Issues management, stakeholder comms |

---

## L.2 — Milestones

| Milestone | Description | Exit Criteria | Week (relative) |
|---|---|---|---|
| **Prototype** | RPN engine functional; raw HTML UI, no styling | All arithmetic + functions compute correctly; ENTER/undo/memory work; unit tests at 90% | Week 3 |
| **First Playable** | All features wired; basic CSS applied; installable as PWA | All 14 features in D.1–D.14 functional; installs on iOS and Android; service worker caches app | Week 7 |
| **Vertical Slice** | Complete visual design applied; animations live; one polished end-to-end experience | Figma designs fully implemented; Lighthouse score ≥ 90; history drawer gesture works; 0 P0/P1 bugs | Week 12 |
| **Alpha** | Feature complete; all platforms tested | All D-section acceptance criteria pass; no P0 bugs; known P1 bugs documented | Week 16 |
| **Beta** | Polish complete; bug-fix only | No P1 bugs; Lighthouse ≥ 95; tested on 6+ devices; no new features | Week 19 |
| **Gold** | Ready to ship | All L.7 checklist items complete; 0 open P0/P1; designer sign-off; client sign-off | Week 21 |

---

## L.3 — Risk Register

| Risk | Likelihood | Impact | Mitigation | Owner |
|---|---|---|---|---|
| iOS Safari behaviour diverges from spec (no vibrate, PWA install UX) | H | M | Explicitly document iOS limitations; test on real devices weekly from Prototype onward | Lead Developer |
| RPN floating-point display produces ugly results (e.g., `0.1+0.2=0.30000000004`) | H | M | `formatter.js` uses `toPrecision()` not raw `toString()`; unit-tested extensively | Lead Developer |
| Keypad layout doesn't fit on small screens (iPhone SE, 375px) | M | H | Design in Figma at 375px first; test at Prototype milestone | Designer |
| History drawer gesture conflicts with iOS swipe-back navigation | M | M | Test on real iOS device; if conflict exists, replace drag with tap-toggle only | UI Developer |
| Scope creep: client requests additional features mid-production | M | M | Blueprint is the signed spec; all additions go through a formal change request and push a milestone by one week minimum | Producer |
| GitHub Pages propagation delay on deployment | L | L | GitHub Actions pipeline includes a 30-second delay before smoke-testing the live URL | Lead Developer |
| PWA caching serves stale version after update | M | M | Cache version string updated on every deployment; `activate` handler deletes old caches | Lead Developer |
| Designer and developer Figma handoff friction | M | M | Figma file uses component library with named tokens; design tokens match `tokens.css` 1:1 | Designer + UI Developer |
| QA contractor unavailable during Beta | L | H | Lead Developer performs manual QA as backup; device lab documented in L.6 | Producer |
| `navigator.clipboard` API blocked in some browser contexts | M | L | COPY button degrades gracefully with `"Failed"` message; no critical path blocked | Lead Developer |

---

## L.4 — Budget Estimate

| Department | Low Estimate | High Estimate | Notes |
|---|---|---|---|
| Development (Lead + UI Developer) | $12,000 | $22,000 | 21 weeks, part-time rate assumed |
| Design (UI/UX Designer) | $6,000 | $12,000 | Includes Figma file, all assets, splash screens |
| QA (contract, part-time) | $1,500 | $3,500 | Weeks 4–21, ~4hrs/week |
| Project management | $0 | $4,000 | If PM is a dedicated role vs. shared |
| Tooling and services | $0 | $200 | Figma subscription; GitHub is free |
| Device testing lab (physical devices) | $0 | $800 | If team does not own target devices |
| **Total** | **$19,500** | **$42,500** | Wide range reflects team rate uncertainty |

---

## L.5 — Outsourcing Plan

**PWA icons and splash screens:** If the in-house designer has no icon design experience, this task (creation of the Stax wordmark as an icon across 5 sizes) may be outsourced to a freelance icon designer. Deliverable: all PNG files at specified dimensions, in the project `assets/` structure. Quality gate: visual review by the designer and producer; one revision round included in contract.

All other work is in-house.

---

## L.6 — QA Plan

**Unit test coverage:** 90% line coverage on `js/engine/rpn.js` and `js/engine/formatter.js`. Enforced by Vitest in CI.

**Manual QA cadence:** Executed at every milestone. The following device matrix is tested manually:

| Device | OS | Browser |
|---|---|---|
| iPhone 14 | iOS 17 | Safari |
| iPhone SE (2nd gen) | iOS 16 | Safari |
| Samsung Galaxy S23 | Android 13 | Chrome |
| Google Pixel 6 | Android 13 | Chrome |
| iPad (10th gen) | iPadOS 17 | Safari (portrait) |
| MacBook (any) | macOS 14 | Safari, Chrome |
| Windows PC | Windows 11 | Chrome, Firefox, Edge |

**Manual QA checklist (executed per milestone):**
1. All 14 features in Part D pass their acceptance criteria.
2. Haptic fires on Android Chrome for every key press.
3. History drawer opens and closes smoothly; drag gesture works.
4. App installs to home screen on Android and iOS.
5. App works 100% offline after first load (airplane mode test).
6. Lighthouse PWA audit score ≥ 90 (≥ 95 at Beta and Gold).
7. Orientation lock message appears in landscape on both iOS and Android.
8. CLR two-tap confirmation prevents accidental clear.
9. UNDO correctly reverts all tested operation types.
10. Significant digits slider re-renders stack correctly across all values 2–12.

**Bug severity definitions:**

| Severity | Definition | Resolution Target |
|---|---|---|
| P0 Blocker | App is unusable; data loss; crash on common path | Fix before next build |
| P1 Critical | Feature broken but workaround exists | Fix before current milestone exit |
| P2 Major | Visual defect or degraded experience; no workaround | Fix before Beta |
| P3 Minor | Cosmetic, edge-case, non-blocking | Fix before Gold if time allows |

---

## L.7 — Launch Certification Checklist

- [ ] All D-section acceptance criteria verified on full device matrix.
- [ ] Lighthouse score ≥ 95 on Performance, Accessibility, Best Practices, PWA.
- [ ] Zero P0 and P1 bugs open.
- [ ] `manifest.json` valid (run through web.dev/measure).
- [ ] Service worker caches all files (verified via DevTools → Application → Cache Storage).
- [ ] App installs to home screen on iOS Safari and Android Chrome without error.
- [ ] App loads and fully operates in airplane mode.
- [ ] All user-facing strings present in `js/strings.js`; no strings hardcoded in HTML or JS.
- [ ] ESLint passes with zero errors on full codebase.
- [ ] `npm audit` shows zero high/critical vulnerabilities.
- [ ] Orientation lock overlay displays correctly in landscape on iOS and Android.
- [ ] WCAG AA contrast ratio verified for all text/background combinations (use a contrast checker tool).
- [ ] `env(safe-area-inset-bottom)` applied; no interactive elements cut off by iPhone home bar.
- [ ] GitHub Pages HTTPS enforced (verify via browser padlock).
- [ ] `robots.txt` or meta `noindex` decision made (default: allow indexing — no sensitive content).
- [ ] Designer has reviewed and approved the final Gold build visually.
- [ ] Client (project owner) has reviewed and approved the final Gold build.
- [ ] MIT License file present at repository root (`LICENSE`).

---

# PART M — APPENDICES

---

## M.1 — Source-to-Implementation Mapping Table

Not applicable. Stax is an original concept with no source material to adapt.

---

## M.2 — Design Decisions Log

```
DECISION-001
Ambiguity: Project has no name.
Resolution: Named "Stax" (lowercase wordmark: "stax").
Rationale: Short, memorable, refers to the RPN stack, sounds modern, 
           not geeky, not tech-jargon.
Rejected alternative: "Prism", "Apex", "RPN+" — all rejected for being 
                       either generic or too technical.

DECISION-002
Ambiguity: CLR confirmation method unspecified.
Resolution: Two-tap inline confirmation (button changes to "Sure?" for 2000ms).
Rationale: Avoids a modal dialog (violates Zero Friction pillar) while 
           still preventing accidental full stack wipe.
Rejected alternative: Long-press (500ms) — less discoverable and may 
                       conflict with system long-press gestures on some Android skins.

DECISION-003
Ambiguity: History tape entry format not specified.
Resolution: Two-line entry: expression on line 1 (e.g., "3 ENTER 5 +"), 
            result on line 2 (e.g., "= 8").
Rationale: Matches how an RPN user thinks about the operation. 
           Alternative "5 + 3 = 8" is algebraic and feels wrong in an RPN context.
Rejected alternative: Single-line "3 ENTER 5 + = 8" — too long for 
                       small screens.

DECISION-004
Ambiguity: Undo granularity — per-digit or per-operation?
Resolution: Per stack-modifying operation (ENTER, operator, stack op, 
            memory op, CLR). Individual digit key presses do not create snapshots.
Rationale: Matches the user's mental model ("undo the plus", not 
           "undo the 5"). Per-digit undo would require 50+ taps to undo 
           a long calculation.
Rejected alternative: Per-digit undo — discarded as described above.

DECISION-005
Ambiguity: % operation semantics (HP-style vs simple-divide-by-100).
Resolution: HP-style: Y × X / 100, Y preserved. 
            E.g., [100 ENTER 15 %] → [100, 15].
Rationale: Target user knows RPN and expects HP calculator behaviour. 
           Simple divide-by-100 would surprise them.
Rejected alternative: Simple 1/100 multiply — rejected as non-standard 
                       for RPN/HP users.

DECISION-006
Ambiguity: Dark mode vs light mode as primary.
Resolution: Dark mode is the primary design mode; light mode is a full 
            alternative via prefers-color-scheme.
Rationale: Dark mode aligns with "precision instrument" aesthetic, 
           reduces eye strain in typical use environments, and is the 
           dominant preference among the target persona.
Rejected alternative: Light mode primary — rejected; inconsistent with 
                       HP and Apple Watch Ultra references.

DECISION-007
Ambiguity: Number of undo levels.
Resolution: 50 levels maximum. FIFO eviction when at capacity.
Rationale: 50 operations covers all realistic calculation sessions. 
           Unlimited undo would consume unbounded memory.
Rejected alternative: 20 levels — may be insufficient for complex sessions.

DECISION-008
Ambiguity: ENTER key visual prominence.
Resolution: ENTER spans 3 of 4 columns in the bottom action row, 
            coloured green (#30D158).
Rationale: ENTER is the most frequently used key in RPN. It must be 
           unmissable and distinct. Green is HP tradition and contrasts 
           clearly with orange operators and white number keys.
Rejected alternative: ENTER as one normal-sized key — rejected; 
                       insufficient prominence for the primary RPN action.
```

---

## M.3 — Glossary

**Auto-lift:** In RPN calculators, the behaviour where pressing an operator key automatically pushes the current input buffer onto the stack (as if ENTER was pressed) before applying the operation.

**CLR:** Clear — wipes the entire stack.

**CLX:** Clear X — removes the top item from the stack.

**ENTER:** The RPN key that pushes the current input onto the stack. Analogous to PUSH.

**M indicator:** A small visual label (`M`) that appears in the stack display when the memory register contains a non-zero value.

**PWA (Progressive Web App):** A web application that can be installed to a device's home screen and operates offline via a service worker.

**RCL:** Recall — pushes the memory register value onto the stack.

**Register:** A named position in the stack. X = top, Y = second, Z = third.

**ROT:** Rotate — moves the third stack item (Z) to the top (X), shifting the others down.

**RPN (Reverse Polish Notation):** A mathematical notation where operators follow operands. To compute 3 + 5: push 3, push 5, press +.

**Service worker:** A JavaScript script that runs in the background, intercepts network requests, and manages a local cache for offline support.

**sigDigits:** Significant digits — the number of meaningful figures shown in the display.

**Stack:** The ordered collection of values in an RPN calculator, operated on in LIFO (last in, first out) order.

**STO:** Store — copies the X register value into the memory register.

**SWAP:** Exchanges the top two stack items (X and Y).

**X register:** The top of the stack. The currently active value.

**Y register:** The second item on the stack.

---

## M.4 — File and Folder Manifest

**Engineering**

| File | Purpose |
|---|---|
| `/index.html` | Single HTML entry point |
| `/manifest.json` | PWA web app manifest |
| `/sw.js` | Service worker — offline caching |
| `/css/tokens.css` | All CSS custom properties |
| `/css/reset.css` | Minimal CSS reset |
| `/css/layout.css` | Viewport, zone layout, orientation lock |
| `/css/stack.css` | Stack display component |
| `/css/keypad.css` | Key grid and all button variants |
| `/css/history.css` | History drawer component |
| `/css/slider.css` | Significant digits slider |
| `/css/animations.css` | All keyframes and transitions |
| `/js/main.js` | App entry point — module wiring |
| `/js/strings.js` | All user-facing strings |
| `/js/engine/rpn.js` | RPN engine — full stack and operator logic |
| `/js/engine/formatter.js` | Number display formatter |
| `/js/engine/history.js` | Session history log |
| `/js/ui/display.js` | Stack display DOM renderer |
| `/js/ui/keypad.js` | Keypad event binding |
| `/js/ui/drawer.js` | History drawer gesture and animation |
| `/js/ui/slider.js` | Significant digits slider binding |
| `/js/ui/haptic.js` | Vibration API wrapper |
| `/__tests__/rpn.test.js` | RPN engine unit tests |
| `/__tests__/formatter.test.js` | Formatter unit tests |
| `/.eslintrc.json` | ESLint configuration |
| `/LICENSE` | MIT License |
| `/README.md` | Repository readme for contributors |
| `/.github/workflows/deploy.yml` | GitHub Actions CI/CD pipeline |

**Design**

| File | Purpose |
|---|---|
| `/assets/icons/icon-192.png` | PWA icon 192×192 |
| `/assets/icons/icon-512.png` | PWA icon 512×512 |
| `/assets/icons/icon-maskable-512.png` | Maskable PWA icon |
| `/assets/icons/favicon.ico` | Browser tab favicon |
| `/assets/splash/splash-1125x2436.png` | Splash screen iPhone X/XS |
| `/assets/splash/splash-1242x2208.png` | Splash screen iPhone 8 Plus |
| `/assets/splash/splash-828x1792.png` | Splash screen iPhone XR/11 |

---

## M.5 — Legal and Licensing

**Application license:** MIT License. Full text committed to `/LICENSE`.

**Runtime dependencies:** Zero. No third-party JavaScript libraries are used at runtime.

**Development dependencies:** ESLint (MIT License), Vitest (MIT License). No attribution obligations for end users.

**Data privacy:** Stax collects zero user data. No cookies, no analytics, no tracking, no server-side storage. GDPR and CCPA compliance is satisfied by design — there is nothing to disclose, nothing to delete, and nothing to consent to.

**Font licensing:** System fonts only (`system-ui`, `-apple-system`). No web font loading, no font licensing required.

**Open source obligations:** None. All MIT-licensed devDependencies require only that the MIT License notice be preserved in their own source, which is satisfied by their presence in `node_modules` during development (not shipped to users).

---

## M.6 — Open Questions

This section is empty. All questions have been resolved during the interview phase. The blueprint is self-contained and actionable without further input from the project owner.

---

```
================================================================================
CONTRACTOR READINESS CHECKLIST
================================================================================

[x] PART A — EXECUTIVE DESIGN PILLARS
    Completion statement: Five design pillars defined with WILL/WILL NOT 
    commitments; persona, comparables, USPs, and session targets fully 
    specified.

[x] PART B — TECHNICAL STACK AND TOOLING
    Completion statement: Vanilla JS/HTML/CSS, no frameworks, GitHub Pages, 
    GitHub Actions CI/CD, Vitest; every tool named with version rationale 
    and rejected alternative.

[x] PART C — PROJECT STRUCTURE AND CONVENTIONS
    Completion statement: Full folder tree specified to leaf level; naming 
    conventions, code organization policy, style guide, state management 
    architecture, and testing strategy all committed.

[x] PART D — FEATURE SPECIFICATIONS
    Completion statement: All 14 features specified across D.1–D.14, each 
    with purpose, user story, acceptance criteria, detailed behaviour, edge 
    cases, data model, UI/UX, performance requirement, and cross-dependencies.

[x] PART E — DATA ARCHITECTURE
    Completion statement: All in-memory entities catalogued with full field 
    specs; data flow diagram provided; no-persistence design confirmed; 
    GDPR compliance satisfied by design.

[x] PART F — SYSTEM AND DOMAIN SPECIFICATIONS
    Completion statement: Web/mobile app domain (F.2) fully specified; 
    security threat model with five threats and mitigations provided; 
    non-applicable sections stated with rationale.

[x] PART G — USER INTERFACE AND EXPERIENCE
    Completion statement: UX philosophy, full screen map, interaction 
    vocabulary, error UX catalogue, no-onboarding decision, and per-platform 
    notes all committed.

[x] PART H — MULTIPLAYER / COLLABORATION / NETWORKING
    Completion statement: Explicitly not in scope; single-user offline app; 
    future consideration noted.

[x] PART I — VISUAL AND BRAND DESIGN
    Completion statement: Full dark and light colour palettes with hex codes 
    and token names; typography scale specified; art direction references 
    committed; animation durations and easings in a complete table; all 
    visual assets listed with dimensions and formats.

[x] PART J — AUDIO
    Completion statement: No audio component; rationale provided; no audio 
    assets required.

[x] PART K — NARRATIVE AND CONTENT
    Completion statement: Full string inventory in table form (27 strings); 
    all terminal states defined; localisation notes for future expansion 
    provided.

[x] PART L — PRODUCTION PLAN
    Completion statement: 5-role team table; 6-milestone ladder with exit 
    criteria; 10-risk register; budget estimate by department; outsourcing 
    plan; 7-device QA matrix; P0–P3 severity definitions; 17-item launch 
    certification checklist.

[x] PART M — APPENDICES
    Completion statement: 8 design decisions logged; 16-term glossary; 
    complete 25-file manifest by department; full legal/licensing 
    attestation.

[x] OPEN QUESTIONS
    Status: EMPTY — all questions resolved during interview phase.

================================================================================
BLUEPRINT SIGNED OFF.
Generated by Blueprint Architect.
This document is the sole source of truth for the production of STAX.
================================================================================
```

# stax

**The RPN calculator with taste.**

[**→ Open Stax**](https://horaciosalles.github.io/stax/)

---

Reverse Polish Notation is the most efficient way to calculate. Stax is the first RPN calculator designed to Apple HIG standards — a ruthlessly simple PWA that makes RPN feel as inevitable and beautiful as a Swiss watch.

No accounts. No subscriptions. No clutter. Installs on any device from any browser. Works offline, forever.

---

## Features

- **Full RPN stack** — X, Y, Z registers, visible at all times
- **ENTER · SWAP · ROT · CLX · CLR** — standard HP-style operations
- **Arithmetic + scientific** — `÷ × − + √ yˣ % ± 1/x`
- **Memory register** — STO · RCL · M+ · M−
- **Undo** — 50 levels, per stack-modifying operation
- **History drawer** — slide open to review your last calculations
- **Significant digits** — 2–12, controlled by a first-class slider
- **Backspace** — remove the last digit mid-entry
- **Copy result** — tap COPY to put X on your clipboard
- **Haptic feedback** — on every keypress, where supported
- **Portrait & landscape** — side-by-side layout in landscape
- **Dark + light mode** — follows system preference
- **Offline-first** — service worker caches 100% on first load
- **WCAG AA** — all text meets 4.5:1 contrast; full keyboard navigation

---

## Tech

Vanilla JavaScript (ES2022) · HTML5 · CSS3.  
No frameworks. No bundler. No runtime dependencies.  
Source files are the deployed artefact.

| Tool | Purpose |
|---|---|
| [Vitest](https://vitest.dev) | Unit tests |
| [ESLint](https://eslint.org) | Linting |
| [GitHub Actions](https://github.com/features/actions) | CI/CD — lint → test → deploy |
| [GitHub Pages](https://pages.github.com) | Hosting |

---

## Development

```bash
# Run tests
npm test

# Watch mode
npm run test:watch

# Coverage
npm run test:coverage

# Lint
npm run lint

# Regenerate PWA icons
npm run gen-icons
```

Serve locally with any static file server — no build step required:

```bash
npx serve .
```

---

## Keyboard shortcuts

| Key | Action |
|---|---|
| `0`–`9` | Digit entry |
| `.` | Decimal point |
| `Enter` | ENTER (push / duplicate) |
| `Backspace` | Remove last digit |
| `Escape` | CLX |
| `+ - * /` | Arithmetic operators |
| `Ctrl+Z` | Undo |

---

## Architecture

```
js/
  engine/
    rpn.js          ← sole owner of all mutable state
    formatter.js    ← significant-digit display logic
  ui/
    display.js      ← stack rendering
    keypad.js       ← input handling + CLR confirmation
    drawer.js       ← history panel + drag gesture
    slider.js       ← sig-digit control
    haptic.js       ← vibration API wrapper
  strings.js        ← all user-facing strings (single source of truth)

css/
  tokens.css        ← design tokens (colours, spacing, typography)
  layout.css        ← two-zone layout, landscape adaptation
  keypad.css        ← Liquid Glass key styles
  stack.css         ← stack display
  history.css       ← drawer panel
  animations.css    ← keyframes + reduced-motion support
```

Key decisions:
- No `innerHTML` or `eval` anywhere — all DOM writes via `textContent` / `createElement`
- History merged into `rpn.js` — no separate module
- Scientific notation uses Unicode superscripts (`⁰¹²…`), not `<sup>` HTML
- Stack underflow is a silent no-op — never shown as an error

---

## License

MIT © Horacio Salles

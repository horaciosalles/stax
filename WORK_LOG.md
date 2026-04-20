# WORK LOG — Stax
Current milestone: M1 — Foundation: RPN Engine & Project Skeleton
Last session: 2026-04-19
Status: First session. ARCHITECT handoff complete. BUILDER starting M1.

## ACTIVE CHECKPOINT
CHECKPOINT M1.1
Status:    IN_PROGRESS
Task:      Project scaffold + RPN engine + formatter + tests + HTML skeleton
Started:   2026-04-19
Completed: INCOMPLETE
Expected:  Vitest ≥90% coverage on rpn.js/formatter.js, ESLint zero errors, working raw-HTML keypad
Actual:    PENDING
Notes:     history.js merged into rpn.js. Scientific notation via Unicode superscripts.

## SESSION HISTORY (last 3)
2026-04-19 — First session. Architecture approved. M1 begun.

## PROJECT CONSTRAINTS
Stack: Vanilla JS ES2022, HTML5, CSS3. No frameworks, no bundler, no runtime deps.
No innerHTML/eval/new Function(). All DOM writes via textContent/createElement.
All strings in js/strings.js. All CSS values via token custom properties.
history.js merged into rpn.js (architectural decision, session 1).
Scientific notation: Unicode superscripts (⁰¹²…), not <sup> HTML.
Hosting: GitHub Pages. CI: GitHub Actions (lint→test→deploy).

## BLOCKERS
none

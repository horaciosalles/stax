# DEVELOPMENT TEAM
Project: Stax
Type:    web_app (PWA)
Stack:   Vanilla JavaScript (ES2022), HTML5, CSS3, GitHub Pages, GitHub Actions, Vitest, ESLint
Scale:   large

================================================================
START A SESSION
================================================================

Say:  "Start Stax"

That is the only command you need. The team assembles, reads the
log, and reports status automatically.

================================================================
§1  PROJECT IDENTITY
================================================================

Name:          Stax
Type:          web_app (PWA)
Stack:         Vanilla JavaScript (ES2022), HTML5, CSS3 — no frameworks,
               no bundler, no runtime dependencies. GitHub Pages hosting.
               GitHub Actions CI/CD. Vitest + ESLint as dev tooling.
Scale:         large
Done when:     Gold milestone — all D-section acceptance criteria verified
               on the full device matrix, Lighthouse ≥ 95 on Performance /
               Accessibility / Best Practices / PWA, zero P0/P1 bugs open,
               deployed to GitHub Pages, designer sign-off, client sign-off.
Review style:  frequent (formal milestone gate reviews at every milestone exit)
Constraints:   Zero runtime dependencies. No JavaScript frameworks. No build
               pipeline or bundler. Portrait-only layout enforced via CSS.
               Offline-first: 100% functionality after first load. Zero user
               data collected or stored (no localStorage, no server). WCAG AA
               contrast on all text. All DOM writes via textContent — no
               innerHTML, no eval. CSS logical properties throughout for
               future RTL readiness. env(safe-area-inset-bottom) applied to
               keypad. All user-facing strings in js/strings.js only.
Deploy target: GitHub Pages (HTTPS enforced, served from main branch root)

================================================================
§2  BOOT PROTOCOL
================================================================

On every session start, when the user says "Start Stax":

  1. ORCHESTRATOR reads WORK_LOG.md
  2. ORCHESTRATOR scans for any checkpoint with Status: IN_PROGRESS
       Found     → Report to user. Assign BUILDER to resume it.
       Not found → Report current milestone progress and status.
  3. ORCHESTRATOR presents status report (4–6 lines maximum)
  4. User confirms or redirects
  5. ORCHESTRATOR assigns one task to BUILDER
  6. BUILDER creates checkpoint, works, shows diff
  7. User: "y" to approve and commit | "n" with feedback to revise
  8. Cycle until milestone acceptance criteria are met
  9. ORCHESTRATOR calls REVIEWER. REVIEWER reports findings.
     BUILDER addresses any issues. User approves milestone.
  10. ORCHESTRATOR logs session to WORK_LOG.md. Checks size.

If WORK_LOG.md does not exist (first session): ORCHESTRATOR creates
it using the structure defined in §5.

Before any coding begins (first session only): ORCHESTRATOR activates
ARCHITECT. ARCHITECT reads stax_blueprint.md, produces the
architecture handoff document (component boundaries, data flow,
milestone task breakdown), presents to user for approval, then steps
back. All future sessions go through the standard boot above.

================================================================
§3  THE TEAM
================================================================

### ORCHESTRATOR
Active: every session.
Job: Session manager — boot, report, assign, log, archive.
Reads: WORK_LOG.md (session start and end only).

Responsibilities:
  · Report milestone status at session start
  · Detect and resume IN_PROGRESS checkpoints
  · Assign one task to BUILDER at a time
  · Call REVIEWER at milestone completion
  · Call SPECIALIST when BUILDER is blocked after 2 attempts
  · Write session summary to WORK_LOG.md at session end
  · Archive WORK_LOG.md when it exceeds 5 KB

Never: writes code · makes product decisions without user
       confirmation · references timelines or dates.
Reports to: User.
Speaks to:  User, BUILDER, REVIEWER, SPECIALIST, ARCHITECT.

---

### BUILDER
Active: every session.
Job: The coder — one task, one diff, one commit, one checkpoint.
Reads: WORK_LOG.md "Project constraints" section.
       (First session only: stax_blueprint.md if provided by
       ORCHESTRATOR as part of ARCHITECT handoff.)

Responsibilities:
  · Confirm the assigned task with ORCHESTRATOR before starting
  · Create a checkpoint (via ORCHESTRATOR) before each task
  · Write code for the assigned task only — vanilla JS/HTML/CSS,
    no frameworks, no runtime dependencies, no innerHTML
  · Show a diff — never commit before the user sees it
  · Wait for "y" before committing
  · After "y": commit with a descriptive message, close checkpoint
  · After 2 failed attempts on a blocker: report to ORCHESTRATOR
  · After first session: summarize project constraints (stack rules,
    naming conventions, module boundaries, key decisions) into the
    "Project constraints" section of WORK_LOG.md via ORCHESTRATOR

Never: commits without "y" · starts work without an assignment ·
       updates WORK_LOG.md directly · introduces a framework,
       bundler, or runtime dependency · uses innerHTML, eval, or
       new Function() · makes architectural decisions without user
       confirmation.
Reports to: User (diff approval), ORCHESTRATOR (tasks, blockers).
Speaks to:  User, ORCHESTRATOR.

---

### REVIEWER
Active: on-call. Called by ORCHESTRATOR at every milestone
        completion, or for a mid-milestone review.
Job: Quality gate — review and report, never implement.
Reads: The diff or files relevant to the milestone being reviewed.

Responsibilities:
  · Review for correctness, consistency, and constraint adherence.
    Specifically flag: any use of innerHTML / eval / new Function(),
    any runtime dependency added to package.json, any hardcoded
    string outside js/strings.js, any CSS not using token variables,
    any DOM write that bypasses textContent.
  · Verify ESLint rules are satisfied (no-var, prefer-const,
    eqeqeq, no-console except error, semi, single quotes, 2-space indent)
  · Check WCAG AA contrast for any new colour usage
  · Produce a short findings report: passes | issues | risks
  · Flag issues to BUILDER for resolution — does not fix them

Never: writes code · activates without being called.
Reports to: ORCHESTRATOR (findings), User (summary).
Speaks to:  ORCHESTRATOR, User.

---

### SPECIALIST
Active: on-call. Called by ORCHESTRATOR only after BUILDER has
        made 2 genuine attempts and remains blocked.
Job: Deep technical problem solver — diagnose, propose, return.
Reads: The specific problem description and relevant code excerpt.

Primary expertise areas for this project:
  · iOS Safari PWA behaviour (no vibrate API, install UX, swipe-back
    gesture conflicts with the history drawer, safe-area insets)
  · RPN floating-point precision and display formatting edge cases
  · Service worker cache versioning and stale-cache failure modes
  · CSS layout on constrained viewports (375px min, iPhone SE)
  · Vanilla JS module wiring without a bundler

Responsibilities:
  · Diagnose the blocker
  · Propose 2–3 solutions with tradeoffs
  · Recommend one with reasoning
  · Return findings to ORCHESTRATOR

Never: writes code unless ORCHESTRATOR explicitly asks ·
       activates itself · speaks to the user directly.
Reports to: ORCHESTRATOR only.
Speaks to:  ORCHESTRATOR only.

---

### ARCHITECT
Active: on-call. Activates ONCE before any coding begins.
        May be recalled at major milestone gates (e.g., between
        Prototype and First Playable if module boundaries need
        revisiting).
Job: Technical design — produce the architecture handoff document,
     then step back.
Reads: stax_blueprint.md (complete), plus any additional
       documentation the user provides.

Responsibilities:
  · Translate stax_blueprint.md into a concrete implementation plan:
    confirm the module map (C.1), the state ownership rules (C.3/C.5),
    the CSS token strategy (I.2), the service worker cache manifest
    (D.14), and the test structure (C.6)
  · Produce a concise architecture handoff document: data flow,
    component boundaries, module responsibilities, key design
    decisions, open implementation questions
  · Present to user for approval
  · Hand off to ORCHESTRATOR and BUILDER with a clear milestone
    task breakdown
  · Step back from active participation

Never: writes production code · remains active during implementation ·
       makes product decisions · overrides stax_blueprint.md without
       user approval.
Reports to: User.
Speaks to:  User, ORCHESTRATOR, BUILDER (handoff).

================================================================
§4  WORKFLOW — MILESTONE SEQUENCE
================================================================

BUILDER cannot start milestone N+1 until the user approves
milestone N's acceptance criteria. There are no dates or timelines.
Work advances milestone by milestone.

Source of truth for all feature acceptance criteria: stax_blueprint.md
Part D (D.1–D.14). REVIEWER validates against those criteria at each
milestone gate.

---

MILESTONE 1: Foundation — RPN Engine & Project Skeleton
Goal:        Prove the mathematical core is correct and the project
             structure is established before any UI work begins.
Deliverable: Repository initialized with the folder structure defined
             in stax_blueprint.md C.1. js/engine/rpn.js implements
             the full RPN stack (D.1), formatter.js implements
             significant-digit display (D.9), history.js implements
             the session log (D.11). __tests__/rpn.test.js and
             __tests__/formatter.test.js at ≥ 90% line coverage.
             .eslintrc.json committed. index.html skeleton (no styling)
             that wires the engine to a minimal raw HTML keypad.
             Basic arithmetic, all scientific functions, SWAP/ROT/CLX,
             memory, and undo all compute correctly.
Acceptance:  Vitest runs and reports ≥ 90% line coverage on rpn.js
             and formatter.js with zero failures. ESLint passes with
             zero errors. User manually verifies: a chained
             multi-step calculation produces correct results in the
             raw HTML UI. All error conditions from D.1.3 produce the
             correct error strings.
Depends on:  none

---

MILESTONE 2: First Playable — All Features Wired, PWA Installable
Goal:        Every feature in D.1–D.14 is functional; the app
             installs to a home screen and operates offline.
Deliverable: All JS UI modules complete (display.js, keypad.js,
             drawer.js, slider.js, haptic.js, main.js, strings.js).
             All CSS files present (tokens.css, reset.css, layout.css,
             stack.css, keypad.css, history.css, slider.css,
             animations.css) — functional but not yet polished.
             manifest.json and sw.js with full CACHE_MANIFEST. GitHub
             Actions pipeline (lint → test → deploy) operational.
             App deploys to GitHub Pages.
Acceptance:  All 14 features in D.1–D.14 functional (acceptance
             criteria verified by REVIEWER). App installs to home
             screen on Android Chrome and iOS Safari (Add to Home
             Screen). App loads and fully operates in airplane mode.
             ESLint passes. Vitest passes. No P0 bugs.
Depends on:  M1

---

MILESTONE 3: Vertical Slice — Visual Design & Animations Applied
Goal:        The full visual design from stax_blueprint.md Part I is
             implemented; one polished end-to-end experience.
Deliverable: tokens.css fully populated with all colour tokens (dark
             + light mode via prefers-color-scheme), all typography
             tokens, spacing scale, and border-radius tokens per I.1
             and I.2. All key variants styled per G.2 (digit, operator,
             function, stack-op, memory, ENTER, action row). Stack
             display styled per D.2.7. History drawer open/close
             animation and drag gesture per D.10.4. All animations
             from I.4 implemented with prefers-reduced-motion support.
             Orientation lock overlay per B.10. Safe-area inset
             applied to keypad bottom.
Acceptance:  Lighthouse score ≥ 90 on Performance, Accessibility,
             Best Practices, PWA. History drawer drag gesture works on
             real iOS and Android devices. No P0 or P1 bugs. REVIEWER
             confirms: all CSS uses token variables (no hardcoded
             colours or sizes), all strings in js/strings.js, all
             animations suppressed under prefers-reduced-motion.
             Portrait-only enforcement verified in landscape on both
             platforms.
Depends on:  M2

---

MILESTONE 4: Alpha — Feature Complete, Full Platform Verified
Goal:        Every acceptance criterion in stax_blueprint.md D.1–D.14
             passes on every device in the QA matrix.
Deliverable: All outstanding acceptance criteria from D.1–D.14 not
             yet fully verified — in particular: CLR two-tap
             confirmation (D.6.4), UNDO keyboard shortcut Cmd/Ctrl+Z
             (D.8.6), hardware keyboard support for all operations
             (D.3/D.4/D.13), COPY with success/fail feedback (D.11),
             haptic patterns per D.12, M indicator per D.2.7, input
             cursor blink per D.2.4, font scale-down on overflow per
             D.2.5. All fixes from Milestone 3 REVIEWER report
             addressed.
Acceptance:  All D-section acceptance criteria pass. Full manual QA
             checklist from L.6 executed and signed off. No P0 bugs.
             All known P1 bugs documented in GitHub Issues.
Depends on:  M3

---

MILESTONE 5: Beta — Polish Complete, Bug-Fix Only
Goal:        The app is releasable in all but final sign-off; no new
             features, no P1 bugs.
Deliverable: All P1 bugs from Alpha resolved. PWA icons and splash
             screens finalised (all dimensions per I.5 and M.4).
             favicon.ico present. README.md committed. LICENSE (MIT)
             committed. npm audit shows zero high/critical
             vulnerabilities. Any P2 bugs the team chooses to address
             at this stage.
Acceptance:  Lighthouse ≥ 95 on Performance, Accessibility, Best
             Practices, PWA. No P0 or P1 bugs. App tested on all 7
             devices in the L.6 QA matrix. Haptic fires correctly on
             Android. WCAG AA contrast verified on all text/background
             combinations. All items in L.7 launch checklist that can
             be verified pre-Gold are checked.
Depends on:  M4

---

MILESTONE 6: Gold — Certified & Shipped
Goal:        Every item in the L.7 launch certification checklist is
             complete; the app is live and signed off.
Deliverable: All L.7 checklist items satisfied. GitHub Pages
             deployment live at production URL. robots.txt or meta
             noindex decision committed. Designer visual review
             complete. Client (project owner) review complete.
Acceptance:  Every checkbox in stax_blueprint.md L.7 is checked.
             Zero open P0/P1 bugs. Designer sign-off obtained. Client
             sign-off obtained. The live GitHub Pages URL loads,
             installs, and operates offline correctly.
Depends on:  M5

================================================================
§5  CONTEXT MANAGEMENT
================================================================

### Log files

WORK_LOG.md — active log. ORCHESTRATOR owns it. BUILDER records
checkpoints via ORCHESTRATOR. Created at first session.

WORK_LOG_ARCHIVE.md — created by ORCHESTRATOR when WORK_LOG.md
exceeds 5 KB. Completed milestone sections move here.

### WORK_LOG.md structure

  # WORK LOG — Stax
  Current milestone: [M_N name and number]
  Last session: [date]
  Status: [1–2 sentence summary]

  ## ACTIVE CHECKPOINT
  [current or most recent checkpoint]

  ## SESSION HISTORY (last 3)
  [1–2 lines per session]

  ## PROJECT CONSTRAINTS
  [technical constraints summary — BUILDER writes this after first session]

  ## BLOCKERS
  [open blockers | "none"]

### Checkpoint schema

  CHECKPOINT [milestone].[sequence]
  Status:    PENDING | IN_PROGRESS | COMPLETE | FAILED
  Task:      [one-line description]
  Started:   [timestamp]
  Completed: [timestamp | INCOMPLETE]
  Expected:  [what should happen]
  Actual:    [what happened | PENDING]
  Notes:     [optional]

### Archival rule

When WORK_LOG.md > 5 KB: move completed milestone sections to
WORK_LOG_ARCHIVE.md, replace each with a 2-line summary, commit
both files with message "chore: archive work log". Keep current
milestone and last 3 sessions in WORK_LOG.md.

### Token rules

  · ORCHESTRATOR reads only WORK_LOG.md at boot, not the codebase
  · BUILDER summarizes project constraints to WORK_LOG.md after the
    first session — does not re-read stax_blueprint.md afterward
  · Diffs only in conversation — no full file pastes
  · One task assigned to BUILDER at a time
  · Session history compressed to 1–2 lines per entry
  · On-call roles read only what is relevant to their specific job

================================================================
§6  DECISION RIGHTS
================================================================

  Decision                                  Who decides    Who advises
  ─────────────────────────────────────────────────────────────────────
  Is this diff good enough to commit?       User           BUILDER
  Does this milestone meet acceptance?      User           ORCHESTRATOR
  What to build in the next task?           ORCHESTRATOR   User confirms
  How to resolve a blocker?                 ORCHESTRATOR   SPECIALIST
  Does this milestone pass review?          User           REVIEWER
  What is the technical architecture?       User approves  ARCHITECT
  What to cut if scope is too large?        User           ORCHESTRATOR flags
  Does a change contradict the blueprint?   User           ORCHESTRATOR flags

### Escalation path

  BUILDER blocked (2 attempts) → reports to ORCHESTRATOR
  ORCHESTRATOR calls SPECIALIST → SPECIALIST diagnoses → proposes
  to ORCHESTRATOR → ORCHESTRATOR presents to user → user approves
  → BUILDER implements

  Any proposed deviation from stax_blueprint.md constraints
  (e.g., adding a dependency, using innerHTML) → ORCHESTRATOR flags
  to user immediately before BUILDER proceeds.

================================================================
*development_team.md — generated from stax_blueprint.md*
*Source blueprint: stax_blueprint.md v1.0, April 2026*
================================================================

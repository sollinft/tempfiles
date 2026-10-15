# Auralis Launch Hardening Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Clean generated/private clutter, preserve the existing Auralis visual direction, improve alignment and motion accessibility, and prove the app launches through a repeatable verification loop.

**Architecture:** Keep the existing single-page React/Vite structure and component boundaries. Make narrow changes in `src/App.tsx` and `src/index.css`, remove only verified generated/unused artefacts, and validate with a fresh dependency install plus lint/build/browser smoke checks.

**Tech Stack:** React 19, TypeScript, Vite, Tailwind CSS, Framer Motion, npm, Playwright.

## Global Constraints

- Preserve the current Auralis palette, typography, card navigation, and overall art direction.
- Do not imply wallet, mint, queue, or AI actions are production integrations; keep demo framing accurate.
- Respect `prefers-reduced-motion` for CSS and Framer Motion behavior.
- Delete only confirmed generated/unused files: `dist/`, root `.codex-*.png`, and unused Vite starter assets.
- Do not run `npm audit fix --force`.

### Task 1: Remove generated clutter and tighten project hygiene

**Files:**
- Delete: `dist/`
- Delete: `.codex-app.png`, `.codex-hero-cursor-png.png`, `.codex-home-2.png`, `.codex-home-full.png`, `.codex-home.png`, `.codex-showcase-2.png`, `.codex-showcase.png`, `.codex-team.png`
- Delete: `public/icons.svg`, `src/assets/hero.png`, `src/assets/react.svg`, `src/assets/vite.svg`
- Modify: `.gitignore`

- [x] **Step 1: Remove only the verified generated and unused files.**
- [x] **Step 2: Add `.codex-*.png`, `.env`, `.env.*`, and secret/key patterns to `.gitignore` while keeping `.env.example` trackable.**
- [x] **Step 3: Confirm no remaining source references point to removed assets with `rg`.**

### Task 2: Stabilize alignment and motion behavior

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/index.css`

**Interfaces:**
- Existing components and route contracts remain unchanged.

- [x] **Step 1: Add a shared reduced-motion boolean at animation-heavy boundaries and pass static motion props where required.**
- [x] **Step 2: Prevent scroll progress from causing unnecessary React renders by updating poster state only when the slide index changes.**
- [x] **Step 3: Add consistent max-width, heading measure, and section spacing utilities without changing the visual system.**
- [x] **Step 4: Improve mobile poster typography and nav/header offsets so text remains centered and readable at narrow widths.**
- [x] **Step 5: Make animated helper text and shimmer stop cleanly under reduced motion.**

### Task 3: Fresh-install and verification loop

**Files:**
- No source changes unless verification exposes a concrete defect.

- [x] **Step 1: Install exactly from the lockfile with `npm ci`.**
- [x] **Step 2: Run `npm run lint` and fix only reported issues.**
- [x] **Step 3: Run `npm run build` and confirm Vite emits a fresh `dist/`.**
- [x] **Step 4: Run a local preview and use Playwright smoke checks at desktop and mobile widths for home, showcase, how-it-works, team, docs, FAQ, and app routes.**
- [x] **Step 5: Repeat lint and build after browser fixes; report any remaining dependency audit findings separately.**

### Task 4: Final hygiene and handoff

- [x] **Step 1: Re-run artifact, secret, and source-reference scans.**
- [x] **Step 2: Confirm `dist/` is ignored and no `.codex-*.png` files remain.**
- [x] **Step 3: Summarize exact verification results and any demo-only limitations.**

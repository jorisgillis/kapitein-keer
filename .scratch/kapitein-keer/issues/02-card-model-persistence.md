# 02: Card data model + localStorage persistence

**What to build:** Define the 100 multiplication facts (tables 1–10, each with facts a×b for b=1..10) as the initial card dataset. Each card has a fact (two operands), difficulty, stability, repetitions, lapses, nextReviewDate, previousReviewDate, and a `seen` flag. Implement save and load functions that persist all cards as a single JSON array in `localStorage` under the key `kapitein-keer:cards`. On first load (when localStorage is empty), initialize all 100 cards with `seen: false` and no FSRS state. On subsequent loads, restore from localStorage.

**Blocked by:** 01 (HTML shell + FSRS v6 port + tests)

**Status:** resolved

- [x] Opening `index.html` for the first time creates 100 cards in localStorage with `seen: false`
- [x] Reloading the page preserves all card state from localStorage
- [x] Cards can be saved and loaded without data loss (verify in browser dev tools)
- [x] The card data model supports the FSRS scheduler's expected inputs (memory model, repetitions, lapses, dates)

## Answer

Implemented in `index.html` only (single-file architecture kept; `fsrs.js` and `kapitein-keer.test.html` untouched). A new inline `<script>` block after the `fsrs.js` tag contains:

- **Card model + `initCards()`** — builds the 100 app cards (tables a=1..10 × b=1..10). New cards: `difficulty: null`, `stability: null`, `repetitions: 0`, `lapses: 0`, both dates `null`, `seen: false`.
- **Persistence** — `saveCards(cards)` / `loadCards()` store the whole array as one JSON document under `kapitein-keer:cards`. First load (key missing or unparseable JSON) initializes 100 fresh cards, saves them, and returns them; otherwise the stored array is restored as-is.
- **Streak** — separate key `kapitein-keer:streak`, initialized as `{ lastPracticeDate: null, streak: 0 }`, with `loadStreak()` / `saveStreak(streak)` for the parent dashboard (ticket 07).
- **FSRS bridges** — `appCardToFSRS(card)` (NoMemoryModel when unseen, DSMemoryModel with difficulty/stability when seen; ISO strings → `Date`), `fSRSMToAppCard(fsrsCard, fact)` (back to app shape with ISO strings, `seen: true`, fact preserved), and `applyGrade(card, grade)` which chains convert → `FSRS.schedule` → convert-back. These are the seam later tickets use.
- **Global state** — module-level `cards`, loaded on page init via `cards = loadCards()`; everything exposed on `window.App` (`cards` as a live getter, all functions, `STORAGE_KEY`, `STREAK_KEY`).
- **UI** — stat tiles now show live values: `10 Tafels` (kept), `0 / 100 Beheerst`, `100 Kaarten`, plus a subtle `100 kaarten geladen` line. Pirate Cove style unchanged; Start! button still inert (ticket 03). Note: "Beheerst" currently counts seen cards as a placeholder — the real mastery criterion belongs to the dashboard ticket.

Verified with a Node harness (`/tmp/verify-ticket02.mjs`) that extracts the inline script from `index.html` and runs it against the real `fsrs.js` with shimmed `window`/`localStorage`/`document`: 42/42 assertions pass, covering first-load initialization (100 cards, `seen: false`, no FSRS state), reload persistence, save/load roundtrip without data loss, corrupt-JSON recovery, both bridge directions, and `applyGrade` on a new card graded Good (stability ≈ 2.3065, difficulty ≈ 2.1181 — matching the Java reference values in the FSRS test suite).

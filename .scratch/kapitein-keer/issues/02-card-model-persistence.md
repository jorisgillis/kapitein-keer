# 02: Card data model + localStorage persistence

**What to build:** Define the 100 multiplication facts (tables 1–10, each with facts a×b for b=1..10) as the initial card dataset. Each card has a fact (two operands), difficulty, stability, repetitions, lapses, nextReviewDate, previousReviewDate, and a `seen` flag. Implement save and load functions that persist all cards as a single JSON array in `localStorage` under the key `kapitein-keer:cards`. On first load (when localStorage is empty), initialize all 100 cards with `seen: false` and no FSRS state. On subsequent loads, restore from localStorage.

**Blocked by:** 01 (HTML shell + FSRS v6 port + tests)

**Status:** ready-for-agent

- [ ] Opening `index.html` for the first time creates 100 cards in localStorage with `seen: false`
- [ ] Reloading the page preserves all card state from localStorage
- [ ] Cards can be saved and loaded without data loss (verify in browser dev tools)
- [ ] The card data model supports the FSRS scheduler's expected inputs (memory model, repetitions, lapses, dates)

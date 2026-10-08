# 06: Celebration + empty state + stop early + practice anyway

**What to build:** Build the celebration view: a pirate-themed "Goed gedaan!" screen shown when all cards in the session are complete, with a "Terug naar start" button that returns to table selection. Build the empty state view: when a session has zero cards (no due cards and no new cards remaining in the selected tables), show "Alles Klaar!" with a friendly message ("Kom morgen terug!") and an "Oefen toch" (practice anyway) button. "Oefen toch" builds a session from all seen cards in the selected tables, ignoring due dates (review ahead of schedule), limited to a reasonable batch. Wire the "Stoppen" button on the quiz screen to end the session early and return to table selection.

**Blocked by:** 05 (Self-grading + FSRS scheduling + progress)

**Status:** resolved

- [x] Completing all cards in a session shows a celebration screen with "Goed done!" and a "Terug naar start" button
- [x] "Terug naar start" returns to the table selection screen
- [x] Starting a session when no cards are due and no new cards remain shows the empty state "Alles Klaar!"
- [x] "Oefen toch" on the empty state builds a session from all seen cards (ignoring due dates) and starts the quiz
- [x] "Stoppen" on the quiz screen ends the session immediately and returns to table selection
- [x] Cards graded before stopping early are still saved to localStorage

## Answer

Implemented in a single new `<script>` block at the end of `index.html` (tickets 06 & 07 together), plus HTML changes to three views:

### HTML changes

1. **`#view-celebration`** — Replaced placeholder with pirate-themed celebration: large 🏴‍☠️ emoji, "Goed gedaan!" bubble, "Alle kaarten klaar!" subheading, dynamic card count ("Je hebt X kaarten geoefend!"), and the existing "Terug naar start" button (already wired by ticket 05).

2. **`#view-empty`** — Replaced placeholder with "Alles Klaar!" bubble, "Kom morgen terug!" text, and two buttons: "Oefen toch" (primary, ink-styled) and "Terug naar start" (secondary, white-styled).

3. **`#view-parent`** — Replaced placeholder with full dashboard: white card container with ink border, header with "Voortgang" title and ✕ close button, three sand-colored stat tiles (Beheerst, Dagen reeks, Vandaag), and a "Tafels" section with per-table accuracy bars.

### Script changes (new block)

- **`getSelectedTables()`** — reads `aria-pressed` from `.table-toggle` buttons to get currently selected tables.
- **`App.showView` wrapper** — when `view-celebration` is shown, updates `#celebration-count` with the number of cards in the session.
- **`#btn-stop`** — clears session via `App.setSession(null)`, shows `view-tables`, calls `App.refreshStats()`. Cards graded before stopping are already saved by ticket 05.
- **`#btn-practice-anyway`** — reads selected tables, calls `App.buildSession(tables, true)` (practiceAnyway includes all seen cards, max 20), sets session, transitions to quiz. If no seen cards exist, returns to table selection.
- **`#btn-empty-back`** — shows `view-tables`.
- **`#btn-parent` / `#btn-parent-quiz`** — stores the originating view in `previousView`, calls `renderDashboard()`, shows `view-parent`.
- **`#btn-parent-back`** — returns to `previousView`.
- **`computeDashboardStats()`** — computes mastered (stability > 21), streak (from `App.loadStreak()`), due today (nextReviewDate <= end of today), and per-table accuracy ((reps - lapses) / reps * 100).
- **`renderDashboard()`** — fills stat tiles and renders 10 table accuracy bars with color coding (green >80%, yellow 50-80%, red <50%).

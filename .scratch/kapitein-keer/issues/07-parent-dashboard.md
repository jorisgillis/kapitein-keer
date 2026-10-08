# 07: Parent dashboard

**What to build:** Add a ⚙️ button in the corner of the table selection and quiz views. Tapping it switches to the parent dashboard view: a calmer, data-focused layout with white cards (thick ink borders, rounded corners) on a light background. Show three stat tiles in a grid (sand-colored): "Beheerst" (cards mastered = count of cards with stability > 21 days, shown as "X / 100"), "Dagen reeks" (current streak = consecutive days with at least one graded card), and "Vandaag" (cards due today = count of cards where nextReviewDate <= end of today). Below the stat tiles, show a "Tafels" section with accuracy per table (1–10): horizontal bars with colored fills (green = >80%, yellow = 50–80%, red = <50%) on light gray tracks, with percentage labels. A "Terug" button returns to the previous child view. The dashboard is strictly read-only — no buttons that modify data.

**Blocked by:** 05 (Self-grading + FSRS scheduling + progress)

**Status:** resolved

- [x] ⚙️ button is visible on the table selection and quiz views
- [x] Tapping ⚙️ switches to the parent dashboard view
- [x] Dashboard shows three stat tiles: cards mastered (X/100), current streak (days), cards due today
- [x] Dashboard shows per-table accuracy bars for tables 1–10 with color coding (green/yellow/red)
- [x] "Terug" button returns to the previous child view
- [x] Dashboard is read-only — no data-modifying controls
- [x] Stats update correctly after grading cards in a session (reload to verify)

## Answer

Implemented in a single new `<script>` block at the end of `index.html` (tickets 06 & 07 together), plus HTML changes to `#view-parent`:

### HTML changes

Replaced `#view-parent` placeholder with a full dashboard: white card (`bg-white border-4 border-ink rounded-3xl`) containing a header row ("Voortgang" + ✕ close button), three sand-colored stat tiles in a 3-column grid (Beheerst, Dagen reeks, Vandaag), and a "Tafels" section with a container (`#parent-tables`) for per-table accuracy bars.

### Script changes (new block)

- **`computeDashboardStats()`** — computes:
  - **Beheerst**: count of cards with `seen && stability > 21`
  - **Dagen reeks**: from `App.loadStreak().streak`
  - **Vandaag**: count of seen cards with `nextReviewDate <= end of today`
  - **Per-table accuracy**: for each table 1–10, `(repetitions - lapses) / repetitions * 100` (0% if no graded cards)
- **`renderDashboard()`** — fills the three stat tiles and renders 10 horizontal accuracy bars with color coding: green (#2ECC71) for >80%, yellow (#F39C12) for 50–80%, red (#FF6B6B) for <50%.
- **`openParentDashboard(fromView)`** — stores the originating view, calls `renderDashboard()`, shows `view-parent`.
- **`#btn-parent`** (table view) → `openParentDashboard('view-tables')`
- **`#btn-parent-quiz`** (quiz view) → `openParentDashboard('view-quiz')`
- **`#btn-parent-back`** (✕) → returns to `previousView`
- Dashboard is strictly read-only — the only interactive element is the ✕ close button.

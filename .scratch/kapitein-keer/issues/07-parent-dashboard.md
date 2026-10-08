# 07: Parent dashboard

**What to build:** Add a ⚙️ button in the corner of the table selection and quiz views. Tapping it switches to the parent dashboard view: a calmer, data-focused layout with white cards (thick ink borders, rounded corners) on a light background. Show three stat tiles in a grid (sand-colored): "Beheerst" (cards mastered = count of cards with stability > 21 days, shown as "X / 100"), "Dagen reeks" (current streak = consecutive days with at least one graded card), and "Vandaag" (cards due today = count of cards where nextReviewDate <= end of today). Below the stat tiles, show a "Tafels" section with accuracy per table (1–10): horizontal bars with colored fills (green = >80%, yellow = 50–80%, red = <50%) on light gray tracks, with percentage labels. A "Terug" button returns to the previous child view. The dashboard is strictly read-only — no buttons that modify data.

**Blocked by:** 05 (Self-grading + FSRS scheduling + progress)

**Status:** ready-for-agent

- [ ] ⚙️ button is visible on the table selection and quiz views
- [ ] Tapping ⚙️ switches to the parent dashboard view
- [ ] Dashboard shows three stat tiles: cards mastered (X/100), current streak (days), cards due today
- [ ] Dashboard shows per-table accuracy bars for tables 1–10 with color coding (green/yellow/red)
- [ ] "Terug" button returns to the previous child view
- [ ] Dashboard is read-only — no data-modifying controls
- [ ] Stats update correctly after grading cards in a session (reload to verify)

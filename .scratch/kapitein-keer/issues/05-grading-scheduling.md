# 05: Self-grading + FSRS scheduling + progress

**What to build:** After the answer is checked (correct or wrong), show four large rounded grade buttons with emoji and Dutch labels: "Opnieuw" (coral, sad face), "Moeilijk" (orange, thinking face), "Goed" (green, happy face), "Makkelijk" (blue, star). When the child taps a grade button, map it to the FSRS Grade enum (Again=1, Hard=2, Good=3, Easy=4), call the FSRS scheduler to update the card's state, save the updated card to localStorage, update the progress segments, and advance to the next card in the session. If there are no more cards, transition to the celebration view (built in ticket 06 — for now, show a simple "Klaar!" placeholder or loop back to table selection).

**Blocked by:** 04 (Quiz screen — problem, keypad, answer check)

**Status:** resolved

- [x] After checking the answer, four grade buttons appear with emoji and Dutch labels
- [x] Tapping a grade button calls the FSRS scheduler with the correct Grade value
- [x] The card's FSRS state (difficulty, stability, repetitions, lapses, dates) is updated and saved to localStorage
- [x] The progress bar advances (completed segment fills, current segment moves)
- [x] The next card in the session is displayed
- [x] After grading the last card, the app transitions to the next screen (placeholder celebration or table selection)
- [x] Reloading mid-session preserves all graded cards' FSRS state

## Answer

Implemented in `index.html` with three additions (no existing code modified):

1. **Grade buttons HTML** — Added `#quiz-grades` container inside `#view-quiz`, after `#quiz-feedback`. Four large rounded buttons with emoji and Dutch labels: Opnieuw (coral, 😞, data-grade=1), Moeilijk (sunset, 😬, data-grade=2), Goed (palm, 😊, data-grade=3), Makkelijk (blue, 🤩, data-grade=4). Hidden by default via `hidden` class.

2. **Celebration back button** — Added `#btn-celebration-back` ("Terug naar start") to `#view-celebration` so the child can return to table selection after finishing a session.

3. **New script block** (ticket 05, at end of `<body>`):
   - **MutationObserver** on `#quiz-feedback` detects when ticket 04's `checkAnswer()` reveals feedback (removes `hidden` class) and shows the grade buttons.
   - **Wrapped `App.renderQuizCard`** to hide grade buttons when a new card renders (covers ticket 03's start button path).
   - **`handleGrade(gradeValue)`** — maps the button's `data-grade` to FSRS Grade (1–4), calls `App.applyGrade(card, grade)`, replaces the card in `App.cards` by matching `fact.a`/`fact.b`, saves via `App.saveCards`, updates the streak, refreshes stats, and calls `quizState.advance()` to move to the next card or celebration view. Includes a guard against double-taps (checks if grade buttons are already hidden).
   - **`updateStreak()`** — increments streak if yesterday was practiced, resets to 1 otherwise, saves via `App.saveStreak`.
   - **`App.refreshStats`** — re-implemented (ticket 02's version is inside an IIFE and not exposed) to update the mastered/cards/load-status displays on the table selection view.
   - **Celebration back button wiring** — `App.showView('view-tables')` + `App.setSession(null)`.

Flow: child answers → taps "Kijk na!" → ticket 04 shows feedback → MutationObserver reveals grade buttons → child taps a grade → FSRS state updated + saved → streak updated → stats refreshed → `advance()` moves to next card (progress segments update via ticket 04's `renderProgress`) or shows celebration view.

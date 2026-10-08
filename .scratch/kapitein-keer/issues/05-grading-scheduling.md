# 05: Self-grading + FSRS scheduling + progress

**What to build:** After the answer is checked (correct or wrong), show four large rounded grade buttons with emoji and Dutch labels: "Opnieuw" (coral, sad face), "Moeilijk" (orange, thinking face), "Goed" (green, happy face), "Makkelijk" (blue, star). When the child taps a grade button, map it to the FSRS Grade enum (Again=1, Hard=2, Good=3, Easy=4), call the FSRS scheduler to update the card's state, save the updated card to localStorage, update the progress segments, and advance to the next card in the session. If there are no more cards, transition to the celebration view (built in ticket 06 — for now, show a simple "Klaar!" placeholder or loop back to table selection).

**Blocked by:** 04 (Quiz screen — problem, keypad, answer check)

**Status:** ready-for-agent

 [ ] After checking the answer, four grade buttons appear with emoji and Dutch labels
- [ ] Tapping a grade button calls the FSRS scheduler with the correct Grade value
- [ ] The card's FSRS state (difficulty, stability, repetitions, lapses, dates) is updated and saved to localStorage
- [ ] The progress bar advances (completed segment fills, current segment moves)
- [ ] The next card in the session is displayed
- [ ] After grading the last card, the app transitions to the next screen (placeholder celebration or table selection)
- [ ] Reloading mid-session preserves all graded cards' FSRS state

# 06: Celebration + empty state + stop early + practice anyway

**What to build:** Build the celebration view: a pirate-themed "Goed gedaan!" screen shown when all cards in the session are complete, with a "Terug naar start" button that returns to table selection. Build the empty state view: when a session has zero cards (no due cards and no new cards remaining in the selected tables), show "Alles Klaar!" with a friendly message ("Kom morgen terug!") and an "Oefen toch" (practice anyway) button. "Oefen toch" builds a session from all seen cards in the selected tables, ignoring due dates (review ahead of schedule), limited to a reasonable batch. Wire the "Stoppen" button on the quiz screen to end the session early and return to table selection.

**Blocked by:** 05 (Self-grading + FSRS scheduling + progress)

**Status:** ready-for-agent

- [ ] Completing all cards in a session shows a celebration screen with "Goed gedaan!" and a "Terug naar start" button
- [ ] "Terug naar start" returns to the table selection screen
- [ ] Starting a session when no cards are due and no new cards remain shows the empty state "Alles Klaar!"
- [ ] "Oefen toch" on the empty state builds a session from all seen cards (ignoring due dates) and starts the quiz
- [ ] "Stoppen" on the quiz screen ends the session immediately and returns to table selection
- [ ] Cards graded before stopping early are still saved to localStorage

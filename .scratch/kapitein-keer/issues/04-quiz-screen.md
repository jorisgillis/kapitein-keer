# 04: Quiz screen — problem, keypad, answer check

**What to build:** Build the quiz view: a white speech bubble (thick ink border, drop shadow) showing the current multiplication fact (e.g., "7 × 8 = ?") in large Fredoka text. Below it, a colorful round number keypad with buttons 0–9 (each a different bright color from the palette, circular, thick ink borders, press-down shadow effect) and a full-width dark "Kijk na!" (Check) button. The child's entered digits appear in a display area above the keypad. When "Kijk na!" is tapped, compare the entered answer to the correct product. Show immediate feedback: green "Goed!" if correct, or coral "Fout! Het juiste antwoord is X" if wrong. Include a progress indicator (segmented bar showing completed/current/remaining cards) and a "Stoppen" (stop early) link. The ⚙️ parent button is visible in the corner.

**Blocked by:** 03 (Table selection screen + session building)

**Status:** resolved

- [x] The current multiplication fact displays in a speech bubble
- [x] The number keypad has buttons 0–9, each in a different bright color, circular with press-down effect
- [x] Tapping keypad buttons appends digits to the answer display
- [x] "Kijk na!" checks the answer: correct shows green feedback, wrong shows coral feedback with the correct answer
- [x] The progress bar shows how many cards are done, current, and remaining
- [x] "Stoppen" link is visible and tappable
- [x] ⚙️ button is visible in the corner

## Answer

Implemented the full quiz screen in `index.html`:

1. **Quiz view HTML** (`#view-quiz`): Replaced the placeholder with the complete quiz layout — ⚙️ parent button (top-right, `btn-parent-quiz`), segmented progress bar (`quiz-progress-segments`) with "Opdracht X van Y" text, speech bubble with the fact (`quiz-fact`), circular ink answer display (`quiz-answer-display`), 3×4 grid keypad with colorful round buttons 1–9 + col-span-2 "Kijk na!" + button 0, hidden feedback area (`quiz-feedback`), and "Stoppen" link (`btn-stop`).

2. **Ticket 03 start button**: Modified `initStartButton()` to call `App.renderQuizCard()` after showing the quiz view, falling back to `renderQuizPlaceholder()` if the function isn't yet defined.

3. **Quiz logic script** (new block after ticket 03): Implements `renderCurrentCard()`, `updateAnswerDisplay()`, `addDigit()` (max 3 digits), `checkAnswer()` (compares entered vs correct product, shows green "Goed!" or coral "Fout! Het juiste antwoord is X"), `renderProgress()` (segmented bar with palm/sunset/white fills), `setKeypadEnabled()`, and wires up all keypad buttons. Exposes `App.renderQuizCard` and `App.quizState` (with `advance()` for ticket 05).

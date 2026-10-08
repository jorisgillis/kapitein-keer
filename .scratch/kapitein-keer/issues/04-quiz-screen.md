# 04: Quiz screen — problem, keypad, answer check

**What to build:** Build the quiz view: a white speech bubble (thick ink border, drop shadow) showing the current multiplication fact (e.g., "7 × 8 = ?") in large Fredoka text. Below it, a colorful round number keypad with buttons 0–9 (each a different bright color from the palette, circular, thick ink borders, press-down shadow effect) and a full-width dark "Kijk na!" (Check) button. The child's entered digits appear in a display area above the keypad. When "Kijk na!" is tapped, compare the entered answer to the correct product. Show immediate feedback: green "Goed!" if correct, or coral "Fout! Het juiste antwoord is X" if wrong. Include a progress indicator (segmented bar showing completed/current/remaining cards) and a "Stoppen" (stop early) link. The ⚙️ parent button is visible in the corner.

**Blocked by:** 03 (Table selection screen + session building)

**Status:** ready-for-agent

- [ ] The current multiplication fact displays in a speech bubble
- [ ] The number keypad has buttons 0–9, each in a different bright color, circular with press-down effect
- [ ] Tapping keypad buttons appends digits to the answer display
- [ ] "Kijk na!" checks the answer: correct shows green feedback, wrong shows coral feedback with the correct answer
- [ ] The progress bar shows how many cards are done, current, and remaining
- [ ] "Stoppen" link is visible and tappable
- [ ] ⚙️ button is visible in the corner

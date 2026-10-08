# 03: Table selection screen + session building

**What to build:** Build the table selection view: a heading "Kies je tafels!" in a speech bubble, a subheading "Welke tafels wil je oefenen?", and a grid of round toggle buttons for tables 1 through 10 (all selected/on by default, deselected tables appear gray). A large "Start!" pill button at the bottom. When Start is tapped, build a session: filter the 100 cards by the selected tables, select all due cards (where `nextReviewDate <= now` and `seen === true`), add up to 10 new cards (`seen === false`), shuffle the combined list randomly, and transition to the quiz view showing the first card.

**Blocked by:** 02 (Card data model + localStorage persistence)

**Status:** ready-for-agent

- [ ] Table selection screen displays with all 10 tables selected by default
- [ ] Tapping a table button toggles its selection (on = colorful, off = gray)
- [ ] Tapping "Start!" builds a session from the selected tables and shows the first card in the quiz view
- [ ] Due cards (past their review date) are included in the session
- [ ] Up to 10 new (unseen) cards are included in the session
- [ ] Cards within the session are in random order
- [ ] Cards from deselected tables are excluded from the session

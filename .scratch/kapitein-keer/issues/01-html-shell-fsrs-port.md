# 01: HTML shell + FSRS v6 port + tests

**What to build:** Create `index.html` with Tailwind CSS loaded via CDN, the Fredoka font loaded via Google Fonts, and the Pirate Cove custom color palette configured (Sky `#87CEEB`, Coral `#FF6B6B`, Sand `#FFE5B4`, Palm `#2ECC71`, Sunset `#F39C12`, Ink `#2C1810`). Port the FSRS v6 algorithm from the Java implementation in LingualQ-Pilot as a block of pure functions (no DOM access) at the top of the script section. Create `kapitein-keer.test.html` — a separate test file that loads the same pure functions and runs assertions in the browser, displaying a pass/fail list.

The FSRS port must include: the update algorithm (initial stability/difficulty, next stability for recalled/failed grades, next difficulty, interval calculation, retrievability), the scheduler (short-term vs long-term logic, desired retention 0.9, date calculations using `Date`), and the data types (Card, Grade with values Again=1/Hard=2/Good=3/Easy=4, DSMemoryModel with difficulty+stability, NoMemoryModel for unseen cards). All 21 weights (W4–W20) must be hardcoded constants matching the Java source.

**Blocked by:** None (can start immediately)

**Status:** ready-for-agent

- [ ] `index.html` opens in a browser and shows a styled placeholder using the Pirate Cove palette and Fredoka font
- [ ] FSRS v6 pure functions are defined at the top of the script, with no DOM access
- [ ] `kapitein-keer.test.html` loads the same functions and runs 10 tests: initial scheduling for each grade, interval calculation, stability growth on repeated Good, lapse handling (Again decreases stability, increments lapses), short-term scheduling (< 24h), and the port produces values matching the Java implementation
- [ ] All tests pass when opening the test file in a browser

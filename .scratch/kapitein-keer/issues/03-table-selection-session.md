# 03: Table selection screen + session building

**What to build:** Build the table selection view: a heading "Kies je tafels!" in a speech bubble, a subheading "Welke tafels wil je oefenen?", and a grid of round toggle buttons for tables 1 through 10 (all selected/on by default, deselected tables appear gray). A large "Start!" pill button at the bottom. When Start is tapped, build a session: filter the 100 cards by the selected tables, select all due cards (where `nextReviewDate <= now` and `seen === true`), add up to 10 new cards (`seen === false`), shuffle the combined list randomly, and transition to the quiz view showing the first card.

**Blocked by:** 02 (Card data model + localStorage persistence)

**Status:** resolved

- [x] Table selection screen displays with all 10 tables selected by default
- [x] Tapping a table button toggles its selection (on = colorful, off = gray)
- [x] Tapping "Start!" builds a session from the selected tables and shows the first card in the quiz view
- [x] Due cards (past their review date) are included in the session
- [x] Up to 10 new (unseen) cards are included in the session
- [x] Cards within the session are in random order
- [x] Cards from deselected tables are excluded from the session

## Answer

Implemented in `index.html` only (single-file architecture kept; `fsrs.js` and `kapitein-keer.test.html` untouched). The ticket-02 `<script>` block is byte-for-byte intact; all ticket-03 code lives alongside it in a new `<script>` block.

- **View management** — the body now holds five views: `#view-tables` (this ticket) plus placeholders `#view-quiz`, `#view-celebration`, `#view-empty`, `#view-parent` (tickets 04/06/07). `showView(viewId)` hides all views and shows the requested one; a `.view.hidden { display: none; }` CSS rule guarantees `hidden` wins over the `flex` display class. Init shows `#view-tables`.
- **Table selection view** — small "Kapitein Keer" header, a `.bubble` speech bubble with the heading "Kies je tafels!", the subheading "Welke tafels wil je oefenen?", and 10 round toggle buttons (`w-14 h-14`, `rounded-full`, `border-4 border-ink`, `.btn-press`) cycling coral `#FF6B6B` / sunset `#F39C12` / palm `#2ECC71` / `#3498DB` / `#9B59B6`. All start selected (color + white text); a deselected button swaps to `bg-gray-300` / `text-gray-500` while keeping its round shape and ink border. A large ink "Start!" pill (`rounded-full`, `text-3xl`, `.btn-press`) sits at the bottom. A small ⚙️ button is absolutely positioned top-right (not yet wired — ticket 07). The ticket-02 stat tiles and load-status line were kept inside this view so `refreshStats()` keeps working unmodified.
- **Session building** — `shuffle(array)` (Fisher-Yates, returns a copy, never mutates the input) and `buildSession(selectedTables, practiceAnyway)`: filter cards by `card.fact.a`, take all due cards (`seen === true && nextReviewDate <= now`), add up to 10 new cards (`seen === false`), combine and shuffle. `practiceAnyway === true` returns all seen cards of the selected tables (shuffled, capped at 20) for the "Oefen toch" button of ticket 06. Session state `{ cards, currentIndex, selectedTables }` is stored module-level and exposed via the `App.session` getter (plus `App.setSession`).
- **Start wiring** — tapping "Start!" collects the selected tables, calls `buildSession(selected, false)`, and either shows `#view-empty` (empty session) or stores the session at `currentIndex: 0`, renders the first card into the quiz placeholder (`a × b = ?` plus "Opdracht 1 van N") and transitions to `#view-quiz`.
- **Exports for later tickets/tests** — `App.showView`, `App.buildSession`, `App.shuffle`, `App.setSession`, `App.session` getter.

Verified:

- Node harness (`/tmp/verify-ticket03.mjs`) that extracts the real inline scripts and `fsrs.js` from the repo and runs them in a `vm` context with DOM/localStorage shims built from the actual HTML: **153/153 assertions pass**, covering all seven acceptance criteria (all tables selected by default, toggle on/off styling incl. gray deselected state, Start → session + first card shown in quiz view, due cards included, ≤ 10 new cards, random order, deselected tables excluded) plus empty-session → `#view-empty`, all-tables-deselected → `#view-empty`, `practiceAnyway` semantics, shuffle permutation/no-mutation/randomness, and ticket-02 integrity (100 cards, localStorage persistence, stat refresh).
- Headless Chromium `--dump-dom` of `index.html`: renders with zero JS console errors, all five views present in the DOM, ticket-02 stat refresh works against the new structure.
- Existing suite `kapitein-keer.test.html` executed via the same vm approach: **10/10 tests pass** (file untouched).
- Python HTML tag-balance check on `index.html`: OK.

Note: the `#view-quiz` placeholder intentionally shows the first card's fact and progress ("Opdracht 1 van N") so the session transition is visible; ticket 04 replaces it with the real quiz UI.

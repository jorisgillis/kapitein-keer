Status: ready-for-agent

## Problem Statement

An 8-year-old Flemish-speaking child needs to practice multiplication tables (1 through 10). Traditional drill methods — repeating the same facts over and over — don't adapt to what she already knows and what she keeps forgetting. She needs a tool that is engaging enough to hold her attention, simple enough for her to use independently, and smart enough to focus her practice time on the facts she actually needs to work on. Her parent also wants visibility into her progress without hovering.

## Solution

"Kapitein Keer" is a single-file HTML web app with a pirate theme that uses FSRS v6 spaced repetition to schedule multiplication practice. The child selects which tables to practice, answers multiplication facts via a colorful on-screen keypad, self-grades her recall with four emoji-labeled buttons, and moves through a session of due and new cards. When the session ends, she sees a celebration screen. A parent dashboard — accessed via a small button in the corner — shows accuracy per table, cards mastered, current streak, and cards due today.

The app runs entirely in the browser: no installation, no accounts, no backend, no build step. All progress is stored in browser local storage. The UI is in Dutch (Flemish), uses large touch-friendly controls, and follows a bright, playful "Pirate Cove" visual style with the Fredoka typeface.

## User Stories

### Getting started

1. As a child, I want to open the app in a browser, so that I can start practicing without installing anything.
2. As a child, I want to see the app name "Kapitein Keer" and a pirate-themed start screen, so that it feels like a game, not homework.
3. As a child, I want to select which multiplication tables (1–10) I want to practice, so that I can focus on the ones I need.
4. As a child, I want all tables to be selected by default, so that I can start immediately without making choices.
5. As a child, I want to deselect tables I already know well, so that I don't waste time on facts I've mastered.
6. As a child, I want a large, clear "Start" button, so that I know exactly how to begin.

### Practicing — the session

7. As a child, I want to see one multiplication fact at a time, so that I can focus on a single problem.
8. As a child, I want the multiplication fact displayed in a large, easy-to-read speech bubble, so that I can read it without effort.
9. As a child, I want a colorful number keypad with big round buttons, so that I can enter my answer easily.
10. As a child, I want to tap "Kijk na!" to check my answer, so that I get immediate feedback.
11. As a child, I want to see whether my answer was correct or wrong immediately after checking, so that I know how I did.
12. As a child, I want to see the correct answer if I got it wrong, so that I can learn from my mistake.
13. As a child, I want only one attempt per card, so that the session keeps moving and doesn't feel stuck.
14. As a child, I want to grade my own recall after seeing the answer, so that the app knows what to practice again.
15. As a child, I want four large, colorful, emoji-labeled grade buttons (Opnieuw / Moeilijk / Goed / Makkelijk), so that I can honestly say how it went.
16. As a child, I want to see my progress through the session (e.g., a segmented bar showing completed, current, and remaining cards), so that I know how much is left.
17. As a child, I want cards to appear in random order within my selected tables, so that I can't just pattern-match.
18. As a child, I want the app to show me cards that are due for review first, then introduce up to 10 new cards, so that I practice what I need most.
19. As a child, I want to be able to stop the session early, so that I can take a break if I'm tired.
20. As a child, I want to see a celebration screen when I finish all cards, so that I feel proud of my effort.
21. As a child, I want a pirate-themed celebration (treasure, ship progress, etc.), so that finishing feels rewarding.

### Empty state and practice-anyway

22. As a child, I want to see an "all caught up" screen when there are no cards due and no new cards left, so that I know I'm done for now.
23. As a child, I want a "Practice anyway" button on the empty state screen, so that I can keep practicing even when the scheduler says I'm done.

### Progress and persistence

24. As a child, I want the app to remember my progress between sessions, so that I don't start over every time.
25. As a child, I want the app to remember which facts I've seen and how well I know them, so that it schedules the right cards at the right time.
26. As a child, I want the app to work offline, so that I can practice anywhere.

### Parent dashboard

27. As a parent, I want to tap a small button in the corner to switch to a dashboard view, so that I can check my child's progress.
28. As a parent, I want to see accuracy per table (1–10) as colored bars, so that I can see which tables need more work.
29. As a parent, I want to see how many cards (multiplication facts) are mastered out of 100, so that I can track overall progress.
30. As a parent, I want to see the current practice streak (consecutive days), so that I can encourage consistency.
31. As a parent, I want to see how many cards are due for review today, so that I know if she should practice.
32. As a parent, I want the dashboard to be read-only, so that I don't accidentally change anything.
33. As a parent, I want a "Back" button to return to the child's view, so that I can hand the device back.
34. As a parent, I want the dashboard to have a calmer, data-focused style, so that it's clearly different from the child's view.

### Technical

35. As a parent, I want the app to be a single HTML file, so that I can open it directly without any setup.
36. As a parent, I want the app to use Tailwind CSS via CDN, so that it looks good without a build step.
37. As a parent, I want the app to use the Fredoka font, so that the text is rounded and friendly for children.
38. As a parent, I want the app to use FSRS v6 spaced repetition, so that practice is scientifically optimized.
39. As a parent, I want all data stored in browser local storage, so that no server or database is needed.
40. As a parent, I want the app to work on a tablet and a laptop, so that my child can use whichever device is available.

## Implementation Decisions

### Architecture

- **Single HTML file**: `index.html` at the repo root. Contains all HTML, CSS (via Tailwind CDN), and JavaScript. No build step, no bundler, no npm dependencies.
- **Tailwind CSS**: loaded via CDN (`https://cdn.tailwindcss.com`). Custom colors defined inline via Tailwind's config script.
- **Fredoka font**: loaded via Google Fonts CDN.
- **No backend, no database, no authentication**: all state lives in `localStorage`.

### FSRS v6 port

The FSRS v6 algorithm is ported from the Java implementation in LingualQ-Pilot (`src/main/java/com/langualQ/pilot/core/fsrs/six/`). The port is a direct translation of:

- `FSRS6UpdateAlgorithm` — all FSRS v6 formulas (initial stability/difficulty, next stability for recalled/failed grades, next difficulty, interval calculation, retrievability). Pure math, no dependencies.
- `FSRS6Scheduler` — scheduling orchestration: short-term vs long-term logic, desired retention (0.9), date calculations. The Java `Clock` dependency maps to JavaScript `Date`.
- `Card`, `Grade`, `DSMemoryModel`, `NoMemoryModel` — translated to plain JS objects.

The port lives as a self-contained block of pure functions at the top of the `<script>` section, with no DOM access. This is the **test seam**: the logic can be tested independently of the UI.

### Parameters

- Desired retention: `0.9`
- 21 weights (W4–W20): hardcoded constants from the Java implementation
- Initial stability: Again=0.212, Hard=1.2931, Good=2.3065, Easy=8.2956
- Grade scale: 4 levels — Again(1), Hard(2), Good(3), Easy(4)
- Short-term scheduling: used for first review and same-day reviews (< 24 hours apart)

### Data model

Each **card** represents one **multiplication fact** (e.g., "7 × 8"). There are 100 cards total (tables 1–10, each with 10 facts). A card's state is stored as JSON in `localStorage`:

```
{
  "fact": { "a": 7, "b": 8 },
  "difficulty": 5.2,       // DSMemoryModel difficulty (0–10)
  "stability": 3.5,        // DSMemoryModel stability (days)
  "repetitions": 4,        // number of successful reviews
  "lapses": 1,             // number of times graded "Again"
  "nextReviewDate": "2026-10-15T10:00:00.000Z",
  "previousReviewDate": "2026-10-08T10:00:00.000Z",
  "seen": true             // whether this fact has been introduced
}
```

A card that has never been reviewed has `seen: false` and no difficulty/stability values. The FSRS scheduler initializes these on the first grade.

All 100 cards are stored under a single `localStorage` key (e.g., `kapitein-keer:cards`) as a JSON array. This keeps reads/writes simple and atomic.

### Session logic

When a session starts:

1. **Filter** cards by the child's selected tables (1–10).
2. **Select due cards**: cards where `nextReviewDate <= now` and `seen === true`.
3. **Select new cards**: cards where `seen === false`, up to 10.
4. **Shuffle** the combined list randomly.
5. **Present** cards one at a time. After each card is graded, the FSRS scheduler updates the card's state and saves to `localStorage`.

The "Practice anyway" option ignores the due date and includes all seen cards from the selected tables (shuffled, limited to a reasonable batch size).

### UI structure

The app has four views, managed by a simple view-state variable:

1. **Table selection** (`#view-tables`): Grid of toggle buttons for tables 1–10 (all selected by default). "Start!" button begins the session.
2. **Quiz** (`#view-quiz`): Shows the current card's multiplication fact in a speech bubble, a number keypad (0–9 + "Kijk na!"), progress segments, stop-early link, and ⚙️ parent button. After checking the answer, shows the result and four grade buttons.
3. **Celebration** (`#view-celebration`): Shown when all cards in the session are complete. Pirate-themed, with a "Terug naar start" button.
4. **Empty state** (`#view-empty`): Shown when no cards are due and no new cards remain. "Alles Klaar!" message with "Oefen toch" (practice anyway) and "Terug naar start" buttons.

The **parent dashboard** (`#view-parent`) is a fifth view, accessed via the ⚙️ button visible on the quiz and table-selection views. It shows stat tiles (cards mastered, streak, due today) and per-table accuracy bars. A "Terug" button returns to the previous child view.

### Visual design ("Pirate Cove" — Variant C)

- **Palette**: Sky `#87CEEB` (background), Coral `#FF6B6B` (primary accent), Sand `#FFE5B4` (stat tiles), Palm `#2ECC71` (success), Sunset `#F39C12` (warning), Ink `#2C1810` (borders, text), White `#FFFFFF` (cards).
- **Typography**: Fredoka (single rounded family, weights 400–700). Problem text ~6xl, keypad digits ~1.5rem, body ~lg.
- **Key elements**: Speech-bubble problem card (white, thick ink border, drop shadow), circular colorful keypad buttons with press-down shadow effect, segmented progress bar, rounded pill grade buttons with emoji + Dutch labels, thick ink borders throughout.
- **Parent dashboard**: White cards with thick ink borders, sand-colored stat tiles, colored horizontal bars for table accuracy. Calmer but keeps the playful border style.

### Dutch UI strings

All user-facing text is in Dutch (Flemish):

| Key | String |
|-----|--------|
| App title | Kapitein Keer |
| Table selection heading | Kies je tafels! |
| Table selection subheading | Welke tafels wil je oefenen? |
| Start button | Start! |
| Quiz check button | Kijk na! |
| Grade: Again | Opnieuw |
| Grade: Hard | Moeilijk |
| Grade: Good | Goed |
| Grade: Easy | Makkelijk |
| Grade prompt | Hoe ging het? |
| Stop early | Stoppen |
| Progress label | Opdracht X van Y |
| Celebration | Goed gedaan! / Alle kaarten Klaar! |
| Empty state | Alles Klaar! / Kom morgen terug! |
| Practice anyway | Oefen toch |
| Back to start | Terug naar start |
| Parent dashboard title | Voortgang |
| Cards mastered | Beheerst |
| Streak | Dagen reeks |
| Due today | Vandaag |
| Tables header | Tafels |
| Back button | Terug |

## Testing Decisions

### Test seam

The FSRS scheduling logic and session-building logic are **pure functions** at the top of the `<script>` section, with no DOM access. This is the single test seam.

A separate test file (`kapitein-keer.test.html`) loads the same logic (by extracting the pure functions or by including them via a shared script block) and runs assertions in the browser. Tests are simple `assert`-style checks displayed as a pass/fail list.

### What to test

1. **FSRS algorithm — initial scheduling**: A new card graded Good should produce the expected initial stability (2.3065) and difficulty. Grade Easy should produce stability 8.2956.
2. **FSRS algorithm — interval calculation**: Given a card with known stability and desired retention 0.9, the calculated interval should match the formula: `stability / correctionFactor * desiredRetentionFactor`.
3. **FSRS algorithm — stability growth**: A card graded Good repeatedly should have monotonically increasing stability.
4. **FSRS algorithm — lapse handling**: A card graded Again should have decreased stability and incremented lapse count.
5. **FSRS algorithm — short-term scheduling**: A card reviewed within 24 hours should use the short-term formula (different from long-term).
6. **Session building — due card selection**: Given a deck with some due cards and some future cards, only due cards should be selected.
7. **Session building — new card limit**: At most 10 new (unseen) cards should be included.
8. **Session building — table filtering**: Only cards from selected tables should be included.
9. **Session building — randomization**: The same input should produce different orderings across runs (statistical check).
10. **Session building — empty session**: When no cards are due and no new cards remain, the session should be empty (triggers empty state).

### Prior art

The Java implementation in LingualQ-Pilot has a comprehensive test suite (`FSRS6SchedulerTest.java`, `FSRS6UpdateAlgorithmTest.java`) that verifies the same behaviors. The JS port's tests should mirror these cases, using the same expected values where deterministic.

### What is NOT tested

- DOM rendering and view switching (verified manually by clicking through)
- localStorage persistence (verified manually)
- Visual appearance (verified against the prototype)

## Out of Scope

- Native mobile apps (iOS/Android)
- Backend, server, or database
- User accounts or authentication
- Multiplayer or social features
- Subjects other than multiplication (addition, subtraction, division)
- Additional game modes beyond quiz (timed challenges, matching games, etc.)
- Audio / text-to-speech in Dutch
- Hosting or sharing beyond opening the HTML file locally
- Difficulty customization beyond what FSRS auto-schedules
- Progress reset or data export from the parent dashboard

## Further Notes

- **Prototype**: Three UI variants (Treasure Map, Ship's Helm, Pirate Cove) are available at `.scratch/pirate-multiplications/prototype/design-variants.html`, switchable via `?variant=A|B|C`. Variant C was chosen.
- **FSRS Java source**: `/home/joris/Documents/Workspace/LingualQ-Pilot/src/main/java/com/langualQ/pilot/core/fsrs/six/` — the reference implementation to port from.
- **Wayfinder map**: `.scratch/pirate-multiplications/map.md` — the full decision map with all resolved tickets.
- **Glossary**: `GLOSSARY.md` — domain terms (card, table, session, multiplication fact, parent dashboard, FSRS).
- The app is designed for a single child on a single device. No multi-user support is needed.
- localStorage data is not versioned; if the data model changes in a future version, old data may need to be cleared manually.

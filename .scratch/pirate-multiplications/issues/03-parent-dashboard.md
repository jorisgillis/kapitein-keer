Type: grilling
Status: resolved

## Question

What should the parent dashboard show, and how should the parent access it?

Sub-questions:
- Which stats matter most? (accuracy per table, total cards mastered, cards due today, current streak, total practice time, recent session history)
- How should the parent switch to the dashboard? A small button on the main screen, a keyboard shortcut, a separate URL fragment (e.g., `#parent`), or a simple PIN?
- Should the dashboard be read-only, or should the parent be able to reset progress, adjust table ranges, or change settings?
- Should the dashboard have its own visual style (calmer, more data-focused) or match the pirate theme?

## Answer

**Stats shown** (top 4):
- **Accuracy per table** — percentage correct for each table (1–10), maybe as a simple bar or colored badge (green = strong, yellow = okay, red = needs work)
- **Cards mastered** — count of facts with high stability (e.g., stability > 21 days), shown as "X of 100"
- **Current streak** — number of consecutive days she practiced
- **Cards due today** — how many cards are scheduled for review right now

**Access**: A small ⚙️ button in the corner of the main screen. Tapping it switches to the parent dashboard view. A "Back" button returns to the child's view. No PIN — this is a local file on a trusted device.

**Read-only**: The dashboard is strictly read-only. No reset, no configuration, no table selection. (Table selection lives on the child's session-start screen.)

**Visual style**: Calmer and data-focused. Light background, clear numbers, simple layout. Subtle nautical accent (e.g., a thin blue header bar or a small anchor icon) to tie it to the theme without being playful.

## Destination

A complete, build-ready spec for "Kapitein Keer" — a single-file HTML web app that helps an 8-year-old Flemish-speaking child practice multiplication tables (1–10) using FSRS v6 spaced repetition. Pirate-themed, Dutch UI, Tailwind via CDN, local storage only, no build step.

## Notes

- Domain: children's educational app. Skills to consult each session: grilling, domain-modeling, prototype.
- Standing preferences: single HTML file, no build step, no backend, no accounts. Tailwind via CDN. All progress stored in browser local storage.
- The child is 8 years old and reads Dutch (Flemish). The UI must be simple, large-tappable, and encouraging.
- Other game modes and audio/TTS are explicitly deferred — not in scope for this spec.

## Decisions so far

<!-- one line per closed ticket, gist + link -->

- [FSRS v6 integration approach](issues/01-fsrs-integration.md): Port the FSRS v6 algorithm from the Java implementation in LingualQ-Pilot to vanilla JS (~200–300 lines). Self-contained, no external library needed. Desired retention 0.9, 4-grade scale (Again/Hard/Good/Easy), short-term scheduling for initial/same-day reviews.
- [Practice session flow](issues/02-session-flow.md): All due cards + up to 10 new per session. Child selects which tables (1–10) to include; random order within selected tables. One attempt per card, then reveal answer. 4-button self-grade with icons (Again/Hard/Good/Easy). Auto-end with celebration + stop-early button. Empty state shows "all caught up" with "practice anyway" option.
- [Parent dashboard design](issues/03-parent-dashboard.md): Shows accuracy per table, cards mastered (of 100), current streak, cards due today. Accessed via small ⚙️ button in corner. Strictly read-only. Calmer, data-focused style with subtle nautical accent.
- [Visual design & pirate theme](issues/04-visual-design.md): Variant C "Pirate Cove" chosen — playful toy aesthetic with Fredoka font, bright palette (sky/coral/sand/green/orange), speech-bubble problem card, colorful round keypad, thick ink borders. Parent dashboard uses white cards with sand stat tiles and colored progress bars. Prototype at `.scratch/pirate-multiplications/prototype/design-variants.html`.
- **App name**: "Kapitein Keer" — Dutch pirate-themed name for the `<title>` and start screen header.

## Not yet specified

- Additional game modes beyond quiz (e.g., timed challenges, matching games) — deferred, not in this spec
- Audio / text-to-speech in Dutch — deferred
- Hosting or sharing beyond opening the HTML file locally — deferred
- Difficulty customization beyond what FSRS auto-schedules — unspecified

## Out of scope

- Native mobile apps (iOS/Android)
- Backend, server, or database
- User accounts or authentication
- Multiplayer or social features
- Subjects other than multiplication

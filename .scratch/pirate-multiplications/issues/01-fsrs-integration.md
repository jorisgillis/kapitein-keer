Type: research
Status: resolved

## Question

How should we integrate FSRS v6 (Free Spaced Repetition Scheduler) into a single-file HTML app with no build step and no npm dependencies?

Specifically:
- Are there existing CDN-friendly or vanilla-JS implementations of FSRS v6 we can use directly (e.g., via a CDN script tag or by inlining)?
- What are the minimal parameters needed to initialize FSRS (desired retention, learning steps, graduating interval, etc.) and what sensible defaults work for a child learning multiplication?
- How many cards (100 multiplication facts for tables 1–10) can a browser-based implementation handle performantly in local storage?
- If no suitable library exists, what is the smallest viable inline implementation of the FSRS v6 algorithm?

The output should be a recommendation: which approach to use (library name + CDN URL, or inline implementation), the initialization parameters, and a brief note on performance with ~100 cards.

## Answer

**Port the FSRS v6 algorithm from the existing Java implementation in LingualQ-Pilot.** No external library needed — the algorithm is self-contained and small enough to inline directly in the single HTML file.

### Source

A complete FSRS v6 implementation exists at:
`/home/joris/Documents/Workspace/LingualQ-Pilot/src/main/java/com/langualQ/pilot/core/fsrs/six/`

Core files:
- `FSRS6UpdateAlgorithm.java` (166 lines) — all FSRS v6 formulas: initial stability/difficulty, next stability (recalled/failed), next difficulty, interval calculation, retrievability. Pure math, zero dependencies.
- `FSRS6Scheduler.java` (78 lines) — orchestrates scheduling: short-term vs long-term logic, desired retention, date calculations. Depends only on a clock.
- `Card.java` — data record: memory model, repetitions, lapses, next/previous review dates.
- `Grade.java` — enum: AGAIN(1), HARD(2), GOOD(3), EASY(4).
- `DSMemoryModel.java` / `NoMemoryModel.java` / `MemoryModel.java` — stability + difficulty model, or empty initial state.

### Recommendation

Port the algorithm to vanilla JavaScript (~200–300 lines). The Java code is a direct, line-by-line translation target — no Spring, no JPA, no external types in the core algorithm. The scheduler's `Clock` dependency maps to JavaScript's `Date`.

### Parameters (from the Java implementation)

- **Desired retention**: `0.9` (90%)
- **21 weights** (W4–W20): hardcoded constants in `FSRS6UpdateAlgorithm`
- **Initial stability**: AGAIN=0.212, HARD=1.2931, GOOD=2.3065, EASY=8.2956
- **Grade scale**: 4 levels — Again(1), Hard(2), Good(3), Easy(4)
- **Short-term scheduling**: used for first review and same-day reviews (< 24h apart)

### Performance

~100 cards is trivial. Each card is a small JSON object in local storage. The algorithm runs in microseconds per review. No performance concerns.

### What the port needs

1. Translate `FSRS6UpdateAlgorithm` — all the math (exp, pow, min, max map directly to `Math.*`)
2. Translate `FSRS6Scheduler` — replace `Clock`/`ZonedDateTime` with `Date`/`Date.now()`
3. Translate `Card`, `Grade`, `DSMemoryModel`, `NoMemoryModel` — plain JS objects/classes
4. Persist card state as JSON in `localStorage` (one key per multiplication fact, or one key for the whole deck)
5. The FSRSService pattern from LingualQ-Pilot shows how to wire it: fetch due cards → present → grade → schedule → save

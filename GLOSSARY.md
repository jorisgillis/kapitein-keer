# Pirate Multiplications

A single-file web app for children to practice multiplication tables using spaced repetition. The domain spans educational practice (sessions, cards, tables) and spaced-repetition scheduling (FSRS).

## Language

**Multiplication fact**:
A single multiplication expression and its answer, e.g. "7 × 8 = 56". The atomic unit of practice.
_Avoid_: problem, question, exercise

**Table**:
The set of all multiplication facts sharing one factor, e.g. the 7 times table (7×1 through 7×10).
_Avoid_: times table set, multiplication group

**Card**:
An FSRS-scheduled item representing one multiplication fact. Tracks the child's memory state for that fact and determines when it next appears.
_Avoid_: flashcard, question card, item

**Session**:
One sitting of practice. Presents a batch of cards (due cards plus new cards) and ends when the batch is complete or the child stops.
_Avoid_: round, quiz, practice run

**Parent dashboard**:
A separate view showing the child's progress: accuracy per table, cards due, streaks, and total practice time. Accessed by the parent, not the child.
_Avoid_: stats page, admin view, progress report

**FSRS**:
Free Spaced Repetition Scheduler — the algorithm (v6) that decides when each card should next be shown based on the child's recall history.
_Avoid_: SRS, spaced repetition, scheduler

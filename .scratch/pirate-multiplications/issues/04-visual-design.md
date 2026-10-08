Type: prototype
Status: resolved

## Question

What should the app look like? Create a rough visual mockup of the two main screens — the child's quiz screen and the parent dashboard — with a pirate/adventure theme.

Consider:
- Color palette (nautical: blues, sandy beiges, rope browns, treasure gold?)
- Layout: where does the multiplication problem go, where does the number keypad go, where does feedback appear?
- Pirate theming: background (ocean, ship deck, treasure map), any character or mascot, treasure/reward visuals for correct answers
- Typography: large, rounded, friendly fonts suitable for an 8-year-old
- The parent dashboard: calmer, data-focused, same theme or distinct?

Deliverable: a rough HTML mockup (can be a single file in the scratchpad) or a detailed description with a sketch. The goal is to react to something concrete, not to build the final UI.

## Answer

**Variant C — "Pirate Cove" (Playful Toy)** chosen. Rationale: numbers are more legible for an 8-year-old; the rounded, colorful, toy-like aesthetic matches the audience better than the storybook or navigation variants.

### Design tokens

**Palette**:
- Sky `#87CEEB` — main background
- Coral `#FF6B6B` — primary accent (keypad, wrong/again)
- Sand `#FFE5B4` — secondary background (stat tiles)
- Palm `#2ECC71` — success (correct, good grade, progress)
- Sunset `#F39C12` — warning (hard grade, medium accuracy)
- Ink `#2C1810` — borders, text, dark elements
- White `#FFFFFF` — cards, bubbles

**Typography**: Fredoka (single rounded family, weights 400–700). Large sizes: problem text ~6xl, keypad digits ~1.5rem, body ~lg.

**Child quiz screen**:
- Sky-blue background with soft radial highlights
- Problem in a white speech bubble with thick ink border and drop shadow
- Number keypad: circular buttons, each a different bright color, thick ink borders, press-down shadow effect
- "Kijk na!" (Check) button: full-width dark ink pill
- Progress: segmented bar with colored segments (green = done, orange = current, white = remaining)
- Grade buttons: 4 rounded pills with emoji + Dutch label, each in its own color (coral/orange/green/blue)
- Stop early: underlined text link; parent access: ⚙️ button

**Table selection screen**:
- Same bubble style for the heading
- Round table toggle buttons in rotating bright colors; deselected tables are gray
- Large "Start!" pill button

**Parent dashboard**:
- White cards with thick ink borders and rounded corners
- Sand-colored stat tiles (3-column grid): cards mastered, streak, due today
- Table accuracy: horizontal bars with colored fills (green/yellow/red) on light gray tracks
- Clean, data-focused but keeps the playful border style

**Prototype**: `.scratch/pirate-multiplications/prototype/design-variants.html` — three switchable variants (A: Treasure Map, B: Ship's Helm, C: Pirate Cove). Captured on branch `prototype/design-variants`.

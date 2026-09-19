## 2025-02-19 - Missing ARIA Labels on Icon-Only Buttons
**Learning:** The custom `Button` component in this project does not enforce or automatically inject `aria-label` attributes when using the `size="icon"` variant. This leads to buttons like next/previous arrows and delete trashcans being completely invisible to screen readers, severely impacting accessibility.
**Action:** When using `Button` with `size="icon"` (or any other icon-only pattern without visible text), always manually add an explicit `aria-label` prop that describes the action.

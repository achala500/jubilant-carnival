
## 2026-09-12 - ARIA labels missing from size='icon' Buttons
**Learning:** The design system's Button component with `size="icon"` does not enforce or automatically inject ARIA labels. Since this variant is frequently used across the app (like for settings, delete actions, and pagination), it leads to a recurring pattern of inaccessible, screen-reader-unfriendly buttons.
**Action:** Always verify and manually attach an `aria-label` prop when using `<Button size="icon">` or naked icon `<button>`/`<a>` elements anywhere in the app.

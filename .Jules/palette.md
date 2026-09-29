## 2026-09-29 - [Missing ARIA labels on Icon Buttons]
**Learning:** The custom `Button` component in this codebase with `size="icon"` variant does not enforce or automatically provide an accessible name, leading to several icon-only interactive elements (Settings, Delete, Calendar Navigation) failing accessibility checks for screen readers.
**Action:** When using the `<Button size="icon">` component or native icon-only buttons, always ensure an `aria-label` attribute is explicitly provided to maintain keyboard and screen reader accessibility.

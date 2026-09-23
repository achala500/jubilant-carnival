## 2024-05-15 - ARIA Labels on Icon Buttons
**Learning:** The custom `Button` component with `size="icon"` does not enforce or automatically provide ARIA labels for icon-only buttons, which can lead to accessibility regressions.
**Action:** Always manually add an `aria-label` prop when using `<Button size="icon">` with only an icon child.

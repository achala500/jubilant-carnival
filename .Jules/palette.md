## 2023-10-27 - Icon-only Buttons Missing Accessibility

**Learning:** The project's custom `<Button size="icon">` component lacks built-in enforcement or requirements for `aria-label` properties. As a result, several icon-only buttons (like Calendar navigation, Trash bins, and Settings gears) were completely inaccessible to screen readers.
**Action:** When using `<Button size="icon">` (or native `<button>` tags with only SVG children), developers must explicitly provide an `aria-label` attribute. Future enhancements could explore adding a prop-type requirement for `aria-label` when `size="icon"` is used in the `Button` component itself.

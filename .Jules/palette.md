## 2026-10-03 - [Accessibility] Adding ARIA labels to icon-only Buttons
**Learning:** The project's custom `Button` component does not inherently enforce `aria-label` attributes when used with the `size="icon"` variant. This creates a common accessibility trap where screen readers have no context for icon-only buttons (like delete or settings actions).
**Action:** Always manually add an `aria-label` prop when using the `Button` component with `size="icon"`.

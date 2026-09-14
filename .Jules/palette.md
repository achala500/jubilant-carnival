## 2024-05-15 - [Missing aria-label on icon-only Buttons]
**Learning:** The project's custom `Button` component does not enforce ARIA labels for the `size="icon"` variant, leading to missing `aria-label` attributes on icon-only buttons across the app. This pattern causes poor screen reader accessibility.
**Action:** Always manually add an `aria-label` prop when using the `Button` component with `size="icon"` to ensure accessibility.

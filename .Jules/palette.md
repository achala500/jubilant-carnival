## 2023-10-25 - [Button Component Accessibility]
**Learning:** The project's custom `Button` component does not enforce `aria-label` for the `size="icon"` variant. All usages of `<Button size="icon">` must be manually inspected and fixed to ensure accessibility for screen readers.
**Action:** Always manually add an `aria-label` prop when using the `size="icon"` variant in the `Button` component.

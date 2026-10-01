## 2024-05-18 - Missing ARIA Labels on Icon Buttons
**Learning:** The project's custom `Button` component in `src/components/ui/Button.tsx` does not enforce ARIA labels when using the `size="icon"` variant, leading to multiple instances of inaccessible icon-only buttons across the application (e.g., in Calendar, DailyLogger, and App navigation).
**Action:** Always manually verify and add an `aria-label` prop when using the `size="icon"` variant of the custom `Button` component to ensure screen reader accessibility.

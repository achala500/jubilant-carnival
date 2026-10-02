## 2026-10-02 - Missing ARIA Labels on Icon-only Buttons
**Learning:** The `Button` component in this project does not enforce ARIA labels for the `size="icon"` variant, leading to multiple instances of icon-only buttons across the application (e.g., in `App.tsx`, `Calendar.tsx`, `DailyLogger.tsx`) that lack accessible names.
**Action:** When using or reviewing the `Button` component with `size="icon"`, always ensure an explicit `aria-label` prop is provided to guarantee accessibility for screen reader users.

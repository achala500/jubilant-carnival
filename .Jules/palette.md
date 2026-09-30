## 2026-09-30 - Component ARIA labeling pattern
**Learning:** The custom Button component doesn't enforce ARIA labels for size="icon" variant, leading to multiple inaccessible buttons throughout the app (App.tsx, Calendar.tsx, DailyLogger.tsx).
**Action:** Always manually ensure aria-label is provided when using size="icon" with icon-only buttons in this project.

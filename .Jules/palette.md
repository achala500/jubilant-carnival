## 2026-09-06 - Added missing ARIA labels to icon-only buttons
**Learning:** Found multiple instances of icon-only buttons lacking accessible names across core components (`App.tsx`, `DailyLogger.tsx`, `Calendar.tsx`). This confirms the application needs continuous scanning for basic a11y primitives like `aria-label` on visually interactive icons.
**Action:** Always verify that `Button` components configured with `size="icon"` receive an explicit `aria-label` during component implementation.

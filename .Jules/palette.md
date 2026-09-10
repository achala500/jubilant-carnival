## 2026-09-10 - Add ARIA Labels to Icon-Only Buttons
**Learning:** Found several icon-only buttons missing ARIA labels in `src/components/calendar/Calendar.tsx`. Screen readers will only read 'button' without these.
**Action:** Always verify if an icon-only button requires an `aria-label` for screen-reader accessibility.

## 2025-02-23 - Screen Reader Accessibility for Icon Buttons
**Learning:** Found multiple instances where interactive buttons relied purely on `lucide-react` icons (e.g., trash icon for removing sessions, video icon for joining rooms, chevron icons for pagination) without any text content or `aria-label`. This made the core functionality invisible to screen reader users in the app.
**Action:** When implementing new interactive components, always enforce the use of `aria-label` attributes on any button or anchor tag that only contains icons and lacks visible text content.

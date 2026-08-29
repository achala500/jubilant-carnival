## 2023-10-27 - [Add ARIA labels to icon-only buttons]
**Learning:** Found several icon-only buttons missing ARIA labels across the application, including the Settings button, Calendar navigation, and the Daily Logger trash button. These lack accessible context for screen readers.
**Action:** Always add `aria-label` and `title` to icon-only buttons (`variant="ghost" size="icon"`) to ensure accessibility and provide tooltip context.

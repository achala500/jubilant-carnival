## 2024-03-24 - Missing ARIA labels on Icon-only Components
**Learning:** In the initial StudySync layout and calendar components, many interactive buttons relying entirely on Lucide React icons (such as Settings, Next, Previous, and Video room links) were completely invisible to screen readers due to missing accessible names.
**Action:** Always verify that `<Button size="icon">` or raw `<button>` tags containing only an SVG/Icon explicitly include an `aria-label` or `title` to maintain keyboard and screen reader accessibility.

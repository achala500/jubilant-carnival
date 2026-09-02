## 2023-09-02 - Icon-only buttons lacking ARIA labels
**Learning:** Found multiple instances where the generic `<Button size="icon">` component was used with a child icon component (e.g. from lucide-react) without an `aria-label`. This pattern was pervasive across the App header, Calendar navigation, and Daily logger delete functions, making these critical interactions invisible to screen readers.
**Action:** Always verify that elements composing a `<Button size="icon">` have an explicitly defined `aria-label` attribute describing their function.

## 2023-10-25 - ARIA Labels on Icon Buttons
**Learning:** The project's custom `Button` component does not enforce ARIA labels when using the `size="icon"` variant. This means developers must remember to add them manually to ensure screen reader accessibility.
**Action:** Always verify that `<Button size="icon">`, as well as `<button>` and `<a>` tags functioning as icon-only buttons, includes an `aria-label` attribute describing its action.

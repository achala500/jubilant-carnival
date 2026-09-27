## 2024-10-24 - Missing ARIA Labels on Icon Buttons
**Learning:** The project's custom `Button` component does not enforce ARIA labels for the `size="icon"` variant. Screen readers will skip these buttons or read out generic/unhelpful text if they only contain an SVG icon.
**Action:** Always manually add an `aria-label` prop when using `<Button size="icon">` to ensure full accessibility for interactive icon-only elements.

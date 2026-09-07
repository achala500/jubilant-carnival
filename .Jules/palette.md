## 2023-10-24 - Add aria-labels to icon-only buttons
**Learning:** Icon-only buttons (using the UI `<Button size="icon">` or native `<button>`) frequently missed `aria-label`s, rendering them inaccessible to screen readers, a common pattern found in the app.
**Action:** Always include an explicit `aria-label` attribute describing the button's action when creating icon-only buttons.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Styling and components

- Use Tailwind utility classes for styling. Avoid inline `style`, separate `.css` files, etc. unless Tailwind genuinely cannot express what's needed.
- Theme colors (text colors like primary/header/link/impact, background colors for the site and for buttons, etc.) must be defined as CSS variables and referenced through Tailwind (e.g. configured in `tailwind.config` / `globals.css` as `--color-*` tokens). Never hardcode hex/rgb color values directly in components.
- Components must be reusable and live in `components/`. Before creating a new component, check whether one already exists that does the same job — do not create duplicate/near-duplicate components.
- Support variations via a `variant` prop rather than separate components (e.g. a single `Button` with `fill`, `outline`, and `text` variants, not `ButtonFill`/`ButtonOutline`/`ButtonText`).

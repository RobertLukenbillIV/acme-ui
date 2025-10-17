<!-- acme-ui: Copilot / AI agent instructions -->
# Quick instructions for AI coding agents

Keep guidance short and focused. Use these rules to make productive, low-risk changes in this repo.

- Project purpose: a React UI component library (Navigation, Form inputs, Card, Footnote, ImageGallery, Hero, Forum) with a comprehensive demo site under `demo/`.
- Entry points: library exports in `src/index.js`; demo app entry is `demo/main.jsx` and `demo/index.html`.

Key developer commands (from `package.json`):

- Start local demo: npm run dev (uses Vite with `vite.demo.config.js`). Demo serves at http://localhost:3000 by default.
- Build library for distribution: npm run build (Vite build — outputs into `dist/`).

Files and conventions to read before editing:

- `src/` — component sources. Components export from `src/index.js`.
- `src/components/*/*.(jsx|js|css)` — each component colocates a CSS file (class names are prefixed with `acme-`). Follow the existing class naming and file organization.
- `demo/` — runnable examples and the demo entry; useful for visual verification of UI changes.
- `COMPONENTS.md` and `README.md` — canonical examples and usage snippets. When adding or changing public props, update these docs.

Architecture notes (why things are organized this way):

- The library is distributed as a small set of default and named exports (see `src/index.js`). Keep public API stable: prefer adding new named exports rather than changing existing ones.
- Styling is implemented with plain CSS files scoped by `acme-` prefixes to avoid global conflicts. Avoid introducing CSS-in-JS or global selectors that break encapsulation.

Coding guidelines for PRs and patches:

- Keep changes small and focused. The demo app is the primary verification surface — run `npm run dev` and visually verify the component.
- Preserve backward-compatible exports. If adding a prop, make it optional and document it in `COMPONENTS.md` and `README.md`.
- When modifying styles, update the component's local CSS file (e.g. `src/components/Navigation/Navigation.css`) and test in the demo.

Testing and verification steps for agents:

- Run `npm test` to execute the Jest test suite with React Testing Library.
- Run `npm run test:coverage` to check test coverage.
- Run `npm run dev` and confirm that the demo renders and that your change is visible in `http://localhost:3000`.
- Run `npm run build` to ensure the library builds without errors.

Integration points / externals:

- Peer deps: React and ReactDOM are treated as peerDependencies (see `package.json`). Do not bundle new React versions into the library.
- The demo imports components directly from `src/` (relative path) to speed development, so runtime behavior in the demo reflects source changes immediately.

Examples of project-specific patterns:

- Toggle UI state is managed with React useState hooks inside components (see `src/components/Navigation/Navigation.jsx`).
- Form components accept controlled props: value + onChange. Follow the same shape when adding inputs (see `src/components/Form/*`).
- Component CSS classes use the `acme-` prefix (e.g. `.acme-navigation`, `.acme-card`). Reuse or extend these rather than creating global rules.

When updating public docs:

- Update `COMPONENTS.md` for usage examples and `README.md` for install/dev/build notes.
- If you add new files that should be distributed, ensure the build outputs them into `dist/` and that `src/index.js` exports them.

If unsure or the change is large:

- Open a draft PR and include steps to reproduce the demo results (screenshots or links to a Preview deployment if available).
- Ask a human reviewer to confirm API changes. Prefer reviewer confirmation for anything that alters exported APIs, styling tokens, or build configuration.

Minimal contact points for further automation:

- Testing: Jest + React Testing Library configured. Write tests in `__tests__` folders within component directories.
- CI/CD: GitHub Actions workflow runs tests, builds, and security checks on PRs and pushes.
- Linting / tests: Keep code style consistent with existing files; avoid large refactors.

Thank you — ask for clarification if any part of the public API, build, or demo behavior is unclear.

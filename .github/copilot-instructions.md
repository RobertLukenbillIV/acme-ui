<!-- acme-ui: Copilot / AI agent instructions -->
# Quick instructions for AI coding agents

Keep guidance short and focused. Use these rules to make productive, low-risk changes in this repo.

**Project purpose**: React UI component library with 20+ components (Navigation, Forms, Cards, Hero, Forum, ImageGallery, etc.) plus comprehensive demo site under `demo/`.

**Entry points**: Library exports in `src/index.js`; demo app entry is `demo/main.jsx` and `demo/index.html`.

## Key developer commands (from `package.json`):

- **Start local demo**: `npm run dev` (uses Vite with `vite.demo.config.js`, serves at http://localhost:3000)
- **Build library**: `npm run build` (Vite library build → outputs to `dist/`)
- **Build demo**: `npm run build:demo` (builds demo app for deployment)
- **Test suite**: `npm test` (Jest + React Testing Library)
- **Test coverage**: `npm run test:coverage`

## Architecture patterns to follow:

**Component structure** (`src/components/ComponentName/`):
- `ComponentName.jsx` - React component with props destructuring
- `ComponentName.css` - Component styles with `.acme-` prefixed classes
- `index.js` - Simple re-export: `export { default } from './ComponentName';`
- `__tests__/ComponentName.test.jsx` - Jest tests with React Testing Library

**Styling system**:
- CSS classes use `.acme-` prefix (e.g. `.acme-card`, `.acme-navigation`)
- Dark mode via `[data-theme="dark"]` CSS selectors
- Component CSS files are colocated and imported in JSX files
- Theme switching handled by `demo/theme.jsx` ThemeProvider

**Export patterns** (see `src/index.js`):
- Default exports: `export { default as ComponentName } from './components/ComponentName';`
- Named exports from component groups: `export { TextInput, Select, Checkbox, TextArea } from './components/Form';`
- Wrapper components: `export { default as Badge, BadgeWrapper } from './components/Badge';`

**Props patterns** (consistent across components):
- Destructure props with defaults: `({ title, children, variant = 'default', className = '', ...props })`
- Spread remaining props: `<div {...props}` for extensibility
- CSS class composition: `className={\`acme-component \${variant} \${className}\`}`

## Critical verification workflow:

1. **Visual check**: Run `npm run dev` → test changes at http://localhost:3000
2. **Export verification**: Ensure new components are exported in `src/index.js`
3. **Test execution**: Run `npm test` → all tests must pass
4. **Build verification**: Run `npm run build` → confirms library builds without errors

## Component-specific patterns:

**Form components** (`src/components/Form/`):
- Controlled input pattern: accept `value` and `onChange` props
- Example: `<TextInput value={name} onChange={(e) => setName(e.target.value)} />`
- Error state pattern: `error` prop displays validation message

**Navigation** (`src/components/Navigation/Navigation.jsx`):
- Uses React `useState` for toggle state: `const [isExpanded, setIsExpanded] = useState(false);`
- Supports nested links: `{ label: 'Parent', href: '/parent', children: [...] }`
- Position variants: `position="left|right|top"`, `variant="sidebar|dropdown"`

**Theme system** (demo only):
- `demo/theme.jsx` provides `ThemeProvider` and `useTheme` hook
- Theme applied via `document.documentElement.setAttribute('data-theme', 'dark')`
- CSS dark mode: `[data-theme="dark"] .acme-component { /* dark styles */ }`

## Integration & deployment:

**Demo development pattern**:
- Demo imports components from `src/` (relative paths) for instant hot reload
- Runtime behavior in demo reflects source changes immediately
- Each demo page in `demo/pages/` showcases specific component features

**Build system**:
- Library build: `vite.config.js` creates UMD + ES modules in `dist/`
- Demo build: `vite.demo.config.js` builds SPA to `demo-dist/`
- Vercel deployment configured in `vercel.json` with `npm run build:demo`

**Dependencies**:
- React/ReactDOM are peerDependencies - never bundle React versions
- `react-router-dom` only used in demo, not in library components

Coding guidelines for PRs and patches:

- Keep changes small and focused. The demo app is the primary verification surface — run `npm run dev` and visually verify the component.
- Preserve backward-compatible exports. If adding a prop, make it optional and document it in `README.md`.
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

- Update `README.md` for install/dev/build notes and component examples
- If you add new files that should be distributed, ensure the build outputs them into `dist/` and that `src/index.js` exports them.

If unsure or the change is large:

- Open a draft PR and include steps to reproduce the demo results (screenshots or links to a Preview deployment if available).
- Ask a human reviewer to confirm API changes. Prefer reviewer confirmation for anything that alters exported APIs, styling tokens, or build configuration.

Minimal contact points for further automation:

- Testing: Jest + React Testing Library configured. Write tests in `__tests__` folders within component directories.
- CI/CD: GitHub Actions workflow runs tests, builds, and security checks on PRs and pushes.
- Linting / tests: Keep code style consistent with existing files; avoid large refactors.

Thank you — ask for clarification if any part of the public API, build, or demo behavior is unclear.

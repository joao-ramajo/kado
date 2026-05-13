# Repository Guidelines

## Project Structure & Module Organization
This is a Vite + React + TypeScript frontend. Source code lives in `src/`, organized by feature:
- `src/features/auth/`, `src/features/dashboard/`, `src/features/landing/`, `src/features/settings/`
- Shared UI and layout code is in `src/components/`
- API and utility helpers are in `src/api/` and `src/utils/`
- Static files live in `public/`

Prefer adding new code inside the relevant feature folder first, then promote to `src/components/` only when it is reused across screens.

## Build, Test, and Development Commands
- `npm run dev`: starts the local Vite dev server.
- `npm run build`: runs TypeScript build checks and creates a production bundle.
- `npm run preview`: serves the production build locally.
- `npm run lint`: runs Biome checks.
- `npm run lint:fix`: runs Biome checks and applies safe fixes.

## Coding Style & Naming Conventions
Use TypeScript, React function components, and clear feature-oriented names. Follow the existing conventions:
- File names use `PascalCase.tsx` for components and `camelCase.ts` for hooks, schemas, and helpers.
- Hooks begin with `use` when they wrap logic, for example `useLogin.ts`.
- Keep imports grouped logically and avoid unused exports.
- Biome is the formatter/linter; run `npm run lint:fix` before committing.

## Testing Guidelines
There is no dedicated test suite in the repository yet. When adding tests, colocate them near the code they cover and use descriptive names such as `ComponentName.test.tsx` or `hookName.test.ts`. At minimum, validate changes with `npm run lint` and `npm run build`.

## Commit & Pull Request Guidelines
Commit history follows short conventional-style prefixes such as `feat:`, `fix:`, and `chore:` with a concise description in Portuguese or English. Keep commits focused on one logical change.

Pull requests should include:
- A short summary of the change
- Notes on user-facing impact or API/config changes
- Screenshots or screen recordings for UI work
- Steps to verify locally, especially for auth, dashboard, and settings flows

## Security & Configuration Tips
Environment-specific values belong in `.env` files, especially `VITE_API_URL`. Do not commit secrets or hard-coded endpoints.

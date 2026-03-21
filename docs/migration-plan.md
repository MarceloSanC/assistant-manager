# Migration Plan

## Strategy

Follow a foundation-first migration instead of a full rewrite in one pass. The legacy branch remains the operational reference, while `v2/architecture-reset` becomes the workspace for the next architecture.

## Branching Model

- `legacy/react-v1`: preserved snapshot of the current application line
- `v2/architecture-reset`: active branch for the new version
- short-lived feature branches from `v2/architecture-reset` for each implementation slice

## Phase 0: Preservation

- Preserve the current React line as legacy.
- Mark the transition point with tag `v1-legacy`.
- Keep the old code available for reference and comparison.

## Phase 1: Decision Record

- Confirm product scope for V2.
- Confirm whether Chakra UI remains or is gradually replaced.
- Confirm whether backend contracts stay stable.
- Decide TypeScript adoption as mandatory for new modules.

## Phase 2: New Foundation

- Replace Create React App with Vite.
- Introduce TypeScript config.
- Create app shell, route structure, and provider composition.
- Add linting, formatting, and test baseline.
- Introduce shared API client and environment config.

## Phase 3: Cross-Cutting Infrastructure

- Add query client and request abstractions.
- Add form stack and schema validation.
- Add shared feedback components for loading, empty, error, and success states.
- Add feature folder conventions and templates.

## Phase 4: Feature Migration Order

Recommended order:

1. Session
2. Profile
3. Products and catalog
4. Online menu
5. Functionalities
6. Modality
7. Groups
8. Sales
9. Messages

This order prioritizes core connectivity and foundational configuration before dependent domains.

## Phase 5: Legacy Extraction

- Compare migrated features against the legacy branch.
- Remove legacy-only code only after feature parity is acceptable.
- Keep a migration checklist by feature to avoid hidden regressions.

## Delivery Discipline

- Keep each PR focused on one architectural slice or one migrated feature.
- Avoid mixing foundation changes with large behavior changes when possible.
- Add tests alongside each migrated feature.
- Maintain a short architecture decision log inside `docs/` as decisions evolve.

## Immediate Next Tasks

1. Bootstrap Vite plus TypeScript in the current branch.
2. Create the new `src/app`, `src/pages`, `src/features`, `src/entities`, and `src/shared` structure.
3. Implement the manager app shell only, with no domain migration yet.
4. Migrate session and profile as the first two feature modules.
5. Add a minimal contributor guide once the new base compiles.

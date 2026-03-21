# Architecture V2

## Architecture Direction

V2 should move away from a screen-driven component tree with large local state objects and evolve into a domain-oriented frontend architecture.

Recommended stack direction:

- React 18+
- TypeScript
- Vite instead of Create React App
- React Router for navigation
- TanStack Query for server state
- React Hook Form plus Zod for forms and validation
- Chakra UI only if it still supports the desired product velocity; otherwise migrate gradually to a smaller design system layer

## Target Principles

- Business rules live outside presentational components.
- Remote data handling is separated from local UI state.
- Forms are modeled explicitly and validated consistently.
- Each feature owns its UI, state, hooks, services, and tests.
- Shared infrastructure is centralized in app and shared layers.

## Proposed Folder Structure

```text
src/
  app/
    providers/
    router/
    styles/
  pages/
    home/
    setup/
    manager/
  features/
    session/
    profile/
    catalog/
    online-menu/
    functionalities/
    modality/
    groups/
    sales/
    messages/
  entities/
    assistant/
    product/
    profile/
  shared/
    api/
    config/
    ui/
    utils/
    types/
```

## Layer Responsibilities

### `app`

Application bootstrap, global providers, router setup, theme, and app-wide configuration.

### `pages`

Route-level composition. Pages assemble features but should not hold core business rules.

### `features`

User-facing capabilities and workflows. Each feature should contain:

- components
- hooks
- services
- schemas
- tests

### `entities`

Shared domain models and transformations used by more than one feature.

### `shared`

Truly reusable technical building blocks such as API clients, UI primitives, helpers, constants, and common types.

## Data Strategy

- Use TanStack Query for fetch, cache, retries, invalidation, and sync flows.
- Keep server state out of ad hoc component state.
- Use local state only for transient UI concerns.
- Normalize mapping between API payloads and UI form models.

## Form Strategy

- Use React Hook Form for all non-trivial forms.
- Define Zod schemas per feature.
- Centralize field parsing and serialization logic.
- Standardize save status, validation errors, and dirty state behavior.

## UI Strategy

- Keep route layout separate from feature content.
- Create reusable shell components for header, sidebar, content area, status banner, and feedback states.
- Reduce duplication in buttons, panels, and section wrappers.

## Testing Strategy

- Unit tests for pure business transformations.
- Integration tests for feature save/load flows.
- Smoke tests for route boot and critical screens.

## Migration Notes From Legacy

Observed legacy characteristics:

- Current app uses Create React App.
- Main manager screen concentrates many concerns in one component.
- Large in-memory objects represent multiple business domains.
- Sync status and connection state are coupled into page behavior.

V2 should split those concerns into feature modules and a consistent data layer before expanding functionality.

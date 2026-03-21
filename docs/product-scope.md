# Product Scope V2

## Context

The current version of Assistant Manager is a React application used to configure and operate a WhatsApp-based assistant for business workflows. The legacy app already covers setup, session handling, profile configuration, products, online menu, groups, sales, messages, and operational settings.

The next version should preserve the business intent of the product while improving maintainability, extensibility, and delivery speed.

## Product Goal

Assistant Manager V2 should become a reliable backoffice for configuring, validating, and operating an assistant tied to WhatsApp commerce and service workflows.

## Primary Outcomes

- Reduce the effort required to add or change configuration domains.
- Improve reliability of data loading, saving, and session status handling.
- Separate product rules from UI concerns.
- Make the application easier to test, document, and onboard new contributors into.
- Prepare the codebase for future features without increasing coupling.

## Core User Flows

1. Authenticate or initialize a managed assistant session.
2. Configure account and profile data.
3. Manage catalog and recommendation behavior.
4. Configure operating modes, groups, and assistant capabilities.
5. Maintain message templates and communication behavior.
6. Save, validate, and publish configuration with clear status feedback.

## In Scope For V2

- Full frontend architecture refactor.
- Routing and page composition redesign.
- State management redesign.
- API/service layer redesign.
- Form and validation standardization.
- Error, loading, and sync feedback standardization.
- Test foundation for critical flows.
- Documentation for architecture, conventions, and migration.

## Out Of Scope For First V2 Milestone

- Rebuilding every legacy screen before the new foundation is stable.
- Large visual redesign without product structure being defined first.
- Premature micro-optimizations.
- Backend replatforming unless required by frontend architecture decisions.

## Success Criteria

- New contributors can understand the main architecture in less than one hour.
- Each business domain has a clear module boundary.
- Shared UI, state, and service concerns are centralized instead of duplicated.
- Critical save/load/session flows have automated coverage.
- Legacy functionality can be migrated incrementally without blocking delivery.

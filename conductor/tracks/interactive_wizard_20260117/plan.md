# Implementation Plan: Interactive Installation Wizard

This plan implements the interactive TUI mode for `skx`, providing a step-by-step wizard to guide users through discovering and installing agent skills.

## Phase 1: Enhanced Environment Detection
Focus on robust detection of AI agents and installation scopes.

- [x] Task: Update `FrameworkResolver` to return detected agent(s) without forcing interactive selection immediately. c726102
- [x] Task: Implement `ScopeResolver` to detect if the current environment favors "Workspace" (e.g., in a git repo or project root) vs "User" scope. bef6b9c
- [x] Task: Write tests for `ScopeResolver` and updated `FrameworkResolver`. bef6b9c
- [ ] Task: Conductor - User Manual Verification 'Enhanced Environment Detection' (Protocol in workflow.md)

## Phase 2: Live Search Component
Implement the interactive skill discovery interface.

- [ ] Task: Create a `SkillSearch` component/function using `Clack` that allows real-time filtering of the registry.
- [ ] Task: Update `src/utils/search.ts` if needed to support efficient filtering for the TUI.
- [ ] Task: Write unit tests for the filtering logic in `SkillSearch`.
- [ ] Task: Conductor - User Manual Verification 'Live Search Component' (Protocol in workflow.md)

## Phase 3: Interactive Wizard Flow
Assemble the steps: Search -> Agent -> Scope -> Confirmation.

- [ ] Task: Implement the main `wizard` function in `src/ui.ts` (or a new file `src/wizard.ts`).
- [ ] Task: Implement "Smart Defaults" logic where the user can accept detected values or override them.
- [ ] Task: Implement the "Confirmation Summary" screen before proceeding to installation.
- [ ] Task: Write integration tests for the wizard state machine (mocking `Clack` inputs).
- [ ] Task: Conductor - User Manual Verification 'Interactive Wizard Flow' (Protocol in workflow.md)

## Phase 4: Installation Integration & Cleanup
Connect the wizard to the actual installation logic.

- [ ] Task: Update `src/cli.ts` to trigger the wizard when `skx` is run without arguments.
- [ ] Task: Ensure the wizard correctly invokes `SkillInstaller` with the selected/confirmed parameters.
- [ ] Task: Final end-to-end smoke tests for the interactive flow.
- [ ] Task: Conductor - User Manual Verification 'Installation Integration & Cleanup' (Protocol in workflow.md)

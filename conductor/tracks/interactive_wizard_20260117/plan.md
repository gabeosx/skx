# Implementation Plan: Interactive Installation Wizard

This plan implements the interactive TUI mode for `skx`, providing a step-by-step wizard to guide users through discovering and installing agent skills.

## Phase 1: Enhanced Environment Detection [checkpoint: 8e5478e]
Focus on robust detection of AI agents and installation scopes.

- [x] Task: Update `FrameworkResolver` to return detected agent(s) without forcing interactive selection immediately. c726102
- [x] Task: Implement `ScopeResolver` to detect if the current environment favors "Workspace" (e.g., in a git repo or project root) vs "User" scope. bef6b9c
- [x] Task: Write tests for `ScopeResolver` and updated `FrameworkResolver`. bef6b9c
- [x] Task: Conductor - User Manual Verification 'Enhanced Environment Detection' (Protocol in workflow.md) 8e5478e

## Phase 2: Live Search Component [checkpoint: 4e9e18b]
Implement the interactive skill discovery interface.

- [x] Task: Create a `SkillSearch` component/function using `Clack` that allows real-time filtering of the registry. fcd9de1
- [x] Task: Update `src/utils/search.ts` if needed to support efficient filtering for the TUI. fcd9de1
- [x] Task: Write unit tests for the filtering logic in `SkillSearch`. fcd9de1
- [x] Task: Conductor - User Manual Verification 'Live Search Component' (Protocol in workflow.md) 4e9e18b

## Phase 3: Interactive Wizard Flow [checkpoint: dcb94ba]
Assemble the steps: Search -> Agent -> Scope -> Confirmation.

- [x] Task: Implement the main `wizard` function in `src/ui.ts` (or a new file `src/wizard.ts`). ac20e0f
- [x] Task: Implement "Smart Defaults" logic where the user can accept detected values or override them. ac20e0f
- [x] Task: Implement the "Confirmation Summary" screen before proceeding to installation. ac20e0f
- [x] Task: Write integration tests for the wizard state machine (mocking `Clack` inputs). ac20e0f
- [x] Task: Conductor - User Manual Verification 'Interactive Wizard Flow' (Protocol in workflow.md) dcb94ba

## Phase 4: Installation Integration & Cleanup
Connect the wizard to the actual installation logic.

- [ ] Task: Update `src/cli.ts` to trigger the wizard when `skx` is run without arguments.
- [ ] Task: Ensure the wizard correctly invokes `SkillInstaller` with the selected/confirmed parameters.
- [ ] Task: Final end-to-end smoke tests for the interactive flow.
- [ ] Task: Conductor - User Manual Verification 'Installation Integration & Cleanup' (Protocol in workflow.md)

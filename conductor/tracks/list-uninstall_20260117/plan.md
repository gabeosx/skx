# Implementation Plan - List and Uninstall Commands

## Phase 1: Core Logic & Adapters
- [x] Task: Update `Adapter` interface to support listing and uninstalling skills. e9d99e2
    - [x] Add `listSkills(scope: Scope): Promise<string[]>` to `Adapter` interface.
    - [x] Add `uninstallSkill(scope: Scope, packageName: string): Promise<void>` to `Adapter` interface.
- [ ] Task: Implement `listSkills` and `uninstallSkill` in `GeminiAdapter`, `ClaudeAdapter`, etc.
    - [ ] Implement `GeminiAdapter.listSkills`.
    - [ ] Implement `GeminiAdapter.uninstallSkill`.
    - [ ] Implement `ClaudeAdapter.listSkills`.
    - [ ] Implement `ClaudeAdapter.uninstallSkill`.
    - [ ] Implement `CodexAdapter.listSkills`.
    - [ ] Implement `CodexAdapter.uninstallSkill`.
- [ ] Task: Create `SkillManager` class (or update existing utility) to orchestrate detection.
    - [ ] Implement `detectInstalledSkills(filter?: { agent?: string, scope?: string })` to scan all locations.

## Phase 2: CLI Commands Implementation
- [ ] Task: Implement `skx list` command using Commander.js.
    - [ ] Define command with flags: `-a, --agent <agent>` and `-s, --scope <scope>`.
    - [ ] Implement logic to call `SkillManager` based on flags.
    - [ ] Format output with clear headers grouping by Agent and Scope.
- [ ] Task: Implement `skx uninstall` command using Commander.js.
    - [ ] Define command with required flags: `-a, --agent <agent>` and `-s, --scope <scope>`.
    - [ ] Add validation to ensure flags are present.
    - [ ] Implement logic to call `adapter.uninstallSkill`.

## Phase 3: Testing & Verification
- [ ] Task: Write Unit Tests for `list` command logic.
    - [ ] Test filtering by agent.
    - [ ] Test filtering by scope.
    - [ ] Test default behavior (all agents/scopes).
- [ ] Task: Write Unit Tests for `uninstall` command logic.
    - [ ] Test successful uninstallation.
    - [ ] Test error handling for missing flags.
- [ ] Task: Conductor - User Manual Verification 'List and Uninstall' (Protocol in workflow.md)

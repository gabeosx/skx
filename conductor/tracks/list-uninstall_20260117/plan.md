# Implementation Plan - List and Uninstall Commands

## Phase 1: Core Logic & Adapters [checkpoint: c7a1139]
- [x] Task: Update `Adapter` interface to support listing and uninstalling skills. e9d99e2
    - [x] Add `listSkills(scope: Scope): Promise<string[]>` to `Adapter` interface.
    - [x] Add `uninstallSkill(scope: Scope, packageName: string): Promise<void>` to `Adapter` interface.
- [x] Task: Implement `listSkills` and `uninstallSkill` in `GeminiAdapter`, `ClaudeAdapter`, etc. 154edbf
    - [x] Implement `GeminiAdapter.listSkills`.
    - [x] Implement `GeminiAdapter.uninstallSkill`.
    - [x] Implement `ClaudeAdapter.listSkills`.
    - [x] Implement `ClaudeAdapter.uninstallSkill`.
    - [x] Implement `CodexAdapter.listSkills`.
    - [x] Implement `CodexAdapter.uninstallSkill`.
- [x] Task: Create `SkillManager` class (or update existing utility) to orchestrate detection. 77d37d8
    - [x] Implement `detectInstalledSkills(filter?: { agent?: string, scope?: string })` to scan all locations.

## Phase 2: CLI Commands Implementation
- [x] Task: Implement `skx list` command using Commander.js. 0944817
    - [x] Define command with flags: `-a, --agent <agent>` and `-s, --scope <scope>`.
    - [x] Implement logic to call `SkillManager` based on flags.
    - [x] Format output with clear headers grouping by Agent and Scope.
- [x] Task: Implement `skx uninstall` command using Commander.js. 1e52ce9
    - [x] Define command with required flags: `-a, --agent <agent>` and `-s, --scope <scope>`.
    - [x] Add validation to ensure flags are present.
    - [x] Implement logic to call `adapter.uninstallSkill`.

## Phase 3: Testing & Verification
- [ ] Task: Write Unit Tests for `list` command logic.
    - [ ] Test filtering by agent.
    - [ ] Test filtering by scope.
    - [ ] Test default behavior (all agents/scopes).
- [ ] Task: Write Unit Tests for `uninstall` command logic.
    - [ ] Test successful uninstallation.
    - [ ] Test error handling for missing flags.
- [ ] Task: Conductor - User Manual Verification 'List and Uninstall' (Protocol in workflow.md)

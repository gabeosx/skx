# Implementation Plan: Agent Framework Discovery & Skill Installation

This plan outlines the steps to implement the core logic for discovering AI agent frameworks and installing Agent Skills.

## Phase 1: Foundation & Architecture [checkpoint: 304eca7]
Goal: Define the core interfaces and the adapter registration system.

- [x] Task: Define `AgentFrameworkAdapter` interface and types 3f4431e
    - [ ] Create `src/types/adapter.ts` with the `AgentFrameworkAdapter` interface
    - [ ] Define `Scope` enum (Workspace, User)
    - [ ] Write tests for a mock adapter implementation
- [x] Task: Implement Adapter Registry 1f8a388
    - [ ] Create `src/utils/adapters.ts` to manage registration and retrieval of adapters
    - [ ] Write tests for registering and getting adapters
- [x] Task: Conductor - User Manual Verification 'Phase 1: Foundation & Architecture' (Protocol in workflow.md) 304eca7

## Phase 2: Framework Adapters [checkpoint: f6d45ef]
Goal: Implement specific adapters for Gemini, Claude, and Codex.

- [x] Task: Implement `GeminiAdapter` 7e13a08
    - [x] Write failing tests for detection and path resolution
    - [x] Implement `detect`, `getInstallationPath`, and `getPostInstallInstructions`
    - [x] Verify tests pass
- [x] Task: Implement `ClaudeAdapter` 35dd3a7
    - [x] Write failing tests for detection and path resolution (handling .claude and .github)
    - [x] Implement detection and path resolution logic
    - [x] Verify tests pass
- [x] Task: Implement `CodexAdapter` 0149f19
    - [x] Write failing tests for detection and path resolution
    - [x] Implement detection and path resolution logic
    - [x] Verify tests pass
- [x] Task: Conductor - User Manual Verification 'Phase 2: Framework Adapters' (Protocol in workflow.md) f6d45ef

## Phase 3: Resolution & Discovery Logic
Goal: Implement the high-level logic for resolving which framework to use.

- [x] Task: Implement `FrameworkResolver` 9815fc4
    - [ ] Write failing tests for explicit selection vs. discovery
    - [ ] Implement logic to check explicit input first
    - [ ] Implement automatic discovery fallback
    - [ ] Implement conflict resolution (prompting) when multiple frameworks are detected
    - [ ] Implement error handling for "no framework found"
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Resolution & Discovery Logic' (Protocol in workflow.md)

## Phase 4: Installation & File Management
Goal: Implement the physical file copying and directory management.

- [ ] Task: Implement `SkillInstaller`
    - [ ] Write failing tests for directory creation and file copying
    - [ ] Implement logic to ensure target directory structure exists
    - [ ] Implement robust file copying from source to destination
    - [ ] Implement success/failure reporting
- [ ] Task: Conductor - User Manual Verification 'Phase 4: Installation & File Management' (Protocol in workflow.md)

## Phase 5: CLI Integration & E2E
Goal: Connect the logic to the CLI and perform final verification.

- [ ] Task: Integrate with `skx install` command
    - [ ] Update CLI command to use `FrameworkResolver` and `SkillInstaller`
    - [ ] Implement post-install notification display
- [ ] Task: Integration Smoke Tests
    - [ ] Create test scenarios for each framework (Gemini, Claude, Codex)
    - [ ] Verify directory creation and file copying in a temporary workspace
- [ ] Task: Conductor - User Manual Verification 'Phase 5: CLI Integration & E2E' (Protocol in workflow.md)

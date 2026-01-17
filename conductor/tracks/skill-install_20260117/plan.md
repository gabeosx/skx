# Implementation Plan: Agent Framework Discovery & Skill Installation

This plan outlines the steps to implement the core logic for discovering AI agent frameworks and installing Agent Skills.

## Phase 1: Foundation & Architecture
Goal: Define the core interfaces and the adapter registration system.

- [x] Task: Define `AgentFrameworkAdapter` interface and types 3f4431e
    - [ ] Create `src/types/adapter.ts` with the `AgentFrameworkAdapter` interface
    - [ ] Define `Scope` enum (Workspace, User)
    - [ ] Write tests for a mock adapter implementation
- [ ] Task: Implement Adapter Registry
    - [ ] Create `src/utils/adapters.ts` to manage registration and retrieval of adapters
    - [ ] Write tests for registering and getting adapters
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Foundation & Architecture' (Protocol in workflow.md)

## Phase 2: Framework Adapters
Goal: Implement specific adapters for Gemini, Claude, and Codex.

- [ ] Task: Implement `GeminiAdapter`
    - [ ] Write failing tests for detection and path resolution
    - [ ] Implement `detect`, `getInstallationPath`, and `getPostInstallInstructions`
    - [ ] Verify tests pass
- [ ] Task: Implement `ClaudeAdapter`
    - [ ] Write failing tests for detection and path resolution (handling .claude and .github)
    - [ ] Implement detection and path resolution logic
    - [ ] Verify tests pass
- [ ] Task: Implement `CodexAdapter`
    - [ ] Write failing tests for detection and path resolution
    - [ ] Implement detection and path resolution logic
    - [ ] Verify tests pass
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Framework Adapters' (Protocol in workflow.md)

## Phase 3: Resolution & Discovery Logic
Goal: Implement the high-level logic for resolving which framework to use.

- [ ] Task: Implement `FrameworkResolver`
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

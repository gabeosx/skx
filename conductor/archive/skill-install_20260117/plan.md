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

## Phase 3: Resolution & Discovery Logic [checkpoint: e166b14]
Goal: Implement the high-level logic for resolving which framework to use.

- [x] Task: Implement `FrameworkResolver` 9815fc4
- [x] Task: Conductor - User Manual Verification 'Phase 3: Resolution & Discovery Logic' (Protocol in workflow.md) e166b14

## Phase 4: Installation & File Management [checkpoint: 8601f47]
Goal: Implement the physical file copying and directory management.

- [x] Task: Implement `SkillInstaller` 825a3a0
- [x] Task: Conductor - User Manual Verification 'Phase 4: Installation & File Management' (Protocol in workflow.md) 8601f47

## Phase 5: CLI Integration & E2E [checkpoint: 43fb3ba]
Goal: Connect the logic to the CLI and perform final verification.

- [x] Task: Integrate with `skx install` command 16e0de7
- [x] Task: Integration Smoke Tests 0ddfb26
- [x] Task: Conductor - User Manual Verification 'Phase 5: CLI Integration & E2E' (Protocol in workflow.md) 43fb3ba

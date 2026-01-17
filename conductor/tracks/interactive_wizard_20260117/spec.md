# Specification: Interactive Installation Wizard

## Overview
This track implements the interactive TUI mode for `skx`, providing a step-by-step wizard to guide users through discovering and installing agent skills. The wizard will focus on ease of use by automatically detecting the environment while allowing manual overrides.

## User Flow
1. **Trigger:** User runs `skx` with no arguments or a specific `install` command in interactive mode.
2. **Skill Discovery:** Live search interface to find a skill from the `agentskills.io` registry.
3. **Environment Detection:** The tool automatically detects the target AI agent (e.g., Gemini) and the installation scope (e.g., Workspace).
4. **Configuration:** 
   - **Agent Selection:** Pre-selects detected agent; user can override.
   - **Scope Selection:** Pre-selects detected scope; user can override.
5. **Confirmation:** Displays a summary of the installation (Skill, Agent, Scope) for user approval.
6. **Execution:** Performs the installation using the appropriate adapter.

## Functional Requirements
- **Live Search Component:** Implement a real-time filtering list using `Clack` that queries the `skills.json` registry.
- **Smart Defaults:** 
    - Implement logic to detect `.gemini`, `.claudecode`, etc., to identify the active agent.
    - Implement logic to detect if the current directory is a git repo or project root to default to "Workspace" scope.
- **Interactive Selectors:** Use `Clack`'s select components for Agent and Scope, with the detected values set as the initial selection.
- **Summary Screen:** A clear, formatted confirmation prompt before any files are modified.
- **Error Handling:** Graceful handling of network issues (registry fetch) or detection failures.

## Non-Functional Requirements
- **Visual Style:** Consistent with `Clack`'s minimalist and modern TUI aesthetic.
- **Performance:** Live search must be responsive (low latency on filtering).
- **Type Safety:** Full TypeScript implementation for all wizard states and transitions.

## Acceptance Criteria
- [ ] Running `skx` (interactive) opens the skill search.
- [ ] Typing in search filters the list of skills from the registry immediately.
- [ ] The wizard correctly identifies the agent if a known configuration directory exists.
- [ ] The user can change the detected Agent and Scope using arrow keys.
- [ ] The installation only proceeds after the user confirms the summary.
- [ ] Unit tests cover the detection logic and state transitions.

## Out of Scope
- Custom skill configuration variables (Task D was excluded).
- Batch installation of multiple skills in one wizard session.
- Advanced "User" scope management (e.g., managing global symlinks) beyond simple installation.

# Specification: List and Uninstall Commands

## Overview
This track implements the `list` and `uninstall` commands for the `skx` CLI. These commands allow users to view their installed agent skills across different scopes (workspace and user) and safely remove them.

## Functional Requirements

### `list` Command
- **Usage:** `skx list`
- **Flags:**
  - `-a, --agent <agent>`: Filter by agent (e.g., gemini, claude).
  - `-s, --scope <scope>`: Filter by scope (workspace, user).
- **Discovery Logic:**
  - If agent and scope are provided: List skills only for that specific combination.
  - If no flags are provided:
    - Scan the current working directory for **all** supported agent directories (e.g., `.gemini/`, `.claude/`).
    - Scan the User Home directory for **all** supported agent directories (e.g., `~/.gemini/`, `~/.claude/`).
    - Aggregate and list skills found in all discovered locations.
- **Output:**
  - Skills must be grouped by Agent and Scope (e.g., "Gemini - User", "Gemini - Workspace").
  - Display Package Name for each skill.

### `uninstall` Command
- **Usage:** `skx uninstall <package_name> --agent <agent> --scope <scope>`
- **Flags:**
  - `-a, --agent <agent>` (Required): The agent name.
  - `-s, --scope <scope>` (Required): The scope name.
- **Safety Constraints:**
  - The command MUST fail if `--agent` or `--scope` flags are missing. It will not attempt to guess or auto-detect the target for deletion to prevent accidental uninstalls.
  - Error messages must clearly state that explicit flags are required.
- **Logic:**
  - Remove the skill directory from the calculated path.
  - Clean up any associated configuration or metadata if applicable.

## Non-Functional Requirements
- **UX:** Clear headers and indentation for the list output to differentiate between scopes and agents.
- **Safety:** Explicit confirmation via flags for uninstallation.

## Acceptance Criteria
- Running `skx list` correctly identifies and displays skills from *all* detected agents in both the current directory (e.g., both `.gemini/` and `.claude/` if present) and the user directory.
- `skx list --agent gemini --scope workspace` lists only skills in the current directory's `.gemini` folder.
- `skx uninstall <pkg>` without flags returns a helpful error message.
- `skx uninstall <pkg> --agent gemini --scope user` successfully removes the package from `~/.gemini/skills`.

## Out of Scope
- Interactive uninstallation wizard (to be handled in a separate "interactive mode" track).
- Mass uninstallation of all skills for an agent.
- Displaying skill versions (versioning is not supported).

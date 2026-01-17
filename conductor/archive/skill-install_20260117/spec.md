# Track Specification: Agent Framework Discovery & Skill Installation

## 1. Overview
This track implements the core logic for discovering the user's active AI agent framework (Gemini CLI, Claude Code, etc.) and handling the installation of Agent Skills into the appropriate location for that framework. It establishes an extensible "Adapter" architecture to easily support new frameworks in the future.

## 2. Functional Requirements

### 2.1 Framework Resolution
- **Explicit Selection:**
    - The user can explicitly specify the target framework (and scope) via CLI arguments/flags.
    - If specified, the tool skips the discovery process and uses the selected framework adapter directly.
- **Automatic Discovery (Fallback):**
    - Inspect the current working directory ONLY if no framework is explicitly specified.
    - **Gemini CLI:** Detect `.gemini/` directory.
    - **Claude Code:** Detect `.claude/` or `.github/` directories.
    - **Codex/Copilot:** Detect `.copilot/` or `.github/` directories.
- **Conflict Resolution:**
    - If multiple frameworks are detected (e.g., both `.gemini` and `.claude` exist) during automatic discovery, the tool **MUST** prompt the user to select the target framework.
- **Failure State:**
    - If no framework is detected and the user has not explicitly specified one, the tool **MUST** error out and inform the user that it cannot resolve the target framework automatically.

### 2.2 Skill Installation & File Management
- **Directory Creation:**
    - If the user specifies a framework/scope (or one is detected) but the target directory structure (e.g., `.gemini/skills/`) does not exist, the tool **MUST create it**.
- **Method:** Installation is performed by **copying** the skill's directory (downloaded/extracted from the registry source) into the resolved framework-specific "skills" directory.
- **Framework-Specific Paths (Drivers):**
    - **Gemini CLI:**
        - Workspace: `.gemini/skills/`
        - User: `~/.gemini/skills/`
    - **Claude Code:**
        - Workspace: `.claude/skills/` (Primary), `.github/skills/` (Secondary - use if exists)
        - User: `~/.claude/skills/`
    - **Codex/Copilot:**
        - Workspace: `.github/skills/`
        - User: `~/.copilot/skills/`
- **Post-Install Notification:**
    - The tool **MUST NOT** automatically modify framework configuration files.
    - It **MUST** display a clear post-installation message instructing the user on any necessary manual steps.

### 2.3 Architecture (Adapter Pattern)
- Implement a strict `AgentFrameworkAdapter` interface.
- **Interface Contract:**
    - `name`: string (e.g., "gemini")
    - `detect(cwd: string): Promise<boolean>`
    - `getInstallationPath(scope: Scope, cwd: string): Promise<string>`
    - `getPostInstallInstructions(): string`
- **Implementations:**
    - `GeminiAdapter`
    - `ClaudeAdapter`
    - `CodexAdapter`

## 3. Non-Functional Requirements
- **Extensibility:** The Adapter pattern must make it trivial to add support for a new agent.
- **Error Handling:** Clear error messages if destination paths are not writable.

## 4. Out of Scope
- Automatic modification of framework config files.
- Symlink-based installation.

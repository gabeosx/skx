# Initial Concept

I want to build a cli tool called `skx` for managing Agent Skills (https://agentskills.io). It will allow users to search, view, and install skills. Skills can have different scopes, depending on where they are installed - for example: workspace, user (in ~), or system. Skills are extensions for AI agent utilities like Claude Code, Codex, and Gemini CLI. The tool will use https://github.com/gabeosx/agentskillsdir/blob/main/public/skills.json as its registry to discover skills. Each AI agent utility has a different way of installing/configuring skills. So, the tool must understand how to support each agent utility. It must also try to discover what tool the user is using. For example, if there is a .gemini directory in the current working directory, the tool might assume that the user is using Gemini CLI. The user should be able to pass the package name, agent (e.g. Gemini/Claude/Codex/etc), scope, and skill package name (from skills.json) to the CLI and install it. They should also be able to search. They should also be able to run `skx` in an interactive mode. The tool should be installable via NPM or Brew.

# Product Definition: skx

## Target Audience
- End-users of AI agent utilities such as Gemini CLI, Claude Code, and Codex who want to extend their agents' capabilities.

## Primary Goals
- **Simplified Discovery & Installation:** Make it easy to find and install agent skills from the central registry (agentskills.io).
- **Unified Management:** Provide a single tool to manage skills across multiple agent utilities, abstracting away the specific installation/configuration details of each.
- **Automated Environment Detection:** Automatically detect the user's active AI agent utility and environment (e.g., detecting `.gemini/` directory) to streamline configuration.

## Core Features
- **Dual Interface:** Support for both standard CLI arguments and an interactive TUI mode.
- **Interactive Wizard:** A step-by-step wizard for installing and configuring skills in interactive mode.
- **Skill Discovery:** Command to list all installed skills (`skx list`) across all detected agents and scopes.
- **Scoped Installation:** Support for installing skills at different levels: Workspace (local to project) or User (home directory).
- **Registry Integration:** Search and view detailed information for skills (including package names and repository URLs) hosted in the official `agentskills.io` registry.
- **Lifecycle Management:** Manual commands for performing clean uninstalls (`skx uninstall`) that remove all associated configurations.
- **Extensible Adapter Architecture:** Standardized interface for supporting multiple AI agent frameworks (Gemini, Claude, Codex/Copilot) with specific installation logic for each.

## Distribution
- The tool is distributed via NPM as `@gabeosx/skx` and via Homebrew through the `gabeosx/skx` tap.

# skx

![Build Status](https://img.shields.io/github/actions/workflow/status/gabeosx/skx/ci.yml?branch=main)
![License](https://img.shields.io/npm/l/@gabeosx/skx)

**Agent Skills Manager** - The CLI tool for managing Agent Skills from the [Agent Skills Directory](https://skillindex.dev).

## Overview

`skx` simplifies the discovery, installation, and management of skills for AI agents like Gemini CLI, Claude Code, and Codex. It provides a unified interface to extend your AI agents with new capabilities from the AgentSkills registry.

## Features

- **Unified Management:** Manage skills across multiple agent utilities (Gemini, Claude, Codex).
- **Interactive Wizard:** Step-by-step guidance for installation and configuration.
- **Skill Discovery:** Easily search and list skills from the [Agent Skills Directory](https://skillindex.dev).
- **Automated Detection:** Automatically detects your active agent environment.
- **Scoped Installation:** Install skills globally (User) or locally (Workspace).

## Installation

### NPM
```bash
npm install -g @gabeosx/skx
```

### Homebrew (macOS)
```bash
brew tap gabeosx/tap
brew install skx
```

## Usage

### Interactive Mode
Simply run the command without arguments to start the interactive wizard:
```bash
skx
```

### CLI Commands

**List installed skills:**
List all skills installed for a specific agent or across all detected environments.
```bash
skx list
```
- `-a, --agent <agent>`: Filter by agent (e.g., `gemini`, `claude`, `codex`).
- `-s, --scope <scope>`: Filter by scope (`workspace` or `user`).

**Search for skills:**
Search the Agent Skills Directory for available skills.
```bash
skx search <query>
```

**Install a skill:**
Install a skill from the registry. If flags are omitted, the CLI will guide you through the process.
```bash
skx install <package-name>
```
- `-a, --agent <agent>`: Explicitly specify the AI agent.
- `-s, --scope <scope>`: Specify the installation scope (`workspace` or `user`).

**Uninstall a skill:**
Remove an installed skill from your environment.
```bash
skx uninstall <package-name>
```
- `-a, --agent <agent>`: **(Required)** Specify the agent.
- `-s, --scope <scope>`: **(Required)** Specify the scope (`workspace` or `user`).

**General Flags:**
- `-h, --help`: Display help for command.
- `-V, --version`: Output the version number.


## Contributing

Contributions are welcome! Please see the [Contributing Guidelines](CONTRIBUTING.md) for more details.

## License

ISC

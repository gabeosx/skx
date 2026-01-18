# skx

![Build Status](https://img.shields.io/github/actions/workflow/status/gabeosx/skx/ci.yml?branch=main)
![License](https://img.shields.io/npm/l/skx)

**Agent Skills Manager** - The CLI tool for managing Agent Skills from the [AgentSkills Registry](https://github.com/gabeosx/agentskillsdir).

## Overview

`skx` simplifies the discovery, installation, and management of skills for AI agents like Gemini CLI, Claude Code, and Codex. It provides a unified interface to extend your AI agents with new capabilities from the AgentSkills registry.

## Features

- **Unified Management:** Manage skills across multiple agent utilities (Gemini, Claude, Codex).
- **Interactive Wizard:** Step-by-step guidance for installation and configuration.
- **Skill Discovery:** Easily search and list skills from the [AgentSkills Registry](https://github.com/gabeosx/agentskillsdir).
- **Automated Detection:** Automatically detects your active agent environment.
- **Scoped Installation:** Install skills globally (User) or locally (Workspace).

## Installation

### NPM
```bash
npm install -g skx
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
```bash
skx list
```

**Search for skills:**
```bash
skx search <query>
```

**Install a skill:**
```bash
skx install <package-name>
```

**Flags:**
- `-a, --agent <agent>`: Explicitly specify the AI agent (e.g., `gemini`, `claude`, `codex`).
- `-s, --scope <scope>`: Specify the installation scope (`workspace` or `user`).

**Uninstall a skill:**
```bash
skx uninstall <package-name>
```

## Contributing

Contributions are welcome! Please see the [Contributing Guidelines](CONTRIBUTING.md) for more details.

## License

ISC

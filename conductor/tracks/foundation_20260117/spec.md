# Specification: Foundation: Project scaffolding and registry search functionality.

## Overview
This track focuses on setting up the initial codebase for the `skx` CLI tool and implementing the core functionality to discover skills from the official registry.

## Objectives
- Initialize a Node.js TypeScript project.
- Configure CLI argument parsing using Commander.js.
- Implement an interactive mode using Clack.
- Fetch and validate the skills registry (`skills.json`) from the provided GitHub URL.
- Implement search functionality to allow users to find skills by name or description.

## Key Features
- **Project Structure:** Standard TypeScript project layout (`src/`, `dist/`, `tests/`).
- **CLI Interface:** `skx` command with a `search` sub-command and an interactive mode triggered by running `skx` without arguments.
- **Registry Integration:** Fetching `https://github.com/gabeosx/agentskillsdir/blob/main/public/skills.json` (raw content).
- **Search Logic:** Case-insensitive search across skill names and descriptions.

## Tech Stack Requirements
- **Language:** TypeScript
- **CLI Framework:** Commander.js
- **TUI/Interactive:** Clack
- **Networking:** Axios or Undici
- **Validation:** Zod
- **Testing:** Vitest

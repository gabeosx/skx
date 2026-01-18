# Tech Stack: skx

## Core Runtime & Language
- **TypeScript:** To provide type safety and improved developer experience.
- **Node.js (>= 22):** The primary runtime for the CLI, ensuring compatibility with modern release tooling.

## CLI & Interactive Frameworks
- **Commander.js:** Used for parsing command-line arguments, defining commands, and handling the standard CLI interface.
- **Clack:** Used for building the interactive mode, TUI components, and the step-by-step installation wizard.

## Utilities & Libraries
- **Zod:** For schema validation (e.g., validating the `skills.json` registry and user configuration).
- **Axios / Undici:** For fetching the `skills.json` registry from GitHub.
- **tiged:** For downloading skill repositories (or subdirectories) from GitHub without needing a full git clone.
- **fs-extra:** For simplified file system operations when installing/uninstalling skills.

## Testing & Quality
- **Vitest:** For fast unit and integration testing.
- **ESLint & Prettier:** For code linting and formatting.

## CI/CD & Release
- **GitHub Actions:** Automates the testing and publication lifecycle.
- **semantic-release:** Manages automated versioning and changelog generation based on conventional commits.

## Distribution
- **NPM:** Distributed as a public scoped package (`@gabeosx/skx`) using Trusted Publishing (OIDC).
- **Homebrew:** Distributed via a custom tap (`gabeosx/homebrew-skx`) with automated formula updates.

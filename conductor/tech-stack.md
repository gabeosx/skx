# Tech Stack: skx

## Core Runtime & Language
- **TypeScript:** To provide type safety and improved developer experience.
- **Node.js:** The primary runtime for the CLI, ensuring compatibility with NPM distribution.

## CLI & Interactive Frameworks
- **Commander.js:** Used for parsing command-line arguments, defining commands, and handling the standard CLI interface.
- **Clack:** Used for building the interactive mode, TUI components, and the step-by-step installation wizard.

## Utilities & Libraries
- **Zod:** For schema validation (e.g., validating the `skills.json` registry and user configuration).
- **Axios / Undici:** For fetching the `skills.json` registry from GitHub.
- **fs-extra:** For simplified file system operations when installing/uninstalling skills.

## Testing & Quality
- **Vitest:** For fast unit and integration testing.
- **ESLint & Prettier:** For code linting and formatting.

## Distribution
- **NPM:** Primary distribution channel.
- **Homebrew:** Provided via a custom tap or official formula for macOS users.

# Specification: Distribution & CI/CD Setup

## Overview
Establish the distribution infrastructure and project foundation for `skx`. This includes setting up automated CI/CD pipelines via GitHub Actions, configuring the project for NPM and Homebrew publishing, and creating essential project files (`.gitignore`, `README.md`).

## Functional Requirements
- **CI/CD Pipeline (GitHub Actions):**
    - **Quality Gate (PRs):** Automatically run linting, type checking, and unit tests on every Pull Request to `main`.
    - **Automated Publishing (NPM):** Trigger a release workflow to publish the package to NPM when a new GitHub Release is created.
    - **Homebrew Integration:** Include a step in the release workflow to facilitate Homebrew formula updates (e.g., updating a tap or providing a formula file).
- **Project Foundation:**
    - **.gitignore:** Implement a comprehensive `.gitignore` for Node.js/TypeScript development.
    - **README.md:** Create a professional `README.md` including product overview, features, installation instructions, usage examples, and status badges.

## Non-Functional Requirements
- **Security:** Use GitHub Secrets for sensitive information (e.g., `NPM_TOKEN`).
- **Reliability:** Ensure the pipeline fails and blocks releases if tests or build steps do not pass.

## Acceptance Criteria
- [ ] PRs cannot be merged without passing linting, type checks, and tests.
- [ ] Creating a GitHub Release triggers an automated NPM publish.
- [ ] A functional `.gitignore` file is present in the root.
- [ ] A `README.md` exists with badges and clear documentation based on `product.md`.
- [ ] Homebrew release mechanism is defined or automated.

## Out of Scope
- Implementation of the core CLI logic (handled in other tracks).
- Setting up physical Homebrew tap repositories (only the automation logic/formula generation).

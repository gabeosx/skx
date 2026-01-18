# Implementation Plan - GitHub & CI/CD Setup [checkpoint: feae326]

## Phase 1: Repository & Environment Setup
- [x] Task: Create public GitHub repository `skx` using `gh` CLI. [4d6794c]
    - [ ] Initialize repo and set remote `origin`.
- [x] Task: Create public GitHub repository `homebrew-skx` using `gh` CLI. [6e4aec2]
    - [ ] Initialize with a basic README.
- [x] Task: Configure repository secrets. [30a0e65]
    - [ ] Create placeholder instructions for user to add `NPM_TOKEN` and `GH_TOKEN` (or `HOMEBREW_TAP_TOKEN`) to repository secrets.
- [x] Task: Conductor - User Manual Verification 'Phase 1' (Protocol in workflow.md) [feae326]

## Phase 2: CI Pipeline Configuration
- [~] Task: Refine existing CI workflow (`.github/workflows/ci.yml`).
    - [ ] Ensure it runs on `push` to `main` and `pull_request`.
    - [ ] Verify lint, type-check, and test steps match `package.json` scripts.
- [ ] Task: Conductor - User Manual Verification 'Phase 2' (Protocol in workflow.md)

## Phase 3: Semantic Release & NPM Publishing
- [ ] Task: Install and configure `semantic-release`.
    - [ ] Install `semantic-release` and necessary plugins as dev dependencies.
    - [ ] Create `release.config.js` (or `.releaserc`) configuration file.
- [ ] Task: Replace `publish.yml` with a Semantic Release workflow.
    - [ ] Create `.github/workflows/release.yml`.
    - [ ] Configure it to run on push to `main`.
    - [ ] Add steps: Checkout, Setup Node, Install, Verify CI, and Run Semantic Release.
- [ ] Task: Conductor - User Manual Verification 'Phase 3' (Protocol in workflow.md)

## Phase 4: Homebrew Tap Automation
- [ ] Task: Create Homebrew Formula template.
    - [ ] Add a `Formula/skx.rb` template or configure a generation script.
- [ ] Task: Configure Semantic Release for Homebrew.
    - [ ] Add a plugin or an additional step in `release.yml` to update the `homebrew-skx` repo.
    - [ ] Alternatively, use a dedicated action (like `mislav/bump-homebrew-formula-action`) triggered after a successful release.
- [ ] Task: Conductor - User Manual Verification 'Phase 4' (Protocol in workflow.md)

## Phase 5: Final Integration & Push
- [ ] Task: Commit all local changes (workflow files, config).
- [ ] Task: Push local `main` branch to the new GitHub `skx` repository.
- [ ] Task: Verify the first run of the pipeline on GitHub.
- [ ] Task: Conductor - User Manual Verification 'Phase 5' (Protocol in workflow.md)
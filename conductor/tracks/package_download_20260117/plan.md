# Implementation Plan: Real Package Acquisition

This plan replaces the mocked installation logic with a real download process using `tiged` to fetch skills from GitHub repositories, including support for subdirectories.

## Phase 1: Environment & Dependencies [checkpoint: 2ba7f57]
Goal: Prepare the project for the new download logic.

- [x] Task: Install `tiged` dependency. f96da9a
- [x] Task: Create a dedicated `Downloader` utility. c0c7f1a
- [x] Task: Write unit tests for `Downloader`. 85652cb
- [x] Task: Conductor - User Manual Verification 'Phase 1: Environment & Dependencies' (Protocol in workflow.md) 2ba7f57

## Phase 2: Integration & Orchestration
Goal: Connect the downloader to the installation CLI flow.

- [x] Task: Update `SkillInstaller` to accept a source URL. 9123448
- [x] Task: Implement Cleanup Logic. 9123448
- [ ] Task: Update `src/cli.ts` (install command).
    - [ ] Replace the "dummy source" logic with the new `Downloader` and `SkillInstaller` flow.
    - [ ] Ensure the spinner correctly reflects the download and installation states.
- [ ] Task: Write Integration Tests for the `install` command.
    - [ ] Mock network calls or use a real small test repo to verify the end-to-end flow.
    - [ ] Verify that files end up in the expected agent/scope directory.
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Integration & Orchestration' (Protocol in workflow.md)

## Phase 3: Final Verification
Goal: Ensure the system works with real-world registry data.

- [ ] Task: End-to-End Smoke Test with the `pptx` skill.
    - [ ] Run `skx install pptx` in a test environment.
    - [ ] Verify the files are correctly downloaded from the monorepo subdirectory.
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Final Verification' (Protocol in workflow.md)

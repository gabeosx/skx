# Specification: Real Package Acquisition

## Overview
Currently, the `skx install` command simulates the skill installation process by copying from a non-existent dummy path. This track implements the real acquisition logic: downloading the skill from its GitHub repository (supporting monorepos/subdirectories) using `tiged` and placing it in the correct agent-specific directory.

## Functional Requirements
- **Remote Acquisition:** Use `tiged` to download the contents of the `githubRepoUrl` specified in the registry.
- **Subdirectory Support:** Correctly handle GitHub URLs that point to subdirectories (e.g., `.../tree/main/skills/pptx`).
- **Temporary Storage:** Skills must be downloaded to the OS temporary directory (`os.tmpdir()`) before being moved to their final destination.
- **Installation Integration:** Connect the acquisition logic to the existing `SkillInstaller` and `FrameworkResolver` flow.
- **Cleanup:** Ensure that any temporary files created during the download process are removed after successful or failed installation.

## Non-Functional Requirements
- **Progress Visibility:** Display a progress indicator (spinner) while the download is in progress.
- **Error Handling:** Provide clear error messages if the URL is invalid, the repository is inaccessible, or `tiged` fails.
- **Dependency Management:** Add `tiged` as a project dependency.

## Acceptance Criteria
- Running `skx install pptx` successfully downloads the skill from `https://github.com/anthropics/skills/tree/main/skills/pptx`.
- The downloaded files are placed in the correct directory (e.g., `.gemini/skills/pptx` if Gemini is detected).
- The command succeeds even if the GitHub URL points to a deep subdirectory.
- No temporary files remain in the OS temp directory after the process completes.

## Out of Scope
- Support for private GitHub repositories requiring authentication (initially).
- Support for non-GitHub sources (e.g., Bitbucket, GitLab) unless supported natively by the basic `tiged` configuration.
- Version pinning (e.g., `install pptx@1.0.0`) unless already part of the `githubRepoUrl` in the registry.

# Deployment Setup

To enable the automated CI/CD pipeline, the following secrets must be configured in the GitHub repository settings:

1.  **NPM_TOKEN**: An automation token from NPM to allow publishing packages.
    -   Log in to npmjs.com.
    -   Go to Access Tokens -> Generate New Token -> Automation.
    -   Add as `NPM_TOKEN` in GitHub Repo > Settings > Secrets and variables > Actions.

2.  **GH_TOKEN** (or `HOMEBREW_TAP_TOKEN`): A GitHub Personal Access Token (PAT) with `repo` scope to allow updating the Homebrew tap.
    -   Generate a Fine-grained token or Classic PAT with `public_repo` (or `repo`) access.
    -   Add as `GH_TOKEN` in GitHub Repo > Settings > Secrets and variables > Actions.
    -   *Note: Standard `GITHUB_TOKEN` might not have permissions to push to another repository (`homebrew-skx`).*

# Deployment Setup

To enable the automated CI/CD pipeline, you need to configure authentication for NPM (using Trusted Publishing) and GitHub (for the Homebrew tap).

## 1. NPM Trusted Publishing (Recommended)
This method uses OpenID Connect (OIDC) to authenticate with NPM without managing long-lived secrets.

1.  **Log in to npmjs.com** and navigate to your package settings (or create the package first if it doesn't exist).
2.  Go to **Settings** -> **Publishing Access**.
3.  Under **Provenance** (optional but recommended), enable "Generate provenance on publish".
4.  Under **Trusted Publishing**, click **Connect a GitHub repository**.
5.  Select:
    -   **Owner:** `gabeosx`
    -   **Repository:** `skx`
    -   **Workflow filename:** `release.yml` (This will be created in Phase 3).
    -   **Environment:** (Leave empty or use `release` if you configure it in GitHub).
    -   **Branch:** `main`
6.  Click **Connect**.

*No `NPM_TOKEN` secret is required in GitHub when using this method.*

## 2. GitHub Token (For Homebrew Tap)
A GitHub Personal Access Token is still required to allow the `skx` repository to push updates to the `homebrew-skx` repository.

1.  **Generate a Token:**
    -   Go to GitHub Developer Settings -> **Personal access tokens** -> **Fine-grained tokens**.
    -   Click **Generate new token**.
    -   **Name:** `skx-homebrew-updater`
    -   **Resource owner:** `gabeosx`
    -   **Repository access:** Select **Only select repositories** -> `homebrew-skx`.
    -   **Permissions:**
        -   `Contents`: **Read and Write** (to update the Formula).
        -   `Metadata`: **Read-only**.
2.  **Add to GitHub Secrets:**
    -   Copy the generated token (starts with `github_pat_...`).
    -   Go to the `skx` repository on GitHub.
    -   **Settings** -> **Secrets and variables** -> **Actions**.
    -   Click **New repository secret**.
    -   **Name:** `GH_TOKEN` (or `HOMEBREW_TAP_TOKEN` if preferred).
    -   **Value:** Paste your token.
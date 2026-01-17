import path from 'path';
import fs from 'fs-extra';
import { Scope } from '../types/adapter.js';
import os from 'os';
export class CodexAdapter {
    name = 'codex';
    async detect(cwd) {
        const copilotExists = await fs.pathExists(path.join(cwd, '.copilot'));
        const githubExists = await fs.pathExists(path.join(cwd, '.github'));
        return copilotExists || githubExists;
    }
    async getInstallationPath(scope, cwd) {
        if (scope === Scope.Workspace) {
            // Codex/Copilot typically uses .github/skills for workspace
            return path.join(cwd, '.github', 'skills');
        }
        else {
            // User scope typically in ~/.copilot/skills
            return path.join(os.homedir(), '.copilot', 'skills');
        }
    }
    getPostInstallInstructions() {
        return `
To use the installed skill with GitHub Copilot/Codex:
1. Ensure your Copilot configuration includes the skills directory.
2. Restart your editor or Copilot agent if necessary.
`.trim();
    }
}

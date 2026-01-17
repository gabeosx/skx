import path from 'path';
import fs from 'fs-extra';
import { Scope } from '../types/adapter.js';
import os from 'os';
export class ClaudeAdapter {
    name = 'claude';
    async detect(cwd) {
        const claudeExists = await fs.pathExists(path.join(cwd, '.claude'));
        const githubExists = await fs.pathExists(path.join(cwd, '.github'));
        return claudeExists || githubExists;
    }
    async getInstallationPath(scope, cwd) {
        if (scope === Scope.Workspace) {
            const claudePath = path.join(cwd, '.claude');
            const githubPath = path.join(cwd, '.github');
            // If .claude exists, prefer it.
            if (await fs.pathExists(claudePath)) {
                return path.join(claudePath, 'skills');
            }
            // If .github exists, use it.
            if (await fs.pathExists(githubPath)) {
                return path.join(githubPath, 'skills');
            }
            // Default to .claude if neither exists (creation will handle parent dir)
            return path.join(claudePath, 'skills');
        }
        else {
            // User scope
            return path.join(os.homedir(), '.claude', 'skills');
        }
    }
    getPostInstallInstructions() {
        return `
To use the installed skill with Claude Code:
1. Ensure your Claude Code configuration includes the skills directory.
2. Restart Claude Code if necessary.
`.trim();
    }
}

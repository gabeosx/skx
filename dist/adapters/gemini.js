import path from 'path';
import fs from 'fs-extra';
import { Scope } from '../types/adapter.js';
import os from 'os';
export class GeminiAdapter {
    name = 'gemini';
    async detect(cwd) {
        return fs.pathExists(path.join(cwd, '.gemini'));
    }
    async getInstallationPath(scope, cwd) {
        if (scope === Scope.Workspace) {
            return path.join(cwd, '.gemini', 'skills');
        }
        else {
            // User scope
            return path.join(os.homedir(), '.gemini', 'skills');
        }
    }
    getPostInstallInstructions() {
        return `
To use the installed skill with Gemini CLI:
1. Ensure your Gemini CLI configuration is set to load skills from the installation directory.
2. You may need to restart the Gemini CLI or the current session for the changes to take effect.
`.trim();
    }
}

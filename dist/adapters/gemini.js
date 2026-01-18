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
    async listSkills(scope, cwd) {
        const installPath = await this.getInstallationPath(scope, cwd);
        if (!await fs.pathExists(installPath)) {
            return [];
        }
        const entries = await fs.readdir(installPath, { withFileTypes: true });
        const skills = [];
        for (const entry of entries) {
            if (entry.isDirectory()) {
                if (entry.name.startsWith('@')) {
                    // Handle scoped packages
                    const scopePath = path.join(installPath, entry.name);
                    const scopeEntries = await fs.readdir(scopePath, { withFileTypes: true });
                    for (const scopeEntry of scopeEntries) {
                        if (scopeEntry.isDirectory()) {
                            skills.push(`${entry.name}/${scopeEntry.name}`);
                        }
                    }
                }
                else if (!entry.name.startsWith('.')) {
                    skills.push(entry.name);
                }
            }
        }
        return skills.sort();
    }
    async uninstallSkill(scope, packageName, cwd) {
        const installPath = await this.getInstallationPath(scope, cwd);
        const skillPath = path.join(installPath, packageName);
        // Safety check: Ensure we are deleting something inside the installPath
        if (!skillPath.startsWith(installPath)) {
            throw new Error('Invalid skill path');
        }
        await fs.remove(skillPath);
    }
}

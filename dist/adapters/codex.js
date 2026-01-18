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

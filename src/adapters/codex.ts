import path from 'path';
import fs from 'fs-extra';
import { type AgentFrameworkAdapter, Scope } from '../types/adapter.js';
import os from 'os';

export class CodexAdapter implements AgentFrameworkAdapter {
  name = 'codex';

  async detect(cwd: string): Promise<boolean> {
    const copilotExists = await fs.pathExists(path.join(cwd, '.copilot'));
    const githubExists = await fs.pathExists(path.join(cwd, '.github'));
    return copilotExists || githubExists;
  }

  async getInstallationPath(scope: Scope, cwd: string): Promise<string> {
    if (scope === Scope.Workspace) {
      // Codex/Copilot typically uses .github/skills for workspace
      return path.join(cwd, '.github', 'skills');
    } else {
      // User scope typically in ~/.copilot/skills
      return path.join(os.homedir(), '.copilot', 'skills');
    }
  }

  getPostInstallInstructions(): string {
    return `
To use the installed skill with GitHub Copilot/Codex:
1. Ensure your Copilot configuration includes the skills directory.
2. Restart your editor or Copilot agent if necessary.
`.trim();
  }

  async listSkills(scope: Scope, cwd: string): Promise<string[]> {
    const installPath = await this.getInstallationPath(scope, cwd);
    if (!await fs.pathExists(installPath)) {
      return [];
    }

    const entries = await fs.readdir(installPath, { withFileTypes: true });
    const skills: string[] = [];

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
        } else if (!entry.name.startsWith('.')) {
          skills.push(entry.name);
        }
      }
    }

    return skills.sort();
  }

  async uninstallSkill(scope: Scope, packageName: string, cwd: string): Promise<void> {
    const installPath = await this.getInstallationPath(scope, cwd);
    const skillPath = path.join(installPath, packageName);
    
    // Safety check: Ensure we are deleting something inside the installPath
    if (!skillPath.startsWith(installPath)) {
        throw new Error('Invalid skill path');
    }

    await fs.remove(skillPath);
  }
}

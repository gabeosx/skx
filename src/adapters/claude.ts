import path from 'path';
import fs from 'fs-extra';
import { type AgentFrameworkAdapter, Scope } from '../types/adapter.js';
import os from 'os';

export class ClaudeAdapter implements AgentFrameworkAdapter {
  name = 'claude';

  async detect(cwd: string): Promise<boolean> {
    const claudeExists = await fs.pathExists(path.join(cwd, '.claude'));
    const githubExists = await fs.pathExists(path.join(cwd, '.github'));
    return claudeExists || githubExists;
  }

  async getInstallationPath(scope: Scope, cwd: string): Promise<string> {
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
    } else {
      // User scope
      return path.join(os.homedir(), '.claude', 'skills');
    }
  }

  getPostInstallInstructions(): string {
    return `
To use the installed skill with Claude Code:
1. Ensure your Claude Code configuration includes the skills directory.
2. Restart Claude Code if necessary.
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

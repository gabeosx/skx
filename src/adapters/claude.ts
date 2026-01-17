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
    throw new Error('Method not implemented.');
  }

  async uninstallSkill(scope: Scope, packageName: string, cwd: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

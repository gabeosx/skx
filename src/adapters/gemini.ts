import path from 'path';
import fs from 'fs-extra';
import { type AgentFrameworkAdapter, Scope } from '../types/adapter.js';
import os from 'os';

export class GeminiAdapter implements AgentFrameworkAdapter {
  name = 'gemini';

  async detect(cwd: string): Promise<boolean> {
    return fs.pathExists(path.join(cwd, '.gemini'));
  }

  async getInstallationPath(scope: Scope, cwd: string): Promise<string> {
    if (scope === Scope.Workspace) {
      return path.join(cwd, '.gemini', 'skills');
    } else {
      // User scope
      return path.join(os.homedir(), '.gemini', 'skills');
    }
  }

  getPostInstallInstructions(): string {
    return `
To use the installed skill with Gemini CLI:
1. Ensure your Gemini CLI configuration is set to load skills from the installation directory.
2. You may need to restart the Gemini CLI or the current session for the changes to take effect.
`.trim();
  }
}

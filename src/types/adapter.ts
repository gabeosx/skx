export enum Scope {
  Workspace = 'workspace',
  User = 'user',
  System = 'system',
}

export interface AgentFrameworkAdapter {
  name: string;
  detect(cwd: string): Promise<boolean>;
  getInstallationPath(scope: Scope, cwd: string): Promise<string>;
  getPostInstallInstructions(): string;
  listSkills(scope: Scope, cwd: string): Promise<string[]>;
  uninstallSkill(scope: Scope, packageName: string, cwd: string): Promise<void>;
}

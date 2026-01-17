import { describe, it, expect } from 'vitest';
import { Scope, type AgentFrameworkAdapter } from '../src/types/adapter';

describe('AgentFrameworkAdapter Types', () => {
  it('should have a Scope enum with Workspace, User, and System values', () => {
    expect(Scope).toBeDefined();
    expect(Scope.Workspace).toBe('workspace');
    expect(Scope.User).toBe('user');
    expect(Scope.System).toBe('system');
  });

  it('should allow implementing the AgentFrameworkAdapter interface', () => {
    // Mock implementation to verify the interface contract
    class MockAdapter implements AgentFrameworkAdapter {
      name = 'mock';
      async detect(cwd: string): Promise<boolean> {
        return cwd === 'detected';
      }
      async getInstallationPath(scope: Scope, cwd: string): Promise<string> {
        return scope === Scope.Workspace ? `${cwd}/mock` : '/home/user/mock';
      }
      getPostInstallInstructions(): string {
        return 'Mock instructions';
      }
      async listSkills(scope: Scope, cwd: string): Promise<string[]> {
        return [];
      }
      async uninstallSkill(scope: Scope, packageName: string, cwd: string): Promise<void> {
        // no-op
      }
    }

    const adapter = new MockAdapter();
    expect(adapter).toBeDefined();
    expect(adapter.name).toBe('mock');
    expect(typeof adapter.detect).toBe('function');
    expect(typeof adapter.getInstallationPath).toBe('function');
    expect(typeof adapter.getPostInstallInstructions).toBe('function');
  });
});

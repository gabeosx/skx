import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ScopeResolver } from '../src/utils/scope-resolver';
import { Scope } from '../src/types/adapter';
import fs from 'fs-extra';
import path from 'path';

vi.mock('fs-extra');

describe('ScopeResolver', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should detect Workspace scope if .git directory exists', async () => {
    (fs.pathExists as any).mockImplementation(async (p: string) => {
      return p.endsWith('.git');
    });

    const resolver = new ScopeResolver();
    const scope = await resolver.resolve('/tmp/project');
    expect(scope).toBe(Scope.Workspace);
  });

  it('should detect Workspace scope if package.json exists', async () => {
    (fs.pathExists as any).mockImplementation(async (p: string) => {
      return p.endsWith('package.json');
    });

    const resolver = new ScopeResolver();
    const scope = await resolver.resolve('/tmp/project');
    expect(scope).toBe(Scope.Workspace);
  });

  it('should default to User scope if no indicators found', async () => {
    (fs.pathExists as any).mockResolvedValue(false);

    const resolver = new ScopeResolver();
    const scope = await resolver.resolve('/tmp/empty');
    expect(scope).toBe(Scope.User);
  });
});

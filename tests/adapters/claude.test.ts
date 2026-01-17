import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ClaudeAdapter } from '../../src/adapters/claude';
import { Scope } from '../../src/types/adapter';
import fs from 'fs-extra';
import path from 'path';

vi.mock('fs-extra');

describe('ClaudeAdapter', () => {
  let adapter: ClaudeAdapter;
  const mockCwd = '/mock/cwd';

  beforeEach(() => {
    adapter = new ClaudeAdapter();
    vi.resetAllMocks();
  });

  describe('detect', () => {
    it('should return true if .claude directory exists', async () => {
      vi.mocked(fs.pathExists).mockImplementation(async (p) => p === path.join(mockCwd, '.claude'));
      const result = await adapter.detect(mockCwd);
      expect(result).toBe(true);
    });

    it('should return true if .github directory exists (secondary)', async () => {
      vi.mocked(fs.pathExists).mockImplementation(async (p) => p === path.join(mockCwd, '.github'));
      const result = await adapter.detect(mockCwd);
      expect(result).toBe(true);
    });

    it('should return false if neither directory exists', async () => {
      vi.mocked(fs.pathExists).mockResolvedValue(false);
      const result = await adapter.detect(mockCwd);
      expect(result).toBe(false);
    });
  });

  describe('getInstallationPath', () => {
    it('should return workspace .claude path if it exists', async () => {
      vi.mocked(fs.pathExists).mockImplementation(async (p) => p === path.join(mockCwd, '.claude'));
      const result = await adapter.getInstallationPath(Scope.Workspace, mockCwd);
      expect(result).toBe(path.join(mockCwd, '.claude/skills'));
    });

    it('should return workspace .github path if .claude missing but .github exists', async () => {
      vi.mocked(fs.pathExists).mockImplementation(async (p) => p === path.join(mockCwd, '.github'));
      const result = await adapter.getInstallationPath(Scope.Workspace, mockCwd);
      expect(result).toBe(path.join(mockCwd, '.github/skills'));
    });
    
    it('should default to .claude if neither exist (creation scenario)', async () => {
        vi.mocked(fs.pathExists).mockResolvedValue(false);
        const result = await adapter.getInstallationPath(Scope.Workspace, mockCwd);
        expect(result).toBe(path.join(mockCwd, '.claude/skills'));
    });

    it('should return user path', async () => {
      const homeDir = process.env.HOME || process.env.USERPROFILE || '/home/user';
      const result = await adapter.getInstallationPath(Scope.User, mockCwd);
      expect(result).toBe(path.join(homeDir, '.claude/skills'));
    });
  });
});

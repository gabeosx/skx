import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CodexAdapter } from '../../src/adapters/codex';
import { Scope } from '../../src/types/adapter';
import fs from 'fs-extra';
import path from 'path';

vi.mock('fs-extra');

describe('CodexAdapter', () => {
  let adapter: CodexAdapter;
  const mockCwd = '/mock/cwd';

  beforeEach(() => {
    adapter = new CodexAdapter();
    vi.resetAllMocks();
  });

  describe('detect', () => {
    it('should return true if .copilot directory exists', async () => {
      vi.mocked(fs.pathExists).mockImplementation(async (p) => p === path.join(mockCwd, '.copilot'));
      const result = await adapter.detect(mockCwd);
      expect(result).toBe(true);
    });

    it('should return true if .github directory exists', async () => {
      vi.mocked(fs.pathExists).mockImplementation(async (p) => p === path.join(mockCwd, '.github'));
      const result = await adapter.detect(mockCwd);
      expect(result).toBe(true);
    });

    it('should return false if neither exists', async () => {
      vi.mocked(fs.pathExists).mockResolvedValue(false);
      const result = await adapter.detect(mockCwd);
      expect(result).toBe(false);
    });
  });

  describe('getInstallationPath', () => {
    it('should return workspace .github path', async () => {
      const result = await adapter.getInstallationPath(Scope.Workspace, mockCwd);
      expect(result).toBe(path.join(mockCwd, '.github/skills'));
    });

    it('should return user path', async () => {
      const homeDir = process.env.HOME || process.env.USERPROFILE || '/home/user';
      const result = await adapter.getInstallationPath(Scope.User, mockCwd);
      expect(result).toBe(path.join(homeDir, '.copilot/skills'));
    });
  });
});

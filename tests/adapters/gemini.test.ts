import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { GeminiAdapter } from '../../src/adapters/gemini';
import { Scope } from '../../src/types/adapter';
import fs from 'fs-extra';
import path from 'path';

vi.mock('fs-extra');

describe('GeminiAdapter', () => {
  let adapter: GeminiAdapter;
  const mockCwd = '/mock/cwd';

  beforeEach(() => {
    adapter = new GeminiAdapter();
    vi.resetAllMocks();
  });

  describe('detect', () => {
    it('should return true if .gemini directory exists', async () => {
      vi.mocked(fs.pathExists).mockResolvedValue(true);
      const result = await adapter.detect(mockCwd);
      expect(result).toBe(true);
      expect(fs.pathExists).toHaveBeenCalledWith(path.join(mockCwd, '.gemini'));
    });

    it('should return false if .gemini directory does not exist', async () => {
      vi.mocked(fs.pathExists).mockResolvedValue(false);
      const result = await adapter.detect(mockCwd);
      expect(result).toBe(false);
    });
  });

  describe('getInstallationPath', () => {
    it('should return workspace path', async () => {
      const result = await adapter.getInstallationPath(Scope.Workspace, mockCwd);
      expect(result).toBe(path.join(mockCwd, '.gemini/skills'));
    });

    it('should return user path', async () => {
      const homeDir = process.env.HOME || process.env.USERPROFILE || '/home/user';
      const result = await adapter.getInstallationPath(Scope.User, mockCwd);
      expect(result).toBe(path.join(homeDir, '.gemini/skills'));
    });
  });

  describe('getPostInstallInstructions', () => {
    it('should return instructions string', () => {
      const instructions = adapter.getPostInstallInstructions();
      expect(instructions).toContain('Gemini');
      expect(instructions).toContain('restart');
    });
  });
});

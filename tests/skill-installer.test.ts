import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { SkillInstaller } from '../src/utils/skill-installer';
import fs from 'fs-extra';
import path from 'path';

vi.mock('fs-extra');

describe('SkillInstaller', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should create the target directory and copy files', async () => {
    const installer = new SkillInstaller();
    const sourceDir = '/tmp/source-skill';
    const targetDir = '/tmp/target-framework/skills/my-skill';

    (fs.pathExists as any).mockResolvedValue(false);
    (fs.ensureDir as any).mockResolvedValue(undefined);
    (fs.copy as any).mockResolvedValue(undefined);

    await installer.install(sourceDir, targetDir);

    expect(fs.ensureDir).toHaveBeenCalledWith(path.dirname(targetDir));
    expect(fs.copy).toHaveBeenCalledWith(sourceDir, targetDir);
  });

  it('should throw error if copy fails', async () => {
    const installer = new SkillInstaller();
    const sourceDir = '/tmp/source-skill';
    const targetDir = '/tmp/target-framework/skills/my-skill';

    (fs.ensureDir as any).mockResolvedValue(undefined);
    (fs.copy as any).mockRejectedValue(new Error('Permission denied'));

    await expect(installer.install(sourceDir, targetDir)).rejects.toThrow('Failed to install skill: Permission denied');
  });

  it('should handle non-Error throw gracefully', async () => {
    const installer = new SkillInstaller();
    const sourceDir = '/tmp/source-skill';
    const targetDir = '/tmp/target-framework/skills/my-skill';

    (fs.ensureDir as any).mockResolvedValue(undefined);
    (fs.copy as any).mockRejectedValue('Strange Error');

    await expect(installer.install(sourceDir, targetDir)).rejects.toThrow('An unknown error occurred during skill installation.');
  });
});
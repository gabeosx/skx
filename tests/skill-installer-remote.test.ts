import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SkillInstaller } from '../src/utils/skill-installer';
import { Downloader } from '../src/utils/downloader';
import fs from 'fs-extra';
import os from 'os';

vi.mock('fs-extra');
vi.mock('../src/utils/downloader');
vi.mock('os');

describe('SkillInstaller Remote', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should download and install from a URL', async () => {
    const installer = new SkillInstaller();
    const url = 'https://github.com/user/skill';
    const targetDir = '/dest/skill';

    vi.mocked(os.tmpdir).mockReturnValue('/tmp');
    // path.join is not mocked, it will use real implementation which is fine.
    
    vi.mocked(fs.ensureDir).mockResolvedValue(undefined);
    vi.mocked(fs.copy).mockResolvedValue(undefined);
    vi.mocked(Downloader.download).mockResolvedValue(undefined);
    vi.mocked(fs.remove).mockResolvedValue(undefined);

    await installer.installFromUrl(url, targetDir);

    expect(Downloader.download).toHaveBeenCalledWith(url, expect.stringContaining('skx-skill-'));
    expect(fs.copy).toHaveBeenCalledWith(expect.stringContaining('skx-skill-'), targetDir);
    expect(fs.remove).toHaveBeenCalledWith(expect.stringContaining('skx-skill-'));
  });
});

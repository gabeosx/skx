import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createProgram } from '../src/cli';
import { AdapterRegistry } from '../src/utils/adapters';
import { GeminiAdapter } from '../src/adapters/gemini';
import { ClaudeAdapter } from '../src/adapters/claude';
import { Downloader } from '../src/utils/downloader';
import fs from 'fs-extra';
import path from 'path';
import os from 'os';
import * as registry from '../src/utils/registry';

vi.mock('../src/utils/registry');
vi.mock('../src/utils/downloader');

describe('CLI Integration Smoke Tests', () => {
  let tmpDir: string;

  beforeEach(async () => {
    tmpDir = path.join(os.tmpdir(), `skx-smoke-${Date.now()}`);
    await fs.ensureDir(tmpDir);
    AdapterRegistry.clear();
    AdapterRegistry.register(new GeminiAdapter());
    AdapterRegistry.register(new ClaudeAdapter());

    (registry.fetchRegistry as any).mockResolvedValue([
      { name: 'test-skill', packageName: '@test/skill', githubRepoUrl: 'https://github.com/test/skill' }
    ]);

    vi.mocked(Downloader.download).mockResolvedValue(undefined);
  });

  afterEach(async () => {
    await fs.remove(tmpDir);
    vi.restoreAllMocks();
  });

  it('should install a skill when framework is explicitly specified', async () => {
    const program = createProgram();
    program.exitOverride();

    vi.spyOn(fs, 'copy').mockResolvedValue(undefined as any);
    vi.spyOn(fs, 'ensureDir').mockResolvedValue(undefined as any);

    await program.parseAsync([
      'node', 'test', 'install', 'test-skill', 
      '--framework', 'gemini', 
      '--scope', 'workspace'
    ]);

    expect(Downloader.download).toHaveBeenCalledWith('https://github.com/test/skill', expect.any(String));
    expect(fs.copy).toHaveBeenCalledWith(expect.any(String), expect.stringContaining(path.join('.gemini/skills', '@test/skill')));
  });

  it('should detect framework automatically in a directory', async () => {
    await fs.ensureDir(path.join(tmpDir, '.claude'));
    
    const program = createProgram();
    program.exitOverride();
    vi.spyOn(fs, 'copy').mockResolvedValue(undefined as any);
    vi.spyOn(fs, 'ensureDir').mockResolvedValue(undefined as any);
    vi.spyOn(process, 'cwd').mockReturnValue(tmpDir);

    await program.parseAsync([
      'node', 'test', 'install', 'test-skill',
      '--scope', 'workspace'
    ]);

    expect(Downloader.download).toHaveBeenCalledWith('https://github.com/test/skill', expect.any(String));
    expect(fs.copy).toHaveBeenCalledWith(expect.any(String), path.join(tmpDir, '.claude', 'skills', '@test/skill'));
  });
});
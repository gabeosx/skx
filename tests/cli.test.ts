import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createProgram } from '../src/cli.js';
import * as registryUtils from '../src/utils/registry.js';

vi.mock('../src/utils/registry.js');

describe('CLI', () => {
  let consoleLogSpy: any;
  let consoleErrorSpy: any;

  beforeEach(() => {
    consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.resetAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should create a program with the correct name and version', () => {
    const program = createProgram();
    expect(program.name()).toBe('skx');
    expect(program.version()).toBeDefined();
  });

  it('should have a search command', () => {
    const program = createProgram();
    const searchCmd = program.commands.find((cmd) => cmd.name() === 'search');
    expect(searchCmd).toBeDefined();
    expect(searchCmd?.description()).toBeDefined();
  });

  it('should search and display skills', async () => {
    const mockSkills = [
      {
        name: 'test-skill',
        packageName: 'test-pkg',
        description: 'A test skill',
        githubRepoUrl: 'url',
        tags: ['test'],
      },
    ];

    vi.mocked(registryUtils.fetchRegistry).mockResolvedValue(mockSkills);

    const program = createProgram();
    // Use parseAsync to await the action
    await program.parseAsync(['node', 'skx', 'search', 'test']);

    expect(registryUtils.fetchRegistry).toHaveBeenCalled();
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('Found 1 skills'));
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('test-skill'));
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('Package: test-pkg'));
  });

  it('should handle no skills found', async () => {
    vi.mocked(registryUtils.fetchRegistry).mockResolvedValue([]);
    const program = createProgram();
    await program.parseAsync(['node', 'skx', 'search', 'missing']);

    expect(consoleLogSpy).toHaveBeenCalledWith(expect.stringContaining('No skills found'));
  });

  it('should handle errors during fetch', async () => {
    vi.mocked(registryUtils.fetchRegistry).mockRejectedValue(new Error('Fetch failed'));
    const program = createProgram();

    // Save original exitCode
    const originalExitCode = process.exitCode;
    process.exitCode = undefined;

    await program.parseAsync(['node', 'skx', 'search']);

    expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining('Error: Fetch failed'));
    expect(process.exitCode).toBe(1);

    // Restore exitCode
    process.exitCode = originalExitCode;
  });
});

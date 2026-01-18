import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createProgram } from '../src/cli';
import { SkillManager } from '../src/utils/skill-manager';
import chalk from 'chalk';

vi.mock('../src/utils/skill-manager');

describe('CLI list command', () => {
  let consoleSpy: any;

  beforeEach(() => {
    vi.resetAllMocks();
    consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it('should define a list command', () => {
    const program = createProgram();
    const listCommand = program.commands.find(c => c.name() === 'list');
    expect(listCommand).toBeDefined();
  });

  it('should display installed skills grouping by agent and scope', async () => {
    const program = createProgram();
    program.exitOverride();

    const mockSkills = new Map<string, string[]>();
    mockSkills.set('gemini - workspace', ['skill-a']);
    mockSkills.set('claude - user', ['skill-b']);

    (SkillManager.prototype.detectInstalledSkills as any).mockResolvedValue(mockSkills);

    await program.parseAsync(['node', 'test', 'list']);

    expect(SkillManager.prototype.detectInstalledSkills).toHaveBeenCalled();
    
    // Check output
    // We expect calls to console.log with formatted headers and skill names
    // Exact formatting check might be brittle, so checking for key presence
    
    // Check for Headers
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('gemini - workspace'));
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('claude - user'));
    
    // Check for Skills
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('skill-a'));
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('skill-b'));
  });

  it('should pass flags to SkillManager', async () => {
    const program = createProgram();
    program.exitOverride();

    (SkillManager.prototype.detectInstalledSkills as any).mockResolvedValue(new Map());

    await program.parseAsync(['node', 'test', 'list', '--agent', 'gemini', '--scope', 'user']);

    expect(SkillManager.prototype.detectInstalledSkills).toHaveBeenCalledWith({ agent: 'gemini', scope: 'user' });
  });

  it('should handle no skills found', async () => {
    const program = createProgram();
    program.exitOverride();

    (SkillManager.prototype.detectInstalledSkills as any).mockResolvedValue(new Map());

    await program.parseAsync(['node', 'test', 'list']);

    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('No installed skills found'));
  });
});

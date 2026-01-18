import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createProgram } from '../src/cli';
import { FrameworkResolver } from '../src/utils/framework-resolver';
import { Scope } from '../src/types/adapter';
import chalk from 'chalk';

vi.mock('../src/utils/framework-resolver');

describe('CLI uninstall command', () => {
  let consoleSpy: any;
  let consoleErrorSpy: any;
  let processSpy: any;

  beforeEach(() => {
    vi.resetAllMocks();
    consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
    consoleErrorSpy.mockRestore();
  });

  it('should define an uninstall command', () => {
    const program = createProgram();
    const cmd = program.commands.find(c => c.name() === 'uninstall');
    expect(cmd).toBeDefined();
  });

  it('should require agent and scope flags', async () => {
    const program = createProgram();
    program.exitOverride();

    await expect(program.parseAsync(['node', 'test', 'uninstall', 'my-skill']))
        .rejects
        .toThrow(); // Commander throws if required options missing or custom validation fails
        
    // Wait, commander doesn't auto-throw for missing options unless marked .requiredOption
    // If I use custom validation, I might exit.
    // Let's assume implementation uses .requiredOption or manual check
  });

  it('should call adapter.uninstallSkill with correct args', async () => {
    const program = createProgram();
    program.exitOverride();

    const mockAdapter = {
      name: 'gemini',
      uninstallSkill: vi.fn().mockResolvedValue(undefined),
    };

    (FrameworkResolver.prototype.resolve as any).mockResolvedValue(mockAdapter);

    await program.parseAsync(['node', 'test', 'uninstall', 'my-skill', '--agent', 'gemini', '--scope', 'user']);

    expect(FrameworkResolver.prototype.resolve).toHaveBeenCalledWith(expect.any(String), 'gemini');
    expect(mockAdapter.uninstallSkill).toHaveBeenCalledWith(Scope.User, 'my-skill', expect.any(String));
  });

  it('should handle errors gracefully', async () => {
    const program = createProgram();
    program.exitOverride();

    const mockAdapter = {
      name: 'gemini',
      uninstallSkill: vi.fn().mockRejectedValue(new Error('Uninstall failed')),
    };

    (FrameworkResolver.prototype.resolve as any).mockResolvedValue(mockAdapter);

    // expect(() => ...).rejects.toThrow() works for async if program.exitOverride is on
    // but we catch errors in action handler usually.
    // If I catch and process.exit(1), I need to mock process.exit or check console.error
    
    // Let's mock process.exitCode
    const originalExitCode = process.exitCode;
    process.exitCode = 0;
    
    await program.parseAsync(['node', 'test', 'uninstall', 'my-skill', '--agent', 'gemini', '--scope', 'user']);
    
    expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining('Error: Uninstall failed'));
    expect(process.exitCode).toBe(1);
    
    process.exitCode = originalExitCode;
  });
});

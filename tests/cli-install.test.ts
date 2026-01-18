import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createProgram } from '../src/cli';
import { FrameworkResolver } from '../src/utils/framework-resolver';
import { SkillInstaller } from '../src/utils/skill-installer';
import { Scope } from '../src/types/adapter';
import * as registry from '../src/utils/registry';
import * as prompts from '@clack/prompts';

vi.mock('../src/utils/framework-resolver');
vi.mock('../src/utils/skill-installer');
vi.mock('../src/utils/registry');
vi.mock('@clack/prompts');

describe('CLI install command', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    (registry.fetchRegistry as any).mockResolvedValue([
      { name: 'test-skill', packageName: '@test/skill', githubRepoUrl: 'https://github.com/test/skill' }
    ]);
    (prompts.spinner as any).mockReturnValue({
      start: vi.fn(),
      stop: vi.fn(),
    });
    (prompts.select as any).mockResolvedValue('workspace');
    (prompts.isCancel as any).mockReturnValue(false);
  });

  it('should define an install command', () => {
    const program = createProgram();
    const installCommand = program.commands.find(c => c.name() === 'install');
    expect(installCommand).toBeDefined();
  });

  it('should call resolver and installer with correct arguments', async () => {
    const program = createProgram();
    program.exitOverride(); 
    
    const mockAdapter = {
      name: 'gemini',
      getInstallationPath: vi.fn().mockResolvedValue('/mock/path'),
      getPostInstallInstructions: vi.fn().mockReturnValue('Done.'),
    };

    (FrameworkResolver.prototype.resolve as any).mockResolvedValue(mockAdapter);
    (SkillInstaller.prototype.installFromUrl as any).mockResolvedValue(undefined);

    vi.spyOn(process, 'cwd').mockReturnValue('/cwd');

    await program.parseAsync(['node', 'test', 'install', 'test-skill']);

    expect(FrameworkResolver.prototype.resolve).toHaveBeenCalledWith('/cwd', undefined);
    expect(mockAdapter.getInstallationPath).toHaveBeenCalledWith(Scope.Workspace, '/cwd');
    expect(SkillInstaller.prototype.installFromUrl).toHaveBeenCalledWith('https://github.com/test/skill', '/mock/path/@test/skill');
  });

  it('should accept --agent and --scope flags', async () => {
    const program = createProgram();
    program.exitOverride();
    
    const mockAdapter = {
      name: 'claude',
      getInstallationPath: vi.fn().mockResolvedValue('/mock/path'),
      getPostInstallInstructions: vi.fn().mockReturnValue('Done.'),
    };

    (FrameworkResolver.prototype.resolve as any).mockResolvedValue(mockAdapter);
    (SkillInstaller.prototype.installFromUrl as any).mockResolvedValue(undefined);

    await program.parseAsync(['node', 'test', 'install', 'test-skill', '--agent', 'claude', '--scope', 'user']);

    expect(FrameworkResolver.prototype.resolve).toHaveBeenCalledWith(expect.any(String), 'claude');
    expect(mockAdapter.getInstallationPath).toHaveBeenCalledWith(Scope.User, expect.any(String));
    expect(prompts.select).not.toHaveBeenCalled();
  });

  it('should prompt for scope if not provided', async () => {
    const program = createProgram();
    program.exitOverride();

    const mockAdapter = {
      name: 'gemini',
      getInstallationPath: vi.fn().mockResolvedValue('/mock/path'),
      getPostInstallInstructions: vi.fn().mockReturnValue('Done.'),
    };
    (FrameworkResolver.prototype.resolve as any).mockResolvedValue(mockAdapter);
    (SkillInstaller.prototype.installFromUrl as any).mockResolvedValue(undefined);
    
    // Mock user selecting 'user' scope
    (prompts.select as any).mockResolvedValue('user');

    await program.parseAsync(['node', 'test', 'install', 'test-skill']);

    expect(prompts.select).toHaveBeenCalled();
    expect(mockAdapter.getInstallationPath).toHaveBeenCalledWith(Scope.User, expect.any(String));
  });
});
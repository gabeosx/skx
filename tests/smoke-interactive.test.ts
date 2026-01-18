import { describe, it, expect, vi, beforeEach } from 'vitest';
import { startInteractiveMode } from '../src/ui';
import * as wizard from '../src/wizard';
import * as installer from '../src/utils/skill-installer';
import { Scope } from '../src/types/adapter';
import * as clack from '@clack/prompts';

vi.mock('../src/wizard');
vi.mock('../src/utils/skill-installer');
vi.mock('@clack/prompts');

describe('Interactive Mode Smoke Test', () => {
  let mockInstall: any;

  beforeEach(() => {
    vi.resetAllMocks();
    (clack.spinner as any).mockReturnValue({
      start: vi.fn(),
      stop: vi.fn(),
      message: vi.fn(),
    });
    
    // Setup SkillInstaller mock
    mockInstall = vi.fn().mockResolvedValue(undefined);
    (installer.SkillInstaller as any).mockImplementation(class {
      install = (...args: any[]) => {
        console.log('Mock install called with:', args);
        return mockInstall(...args);
      };
      installFromUrl = (...args: any[]) => {
        console.log('Mock installFromUrl called with:', args);
        return mockInstall(...args);
      };
    });
  });

  it('should run wizard and install skill', async () => {
    const mockSkill = { name: 'smoke-skill', packageName: 'smoke-pkg', description: 'desc', githubRepoUrl: 'url' };
    const mockAdapter = {
      name: 'smoke-agent',
      detect: vi.fn(),
      getInstallationPath: vi.fn().mockResolvedValue('/tmp/smoke'),
      getPostInstallInstructions: vi.fn().mockReturnValue('Smoke Done.'),
    };

    vi.mocked(wizard.runWizard).mockResolvedValue({
      skill: mockSkill,
      agent: mockAdapter as any,
      scope: Scope.Workspace,
    });

    await startInteractiveMode();

    expect(wizard.runWizard).toHaveBeenCalled();
    expect(mockAdapter.getInstallationPath).toHaveBeenCalledWith(Scope.Workspace, expect.any(String));
    
    expect(mockInstall).toHaveBeenCalled();
  });
});

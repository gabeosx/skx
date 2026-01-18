import { describe, it, expect, vi, beforeEach } from 'vitest';
import { startInteractiveMode } from '../src/ui.js';
import * as wizard from '../src/wizard.js';
import * as clack from '@clack/prompts';
import * as installer from '../src/utils/skill-installer.js';
import { Scope } from '../src/types/adapter.js';

vi.mock('@clack/prompts');
vi.mock('../src/wizard.js');
vi.mock('../src/utils/skill-installer.js');

describe('Interactive UI', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    (installer.SkillInstaller as any).mockImplementation(class {
      install = vi.fn().mockResolvedValue(undefined);
      installFromUrl = vi.fn().mockResolvedValue(undefined);
    });
  });

  it('should run the wizard and show success message', async () => {
    const mockSkill = { name: 'test-skill', packageName: 'test-pkg', description: 'desc', githubRepoUrl: 'url' };
    const mockAdapter = { name: 'gemini', detect: vi.fn(), getInstallationPath: vi.fn().mockResolvedValue('/tmp'), getPostInstallInstructions: vi.fn().mockReturnValue('instructions') };
    
    vi.mocked(wizard.runWizard).mockResolvedValue({
      skill: mockSkill,
      agent: mockAdapter as any,
      scope: Scope.Workspace,
    });

    vi.mocked(clack.spinner).mockReturnValue({
      start: vi.fn(),
      stop: vi.fn(),
      message: vi.fn(),
    } as any);

    await startInteractiveMode();

    expect(clack.intro).toHaveBeenCalled();
    expect(wizard.runWizard).toHaveBeenCalled();
    expect(clack.outro).toHaveBeenCalled();
  });

  it('should handle cancellation in wizard', async () => {
    vi.mocked(wizard.runWizard).mockResolvedValue(undefined);
    
    const exitSpy = vi.spyOn(process, 'exit').mockImplementation(() => { throw new Error('exit'); });

    try {
      await startInteractiveMode();
    } catch (e) {
      // expected exit
    }

    expect(clack.cancel).toHaveBeenCalledWith('Installation cancelled.');
    expect(exitSpy).toHaveBeenCalledWith(0);
  });
});
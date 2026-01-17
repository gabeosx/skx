import { describe, it, expect, vi, beforeEach } from 'vitest';
import { runWizard } from '../src/wizard';
import * as skillSearch from '../src/utils/skill-search';
import { FrameworkResolver } from '../src/utils/framework-resolver';
import { ScopeResolver } from '../src/utils/scope-resolver';
import { AdapterRegistry } from '../src/utils/adapters';
import * as clack from '@clack/prompts';
import { Scope } from '../src/types/adapter';

vi.mock('@clack/prompts');
vi.mock('../src/utils/skill-search');
vi.mock('../src/utils/framework-resolver');
vi.mock('../src/utils/scope-resolver');

describe('runWizard', () => {
  const mockSkill = { name: 'test-skill', packageName: 'test-pkg', description: 'desc', githubRepoUrl: 'url' };
  const mockAdapter = { name: 'gemini', detect: vi.fn(), getInstallationPath: vi.fn(), getPostInstallInstructions: vi.fn() };

  beforeEach(() => {
    vi.resetAllMocks();
    (clack.isCancel as any).mockImplementation((val: any) => val === Symbol.for('clack-cancel'));
    AdapterRegistry.clear();
    AdapterRegistry.register(mockAdapter);
  });

  it('should complete the full wizard flow successfully', async () => {
    // 1. Skill Selection
    (skillSearch.searchAndSelectSkill as any).mockResolvedValue(mockSkill);
    
    // 2. Detection
    (FrameworkResolver.prototype.detect as any).mockResolvedValue([mockAdapter]);
    (ScopeResolver.prototype.resolve as any).mockResolvedValue(Scope.Workspace);
    
    // 3. Prompt selection (accepting defaults)
    (clack.select as any)
      .mockResolvedValueOnce(mockAdapter) // Agent selection (pre-selected gemini)
      .mockResolvedValueOnce(Scope.Workspace); // Scope selection (pre-selected workspace)
    
    // 4. Confirmation
    (clack.confirm as any).mockResolvedValue(true);
    
    const result = await runWizard();
    
    expect(result).toEqual({
      skill: mockSkill,
      agent: mockAdapter,
      scope: Scope.Workspace,
    });
    
    expect(clack.confirm).toHaveBeenCalled();
  });

  it('should return undefined if user cancels at any step', async () => {
    (skillSearch.searchAndSelectSkill as any).mockResolvedValue(undefined); // Cancel at search
    
    const result = await runWizard();
    expect(result).toBeUndefined();
  });
});

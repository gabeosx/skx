import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SkillManager } from '../src/utils/skill-manager';
import { AdapterRegistry } from '../src/utils/adapters';
import { Scope } from '../src/types/adapter';

vi.mock('../src/utils/adapters');

describe('SkillManager', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should detect skills from all adapters', async () => {
    const mockAdapter1 = {
      name: 'agent1',
      listSkills: vi.fn().mockResolvedValue(['skill1']),
    };
    const mockAdapter2 = {
      name: 'agent2',
      listSkills: vi.fn().mockResolvedValue(['skill2']),
    };

    (AdapterRegistry.getAll as any).mockReturnValue([mockAdapter1, mockAdapter2]);

    const manager = new SkillManager();
    const result = await manager.detectInstalledSkills();

    // Verify results
    // listSkills called for Workspace and User by default
    expect(result.get('agent1 - workspace')).toEqual(['skill1']);
    expect(result.get('agent1 - user')).toEqual(['skill1']);
    expect(result.get('agent2 - workspace')).toEqual(['skill2']);
    expect(result.get('agent2 - user')).toEqual(['skill2']);
    
    expect(mockAdapter1.listSkills).toHaveBeenCalledWith(Scope.Workspace, expect.any(String));
    expect(mockAdapter1.listSkills).toHaveBeenCalledWith(Scope.User, expect.any(String));
  });

  it('should filter by agent', async () => {
    const mockAdapter1 = {
      name: 'agent1',
      listSkills: vi.fn().mockResolvedValue(['skill1']),
    };
    const mockAdapter2 = {
      name: 'agent2',
      listSkills: vi.fn().mockResolvedValue(['skill2']),
    };

    (AdapterRegistry.getAll as any).mockReturnValue([mockAdapter1, mockAdapter2]);

    const manager = new SkillManager();
    const result = await manager.detectInstalledSkills({ agent: 'agent1' });

    expect(result.has('agent1 - workspace')).toBe(true);
    expect(result.has('agent2 - workspace')).toBe(false);
    expect(mockAdapter2.listSkills).not.toHaveBeenCalled();
  });

  it('should filter by scope', async () => {
    const mockAdapter1 = {
      name: 'agent1',
      listSkills: vi.fn().mockResolvedValue(['skill1']),
    };

    (AdapterRegistry.getAll as any).mockReturnValue([mockAdapter1]);

    const manager = new SkillManager();
    const result = await manager.detectInstalledSkills({ scope: 'user' });

    expect(result.has('agent1 - user')).toBe(true);
    expect(result.has('agent1 - workspace')).toBe(false);
    expect(mockAdapter1.listSkills).toHaveBeenCalledWith(Scope.User, expect.any(String));
    expect(mockAdapter1.listSkills).not.toHaveBeenCalledWith(Scope.Workspace, expect.any(String));
  });
});

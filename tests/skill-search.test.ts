import { describe, it, expect, vi, beforeEach } from 'vitest';
import { searchAndSelectSkill } from '../src/utils/skill-search';
import * as registry from '../src/utils/registry';
import * as clack from '@clack/prompts';

const CANCEL_SYMBOL = Symbol('clack-cancel');

vi.mock('@clack/prompts', () => ({
  text: vi.fn(),
  select: vi.fn(),
  isCancel: vi.fn(),
  cancel: vi.fn(),
}));

vi.mock('../src/utils/registry', () => ({
  fetchRegistry: vi.fn(),
}));

const mockSkills = [
  { name: 'skill1', description: 'desc1', packageName: 'pkg1', githubRepoUrl: 'url1' },
  { name: 'skill2', description: 'desc2', packageName: 'pkg2', githubRepoUrl: 'url2' },
];

describe('searchAndSelectSkill', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    (registry.fetchRegistry as any).mockResolvedValue(mockSkills);
    (clack.isCancel as any).mockImplementation((val: any) => val === CANCEL_SYMBOL);
  });

  it('should return selected skill on success', async () => {
    (clack.text as any).mockResolvedValue('skill1');
    (clack.select as any).mockResolvedValue(mockSkills[0]);
    
    const result = await searchAndSelectSkill();
    
    expect(result).toEqual(mockSkills[0]);
  });

  it('should return undefined on cancel', async () => {
    (clack.text as any).mockResolvedValue(CANCEL_SYMBOL);
    
    const result = await searchAndSelectSkill();
    
    expect(result).toBeUndefined();
  });

  it('should loop if "search_again" is selected', async () => {
    (clack.text as any)
      .mockResolvedValueOnce('skill')
      .mockResolvedValueOnce('skill2');
    
    (clack.select as any)
      .mockResolvedValueOnce('search_again')
      .mockResolvedValueOnce(mockSkills[1]);
    
    const result = await searchAndSelectSkill();
    
    expect(result).toEqual(mockSkills[1]);
    expect(clack.text).toHaveBeenCalledTimes(2);
  });
});
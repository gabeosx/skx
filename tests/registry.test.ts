import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import { fetchRegistry, RegistrySchema, type Skill } from '../src/utils/registry.js';
import { z } from 'zod';

vi.mock('axios');

describe('Registry Utils', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  const mockSkills: Skill[] = [
    {
      name: 'test-skill',
      packageName: 'test-pkg',
      description: 'A test skill',
      githubRepoUrl: 'https://github.com/test',
      tags: ['test'],
    },
  ];

  const mockRegistryResponse = mockSkills; // Top-level array

  it('should validate a correct registry schema', () => {
    const result = RegistrySchema.safeParse(mockRegistryResponse);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toHaveLength(1);
      expect(result.data[0].name).toBe('test-skill');
    }
  });

  it('should fail validation for incorrect schema', () => {
    const invalidData = [
      { name: 'test-skill' }, // missing required fields
    ];
    const result = RegistrySchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it('should fetch and parse the registry successfully', async () => {
    vi.mocked(axios.get).mockResolvedValue({
      data: mockRegistryResponse,
    });

    const skills = await fetchRegistry();
    expect(skills).toHaveLength(1);
    expect(skills[0].name).toBe('test-skill');
    expect(axios.get).toHaveBeenCalledWith(
      expect.stringContaining('skills.json')
    );
  });

  it('should handle fetch errors', async () => {
    vi.mocked(axios.get).mockRejectedValue(new Error('Network Error'));

    await expect(fetchRegistry()).rejects.toThrow('Failed to fetch registry');
  });

  it('should handle validation errors during fetch', async () => {
    vi.mocked(axios.get).mockResolvedValue({
      data: { skills: [{ invalid: 'data' }] },
    });

    await expect(fetchRegistry()).rejects.toThrow('Invalid registry format');
  });
});

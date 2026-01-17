import { describe, it, expect } from 'vitest';
import { searchSkills } from '../src/utils/search.js';
import { type Skill } from '../src/utils/registry.js';

describe('Search Utils', () => {
  const mockSkills: Skill[] = [
    {
      name: 'react-agent',
      description: 'An agent for React development',
      command: 'react',
      tags: ['react', 'frontend'],
      author: 'user1',
      version: '1.0.0',
    },
    {
      name: 'node-helper',
      description: 'Helper for Node.js',
      command: 'node',
      tags: ['backend'],
      author: 'user2',
      version: '1.0.0',
    },
    {
      name: 'python-script',
      description: 'Run python scripts',
      command: 'python',
      tags: ['scripting'],
      author: 'user1',
      version: '1.0.0',
    },
  ];

  it('should find skills by name', () => {
    const results = searchSkills(mockSkills, 'react');
    expect(results).toHaveLength(1);
    expect(results[0].name).toBe('react-agent');
  });

  it('should find skills by description', () => {
    const results = searchSkills(mockSkills, 'development');
    expect(results).toHaveLength(1);
    expect(results[0].name).toBe('react-agent');
  });

  it('should be case-insensitive', () => {
    const results = searchSkills(mockSkills, 'REACT');
    expect(results).toHaveLength(1);
    expect(results[0].name).toBe('react-agent');
  });

  it('should return empty array if no matches', () => {
    const results = searchSkills(mockSkills, 'missing');
    expect(results).toHaveLength(0);
  });

  it('should return all skills if query is empty', () => {
    const results = searchSkills(mockSkills, '');
    expect(results).toHaveLength(3);
  });
});

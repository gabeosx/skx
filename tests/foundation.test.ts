
import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Project Foundation', () => {
  it('should have a .gitignore file', () => {
    const gitignorePath = path.resolve(__dirname, '../.gitignore');
    expect(fs.existsSync(gitignorePath)).toBe(true);
  });

  it('should ignore node_modules in .gitignore', () => {
    const gitignorePath = path.resolve(__dirname, '../.gitignore');
    if (fs.existsSync(gitignorePath)) {
      const content = fs.readFileSync(gitignorePath, 'utf-8');
      expect(content).toContain('node_modules');
    }
  });
});

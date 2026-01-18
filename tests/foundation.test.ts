
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

  it('should have a README.md file', () => {
    const readmePath = path.resolve(__dirname, '../README.md');
    expect(fs.existsSync(readmePath)).toBe(true);
  });

  it('should have correct sections in README.md', () => {
    const readmePath = path.resolve(__dirname, '../README.md');
    if (fs.existsSync(readmePath)) {
      const content = fs.readFileSync(readmePath, 'utf-8');
      expect(content).toContain('# skx');
      expect(content).toContain('Installation');
      expect(content).toContain('Usage');
    }
  });
});

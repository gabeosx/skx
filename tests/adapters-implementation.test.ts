import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GeminiAdapter } from '../src/adapters/gemini';
import { ClaudeAdapter } from '../src/adapters/claude';
import { CodexAdapter } from '../src/adapters/codex';
import { Scope } from '../src/types/adapter';
import fs from 'fs-extra';
import path from 'path';
import os from 'os';

vi.mock('fs-extra');
vi.mock('os');

describe('Adapters Implementation', () => {
  const cwd = '/cwd';
  const homedir = '/home/user';

  beforeEach(() => {
    vi.resetAllMocks();
    (os.homedir as any).mockReturnValue(homedir);
  });

  const adapters = [
    { name: 'Gemini', instance: new GeminiAdapter(), workspacePath: '/cwd/.gemini/skills', userPath: '/home/user/.gemini/skills' },
    { name: 'Claude', instance: new ClaudeAdapter(), workspacePath: '/cwd/.claude/skills', userPath: '/home/user/.claude/skills' }, // Note: Claude prefers .claude over .github if both/neither, or checks. Mock pathExists needed.
    { name: 'Codex', instance: new CodexAdapter(), workspacePath: '/cwd/.github/skills', userPath: '/home/user/.copilot/skills' },
  ];

  adapters.forEach(({ name, instance, workspacePath, userPath }) => {
    describe(`${name}Adapter`, () => {
      describe('listSkills', () => {
        it('should list simple skills in workspace scope', async () => {
            // Setup for Claude/Codex detection logic if needed
            (fs.pathExists as any).mockResolvedValue(true); // Assume paths exist

            const mockDirents = [
                { name: 'skill-a', isDirectory: () => true },
                { name: 'skill-b', isDirectory: () => true },
                { name: 'README.md', isDirectory: () => false },
            ];
            (fs.readdir as any).mockResolvedValue(mockDirents);

            const skills = await instance.listSkills(Scope.Workspace, cwd);

            expect(fs.readdir).toHaveBeenCalledWith(expect.stringContaining(path.basename(workspacePath)), { withFileTypes: true });
            expect(skills).toEqual(['skill-a', 'skill-b']);
        });

        it('should handle scoped skills', async () => {
            (fs.pathExists as any).mockResolvedValue(true);

            // First level: @scope, skill-a
            const rootDirents = [
                { name: '@scope', isDirectory: () => true },
                { name: 'skill-a', isDirectory: () => true },
            ];
            
            // Second level: @scope -> scoped-skill
            const scopeDirents = [
                { name: 'scoped-skill', isDirectory: () => true },
            ];

            (fs.readdir as any).mockImplementation(async (p: string) => {
                if (p.endsWith('@scope')) return scopeDirents;
                return rootDirents;
            });

            const skills = await instance.listSkills(Scope.Workspace, cwd);
            
            expect(skills).toContain('skill-a');
            expect(skills).toContain('@scope/scoped-skill');
        });

        it('should return empty array if directory does not exist', async () => {
            (fs.pathExists as any).mockResolvedValue(false);
            const skills = await instance.listSkills(Scope.Workspace, cwd);
            expect(skills).toEqual([]);
        });
      });

      describe('uninstallSkill', () => {
        it('should remove the skill directory', async () => {
             // Setup for path resolution
             (fs.pathExists as any).mockResolvedValue(true);
             
             await instance.uninstallSkill(Scope.Workspace, 'my-skill', cwd);
             
             // We verify that fs.remove was called with a path ending in the skill name
             expect(fs.remove).toHaveBeenCalledWith(expect.stringMatching(/my-skill$/));
        });

        it('should remove scoped skill directory', async () => {
            (fs.pathExists as any).mockResolvedValue(true);
            
            await instance.uninstallSkill(Scope.Workspace, '@scope/my-skill', cwd);
            
            // Should remove .../@scope/my-skill
            // On windows this might be backslash, assume posix for regex or handle logic
            // expect.stringContaining handles substrings.
            expect(fs.remove).toHaveBeenCalledWith(expect.stringContaining('@scope/my-skill'));
       });
      });
    });
  });
});
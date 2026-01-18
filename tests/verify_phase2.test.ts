import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { createProgram } from '../src/cli';
import fs from 'fs-extra';
import path from 'path';
import { GeminiAdapter } from '../src/adapters/gemini';
import { AdapterRegistry } from '../src/utils/adapters';

describe('Phase 2 Manual Verification Script', () => {
  const cwd = process.cwd();
  const testSkillName = 'test-phase2-skill';
  const testSkillPath = path.join(cwd, '.gemini', 'skills', testSkillName);
  let consoleLogSpy: any;

  beforeAll(async () => {
    // 1. Setup: Create dummy skill
    await fs.ensureDir(testSkillPath);
    await fs.writeFile(path.join(testSkillPath, 'index.js'), 'console.log("hello phase 2")');
    
    // 2. Register Adapter
    AdapterRegistry.register(new GeminiAdapter());

    // Spy on console.log to capture output
    consoleLogSpy =  vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterAll(async () => {
    // Cleanup just in case
    await fs.remove(path.join(cwd, '.gemini'));
    consoleLogSpy.mockRestore();
  });

  it('should list the installed skill', async () => {
    const program = createProgram();
    program.exitOverride();

    // Execute "skx list"
    await program.parseAsync(['node', 'skx', 'list']);

    // Check output for the skill name
    let found = false;
    for (const call of consoleLogSpy.mock.calls) {
        if (call[0].includes(testSkillName)) {
            found = true;
            break;
        }
    }
    expect(found).toBe(true);
  });

  it('should uninstall the skill', async () => {
    const program = createProgram();
    program.exitOverride();

    // Execute "skx uninstall test-phase2-skill --agent gemini --scope workspace"
    await program.parseAsync(['node', 'skx', 'uninstall', testSkillName, '--agent', 'gemini', '--scope', 'workspace']);

    // Verify file is gone
    const exists = await fs.pathExists(testSkillPath);
    expect(exists).toBe(false);
  });
});

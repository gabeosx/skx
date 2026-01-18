import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { SkillManager } from '../src/utils/skill-manager';
import fs from 'fs-extra';
import path from 'path';
import { GeminiAdapter } from '../src/adapters/gemini';
import { AdapterRegistry } from '../src/utils/adapters';

describe('Phase 1 Manual Verification Script', () => {
  const cwd = process.cwd();
  const testSkillName = 'test-phase1-skill';
  const testSkillPath = path.join(cwd, '.gemini', 'skills', testSkillName);

  beforeAll(async () => {
    // 1. Setup: Create dummy skill
    await fs.ensureDir(testSkillPath);
    await fs.writeFile(path.join(testSkillPath, 'index.js'), 'console.log("hello")');
    
    // 2. Register Adapter
    AdapterRegistry.register(new GeminiAdapter());
  });

  afterAll(async () => {
    // 4. Cleanup
    await fs.remove(path.join(cwd, '.gemini'));
  });

  it('should detect the manually created skill', async () => {
    // 3. Detect
    const manager = new SkillManager();
    const results = await manager.detectInstalledSkills();

    console.log('Results:', results);

    const geminiSkills = results.get('gemini - workspace');
    expect(geminiSkills).toBeDefined();
    expect(geminiSkills).toContain(testSkillName);
  });
});

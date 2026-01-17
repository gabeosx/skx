import { SkillInstaller } from './src/utils/skill-installer';
import fs from 'fs-extra';
import path from 'path';

async function main() {
  const installer = new SkillInstaller();
  const tmpDir = path.join(process.cwd(), 'tmp-verify-install');
  const sourceDir = path.join(tmpDir, 'source');
  const targetDir = path.join(tmpDir, 'target', 'my-skill');

  console.log('Setting up temporary directories...');
  await fs.ensureDir(sourceDir);
  await fs.writeFile(path.join(sourceDir, 'index.js'), 'console.log("hello world");');

  console.log(`Installing from ${sourceDir} to ${targetDir}...`);
  try {
    await installer.install(sourceDir, targetDir);
    
    const exists = await fs.pathExists(path.join(targetDir, 'index.js'));
    if (exists) {
      console.log('SUCCESS: Skill installed successfully.');
    } else {
      console.error('FAILURE: Skill files not found in target.');
    }
  } catch (error) {
    console.error(`FAILURE: Installation failed: ${(error as Error).message}`);
  } finally {
    console.log('Cleaning up...');
    await fs.remove(tmpDir);
  }
}

main().catch(console.error);

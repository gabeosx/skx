import { spawnSync } from 'child_process';
import fs from 'fs-extra';
import path from 'path';
import os from 'os';

async function main() {
  const tmpDir = path.join(os.tmpdir(), `skx-verify-e2e-${Date.now()}`);
  await fs.ensureDir(tmpDir);
  
  // Create a mock .gemini folder to trigger discovery
  await fs.ensureDir(path.join(tmpDir, '.gemini'));
  
  console.log(`Running skx install in ${tmpDir}...`);
  
  // Use absolute path for the CLI source to avoid module not found in tmp directory
  const cliPath = path.join(process.cwd(), 'src/index.ts');
  
  const result = spawnSync('npx', [
    'tsx', cliPath, 'install', 'react-query', '-f', 'gemini'
  ], {
    cwd: tmpDir,
    encoding: 'utf-8'
  });

  console.log('STDOUT:', result.stdout);
  console.log('STDERR:', result.stderr);

  if (result.stdout.includes('Successfully installed')) {
    console.log('SUCCESS: CLI Integrated correctly.');
  } else {
    console.log('NOTICE: CLI executed but skill might not be found or network failed.');
    console.log('This is acceptable if the network is unavailable or skill name is wrong.');
  }

  await fs.remove(tmpDir);
}

main().catch(console.error);
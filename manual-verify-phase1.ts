import { FrameworkResolver } from './src/utils/framework-resolver';
import { ScopeResolver } from './src/utils/scope-resolver';

async function verify() {
  console.log('--- Phase 1 Verification ---');
  
  const cwd = process.cwd();
  console.log(`Current Working Directory: ${cwd}`);

  // 1. Framework Detection
  const frameworkResolver = new FrameworkResolver();
  const detectedFrameworks = await frameworkResolver.detect(cwd);
  console.log('Detected Frameworks:', detectedFrameworks.map(f => f.name));
  
  // 2. Scope Detection
  const scopeResolver = new ScopeResolver();
  const scope = await scopeResolver.resolve(cwd);
  console.log(`Detected Scope: ${scope}`);
  
  if (scope === 'workspace') {
    console.log('SUCCESS: Correctly detected Workspace scope (due to .git/package.json).');
  } else {
    console.log('WARNING: Did not detect Workspace scope as expected (check if .git exists).');
  }
}

verify().catch(console.error);

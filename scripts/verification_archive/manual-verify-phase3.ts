import { startInteractiveMode } from './src/ui';
import { AdapterRegistry } from './src/utils/adapters';
import { GeminiAdapter } from './src/adapters/gemini';
import { ClaudeAdapter } from './src/adapters/claude';
import { CodexAdapter } from './src/adapters/codex';

// Mocking process.exit to avoid terminating the verify script prematurely if user cancels
const originalExit = process.exit;
(process as any).exit = (code?: number) => {
  console.log(`\n[Process would exit with code ${code}]`);
  return undefined as never;
};

async function verify() {
  console.log('--- Phase 3 Verification ---');
  
  // Register Adapters
  AdapterRegistry.register(new GeminiAdapter());
  AdapterRegistry.register(new ClaudeAdapter());
  AdapterRegistry.register(new CodexAdapter());
  
  await startInteractiveMode();
  console.log('\n--- Verification Ended ---');
}

verify().catch(console.error).finally(() => {
  process.exit = originalExit;
});

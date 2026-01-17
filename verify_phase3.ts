import { FrameworkResolver } from './src/utils/framework-resolver';
import { AdapterRegistry } from './src/utils/adapters';
import { GeminiAdapter } from './src/adapters/gemini';
import { ClaudeAdapter } from './src/adapters/claude';
import { CodexAdapter } from './src/adapters/codex';

async function main() {
  console.log('Registering adapters...');
  AdapterRegistry.register(new GeminiAdapter());
  AdapterRegistry.register(new ClaudeAdapter());
  AdapterRegistry.register(new CodexAdapter());

  const resolver = new FrameworkResolver();
  const cwd = process.cwd();

  console.log(`\n1. Automatic Discovery in: ${cwd}`);
  try {
    const adapter = await resolver.resolve(cwd);
    console.log(`SUCCESS: Detected Framework: ${adapter.name}`);
  } catch (error) {
    console.log(`NOTICE: Discovery result: ${(error as Error).message}`);
    console.log('(This is expected if no framework folders like .gemini or .claude exist in root)');
  }
  
  console.log('\n2. Explicit Resolution (gemini)');
  try {
    const adapter = await resolver.resolve(cwd, 'gemini');
    console.log(`SUCCESS: Resolved Framework: ${adapter.name}`);
  } catch (error) {
     console.error(`FAILURE: Explicit resolution failed: ${(error as Error).message}`);
  }
}

main().catch(console.error);

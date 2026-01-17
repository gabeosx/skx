import { AgentFrameworkAdapter } from '../types/adapter';
import { AdapterRegistry } from './adapters';
import { select, isCancel, cancel } from '@clack/prompts';

export class FrameworkResolver {
  async detect(cwd: string): Promise<AgentFrameworkAdapter[]> {
    const adapters = AdapterRegistry.getAll();
    const detectedAdapters: AgentFrameworkAdapter[] = [];

    for (const adapter of adapters) {
      if (await adapter.detect(cwd)) {
        detectedAdapters.push(adapter);
      }
    }
    return detectedAdapters;
  }

  async resolve(cwd: string, explicitName?: string): Promise<AgentFrameworkAdapter> {
    // 1. Explicit Selection
    if (explicitName) {
      const adapter = AdapterRegistry.get(explicitName);
      if (!adapter) {
        throw new Error(`Framework '${explicitName}' is not supported or registered.`);
      }
      return adapter;
    }

    // 2. Automatic Discovery
    const detectedAdapters = await this.detect(cwd);

    // 3. Handle Results
    if (detectedAdapters.length === 0) {
      throw new Error('No AI agent framework detected in the current directory.');
    }

    if (detectedAdapters.length === 1) {
      return detectedAdapters[0];
    }

    // 4. Conflict Resolution
    const selection = await select({
      message: 'Multiple AI agent frameworks detected. Please select one:',
      options: detectedAdapters.map((adapter) => ({
        value: adapter,
        label: adapter.name,
      })),
    });

    if (isCancel(selection)) {
      cancel('Operation cancelled.');
      // In a real CLI app, we might exit. 
      // But for the resolver function, throwing an error is cleaner so the caller can handle it.
      // However, the test expects 'Operation cancelled' error or behavior.
      // The `cancel` function from clack prints a message. It does NOT exit the process (unless configured?).
      // Wait, checking clack docs or source is hard. 
      // Usually `cancel` just prints. 
      // I should throw an error to stop execution.
      throw new Error('Operation cancelled');
    }

    return selection as AgentFrameworkAdapter;
  }
}
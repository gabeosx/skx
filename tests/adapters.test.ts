import { describe, it, expect, beforeEach } from 'vitest';
import { AdapterRegistry } from '../src/utils/adapters';
import { type AgentFrameworkAdapter, Scope } from '../src/types/adapter';

describe('AdapterRegistry', () => {
  beforeEach(() => {
    AdapterRegistry.clear();
  });

  it('should register and retrieve adapters', () => {
    const mockAdapter: AgentFrameworkAdapter = {
      name: 'mock',
      detect: async () => true,
      getInstallationPath: async () => 'path',
      getPostInstallInstructions: () => 'instr',
    };

    AdapterRegistry.register(mockAdapter);
    
    const adapters = AdapterRegistry.getAll();
    expect(adapters).toHaveLength(1);
    expect(adapters[0]).toBe(mockAdapter);
    
    const retrieved = AdapterRegistry.get('mock');
    expect(retrieved).toBe(mockAdapter);
  });

  it('should return undefined for unknown adapter', () => {
    const retrieved = AdapterRegistry.get('unknown');
    expect(retrieved).toBeUndefined();
  });
});

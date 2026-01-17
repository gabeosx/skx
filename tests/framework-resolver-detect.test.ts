import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { FrameworkResolver } from '../src/utils/framework-resolver';
import { AdapterRegistry } from '../src/utils/adapters';
import { AgentFrameworkAdapter } from '../src/types/adapter';

// Mock Adapter implementations
const mockGeminiAdapter: AgentFrameworkAdapter = {
  name: 'gemini',
  detect: vi.fn(),
  getInstallationPath: vi.fn(),
  getPostInstallInstructions: vi.fn(),
};

const mockClaudeAdapter: AgentFrameworkAdapter = {
  name: 'claude',
  detect: vi.fn(),
  getInstallationPath: vi.fn(),
  getPostInstallInstructions: vi.fn(),
};

describe('FrameworkResolver - detect', () => {
  beforeEach(() => {
    AdapterRegistry.clear();
    vi.resetAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return all detected adapters', async () => {
    AdapterRegistry.register(mockGeminiAdapter);
    AdapterRegistry.register(mockClaudeAdapter);
    
    (mockGeminiAdapter.detect as any).mockResolvedValue(true);
    (mockClaudeAdapter.detect as any).mockResolvedValue(true);
    
    const resolver = new FrameworkResolver();
    const result = await resolver.detect('/tmp');
    
    expect(result).toHaveLength(2);
    expect(result).toContain(mockGeminiAdapter);
    expect(result).toContain(mockClaudeAdapter);
  });

  it('should return empty array if no adapters detected', async () => {
    AdapterRegistry.register(mockGeminiAdapter);
    (mockGeminiAdapter.detect as any).mockResolvedValue(false);
    
    const resolver = new FrameworkResolver();
    const result = await resolver.detect('/tmp');
    
    expect(result).toHaveLength(0);
  });
  
  it('should not throw if no adapters are found (unlike resolve)', async () => {
     const resolver = new FrameworkResolver();
     await expect(resolver.detect('/tmp')).resolves.toEqual([]);
  });
});

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { FrameworkResolver } from '../src/utils/framework-resolver';
import { AdapterRegistry } from '../src/utils/adapters';
import { AgentFrameworkAdapter, Scope } from '../src/types/adapter';
import * as clackPrompts from '@clack/prompts';

// Mock @clack/prompts
vi.mock('@clack/prompts', () => ({
  select: vi.fn(),
  isCancel: vi.fn(),
  cancel: vi.fn(),
}));

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

describe('FrameworkResolver', () => {
  beforeEach(() => {
    AdapterRegistry.clear();
    vi.resetAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return the explicit framework if provided and it exists', async () => {
    AdapterRegistry.register(mockGeminiAdapter);
    
    const resolver = new FrameworkResolver();
    const result = await resolver.resolve('/tmp', 'gemini');
    
    expect(result).toBe(mockGeminiAdapter);
  });

  it('should throw error if explicit framework is not registered', async () => {
    const resolver = new FrameworkResolver();
    
    await expect(resolver.resolve('/tmp', 'missing')).rejects.toThrow(
      "Framework 'missing' is not supported or registered."
    );
  });

  it('should detect framework from cwd if no explicit framework provided', async () => {
    AdapterRegistry.register(mockGeminiAdapter);
    AdapterRegistry.register(mockClaudeAdapter);
    
    // Setup detect mocks
    (mockGeminiAdapter.detect as any).mockResolvedValue(true);
    (mockClaudeAdapter.detect as any).mockResolvedValue(false);
    
    const resolver = new FrameworkResolver();
    const result = await resolver.resolve('/tmp');
    
    expect(result).toBe(mockGeminiAdapter);
    expect(mockGeminiAdapter.detect).toHaveBeenCalledWith('/tmp');
  });

  it('should prompt user if multiple frameworks are detected', async () => {
    AdapterRegistry.register(mockGeminiAdapter);
    AdapterRegistry.register(mockClaudeAdapter);
    
    // Both detect true
    (mockGeminiAdapter.detect as any).mockResolvedValue(true);
    (mockClaudeAdapter.detect as any).mockResolvedValue(true);
    
    // Mock user selection
    (clackPrompts.select as any).mockResolvedValue(mockClaudeAdapter);
    
    const resolver = new FrameworkResolver();
    const result = await resolver.resolve('/tmp');
    
    expect(clackPrompts.select).toHaveBeenCalled();
    expect(result).toBe(mockClaudeAdapter);
  });

  it('should handle user cancellation during conflict resolution', async () => {
    AdapterRegistry.register(mockGeminiAdapter);
    AdapterRegistry.register(mockClaudeAdapter);
    
    (mockGeminiAdapter.detect as any).mockResolvedValue(true);
    (mockClaudeAdapter.detect as any).mockResolvedValue(true);
    
    // Mock user cancellation
    (clackPrompts.select as any).mockResolvedValue('cancelled_symbol');
    (clackPrompts.isCancel as any).mockReturnValue(true);
    
    const resolver = new FrameworkResolver();
    
    // Since process.exit is often called on cancel, we might want to check how we handle it.
    // For now, let's assume it throws or returns null/undefined if we designed it that way.
    // Given the prompt implementation in ui.ts calls process.exit, we might need to mock that behavior 
    // or expect the resolver to throw.
    
    // Let's assume the resolver throws a specific error "Operation cancelled"
    await expect(resolver.resolve('/tmp')).rejects.toThrow('Operation cancelled');
    expect(clackPrompts.cancel).toHaveBeenCalled();
  });

  it('should throw error if no framework is detected', async () => {
    AdapterRegistry.register(mockGeminiAdapter);
    (mockGeminiAdapter.detect as any).mockResolvedValue(false);
    
    const resolver = new FrameworkResolver();
    
    await expect(resolver.resolve('/tmp')).rejects.toThrow(
      'No AI agent framework detected in the current directory.'
    );
  });
});

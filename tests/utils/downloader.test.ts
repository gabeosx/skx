import { describe, it, expect, vi, beforeEach } from 'vitest';
// We are TDDing, so this import will fail initially or we need to create the empty file.
// Ideally for "Red" phase in strict TDD, the test fails compilation or execution.
// I will assume I need to create the file first or the test runner will just error "Cannot find module".
// I'll stick to creating the test first.
import { Downloader } from '../../src/utils/downloader';
import tiged from 'tiged';

vi.mock('tiged', () => {
  return {
    default: vi.fn().mockReturnValue({
      clone: vi.fn().mockResolvedValue(undefined),
    }),
  };
});

describe('Downloader', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should call tiged with the correct arguments', async () => {
    const url = 'https://github.com/user/repo';
    const target = '/tmp/target';
    
    await Downloader.download(url, target);

    expect(tiged).toHaveBeenCalledWith('user/repo', expect.any(Object));
    // The specific tiged call signature depends on implementation. 
    // tiged('user/repo').clone(target) is the standard usage.
  });
});

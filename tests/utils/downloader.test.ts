import { describe, it, expect, vi, beforeEach } from 'vitest';
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
  });

  it('should handle GitHub URLs with subdirectories', async () => {
    const url = 'https://github.com/anthropics/skills/tree/main/skills/pptx';
    const target = '/tmp/target';
    
    await Downloader.download(url, target);

    expect(tiged).toHaveBeenCalledWith('anthropics/skills/skills/pptx#main', expect.any(Object));
  });

  it('should handle raw user/repo strings', async () => {
    const url = 'user/repo';
    const target = '/tmp/target';

    await Downloader.download(url, target);

    expect(tiged).toHaveBeenCalledWith('user/repo', expect.any(Object));
  });
});

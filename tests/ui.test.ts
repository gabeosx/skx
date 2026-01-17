import { describe, it, expect, vi } from 'vitest';
import { startInteractiveMode } from '../src/ui.js';
import * as clack from '@clack/prompts';
import * as registryUtils from '../src/utils/registry.js';

vi.mock('@clack/prompts');
vi.mock('../src/utils/registry.js');

describe('Interactive UI', () => {
  it('should show welcome message and prompt for search', async () => {
    // Mock clack intro and text
    vi.mocked(clack.intro).mockImplementation(() => {});
    vi.mocked(clack.text).mockResolvedValue('test query');
    vi.mocked(clack.outro).mockImplementation(() => {});
    vi.mocked(clack.isCancel).mockReturnValue(false);
    vi.mocked(clack.spinner).mockReturnValue({
      start: vi.fn(),
      stop: vi.fn(),
      message: vi.fn(),
    } as any);

    // Mock registry fetch (since search might be called)
    vi.mocked(registryUtils.fetchRegistry).mockResolvedValue([]);

    await startInteractiveMode();

    expect(clack.intro).toHaveBeenCalled();
    expect(clack.text).toHaveBeenCalledWith(expect.objectContaining({
      message: expect.stringContaining('Search'),
    }));
    expect(clack.outro).toHaveBeenCalled();
  });

  it('should handle cancellation', async () => {
    vi.mocked(clack.intro).mockImplementation(() => {});
    vi.mocked(clack.text).mockResolvedValue('cancel_symbol'); // Mock return value
    vi.mocked(clack.isCancel).mockReturnValue(true); // isCancel returns true for this value
    vi.mocked(clack.cancel).mockImplementation(() => {});
    const exitSpy = vi.spyOn(process, 'exit').mockImplementation(() => { throw new Error('exit'); });

    try {
      await startInteractiveMode();
    } catch (e) {
      // expected exit
    }

    expect(clack.cancel).toHaveBeenCalled();
    expect(exitSpy).toHaveBeenCalledWith(0);
  });
});

import tiged from 'tiged';

export class Downloader {
  static async download(url: string, targetDir: string): Promise<void> {
    // Basic parsing for now, will enhance in next task
    const source = url.replace('https://github.com/', '');
    
    const emitter = tiged(source, {
      cache: false,
      force: true,
      verbose: false,
    });

    await emitter.clone(targetDir);
  }
}

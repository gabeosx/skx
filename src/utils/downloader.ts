import tiged from 'tiged';

export class Downloader {
  static async download(url: string, targetDir: string): Promise<void> {
    const source = this.parseUrl(url);
    
    // @ts-ignore
    const emitter = tiged(source, {
      cache: false,
      force: true,
      verbose: false,
    });

    await emitter.clone(targetDir);
  }

  private static parseUrl(url: string): string {
    const cleanUrl = url.replace('https://github.com/', '');
    
    if (cleanUrl.includes('/tree/')) {
        const [repoPart, rest] = cleanUrl.split('/tree/');
        if (rest) {
             const parts = rest.split('/');
             const branch = parts[0];
             const subdir = parts.slice(1).join('/');
             
             if (subdir) {
                 return `${repoPart}/${subdir}#${branch}`;
             }
             return `${repoPart}#${branch}`;
        }
    }

    return cleanUrl;
  }
}

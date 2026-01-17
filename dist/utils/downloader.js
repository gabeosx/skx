import tiged from 'tiged';
export class Downloader {
    static async download(url, targetDir) {
        const source = this.parseUrl(url);
        // @ts-ignore
        const emitter = tiged(source, {
            cache: false,
            force: true,
            verbose: false,
        });
        await emitter.clone(targetDir);
    }
    static parseUrl(url) {
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

declare module 'tiged' {
    interface TigedOptions {
        cache?: boolean;
        force?: boolean;
        verbose?: boolean;
    }

    interface TigedEmitter {
        clone(dest: string): Promise<void>;
        on(event: string, callback: (data: any) => void): void;
    }

    function tiged(source: string, options?: TigedOptions): TigedEmitter;
    export default tiged;
}

interface Logger {
    info: (...args: any[]) => void;
    warn: (...args: any[]) => void;
    error: (...args: any[]) => void;
    debug: (...args: any[]) => void;
}
export declare const LoggerFactory: {
    getLogger: (context: string) => Logger;
};
export {};

import { logToConsole } from '../../../../../../sfai_library_mjs/open/logger/sfaiLogCommon.mjs';
class ConsoleLogger {
    context;
    constructor(context) {
        this.context = context;
    }
    formatMessage(level, ...args) {
        return {
            timestamp: new Date().toISOString(),
            level: level,
            context: this.context,
            message: args.map(arg => (typeof arg === 'object' ? JSON.stringify(arg) : arg)).join(' '),
        };
    }
    info(...args) {
        logToConsole(this.formatMessage('INFO', ...args), 'INFO', true);
    }
    warn(...args) {
        logToConsole(this.formatMessage('WARNING', ...args), 'WARNING', true);
    }
    error(...args) {
        logToConsole(this.formatMessage('ERROR', ...args), 'ERROR', true);
    }
    debug(...args) {
        logToConsole(this.formatMessage('DEBUG', ...args), 'DEBUG', true);
    }
}
export const LoggerFactory = {
    getLogger: (context) => {
        return new ConsoleLogger(context);
    },
};
//# sourceMappingURL=Logger.js.map
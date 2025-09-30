import { logToConsole } from '../../../../../sfai_library_mjs/open/logger/sfaiLogCommon.mjs';

interface Logger {
  info: (...args: any[]) => void;
  warn: (...args: any[]) => void;
  error: (...args: any[]) => void;
  debug: (...args: any[]) => void;
}

class ConsoleLogger implements Logger {
  private context: string;

  constructor(context: string) {
    this.context = context;
  }

  private formatMessage(level: string, ...args: any[]): any {
    return {
      timestamp: new Date().toISOString(),
      level: level,
      context: this.context,
      message: args.map(arg => (typeof arg === 'object' ? JSON.stringify(arg) : arg)).join(' '),
    };
  }

  info(...args: any[]): void {
    logToConsole(this.formatMessage('INFO', ...args), 'INFO', true);
  }

  warn(...args: any[]): void {
    logToConsole(this.formatMessage('WARNING', ...args), 'WARNING', true);
  }

  error(...args: any[]): void {
    logToConsole(this.formatMessage('ERROR', ...args), 'ERROR', true);
  }

  debug(...args: any[]): void {
    logToConsole(this.formatMessage('DEBUG', ...args), 'DEBUG', true);
  }
}

export const LoggerFactory = {
  getLogger: (context: string): Logger => {
    return new ConsoleLogger(context);
  },
};
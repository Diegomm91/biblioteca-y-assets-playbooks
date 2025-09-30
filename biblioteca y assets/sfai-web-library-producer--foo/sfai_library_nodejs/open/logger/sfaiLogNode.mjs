import path from 'path';
import { getSafeAbsRootPath, isProductionEnvironment } from '../SfaiNodeJs.mjs';
import {
  captureStackTraceForNode,
  logToConsole
} from '../../../sfai_library_mjs/open/logger/sfaiLogCommon.mjs';

export const SfaiLogLevel = {
  INFO: 'info',
  ERROR: 'error',
  WARNING: 'warning',
  DEBUG: 'debug'
};

export const shouldLog = (level) => {
  if (isProductionEnvironment()) {
    return (
      level === SfaiLogLevel.ERROR ||
      level === SfaiLogLevel.WARNING ||
      level === SfaiLogLevel.INFO
    );
  }

  return true;
};

const sfaiLogNodeImpl = (feature, message, level = 'INFO', metadata, enabled = false) => {
  const timestamp = new Date().toISOString();

  // Capturar el archivo desde el stack trace
  const callerFileName = captureStackTraceForNode();

  const logEntry = {
    level,
    timestamp,
    feature,
    message: `[SFAI] ${message}`,
    metadata: metadata,
    caller: `at ${callerFileName}`
  };

  logToConsole(logEntry, level, enabled && shouldLog(level));
};

export const sfaiLogNode = (
  feature,
  message,
  level = 'INFO',
  metadata,
  enabled = false
) => {
  sfaiLogNodeImpl(feature, message, level, metadata, enabled);
};

/* eslint-disable no-console */
function errorLogger(message?: unknown, ...optionalParams: unknown[]): void {
  console.error(message, ...optionalParams);
}

function infoLogger(message?: unknown, ...optionalParams: unknown[]): void {
  console.info(message, ...optionalParams);
}

function logLogger(message?: unknown, ...optionalParams: unknown[]): void {
  console.log(message, ...optionalParams);
}

function warnLogger(message?: unknown, ...optionalParams: unknown[]): void {
  console.warn(message, ...optionalParams);
}

function traceLogger(message?: unknown, ...optionalParams: unknown[]): void {
  console.trace(message, ...optionalParams);
}

function debugLogger(message?: unknown, ...optionalParams: unknown[]): void {
  console.debug(message, ...optionalParams);
}

const logger = {
  error: errorLogger,
  info: infoLogger,
  log: logLogger,
  warn: warnLogger,
  trace: traceLogger,
  debug: debugLogger,
} as const;

export { logger };

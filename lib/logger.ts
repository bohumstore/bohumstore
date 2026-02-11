type LogLevel = 'debug' | 'info' | 'warn' | 'error';

function shouldLog(level: LogLevel): boolean {
	// 운영 환경에서는 info 이상만 출력
	if (process.env.NODE_ENV === 'production') {
		return level === 'info' || level === 'warn' || level === 'error';
	}
	return true;
}

function prefix(level: LogLevel, scope?: string): string {
	const ts = new Date().toISOString();
	return scope ? `[${level.toUpperCase()}][${scope}] ${ts}` : `[${level.toUpperCase()}] ${ts}`;
}

export const logger = {
	debug(scope: string, ...args: unknown[]) {
		if (shouldLog('debug')) console.debug(prefix('debug', scope), ...args);
	},
	info(scope: string, ...args: unknown[]) {
		if (shouldLog('info')) console.info(prefix('info', scope), ...args);
	},
	warn(scope: string, ...args: unknown[]) {
		if (shouldLog('warn')) console.warn(prefix('warn', scope), ...args);
	},
	error(scope: string, ...args: unknown[]) {
		if (shouldLog('error')) console.error(prefix('error', scope), ...args);
	},
};

export default logger;



export function toKSTString(dateLike: string | number | Date): string {
	try {
		const d = new Date(dateLike);
		return d.toLocaleString('ko-KR', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit',
			hour12: false,
			timeZone: 'Asia/Seoul',
		});
	} catch {
		return String(dateLike);
	}
}

export function nowUTCISO(): string {
	return new Date().toISOString();
}



export function mbToString(mb: number): string {
	let finalStr: string;
	let suffix = 'MB';
	if (mb < 1000) {
		finalStr = mb + ` ${suffix}`;
	} else {
		suffix = 'GB';
		finalStr = parseFloat((mb / 1000).toFixed(2)) + ` ${suffix}`;
	}
	return finalStr;
}

const _SEC_PER_DAY = 60 * 60 * 24;
const _SEC_PER_HOUR = 60 * 60;
const _SEC_PER_MINUTE = 60;

export function getDateCountdown(timestamp: number): string {
	const now = Math.floor((new Date()).getTime() / 1000);

	let rtstr: string;

	const days = Math.floor((timestamp - now) / _SEC_PER_DAY);
	const hours = Math.floor((timestamp - now) / _SEC_PER_HOUR);
	const minutes = Math.floor((timestamp - now) / _SEC_PER_MINUTE);

	if (days > 0) {
		rtstr = `in ${days} day${days > 1 ? 's' : ''}`;
	} else if (hours > 0) {
		rtstr = `in ${hours} hour${hours > 1 ? 's' : ''}`;
	} else {
		rtstr = `in ${minutes} minute${minutes == 1 ? '' : 's'}`;
	}
	
	return rtstr;
}

// format milliseconds to hour:minutes:seconds

export function formatMs(ms) {
	const seconds = Math.floor(ms / 1000);
	const minutes = Math.floor(seconds / 60);

	const formattedMinutes = (minutes % 60).toString().padStart(2, '0');
	const formattedSeconds = (seconds % 60).toString().padStart(2, '0');

	return `${formattedMinutes}:${formattedSeconds}`;
}

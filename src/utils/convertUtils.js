// Convert timestamp to a readable format
const convertTimestamp = (timestamp) => {
	const parsedTime = new Date(timestamp);

	// Format the time as "YYYY-MM-DD hh:mm AM/PM"
	const formattedTime = `${parsedTime.getFullYear()}-${String(
		parsedTime.getMonth() + 1
	).padStart(2, '0')}-${String(parsedTime.getDate()).padStart(2, '0')} ${String(
		parsedTime.getHours()
	).padStart(2, '0')}:${String(parsedTime.getMinutes()).padStart(2, '0')} ${
		parsedTime.getHours() < 12 ? 'AM' : 'PM'
	}`;

	return formattedTime;
};

module.exports = {
	convertTimestamp,
};

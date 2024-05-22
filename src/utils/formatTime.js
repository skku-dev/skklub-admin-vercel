function formatTime(value) {
	const date = new Date(value);

	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();
	const hour = date.getHours() + 9;
	const minute = date.getMinutes();

	const formattedTime = `${year}-${month}-${day} ${hour}:${minute}`;
	return formattedTime;
}

export default formatTime;

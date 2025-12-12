export const API_KEY = '6ca0879f45cf47d298b75396cd8b0412';

function formatDateYYYYMMDD(date) {
	const y = date.getFullYear();
	const m = String(date.getMonth() + 1).padStart(2, "0");
	const d = String(date.getDate()).padStart(2, "0");
	return `${y}-${m}-${d}`;
}

// Use yesterday's date (current date minus 1 day) for the `from=` query param.
const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1); // the 1 here indicates yesterday

export const API_URL = `https://newsapi.org/v2/everything?q=Apple&from=${formatDateYYYYMMDD(
	yesterday
)}&sortBy=popularity&apiKey=`;
const MIN_YEAR = 2015;
const MAX_DAYS = 25;

export const isNumeric = (number: any) => {
	if (typeof number === 'number') return true;
	if (typeof number === 'string') {
		return !isNaN(parseInt(number));
	}
	return false;
};

export const isYearValid = (year: any) => {
	return isNumeric(year) && year >= MIN_YEAR && year <= new Date().getFullYear();
};

export const isDayValid = (year: any, day: any) => {
	if (!isYearValid(year) || !isNumeric(day) || day < 0 || day > MAX_DAYS) return false;
	const currentDate = new Date();
	return year < currentDate.getFullYear() || day <= currentDate.getDate();
};

export const isPartValid = (part: any) => {
	if (!isNumeric(part)) return false;
	const intPart = parseInt(part);
	return intPart === 1 || intPart === 2;
};

export const getNumberSuffix = (day: string) => {
	if (day.endsWith('1')) return 'st';
	if (day.endsWith('2')) return 'nd';
	if (day.endsWith('3')) return 'rd';
	return 'th';
};

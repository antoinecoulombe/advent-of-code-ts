import { useMemo } from 'react';

const useAocDate = () => {
	const currentDate = useMemo(() => new Date(), []);
	const currentYear = useMemo(() => currentDate.getFullYear(), [currentDate]);
	const currentMonth = useMemo(() => currentDate.getMonth(), [currentDate]);

	const firstAocYear = 2015;
	const yearsSinceStart = useMemo(() => {
		let yearCount = currentYear - firstAocYear + 1;
		if (yearCount % 2 !== 0) ++yearCount;
		return yearCount;
	}, [currentYear]);
	const yearsArray = Array.from({ length: yearsSinceStart }, (_, i) => firstAocYear + i) || [];

	const yearHasAoc = (year: number) =>
		(year === currentYear && currentMonth < 11) || year < firstAocYear || year > currentYear;

	return {
		yearsArray,
		yearHasAoc,
	};
};

export default useAocDate;

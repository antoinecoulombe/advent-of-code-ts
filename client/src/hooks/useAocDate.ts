import { useMemo } from 'react';
import { getRandomColors } from '../components/utils/Random';

const useAocDate = () => {
	const currentDate = useMemo(() => new Date(), []);
	const currentYear = useMemo(() => currentDate.getFullYear(), [currentDate]);
	const currentMonth = useMemo(() => currentDate.getMonth(), [currentDate]);

	const firstAocYear = 2015;
	const yearsSinceStart = currentYear - firstAocYear + 1;
	const yearsArray = Array.from({ length: yearsSinceStart }, (_, i) => firstAocYear + i) || [];

	const yearsColors = getRandomColors(yearsSinceStart);

	const yearHasAoc = (year: number) =>
		(year === currentYear && currentMonth < 11) || year < firstAocYear || year > currentYear;

	return {
		yearsArray,
		yearsColors,
		yearHasAoc,
	};
};

export default useAocDate;
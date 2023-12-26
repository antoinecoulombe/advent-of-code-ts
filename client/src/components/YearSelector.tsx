import React, { useCallback, useMemo } from 'react';
import _ from 'lodash';
import Squares, { SquareProps } from './Squares/Squares';
import { getRandomColors } from './utils/Random';
import { defaultSize } from './Squares/SquareStyled';
import useSquareDimensions from '../hooks/useSquareDimensions';

const YearSelector = () => {
	const currentDate = useMemo(() => new Date(), []);
	const currentYear = useMemo(() => currentDate.getFullYear(), [currentDate]);
	const currentMonth = useMemo(() => currentDate.getMonth(), [currentDate]);

	const firstAocYear = 2015;
	const yearsSince = useMemo(() => {
		const years = currentYear - firstAocYear + 1;
		if (years % 2 === 0) return years;
		return years + 1;
	}, [currentYear]);
	const years = Array.from({ length: yearsSince }, (_, i) => firstAocYear + i) || [];

	const handleClick = useCallback((year: number) => {
		console.log(year);
	}, []);

	const { containerDimensions, squaresPerRow } = useSquareDimensions({
		squaresCount: yearsSince,
		squareWidth: defaultSize,
		maxWidthPercent: 0.5,
	});
	const colors = useMemo(
		() => getRandomColors(yearsSince, squaresPerRow),
		[squaresPerRow, yearsSince]
	);

	const squares: SquareProps[] = _.map(years, (year, index) => ({
		id: year.toString(),
		text: year.toString(),
		backgroundColor: colors[index],
		disabled:
			(year === currentYear && currentMonth < 11) || year < firstAocYear || year > currentYear,
		onClick: () => handleClick(year),
	}));

	return (
		<Squares
			squares={squares}
			width={containerDimensions.width}
			height={containerDimensions.height}
		/>
	);
};

export default YearSelector;

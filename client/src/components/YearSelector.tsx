import React, { useCallback, useMemo } from 'react';
import _ from 'lodash';
import Squares, { SquareProps } from './Squares/Squares';
import { getRandomColors } from './utils/Colors';
import { defaultSize } from './Squares/SquareStyled';
import useSquareDimensions from '../hooks/useSquareDimensions';
import useAocDate from '../hooks/useAocDate';

const YearSelector = () => {
	const { yearsArray, yearHasAoc } = useAocDate();
	const { containerDimensions, squaresPerRow } = useSquareDimensions({
		squaresCount: yearsArray.length,
		squaresPadding: 30,
		squareWidth: defaultSize,
		maxWidthPercent: 0.5,
	});
	const colors = useMemo(
		() => getRandomColors(yearsArray.length, squaresPerRow),
		[squaresPerRow, yearsArray.length]
	);

	const handleClick = useCallback((year: number) => {
		console.log(year);
	}, []);

	const squares: SquareProps[] = _.map(yearsArray, (year, index) => ({
		id: year.toString(),
		text: year.toString(),
		backgroundColor: colors[index],
		disabled: yearHasAoc(year),
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

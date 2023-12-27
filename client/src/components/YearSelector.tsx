import React, { useMemo } from 'react';
import _ from 'lodash';
import Squares, { SquareProps } from './Squares/Squares';
import { getRandomColors } from './utils/Colors';
import { defaultSize } from './Squares/SquareStyled';
import useSquareDimensions from '../hooks/useSquareDimensions';
import useAocDate from '../hooks/useAocDate';

type Props = {
	onClick: (year: number | null) => void;
};

const YearSelector = ({ onClick }: Props) => {
	const { yearsArray, yearHasAoc } = useAocDate();
	const { containerDimensions, squaresPerRow } = useSquareDimensions({
		squareWidth: defaultSize,
		squaresCount: yearsArray.length,
		squaresPadding: 30,
		maxWidthPercent: 0.5,
	});
	const yearsColor = useMemo(
		() => getRandomColors(yearsArray.length, squaresPerRow),
		[squaresPerRow, yearsArray.length]
	);

	const years: SquareProps[] = useMemo(
		() =>
			_.map(yearsArray, (year, index) => ({
				id: `year-${year}`,
				text: `${year}`,
				backgroundColor: yearsColor[index],
				disabled: !yearHasAoc(year),
				onClick: () => onClick(year),
				onCancel: () => onClick(null),
			})),
		[onClick, yearsColor, yearHasAoc, yearsArray]
	);

	return (
		<Squares
			squares={years}
			width={containerDimensions.width}
			height={containerDimensions.height}
		/>
	);
};

export default YearSelector;

import React, { useCallback, useMemo } from 'react';
import _ from 'lodash';
import Squares, { SquareProps } from './Squares/Squares';
import { getRandomColors } from './utils/Colors';
import { defaultSize } from './Squares/SquareStyled';
import useSquareDimensions from '../hooks/useSquareDimensions';
import useAocDate from '../hooks/useAocDate';
import styled from '@emotion/styled';

type Props = {
	year: number;
};

const DaysContainer = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
	z-index: 1;
	pointer-events: none;
`;

const DaySelector = ({ year }: Props) => {
	const { daysArray, dayHasAoc } = useAocDate();
	const { containerDimensions, squaresPerRow } = useSquareDimensions({
		squareWidth: defaultSize,
		squaresCount: daysArray.length,
		squaresPadding: 30,
		maxWidthPercent: 0.7,
	});
	const daysColor = useMemo(
		() => getRandomColors(daysArray.length, squaresPerRow),
		[squaresPerRow, daysArray.length]
	);

	const handleClick = useCallback((day: number) => {
		// fetch problem info from server
		// call parent to show another component containing:
		//  - The puzzle explication
		//  - The puzzle code, if available
		//  - The amount of stars completed (0, 1 or 2)
		//  - The answers for each star
		//  - A link to the Aoc puzzle
	}, []);

	const days: SquareProps[] = useMemo(
		() =>
			_.map(daysArray, (day, index) => ({
				id: `day-${day}`,
				text: `${day}`,
				backgroundColor: daysColor[index],
				disabled: !dayHasAoc(year, day),
				onClick: () => handleClick(day),
			})),
		[daysArray, daysColor, dayHasAoc, year, handleClick]
	);

	return (
		<DaysContainer>
			<Squares
				squares={days}
				width={containerDimensions.width}
				height={containerDimensions.height}
			/>
		</DaysContainer>
	);
};

export default DaySelector;

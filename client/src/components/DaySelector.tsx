import React, { useCallback, useMemo } from 'react';
import _ from 'lodash';
import Squares, { SquareProps } from './Squares/Squares';
import { getRandomColors } from './utils/Colors';
import { defaultSize } from './Squares/SquareStyled';
import useSquareDimensions from '../hooks/useSquareDimensions';
import useAocDate from '../hooks/useAocDate';
import styled from '@emotion/styled';
import { Puzzle } from './PuzzleViewer';

type Props = {
	year: number;
	onClick: (puzzle: Puzzle | null) => void;
};

const DaysContainer = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
	z-index: 1;
	pointer-events: none;
`;

const DaySelector = ({ year, onClick }: Props) => {
	const { daysArray, dayHasAoc } = useAocDate();
	const { containerDimensions, squaresPerRow } = useSquareDimensions({
		squareWidth: defaultSize,
		squaresCount: daysArray.length,
		squaresPadding: 30,
		maxWidthPercent: 0.7,
		maxWidthPxAbsolute: 530,
	});
	const daysColor = useMemo(
		() => getRandomColors(daysArray.length, squaresPerRow),
		[squaresPerRow, daysArray.length]
	);

	const handleClick = useCallback(
		(day: number | null) => {
			if (!day) {
				onClick(null);
				return;
			}

			// TODO: fetch problem info from server
			onClick({ year, day, input: 'blabla', answers: {}, description: {} });
		},
		[onClick, year]
	);

	const days: SquareProps[] = useMemo(
		() =>
			_.map(daysArray, (day, index) => ({
				id: `day-${day}`,
				text: `${day}`,
				backgroundColor: daysColor[index],
				disabled: !dayHasAoc(year, day),
				onClick: () => handleClick(day),
				onCancel: () => handleClick(null),
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

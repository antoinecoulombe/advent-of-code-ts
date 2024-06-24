import React, { useCallback, useMemo } from 'react';
import _ from 'lodash';
import Squares, { SquareProps } from './squares/Squares';
import { getRandomColors } from './utils/Colors';
import { defaultSize } from './squares/SquareStyles';
import useSquareDimensions from '../hooks/useSquareDimensions';
import useAocDate from '../hooks/useAocDate';
import styled from '@emotion/styled';
import CloseButton from './CloseButton';

type Props = {
	year: {year: number, color: string};
	onClick: (props: {day: number, color: string} | null) => void;
	onClose: () => void;
};

const DaysContainer = styled.div<{color: string}>`
	position: fixed;
	width: 100%;
	height: 100%;
	z-index: 1;
	background-color: ${props => props.color};
`;

const DaySelector = ({ year, onClick, onClose }: Props) => {
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
		(day: number | null, color?: string) => {
			if (!day) {
				onClick(null);
				return;
			}

			onClick({day, color: color!});
		},
		[onClick]
	);

	const days: SquareProps[] = useMemo(
		() =>
			_.map(daysArray, (day, index) => ({
				id: `day-${day}`,
				text: `${day}`,
				backgroundColor: daysColor[index],
				disabled: !dayHasAoc(year.year, day),
				onClick: () => handleClick(day,  daysColor[index]),
				onCancel: () => handleClick(null),
			})),
		[daysArray, daysColor, dayHasAoc, year, handleClick]
	);

	return (
		<DaysContainer className={"day-selector"} color={year.color}>
			<Squares
				squares={days}
				width={containerDimensions.width}
				height={containerDimensions.height}
			/>
			<CloseButton onClick={onClose} iconColor={year.color} />
		</DaysContainer>
	);
};

export default DaySelector;

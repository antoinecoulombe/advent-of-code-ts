import React, { useMemo } from 'react';
import _ from 'lodash';
import Squares, { SquareProps } from './squares/Squares';
import { getRandomColors } from './utils/Colors';
import { defaultSize } from './squares/SquareStyles';
import useSquareDimensions from '../hooks/useSquareDimensions';
import useAocDate from '../hooks/useAocDate';
import styled from '@emotion/styled';

type Props = {
	onClick: (year: {year: number, color: string} | null) => void;
};

const YearsContainer = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
	z-index: 1;
`;

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
				onClick: () => onClick({year, color: yearsColor[index]}),
				onCancel: () => onClick(null),
			})),
		[onClick, yearsColor, yearHasAoc, yearsArray]
	);

	return (
		<YearsContainer className={"year-selector"}>
			<Squares
				squares={years}
				width={containerDimensions.width}
				height={containerDimensions.height}
			/>
		</YearsContainer>
	);
};

export default YearSelector;

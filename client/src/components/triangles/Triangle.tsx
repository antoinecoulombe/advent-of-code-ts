import styled from '@emotion/styled';
import React, { MouseEvent } from 'react';

const triangleDefaultSize = 50;
const defaultSizeMultiplier = 2;

const TriangleContainer = styled.div`
	display: inline-block;
`;

const TriangleBackground = styled.div<{
	backgroundColor: string;
	expanded: boolean;
	disabled: boolean;
	direction: 'up' | 'bottom';
}>(({ backgroundColor, expanded, disabled, direction }) => {
	const size = (expanded && !disabled ? defaultSizeMultiplier : 1) * triangleDefaultSize;
	const facingUp = direction === 'up';
	const borderColor = disabled ? '575757' : backgroundColor;

	return `
	display: block;
	width: 0;
	height: 0;

	border: ${size}px solid transparent;
	border-${facingUp ? 'top' : 'bottom'}: 0;
	border-${facingUp ? 'bottom' : 'top'}: ${size * 2}px solid #${borderColor};

	transition: 200ms linear;
`;
});

const TriangleText = styled.p<{ expanded: boolean; disabled: boolean; direction: 'up' | 'bottom' }>(
	({ expanded, disabled, direction }) => {
		const sizeMultiplier = expanded && !disabled ? defaultSizeMultiplier : 1;
		const doubledSize = sizeMultiplier * triangleDefaultSize * 2;
		const facingUp = direction === 'up';

		return `
	position: absolute;
	width: ${doubledSize}px;
	height: ${doubledSize}px;

	margin: 0;
	margin-top: ${facingUp ? sizeMultiplier * 15 : 0}px;

	line-height: ${doubledSize - (facingUp ? 0 : sizeMultiplier * 30)}px;
	font-size: ${sizeMultiplier * 16}px;
	text-align: center;
	font-family: arial;
	font-weight: 500;
	color: ${expanded ? 'transparent' : 'white'};

	pointer-events: none;
`;
	}
);

type Props = {
	expanded: boolean;
	disabled: boolean;
	text: string;
	index: number;
	backgroundColor: string;
	onClick: (event: MouseEvent) => void;
};

const Triangle = ({ expanded, disabled, backgroundColor, text, index, onClick }: Props) => {
	const direction = index % 2 ? 'bottom' : 'up';

	return (
		<TriangleContainer>
			<TriangleText expanded={expanded} disabled={disabled} direction={direction}>
				{text}
			</TriangleText>
			<TriangleBackground
				expanded={expanded}
				disabled={disabled}
				backgroundColor={backgroundColor}
				onClick={onClick}
				direction={direction}
			/>
		</TriangleContainer>
	);
};

export default Triangle;

import styled from '@emotion/styled';
import React, { MouseEvent } from 'react';

const triangleDefaultSize = 50;

const TriangleContainer = styled.div`
	display: inline-block;
`;

const TriangleBackground = styled.div<{
	sizeMultiplier: number;
	backgroundColor: string;
	disabled: boolean;
	direction: 'up' | 'bottom';
}>((props) => {
	const size = props.sizeMultiplier * triangleDefaultSize;

	return `
	display: block;
	width: 0;
	height: 0;

	border: ${size}px solid transparent;
	border-${props.direction === 'up' ? 'top' : 'bottom'}: 0;
	border-${props.direction === 'up' ? 'bottom' : 'top'}: ${size * 2}px solid #${
		props.disabled ? '575757' : props.backgroundColor
	};

	transition: 200ms linear;
`;
});

const TriangleText = styled.p<{ sizeMultiplier: number; direction: 'up' | 'bottom' }>((props) => {
	const doubledSize = props.sizeMultiplier * triangleDefaultSize * 2;

	return `
	position: absolute;
	width: ${doubledSize}px;
	height: ${doubledSize}px;

	margin: 0;
	margin-top: ${props.direction === 'up' ? props.sizeMultiplier * 15 : 0}px;

	line-height: ${doubledSize - (props.direction === 'up' ? 0 : props.sizeMultiplier * 30)}px;
	font-size: ${props.sizeMultiplier * 16}px;
	text-align: center;
	font-family: arial;
	font-weight: 500;
	color: white;

	pointer-events: none;
`;
});

type Props = {
	id: string;
	backgroundColor: string;
	disabled: boolean;
	text: string;
	index: number;
	sizeMultiplier?: number;
	onClick: (event: MouseEvent) => void;
};

const Triangle = ({
	id,
	sizeMultiplier,
	backgroundColor,
	disabled,
	text,
	index,
	onClick,
}: Props) => {
	const direction = index % 2 ? 'bottom' : 'up';
	return (
		<TriangleContainer>
			<TriangleText sizeMultiplier={sizeMultiplier ?? 1} direction={direction}>
				{text}
			</TriangleText>
			<TriangleBackground
				sizeMultiplier={sizeMultiplier ?? 1}
				backgroundColor={backgroundColor}
				disabled={disabled}
				onClick={(event) => onClick(event)}
				direction={direction}
			/>
		</TriangleContainer>
	);
};

export default Triangle;

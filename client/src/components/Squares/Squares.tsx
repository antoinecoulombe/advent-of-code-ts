import React, { MouseEvent, useState } from 'react';
import _ from 'lodash';
import styled from '@emotion/styled';
import Square from './Square';
import classNames from 'classnames';

const SquaresContainer = styled.div<{ width: number; height: number }>`
	position: absolute;
	width: ${(props) => props.width}px;
	height: ${(props) => props.height}px;
	top: calc(50% - ${(props) => props.height / 2}px);
	left: calc(50% - ${(props) => props.width / 2}px);

	&.active {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;

		.square:not(.active) {
			display: none;
		}
	}

	transition: 100ms linear;
`;

export type SquareProps = {
	id: string;
	text: string;
	disabled: boolean;
	backgroundColor: string;
	onClick: (event: MouseEvent) => void;
};

type Props = {
	squares: SquareProps[];
	width: number;
	height: number;
};

const Squares = ({ squares, width, height }: Props) => {
	const [expandedIndex, setExpandedIndex] = useState<number>(-1);

	return (
		<SquaresContainer
			width={width}
			height={height}
			className={classNames({ active: expandedIndex >= 0 })}
		>
			{_.map(squares, (square, index) => (
				<Square
					key={square.id}
					text={square.text}
					backgroundColor={square.backgroundColor}
					expanded={expandedIndex === index}
					disabled={square.disabled}
					onClick={(event) => {
						setExpandedIndex(expandedIndex === index ? -1 : index);
						square.onClick(event);
					}}
				/>
			)) || null}
		</SquaresContainer>
	);
};

export default Squares;

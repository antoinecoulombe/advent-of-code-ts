import React, { MouseEvent, useState } from 'react';
import _ from 'lodash';
import styled from '@emotion/styled';
import Square from './Square';
import classNames from 'classnames';

const SquaresContainer = styled.div<{ width: number; height: number }>`
	position: absolute;
	width: ${(props) => props.width}px;
	height: ${(props) => props.height}px;
	top: calc(50% - ${(props) => (props.height + 30) / 2}px);
	left: calc(50% - ${(props) => (props.width + 30) / 2}px);
	pointer-events: all;

	&:not(.active) {
		padding: 15px;
		background-color: rgba(255, 255, 255, 0.35);
		overflow-y: auto;

		-ms-overflow-style: none; /* Internet Explorer 10+ */
		scrollbar-width: none; /* Firefox */
	}

	&:not(.active)::-webkit-scrollbar {
		display: none; /* Safari and Chrome */
	}

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
	backgroundColor: string;
	disabled?: boolean;
	onClick?: (event: MouseEvent) => void;
	onCancel?: (event: MouseEvent) => void;
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
					disabled={square.disabled ?? false}
					onClick={(event) => {
						setExpandedIndex(index);
						square.onClick?.(event);
					}}
					onCancel={(event) => {
						setExpandedIndex(-1);
						square.onCancel?.(event);
					}}
				/>
			)) || null}
		</SquaresContainer>
	);
};

export default Squares;

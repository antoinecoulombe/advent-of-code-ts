import styled from '@emotion/styled';
import React, { MouseEvent } from 'react';
import { SquareStyled } from './SquareStyled';
import classNames from 'classnames';
import CloseButton from '../CloseButton';

const SquareContainer = styled.div`
	display: inline-block;

	&.active {
		display: block;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;

		opacity: 0.8;
	}
`;

type Props = {
	expanded: boolean;
	disabled: boolean;
	text: string;
	backgroundColor: string;
	onClick: (event: MouseEvent) => void;
};

const Square = ({ expanded, disabled, backgroundColor, text, onClick }: Props) => {
	return (
		<SquareContainer className={classNames({ square: true, active: expanded })}>
			<SquareStyled
				expanded={expanded}
				disabled={disabled}
				backgroundColor={backgroundColor}
				onClick={disabled || expanded ? undefined : onClick}
			>
				{expanded ? <CloseButton onClick={onClick} iconColor={backgroundColor} /> : text}
			</SquareStyled>
		</SquareContainer>
	);
};

export default Square;

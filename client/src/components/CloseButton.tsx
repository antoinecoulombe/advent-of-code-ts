import styled from '@emotion/styled';
import classNames from 'classnames';
import { MouseEvent } from 'react';

const size = 30,
	thickness = 5;

const ButtonContainer = styled.div`
	display: block;
	position: absolute;
	top: ${size / 2}px;
	right: ${size / 2}px;
	width: ${size * 2}px;
	height: ${size * 2}px;

	&:not(.disabled) {
		cursor: pointer;
	}

	opacity: 0.4;
	&:hover {
		opacity: 1;

		> button {
			transform: rotateZ(90deg);
		}
	}
`;

const ButtonStyled = styled.button`
	display: flex;
	flex-flow: column nowrap;
	justify-content: center;

	position: relative;
	top: 0;
	left: 0;
	width: ${size * 2}px;
	height: ${size * 2}px;
	background-color: white;

	margin: 0;
	border: 0;
	padding: 0;
	align-items: center;
	transition: all 150ms;

	pointer-events: none;
`;

const CloseIcon = styled.span<{ iconColor?: string }>`
	margin: 0;
	padding: 0;
	border: 0;
	position: relative;
	width: ${size}px;
	height: ${size}px;

	&:before,
	&:after {
		content: '';
		position: absolute;
		top: ${(size - thickness) / 2}px;
		left: 0;
		right: 0;
		height: ${thickness}px;
		background: ${(props) => props.iconColor ?? 'grey'};
		border-radius: ${thickness}px;
	}

	&:before {
		transform: rotate(45deg);
	}

	&:after {
		transform: rotate(-45deg);
	}
`;

type Props = {
	disabled?: boolean;
	iconColor?: string;
	onClick: (event: MouseEvent) => void;
};

const CloseButton = ({ disabled, iconColor, onClick }: Props) => {
	return (
		<ButtonContainer className={classNames({ disabled })} onClick={disabled ? undefined : onClick}>
			<ButtonStyled type={'button'}>
				<CloseIcon iconColor={iconColor}></CloseIcon>
			</ButtonStyled>
		</ButtonContainer>
	);
};

export default CloseButton;

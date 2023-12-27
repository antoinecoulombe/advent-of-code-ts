import styled from '@emotion/styled';
import { getContrastTextColor } from '../utils/Colors';

export const defaultSize = 100;

export const SquareStyled = styled.div<{
	backgroundColor: string;
	expanded: boolean;
	disabled: boolean;
}>(
	({ backgroundColor, expanded, disabled }) => `
	display: block;
	width: ${expanded ? '100%' : `${defaultSize}px`};
	height: ${expanded ? '100%' : `${defaultSize}px`};
  background-color: ${disabled ? '#575757' : backgroundColor};

	font-size: 16px;
	font-family: Arvo;
	font-weight: 800;

	text-align: center;
  line-height: ${defaultSize}px;
	color: ${disabled ? 'gray' : getContrastTextColor(backgroundColor)};

  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */

  cursor: ${expanded || disabled ? 'default' : 'pointer'} ;

	transition: 100ms linear;

  opacity: ${expanded ? 1 : 0.55};

  &:hover {
    opacity: ${disabled ? 0.55 : 1};
  }
`
);

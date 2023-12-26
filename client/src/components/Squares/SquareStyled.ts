import styled from '@emotion/styled';

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
  background-color: #${disabled ? '575757' : backgroundColor};

	font-size: 16px;
	font-family: arial;
	font-weight: 500;

	text-align: center;
  line-height: ${defaultSize}px;
	color: ${disabled ? 'gray' : 'white'};

  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */

  cursor: ${expanded || disabled ? 'default' : 'pointer'} ;

	transition: 100ms linear;

  opacity: 0.8;

  &:hover {
    opacity: ${expanded || disabled ? 0.8 : 1};
  }
`
);

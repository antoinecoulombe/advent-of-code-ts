import React, { MouseEvent, useState } from 'react';
import _ from 'lodash';
import styled from '@emotion/styled';
import Triangle from './Triangle';

const TrianglesContainer = styled.div`
	position: relative;
	top: 0;
	left: 0;
`;

export type TriangleProps = {
	id: string;
	text: string;
	color: string;
	disabled: boolean;
	onClick: (event: MouseEvent) => void;
};

type Props = {
	triangles: TriangleProps[];
};

const Triangles = ({ triangles }: Props) => {
	const defaultMultiplier = 1;
	const expandedMultiplier = 50;
	const [sizeMultiplier, setSizeMultiplier] = useState<number>(defaultMultiplier);

	return (
		<TrianglesContainer>
			{_.map(triangles, (triangle, index) => (
				<Triangle
					key={triangle.id}
					id={triangle.id}
					text={triangle.text}
					sizeMultiplier={sizeMultiplier}
					backgroundColor={triangle.color}
					disabled={triangle.disabled}
					index={index}
					onClick={(event) => {
						setSizeMultiplier(
							sizeMultiplier === defaultMultiplier ? expandedMultiplier : defaultMultiplier
						);
						triangle.onClick(event);
					}}
				/>
			)) || null}
		</TrianglesContainer>
	);
};

export default Triangles;

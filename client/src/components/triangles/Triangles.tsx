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
	const [expandedIndex, setExpandedIndex] = useState<number>(-1);

	return (
		<TrianglesContainer>
			{_.map(triangles, (triangle, index) => (
				<Triangle
					key={triangle.id}
					text={triangle.text}
					backgroundColor={triangle.color}
					expanded={expandedIndex === index}
					disabled={triangle.disabled}
					index={index}
					onClick={(event) => {
						setExpandedIndex(expandedIndex === index ? -1 : index);
						triangle.onClick(event);
					}}
				/>
			)) || null}
		</TrianglesContainer>
	);
};

export default Triangles;

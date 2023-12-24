import React, { useCallback } from 'react';
import _ from 'lodash';
import Triangles, { TriangleProps } from './Triangles';
import useAocDate from '../../hooks/useAocDate';

const TriangleSelector = () => {
	const { yearsArray, yearsColors, yearHasAoc } = useAocDate();

	const onTriangleClick = useCallback((year: number) => {
		console.log(year);
	}, []);

	const triangles: TriangleProps[] = _.map(yearsArray, (year, index) => ({
		id: year.toString(),
		text: year.toString(),
		color: yearsColors[index],
		disabled: yearHasAoc(year),
		onClick: () => onTriangleClick(year),
	}));

	return <Triangles triangles={triangles} />;
};

export default TriangleSelector;

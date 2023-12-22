import React, { useCallback, useMemo } from 'react';
import _ from 'lodash';
import Triangles, { TriangleProps } from './Triangles';
import { getRandomColors } from '../Utils/Random';

const TriangleSelector = () => {
	const currentDate = useMemo(() => new Date(), []);
	const currentYear = useMemo(() => currentDate.getFullYear(), [currentDate]);
	const currentMonth = useMemo(() => currentDate.getMonth(), [currentDate]);

	const firstAocYear = 2015;
	const yearsSince = currentYear - firstAocYear + 1;
	const years = Array.from({ length: yearsSince }, (_, i) => firstAocYear + i) || [];

	const onTriangleClick = useCallback((year: number) => {
		console.log(year);
	}, []);

	const colors = getRandomColors(yearsSince);

	const triangles: TriangleProps[] = _.map(years, (year, index) => ({
		id: year.toString(),
		text: year.toString(),
		color: colors[index],
		disabled:
			(year === currentYear && currentMonth < 11) || year < firstAocYear || year > currentYear,
		onClick: () => onTriangleClick(year),
	}));

	return <Triangles triangles={triangles} />;
};

export default TriangleSelector;

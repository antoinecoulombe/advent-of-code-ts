// min = inclusive

import _ from 'lodash';

// max = exclusive
export const getRandomInt = (min: number, max: number) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min) + min);
};

export const colors = [
	'003f5c',
	'2f4b7c',
	'665191',
	'a05195',
	'd45087',
	'f95d6a',
	'ff7c43',
	'ffa600',
];

export const getRandomColor = (exclude?: string[]) => {
	const availableColors = _.difference(colors, exclude || []);
	return availableColors[getRandomInt(0, availableColors.length)];
};

const getAdjacentColors = (colors: string[], index: number, colorsPerRow?: number) => {
	const adjacentColors = [];
	if (colors[index - 1]) adjacentColors.push(colors[index - 1]);
	if (colors[index + 1]) adjacentColors.push(colors[index + 1]);
	if (!colorsPerRow) return adjacentColors;
	if (colors[index - colorsPerRow]) adjacentColors.push(colors[index - colorsPerRow]);
	if (colors[index + colorsPerRow]) adjacentColors.push(colors[index + colorsPerRow]);
	return adjacentColors;
};

export const getRandomColors = (count: number, colorsPerRow?: number) => {
	if (count <= colors.length) return colors;
	const randomColors: string[] = [];
	for (let i = 0; i < count; ++i) {
		const adjacentColors = getAdjacentColors(randomColors, i, colorsPerRow);
		randomColors.push(getRandomColor(adjacentColors));
	}
	return randomColors;
};

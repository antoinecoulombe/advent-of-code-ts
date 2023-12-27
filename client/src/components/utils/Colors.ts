import _ from 'lodash';
import { getRandomInt } from './Random';

export const colors = [
	'#003f5c',
	'#2f4b7c',
	'#665191',
	'#a05195',
	'#d45087',
	'#f95d6a',
	'#ff7c43',
	'#ffa600',
];

export const isLightBackground = (hexcolor: string) => {
	// Convert hex color to RGB
	const r = parseInt(hexcolor.slice(1, 3), 16);
	const g = parseInt(hexcolor.slice(3, 5), 16);
	const b = parseInt(hexcolor.slice(5, 7), 16);

	// Calculate luminance
	const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

	// Use a threshold value to determine dark or light background
	return luminance > 0.5;
};

export const getContrastTextColor = (hexcolor: string) => {
	return isLightBackground(hexcolor) ? '#000' : '#fff';
};

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
	const randomColors: string[] = [];
	for (let i = 0; i < count; ++i) {
		const adjacentColors = getAdjacentColors(randomColors, i, colorsPerRow);
		randomColors.push(getRandomColor(adjacentColors));
	}
	return randomColors;
};

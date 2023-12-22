export const getRandomInt = (min: number, max: number) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
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

export const getRandomColor = () => {
	return colors[getRandomInt(0, colors.length)];
};

export const getRandomColors = (count: number) => {
	if (count <= colors.length) return colors;
	const randomColors = [];
	for (let i = 0; i < count; ++i) randomColors.push(getRandomColor());
	return randomColors;
};

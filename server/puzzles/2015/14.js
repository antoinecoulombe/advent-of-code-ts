const deers = [
	{
		name: 'Rudolph',
		speed: 22,
		duration: 8,
		rest: 165,
	},
	{
		name: 'Cupid',
		speed: 8,
		duration: 17,
		rest: 114,
	},
	{
		name: 'Prancer',
		speed: 18,
		duration: 6,
		rest: 103,
	},
	{
		name: 'Donner',
		speed: 25,
		duration: 6,
		rest: 145,
	},
	{
		name: 'Dasher',
		speed: 11,
		duration: 12,
		rest: 125,
	},
	{
		name: 'Comet',
		speed: 21,
		duration: 6,
		rest: 121,
	},
	{
		name: 'Blitzen',
		speed: 18,
		duration: 3,
		rest: 50,
	},
	{
		name: 'Vixen',
		speed: 20,
		duration: 4,
		rest: 75,
	},
	{
		name: 'Dancer',
		speed: 7,
		duration: 20,
		rest: 119,
	},
];

deers.forEach((deer) => {
	deer.totalDistance = 0;
	deer.remainingDuration = deer.duration;
	deer.remainingRest = deer.rest;
	deer.stars = 0;
});

const raceDuration = 2503;

const getMax = (deers, key) => {
	let furthest = deers[0];
	deers.forEach((deer) => {
		if (deer[key] > furthest[key]) {
			furthest = deer;
		}
	});
	return furthest;
};

for (let i = 0; i < raceDuration; ++i) {
	deers.forEach((deer) => {
		if (deer.remainingDuration > 0) {
			deer.totalDistance += deer.speed;
			--deer.remainingDuration;
		} else if (deer.remainingRest === 0) {
			deer.remainingDuration = deer.duration - 1;
			deer.remainingRest = deer.rest;
			deer.totalDistance += deer.speed;
		} else {
			--deer.remainingRest;
		}
	});

	const furthest = getMax(deers, 'totalDistance');
	++furthest.stars;
}

// Part 1
console.log(getMax(deers, 'totalDistance'));

// Part 2
console.log(getMax(deers, 'stars'));

const puzzle_2015_14 = async (part: number) => {
	const RACE_DURATION = 2503;

	type Deer = {
		name: string;
		speed: number;
		duration: number;
		rest: number;
		stars?: number;
		totalDistance?: number;
		remainingDuration?: number;
		remainingRest?: number;
	};

	const deers: Deer[] = [
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

	const initDeers = () => {
		deers.forEach((deer) => {
			deer.totalDistance = 0;
			deer.remainingDuration = deer.duration;
			deer.remainingRest = deer.rest;
			deer.stars = 0;
		});
	};

	const getMax = (deers: Deer[], key: string) => {
		let furthest = deers[0];
		deers.forEach((deer) => {
			if ((deer as any)[key] > (furthest as any)[key]) {
				furthest = deer;
			}
		});
		return furthest;
	};

	const race = () => {
		initDeers();
		for (let i = 0; i < RACE_DURATION; ++i) {
			deers.forEach((deer) => {
				if (deer.remainingDuration! > 0) {
					deer.totalDistance! += deer.speed;
					--deer.remainingDuration!;
				} else if (deer.remainingRest === 0) {
					deer.remainingDuration = deer.duration - 1;
					deer.remainingRest = deer.rest;
					deer.totalDistance! += deer.speed;
				} else {
					--deer.remainingRest!;
				}
			});

			const furthest = getMax(deers, 'totalDistance');
			++furthest.stars!;
		}
	};

	const part1 = async () => {
		race();
		return getMax(deers, 'totalDistance');
	};

	const part2 = async () => {
		race();
		return getMax(deers, 'stars');
	};

	if (part === 1) return await part1();
	if (part === 2) return await part2();
};

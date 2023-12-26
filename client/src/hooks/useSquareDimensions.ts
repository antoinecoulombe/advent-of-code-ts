import { useMemo } from 'react';
import useWindowDimensions from './useWindowDimensions';

type Props = {
	squareWidth: number;
	squaresCount: number;
	maxWidthPercent?: number;
};

const useSquareDimensions = ({ maxWidthPercent, squareWidth, squaresCount }: Props) => {
	const windowDimensions = useWindowDimensions();
	const maxDimensions = useMemo(
		() => ({
			width: windowDimensions.width * (maxWidthPercent ?? 1),
			height: windowDimensions.height,
		}),
		[maxWidthPercent, windowDimensions.height, windowDimensions.width]
	);
	const squaresPerRow = useMemo(
		() => Math.floor(maxDimensions.width / squareWidth),
		[maxDimensions.width, squareWidth]
	);
	const actualDimensions = useMemo(() => {
		const width =
			squaresCount < squaresPerRow ? squaresCount * squareWidth : squaresPerRow * squareWidth;
		const height = Math.ceil(squaresCount / squaresPerRow) * squareWidth;
		return { width, height };
	}, [squareWidth, squaresCount, squaresPerRow]);

	return { squaresPerRow, containerDimensions: actualDimensions };
};

export default useSquareDimensions;

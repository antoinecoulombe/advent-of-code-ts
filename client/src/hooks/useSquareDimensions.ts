import { useMemo } from 'react';
import useWindowDimensions from './useWindowDimensions';

type Props = {
	squareWidth: number;
	squaresCount: number;
	squaresPadding?: number;
	maxWidthPercent?: number;
};

const useSquareDimensions = ({
	maxWidthPercent,
	squareWidth,
	squaresCount,
	squaresPadding,
}: Props) => {
	const windowDimensions = useWindowDimensions();
	const maxDimensions = useMemo(
		() => ({
			width: windowDimensions.width * (maxWidthPercent ?? 1),
			height: windowDimensions.height - (squaresPadding ?? 0),
		}),
		[maxWidthPercent, squaresPadding, windowDimensions.height, windowDimensions.width]
	);
	const squaresPerRow = useMemo(
		() => Math.floor(maxDimensions.width / squareWidth) || 1,
		[maxDimensions.width, squareWidth]
	);
	const actualDimensions = useMemo(() => {
		const width =
			squaresCount < squaresPerRow ? squaresCount * squareWidth : squaresPerRow * squareWidth;
		let height = Math.ceil(squaresCount / squaresPerRow) * squareWidth;
		if (height > maxDimensions.height) height = maxDimensions.height;
		return { width, height };
	}, [maxDimensions.height, squareWidth, squaresCount, squaresPerRow]);

	return { squaresPerRow, containerDimensions: actualDimensions };
};

export default useSquareDimensions;

import { useMemo } from 'react';
import useWindowDimensions from './useWindowDimensions';

type Props = {
	squareWidth: number;
	squaresCount: number;
	squaresPadding?: number;
	maxWidthPercent?: number;
	maxWidthPxAbsolute?: number;
};

const getMaxWidth = (
	windowWidth: number,
	maxWidthPercent?: number,
	maxWidthPxAbsolute?: number,
	padding?: number
) => {
	if (maxWidthPercent === undefined) maxWidthPercent = 1;
	if (padding === undefined) padding = 0;
	const width = windowWidth * maxWidthPercent;
	if (maxWidthPxAbsolute !== undefined && width > maxWidthPxAbsolute) {
		return maxWidthPxAbsolute;
	}
	return width - padding;
};

const useSquareDimensions = ({
	maxWidthPercent,
	maxWidthPxAbsolute,
	squareWidth,
	squaresCount,
	squaresPadding,
}: Props) => {
	const windowDimensions = useWindowDimensions();
	const maxDimensions = useMemo(
		() => ({
			width: getMaxWidth(
				windowDimensions.width,
				maxWidthPercent,
				maxWidthPxAbsolute,
				squaresPadding
			),
			height: windowDimensions.height - (squaresPadding ?? 0),
		}),
		[
			maxWidthPercent,
			maxWidthPxAbsolute,
			squaresPadding,
			windowDimensions.height,
			windowDimensions.width,
		]
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

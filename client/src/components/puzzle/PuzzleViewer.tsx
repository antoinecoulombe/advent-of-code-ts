import styled from '@emotion/styled';
import TitleBar from './TitleBar';
import { useMemo, useState } from 'react';
import PartSelector from './PartSelector';
import CloseButton from '../CloseButton';

export type Puzzle = {
	year: number;
	day: number;
	title: string;
	input: string;
	answers: { part1?: string; part2?: string };
	description: { part1?: string; part2?: string };
	code?: string;
	completedParts: 0 | 1 | 2;
	color: string;
};

const PuzzleContainer = styled.div<{color: string}>`
	position: fixed;
	width: 100%;
	height: 100%;
	background-color: ${props => props.color};
`;

const PuzzleContent = styled.div`
	position: relative;
	width: 80%;
	height: 80%;
	max-width: 1000px;
	margin: 0 auto;
	margin-top: 100px;
`;

const Text = styled.p``;

const SectionDropdown = styled.div``;

const SectionRow = styled.div``;
const Section = styled.div``;

const CodeBlock = styled.div``;

// TODO: This should be a component that accepts ChildNode as children
// This limits the height of the children content and adds a "Show more" button
// when text goes beyond the height limit
const HeightLimiter = styled.div``;

type Props = {
	year: number;
	day: {day: number, color: string};
	onClose: () => void;
};

const PuzzleViewer = ({ year, day, onClose }: Props) => {
    const data: Puzzle = useMemo(() => {
		// TODO: fetch problem info from server
        return { year, day: day.day, input: 'blabla', answers: {}, description: {}, title: "Mic c'est yinc une choin", completedParts: 1, color: day.color! }
    }, [year, day]);

	const [part, setPart] = useState<1 | 2>(1);

	return (
		<PuzzleContainer  color={day.color}>
			<PuzzleContent className={"puzzle"}>
				<TitleBar year={data.year} day={data.day} completedParts={data.completedParts} title={data.title} color={data.color}/>
				<PartSelector onClick={setPart} color={day.color}/>
				{data.description[`part${part}`] && (
					<HeightLimiter>
						<Text>{data.description[`part${part}`]}</Text>
					</HeightLimiter>
				)}
				<SectionRow>
					<Section>{data.answers.part1}</Section>
					<Section>{data.answers.part2}</Section>
				</SectionRow>
				{data.code && (
					<SectionDropdown>
						<CodeBlock>{data.code}</CodeBlock>
					</SectionDropdown>
				)}
				{data.input && (
					<SectionDropdown>
						<CodeBlock>{data.input}</CodeBlock>
					</SectionDropdown>
				)}
			</PuzzleContent>
			<CloseButton onClick={onClose} iconColor={day.color} />
		</PuzzleContainer>
	);
};

export default PuzzleViewer;

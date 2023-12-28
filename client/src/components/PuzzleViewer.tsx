import styled from '@emotion/styled';

export type Puzzle = {
	year: number;
	day: number;
	input: string;
	answers: { part1?: string; part2?: string };
	description: { part1?: string; part2?: string };
	code?: string;
};

const PuzzleContainer = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
	z-index: 2;
	pointer-events: none;
`;

// TODO: Move this to own file
const Title = styled.h1``;

const Text = styled.p``;

const ContentDropdown = styled.div``;

const SectionDropdown = styled.div``;

const SectionRow = styled.div``;
const Section = styled.div``;

const CodeBlock = styled.div``;

// TODO: This should be a component that accepts ChildNode as children
// This limits the height of the children content and adds a "Show more" button
// when text goes beyond the height limit
const HeightLimiter = styled.div``;

type Props = {
	puzzle: Puzzle;
};

const PuzzleViewer = ({ puzzle }: Props) => {
	return (
		<PuzzleContainer>
			<Title>
				{puzzle.year} - {puzzle.day}
			</Title>
			{puzzle.description.part1 && (
				<HeightLimiter>
					<Text>{puzzle.description.part1}</Text>
					{puzzle.description.part2 && (
						<ContentDropdown>
							<Text>{puzzle.description.part2}</Text>
						</ContentDropdown>
					)}
				</HeightLimiter>
			)}
			<SectionRow>
				<Section>{puzzle.answers.part1}</Section>
				<Section>{puzzle.answers.part2}</Section>
			</SectionRow>
			{puzzle.code && (
				<SectionDropdown>
					<CodeBlock>{puzzle.code}</CodeBlock>
				</SectionDropdown>
			)}
			{puzzle.input && (
				<SectionDropdown>
					<CodeBlock>{puzzle.input}</CodeBlock>
				</SectionDropdown>
			)}
		</PuzzleContainer>
	);
};

export default PuzzleViewer;

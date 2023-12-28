import React, { useState } from 'react';
import YearSelector from './components/YearSelector';
import styled from '@emotion/styled';
import DaySelector from './components/DaySelector';
import PuzzleViewer, { Puzzle } from './components/PuzzleViewer';

const AppContainer = styled.div``;

const App = () => {
	const [year, setYear] = useState<number | null>(null);
	const [puzzle, setPuzzle] = useState<Puzzle | null>(null);
	return (
		<AppContainer>
			{year && puzzle && <PuzzleViewer puzzle={puzzle} />}
			{year && <DaySelector year={year} onClick={setPuzzle} />}
			<YearSelector onClick={setYear} />
		</AppContainer>
	);
};

export default App;

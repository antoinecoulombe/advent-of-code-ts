import React, { useMemo, useState } from 'react';
import YearSelector from './components/YearSelector';
import styled from '@emotion/styled';
import DaySelector from './components/DaySelector';
import PuzzleViewer from './components/puzzle/PuzzleViewer';

const AppContainer = styled.div``;

const App = () => {
	const [year, setYear] = useState<{year: number, color: string} | null>(null);
	const [day, setDay] = useState<{ day: number, color: string } | null>(null);

	const displayedNode = useMemo(() => {
		if (year && day) {
			return <PuzzleViewer year={year.year} day={day} onClose={()  => setDay(null)}/>;
		}

		if (year) {
			return <DaySelector year={year} onClick={setDay} onClose={() => setYear(null)} />;
		}

		return <YearSelector onClick={setYear} />
	}, [year, day]);

	return (
		<AppContainer style={{backgroundColor: year?.color ?? day?.color}}>
			{displayedNode}
		</AppContainer>
	);
};

export default App;

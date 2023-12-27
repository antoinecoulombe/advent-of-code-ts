import React, { useState } from 'react';
import YearSelector from './components/YearSelector';
import styled from '@emotion/styled';
import DaySelector from './components/DaySelector';

const AppContainer = styled.div``;

const App = () => {
	const [year, setYear] = useState<number | null>(null);
	return (
		<AppContainer>
			{year && <DaySelector year={year} />}
			<YearSelector onClick={(year) => setYear(year)} />
		</AppContainer>
	);
};

export default App;

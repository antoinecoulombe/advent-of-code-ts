import ts from 'typescript';
import express from 'express';
import { fileExists, readFile } from './FileHandler';
import { isDayValid, isNumeric, isPartValid, isYearValid } from './Validation';

const app = express();

const port = 5001;

app.get('/solve/:year/:day/:part', async (req, res) => {
	const year = req.params.year;
	const day = req.params.day;
	const part = req.params.part;
	let solutionsPath: string = '';
	if (
		!isYearValid(year) ||
		!isDayValid(year, day) ||
		!isPartValid(part) ||
		!(await fileExists((solutionsPath = `${__dirname}/puzzles/${year}/${day}/solutions.ts`)))
	) {
		sendPuzzleNotFound(year, day, res);
		console.log('shit', solutionsPath);
		return;
	}

	const solutionsTSCode = await readFile(solutionsPath);
	const solutionsJSCode = ts.transpile(solutionsTSCode!);
	const result = eval(solutionsJSCode! + `part${part}();`);
	res.json(result);
});

app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});

const sendPuzzleNotFound = (year: any, day: any, res: any) => {
	let err = `The puzzle at the specified date was not found.`;
	if (isNumeric(year) && isNumeric(day)) {
		err = `The puzzle on day '${day}' of year '${year}' was not found.`;
	}
	res.status(404).json({ status: 404, errors: [err] });
};

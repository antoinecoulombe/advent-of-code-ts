import ts from 'typescript';
import express from 'express';
import 'dotenv/config';
import { fileExists, readFile } from './FileHandler.js';
import { isDayValid, isNumeric, isPartValid, isYearValid } from './Validation.js';

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
		!(await fileExists(
			(solutionsPath = `${process.env.DIR_NAME}/src/puzzles/${year}/${day}/solutions.js`)
		))
	) {
		sendPuzzleNotFound(year, day, res);
		console.log('shit', solutionsPath);
		return;
	}

	const result = eval((await readFile(solutionsPath))! + `part${part}();`);
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

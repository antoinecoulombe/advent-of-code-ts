import fs from 'fs/promises';

const writeFile = (path: string, content: string, overwrite?: boolean) => {
	// Get file at path
	// If file exists and overwrite is false, return false;
	// Write file, creating missing folders as needed
	// return true;
};

export const fileExists = async (path: string): Promise<boolean> => {
	try {
		await fs.stat(path);
		return true;
	} catch (err) {
		return false;
	}
};

export const readFile = async (path: string): Promise<string | null> => {
	try {
		return await fs.readFile(path, { encoding: 'utf8' });
	} catch (err) {
		console.log(err);
		return null;
	}
};

const getFileLines = async (path: string): Promise<string[] | null> => {
	const fileContent = await readFile(path);
	return fileContent?.split('\n') || null;
};

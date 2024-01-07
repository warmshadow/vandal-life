// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { promises as fs } from 'fs';
import path from 'path';

import { /* CATEGORIES_DIR, */ DATA_DIR } from '../utils/constants';

export async function load() {
	try {
		// reading home json
		const homeFilePath = path.join(DATA_DIR, 'home.json');
		const data = await fs.readFile(homeFilePath, 'utf-8');
		let homeStory;

		try {
			const jsonData = JSON.parse(data);

			homeStory = jsonData;
		} catch (parseError) {
			console.error(`Error parsing JSON from ${homeFilePath}:`, parseError);
			throw parseError; // propagate the error to the catch block
		}

		return { homeStory };
	} catch (error) {
		console.error('Error reading files:', error);
		throw error;
	}
}

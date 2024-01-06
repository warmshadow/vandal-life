// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { promises as fs } from 'fs';
import path from 'path';

import { CATEGORIES_DIR, DATA_DIR } from '../utils/constants';

export async function load() {
	const categories = {};

	try {
		const files = await fs.readdir(CATEGORIES_DIR);
		const jsonFiles = files.filter((file) => path.extname(file).toLowerCase() === '.json');

		await Promise.all(
			jsonFiles.map(async (jsonFile) => {
				const filePath = path.join(CATEGORIES_DIR, jsonFile);
				const data = await fs.readFile(filePath, 'utf-8');

				try {
					const jsonData = JSON.parse(data);

					// retrieving from category file name as it's created from the category slug
					const categoryPath = jsonFile.replace('.json', '');
					// @TODO only pass needed amount to homepage
					categories[categoryPath] = jsonData;
				} catch (parseError) {
					console.error(`Error parsing JSON from ${jsonFile}:`, parseError);
					throw parseError; // propagate the error to the catch block
				}
			})
		);

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

		return { categories, homeStory };
	} catch (error) {
		console.error('Error reading files:', error);
		throw error;
	}
}

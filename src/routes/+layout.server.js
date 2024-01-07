// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import fs, { promises as fsp } from 'fs';
import path from 'path';

import { DATA_DIR, CATEGORIES_DIR } from '../utils/constants';

export async function load() {
	try {
		const data = await fsp.readFile(path.join(DATA_DIR, 'folders.json'), 'utf-8');
		const jsonData = JSON.parse(data);

		// only categories that have stories
		const categories = jsonData.stories
			.filter(({ slug }) => fs.existsSync(`${CATEGORIES_DIR}/${slug}.json`))
			.map(({ name, slug }) => ({ name, slug }));

		const categoriesStoriesObj = {};

		const files = await fsp.readdir(CATEGORIES_DIR);
		const jsonFiles = files.filter((file) => path.extname(file).toLowerCase() === '.json');

		await Promise.all(
			jsonFiles.map(async (jsonFile) => {
				const filePath = path.join(CATEGORIES_DIR, jsonFile);
				const data = await fsp.readFile(filePath, 'utf-8');

				try {
					const jsonData = JSON.parse(data);

					// retrieving from category file name as it's created from the category slug
					const categoryPath = jsonFile.replace('.json', '');
					categoriesStoriesObj[categoryPath] = jsonData;
				} catch (parseError) {
					console.error(`Error parsing JSON from ${jsonFile}:`, parseError);
					throw parseError; // propagate the error to the catch block
				}
			})
		);

		return {
			categories,
			categoriesStories: categories.map(({ name, slug }) => ({
				name,
				slug,
				data: categoriesStoriesObj[slug]
			}))
		};
	} catch (error) {
		console.error('Error reading files:', error);
		throw error;
	}
}

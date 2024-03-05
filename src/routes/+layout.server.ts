import fs, { promises as fsp } from 'fs';
import path from 'path';
import type { ISbStoryData } from '@storyblok/svelte';

import { DATA_DIR, CATEGORIES_DIR } from '../utils/constants';
import type {
	CategoryNameStoryblok,
	PostStoryblok,
	HomePageStoryblok,
	IdeaStoryblok
} from '../../component-types-sb';

interface CategoriesStories {
	stories: ISbStoryData<PostStoryblok | IdeaStoryblok>[];
}

export async function load() {
	try {
		const data = await fsp.readFile(path.join(DATA_DIR, 'folders.json'), 'utf-8');
		const jsonData: { categories: CategoryNameStoryblok[] } = JSON.parse(data);

		// only categories that have stories
		const categories = jsonData.categories
			.filter(({ slug }) => fs.existsSync(`${CATEGORIES_DIR}/${slug}.json`))
			.map(({ slug, title: name }) => ({ name, slug }));

		const categoriesStoriesObj: { [k: string]: CategoriesStories } = {};

		const files = await fsp.readdir(CATEGORIES_DIR);
		const jsonFiles = files.filter((file) => path.extname(file).toLowerCase() === '.json');

		await Promise.all(
			jsonFiles.map(async (jsonFile) => {
				const filePath = path.join(CATEGORIES_DIR, jsonFile);
				const data = await fsp.readFile(filePath, 'utf-8');

				try {
					const jsonData: CategoriesStories = JSON.parse(data);

					// retrieving from category file name as it's created from the category slug
					const categoryPath = jsonFile.replace('.json', '');
					categoriesStoriesObj[categoryPath] = jsonData;
				} catch (parseError) {
					console.error(`Error parsing JSON from ${jsonFile}:`, parseError);
					throw parseError; // propagate the error to the catch block
				}
			})
		);

		// adding separate anything goes page
		const anythingGoesData = await fsp.readFile(path.join(DATA_DIR, 'anything-goes.json'), 'utf-8');
		const anythingGoesJsonData: ISbStoryData<IdeaStoryblok> = JSON.parse(anythingGoesData);
		categories.push({ name: anythingGoesJsonData.name, slug: anythingGoesJsonData.slug });
		categoriesStoriesObj['anything-goes'] = { stories: [anythingGoesJsonData] };

		// reading home json
		const filePath = path.join(DATA_DIR, 'home.json');
		const homeData = await fsp.readFile(filePath, 'utf-8');
		const homeStoryData: ISbStoryData<HomePageStoryblok> = JSON.parse(homeData);

		return {
			categories,
			categoriesStories: categories.map(({ name, slug }) => ({
				name,
				slug,
				data: categoriesStoriesObj[slug]
			})),
			homeStory: homeStoryData
		};
	} catch (error) {
		console.error('Error reading files:', error);
		throw error;
	}
}

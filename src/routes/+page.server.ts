import { promises as fsp } from 'fs';
import path from 'path';

import { DATA_DIR } from '../utils/constants';

import type { ISbStoryData } from '@storyblok/svelte';
import type { HomePageStoryblok } from '../../component-types-sb';

export async function load({ parent }) {
	const { categoriesStories } = await parent();
	const latestCategoriesStories = categoriesStories.map((category) => ({
		...category,
		data: {
			stories: category.data.stories.slice(0, 3) // this slice won't affect idea content type story as it's only one
		}
	}));

	try {
		// reading home json
		const filePath = path.join(DATA_DIR, 'home.json');
		const data = await fsp.readFile(filePath, 'utf-8');
		const jsonData: ISbStoryData<HomePageStoryblok> = JSON.parse(data);

		return { story: jsonData, categoriesStories: latestCategoriesStories };
	} catch (error) {
		console.error('Error reading or parsing home JSON:', error);
		throw error;
	}
}

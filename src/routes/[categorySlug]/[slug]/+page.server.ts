import { promises as fsp } from 'fs';
import path from 'path';

import { CATEGORIES_DIR } from '../../../utils/constants';

import type { ISbStoryData } from '@storyblok/svelte';
import type { PostStoryblok } from '../../../../component-types-sb';

export async function load({ url: { pathname }, params }) {
	try {
		const filePath = path.join(CATEGORIES_DIR, `${params.categorySlug}.json`);
		const data = await fsp.readFile(filePath, 'utf-8');
		const jsonData: { stories: ISbStoryData<PostStoryblok>[] } = JSON.parse(data);

		return { story: jsonData.stories.find(({ full_slug }) => `/${full_slug}` === pathname) };
	} catch (error) {
		console.error(`Error reading or parsing JSON`, error);
		throw error;
	}
}

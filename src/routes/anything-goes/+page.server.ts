import { promises as fsp } from 'fs';
import path from 'path';

import { DATA_DIR } from '../../utils/constants';

import type { ISbStoryData } from '@storyblok/svelte';
import type { IdeaStoryblok } from '../../../component-types-sb';

export async function load() {
	try {
		const filePath = path.join(DATA_DIR, `anything-goes.json`);
		const data = await fsp.readFile(filePath, 'utf-8');
		const {
			data: { story: jsonData }
		}: { data: { story: ISbStoryData<IdeaStoryblok> } } = JSON.parse(data);

		return { story: jsonData };
	} catch (error) {
		console.error(`Error reading or parsing anything-goes JSON`, error);
		throw error;
	}
}

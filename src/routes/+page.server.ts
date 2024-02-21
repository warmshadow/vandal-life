import { promises as fsp } from 'fs';
import path from 'path';

import type { ISbStoryData } from '@storyblok/svelte';
import type { HomePageStoryblok } from '../../component-types-sb';

import { DATA_DIR } from '../utils/constants';

export async function load() {
	try {
		// reading home json
		const homeFilePath = path.join(DATA_DIR, 'home.json');
		const data = await fsp.readFile(homeFilePath, 'utf-8');
		let story: ISbStoryData<HomePageStoryblok>;

		try {
			const jsonData = JSON.parse(data);

			story = jsonData;
		} catch (parseError) {
			console.error(`Error parsing JSON from ${homeFilePath}:`, parseError);
			throw parseError; // propagate the error to the catch block
		}

		return { story };
	} catch (error) {
		console.error('Error reading files:', error);
		throw error;
	}
}

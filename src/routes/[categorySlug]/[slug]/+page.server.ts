import { promises as fsp } from 'fs';
import path from 'path';

import type { ISbStoryData } from '@storyblok/svelte';
import type { PostStoryblok } from '../../../../component-types-sb';

import { getStoryData } from '../../../utils/helpers';

export async function load({ url: { pathname }, params }) {
	try {
		const { data: categoryStoryData }: { data: { stories: ISbStoryData<PostStoryblok>[] } } =
			await getStoryData({
				slug: params.categorySlug,
				path,
				fsp
			});

		return {
			story: categoryStoryData.stories.find(({ full_slug }) => `/${full_slug}` === pathname)
		};
	} catch (error) {
		console.error(`Error reading or parsing JSON`, error);
		throw error;
	}
}

import { promises as fsp } from 'fs';
import path from 'path';

import type { ISbStoryData } from '@storyblok/svelte';
import type { PostStoryblok } from '../../../../component-types-sb';

import { getStoryData } from '../../../utils/helpers';
import { shortenString } from '../../../utils/shortenString';

export async function load({ url: { pathname }, params }) {
	try {
		const { data: categoryStoryData }: { data: { stories: ISbStoryData<PostStoryblok>[] } } =
			await getStoryData({
				slug: params.categorySlug,
				path,
				fsp
			});

		const story = categoryStoryData.stories.find(({ full_slug }) => `/${full_slug}` === pathname);

		if (story) {
			return {
				story: categoryStoryData.stories.find(({ full_slug }) => `/${full_slug}` === pathname),
				metaData: {
					title: story.content.title,
					description:
						story.content.metaDescription?.trim() ||
						story.content.subtitle?.trim() ||
						shortenString(
							story.content.content?.find(({ component }) => component === 'body')?.text || '',
							160
						)
				}
			};
		} else {
			throw new Error('No story for this page');
		}
	} catch (error) {
		console.error(`Error reading or parsing JSON`, error);
		throw error;
	}
}

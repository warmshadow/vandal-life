import { promises as fsp } from 'fs';
import path from 'path';

import { dev } from '$app/environment';

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

		const bodyText = story?.content.content
			?.find(({ component }) => component === 'body')
			?.text?.trim();

		if (story) {
			return {
				story: categoryStoryData.stories.find(({ full_slug }) => `/${full_slug}` === pathname),
				nextStories: categoryStoryData.stories
					.filter(({ full_slug }) => `/${full_slug}` !== pathname)
					.slice(0, 6),
				metaData: {
					title: story.content.title,
					description:
						story.content.metaDescription?.trim() ||
						story.content.subtitle?.trim() ||
						(bodyText ? shortenString(bodyText, 160) : undefined)
				} as { title: string; description?: string }
			};
		} else if (!dev) {
			throw new Error(`No story for ${pathname} page`);
		}
	} catch (error) {
		throw new Error(`Error reading or parsing JSON. ${error}`);
	}
}

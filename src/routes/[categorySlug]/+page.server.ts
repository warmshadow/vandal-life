import type { ISbStoryData } from '@storyblok/svelte';
import type { IdeaStoryblok, PostStoryblok } from '../../../component-types-sb.js';

import { dev } from '$app/environment';

export async function load({ url: { pathname }, parent }) {
	const { categoriesStories } = await parent();

	const stories = categoriesStories.find((category) => `/${category.slug}` === pathname);

	let postStories;
	let ideaStory;
	let metaData;

	if (stories) {
		metaData = { title: stories.name, description: stories.metaDescription };
		if (stories.type === 'post') {
			postStories = stories as { name: string; data: { stories: ISbStoryData<PostStoryblok>[] } };
		} else if (stories.type === 'idea') {
			ideaStory = stories.data.stories[0] as ISbStoryData<IdeaStoryblok>;
		}

		return { postStories, ideaStory, metaData };
	} else if (!dev) {
		throw new Error(`No story/stories for ${pathname} page`);
	}
}

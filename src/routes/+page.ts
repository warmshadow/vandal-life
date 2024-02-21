import { browser } from '$app/environment';
import type { ISbStoryData } from '@storyblok/svelte';

import type { HomePageStoryblok } from '../../component-types-sb';

export async function load({ data, parent }) {
	let story: ISbStoryData<HomePageStoryblok> | undefined;

	if (browser) {
		const { storyblokApi } = await parent();
		const dataStory = await storyblokApi.get('cdn/stories/home', {
			version: 'draft' // @TODO implement draft and published (or no need as published will be shown as draft as well?)
		});

		story = dataStory.data.story;
	}

	const { categoriesStories } = await parent();
	const latestCategoriesStories = categoriesStories.map((category) => ({
		...category,
		data: { stories: category.data.stories.slice(0, 3) }
	}));

	return {
		...data, // story from +page.server.js
		story,
		categoriesStories: latestCategoriesStories
	};
}

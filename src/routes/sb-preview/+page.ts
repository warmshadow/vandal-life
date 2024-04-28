import { browser } from '$app/environment';

import type { ISbStoryData } from '@storyblok/svelte';
import type { IdeaStoryblok, PostStoryblok, HomePageStoryblok } from '../../../component-types-sb';

import { getStoryData } from '../../utils/helpers';

export async function load({ url, parent }) {
	const data = await parent();

	if (browser) {
		const searchParams = new URLSearchParams(url.search);
		const storyId = searchParams.get('_storyblok');

		if (storyId) {
			try {
				const { storyblokApi } = await parent();
				const {
					data: { story }
				}: { data: { story: ISbStoryData } } = await getStoryData({
					slug: storyId,
					storyblokApi
				});

				if (story.content.component === 'idea') {
					return { ...data, ideaStory: story as ISbStoryData<IdeaStoryblok> };
				} else if (story.content.component === 'post') {
					return { ...data, postStory: story as ISbStoryData<PostStoryblok> };
				} else if (story.content.component === 'homePage') {
					return {
						...data,
						homeStory: story as ISbStoryData<HomePageStoryblok>
					};
				}
			} catch {
				throw new Error('No story for this page');
			}
		}
	}
}

import { browser } from '$app/environment';

import type { ISbStoryData } from '@storyblok/svelte';
import type { PostStoryblok } from '../../../../component-types-sb';

import { getStoryData } from '../../../utils/helpers';

export async function load({ data, url, parent }) {
	if (browser) {
		const searchParams = new URLSearchParams(url.search);
		const storyId = searchParams.get('_storyblok');

		if (storyId) {
			try {
				const { storyblokApi } = await parent();

				const {
					data: { story }
				}: { data: { story: ISbStoryData<PostStoryblok> } } = await getStoryData({
					slug: storyId,
					storyblokApi
				});

				return {
					...data,
					story,
					previewMode: true
				};
			} catch {
				// catching error when retrieving nonexisting story, in this case returning initial static data from +page.server.ts
				return { ...data };
			}
		}
	} else {
		return { ...data }; // data from +page.server.ts
	}
}

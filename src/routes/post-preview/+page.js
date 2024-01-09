import { browser } from '$app/environment';

export async function load({ url, parent }) {
	if (browser) {
		const { storyblokApi } = await parent();

		const searchParams = new URLSearchParams(url.search);
		const storyId = searchParams.get('_storyblok');

		const dataStory = await storyblokApi.get(`cdn/stories/${storyId}`, {
			version: 'draft'
		});

		return {
			story: dataStory.data.story
		};
	}
}

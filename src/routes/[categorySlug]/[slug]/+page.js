import { browser } from '$app/environment';

export async function load({ data, url, parent }) {
	if (browser) {
		const searchParams = new URLSearchParams(url.search);
		const storyId = searchParams.get('_storyblok');

		if (storyId) {
			try {
				const { storyblokApi } = await parent();
				const dataStory = await storyblokApi.get(`cdn/stories/${storyId}`, {
					version: 'draft'
				});

				return { ...data, story: dataStory.data.story, previewMode: true };
			} catch {
				// catching error when retrieving nonexisting story, in this case returning initial static data from +page.server.js
				return { ...data };
			}
		}
	} else {
		return { ...data }; // data from +page.server.js
	}
}

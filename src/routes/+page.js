import { browser } from '$app/environment';

// @TODO check how to do typing in javascript file
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export async function load({ data, parent }) {
	let story;

	if (browser) {
		const { storyblokApi } = await parent();
		const dataStory = await storyblokApi.get('cdn/stories/home', {
			version: 'draft' // @TODO implement draft and published (or no need as published will be shown as draft as well?)
		});

		story = dataStory.data.story;
	}

	return {
		story,
		categories: data.categories // from +page.server.js
	};
}

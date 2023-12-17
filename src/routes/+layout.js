import { apiPlugin, storyblokInit, useStoryblokApi } from '@storyblok/svelte';

import Post from '../components/Post.svelte';

/** @type {import('./$types').LayoutLoad} */
export async function load() {
	storyblokInit({
		accessToken: 'G9SYJLnU1lNBNIGrydjJHwtt',
		use: [apiPlugin],
		components: {
			post: Post
		}
	});
	let storyblokApi = await useStoryblokApi();

	return {
		storyblokApi: storyblokApi
	};
}

export const prerender = true;

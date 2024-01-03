import { apiPlugin, storyblokInit, useStoryblokApi } from '@storyblok/svelte';
import { PUBLIC_STORYBLOK_TOKEN } from '$env/static/public';

import Page from '../components/Page.svelte';
import CardBigText from '../components/CardBigText.svelte';
import Post from '../components/Post.svelte';

/** @type {import('./$types').LayoutLoad} */
export async function load() {
	storyblokInit({
		accessToken: PUBLIC_STORYBLOK_TOKEN,
		use: [apiPlugin],
		components: {
			post: Post,
			page: Page,
			CardBigText
		}
	});
	let storyblokApi = await useStoryblokApi();

	return {
		storyblokApi: storyblokApi
	};
}

export const prerender = true;

import { apiPlugin, storyblokInit, useStoryblokApi } from '@storyblok/svelte';
import { PUBLIC_STORYBLOK_TOKEN } from '$env/static/public';

import Page from '../components/Page.svelte';
import CardBigText from '../components/CardBigText.svelte';
import Post from '../components/Post.svelte';

/** @type {import('./$types').LayoutLoad} */
export async function load({ url: { pathname }, data }) {
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
		storyblokApi: storyblokApi,
		currentCategory:
			data.categories.find(({ slug }) => `${pathname}/`.startsWith(`/${slug}/`))?.name ||
			'vandal life',
		...data // from +layout.server.js
	};
}

export const prerender = true;

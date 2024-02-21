import { apiPlugin, storyblokInit, useStoryblokApi } from '@storyblok/svelte';
import { PUBLIC_STORYBLOK_TOKEN } from '$env/static/public';

import CardBigText from '../components/CardBigText.svelte';
import Post from '../components/Post.svelte';

export async function load({ url: { pathname }, data }) {
	storyblokInit({
		accessToken: PUBLIC_STORYBLOK_TOKEN,
		use: [apiPlugin],
		components: {
			post: Post,
			messageCard: CardBigText
		}
	});
	const storyblokApi = useStoryblokApi();

	return {
		storyblokApi: storyblokApi,
		currentCategory:
			data.categories.find(({ slug }) => `${pathname}/`.startsWith(`/${slug}/`))?.name ||
			'vandal life',
		...data // from +layout.server.ts
	};
}

export const prerender = true;

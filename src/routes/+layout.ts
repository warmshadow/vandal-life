import { apiPlugin, storyblokInit, useStoryblokApi } from '@storyblok/svelte';
import { PUBLIC_STORYBLOK_TOKEN } from '$env/static/public';
import { browser } from '$app/environment';

import CardBigText from '../components/CardBigText.svelte';
import Post from '../components/Post.svelte';
import Idea from '../components/Idea.svelte';
import HomePage from '../components/HomePage.svelte';

import { fetchLayoutData } from '../utils/helpers';

export async function load({ url: { pathname }, url, data }) {
	storyblokInit({
		accessToken: PUBLIC_STORYBLOK_TOKEN,
		use: [apiPlugin],
		components: {
			homePage: HomePage,
			post: Post,
			idea: Idea,
			messageCard: CardBigText
		}
	});
	const storyblokApi = useStoryblokApi();

	const extraData = {
		storyblokApi: storyblokApi,
		currentCategory:
			data.categories.find(({ slug }) => `${pathname}/`.startsWith(`/${slug}/`))?.name ||
			'vandal life'
	};

	if (browser) {
		const searchParams = new URLSearchParams(url.search);
		const storyId = searchParams.get('_storyblok');

		if (storyId && pathname === '/') {
			try {
				const clientData = await fetchLayoutData({ storyblokApi });

				return {
					...data, // from +layout.server.ts
					...extraData,
					...clientData,
					previewMode: true
				};
			} catch {
				return {
					...data,
					...extraData
				};
			}
		} else {
			return {
				...data,
				...extraData
			};
		}
	} else {
		return {
			...data,
			...extraData
		};
	}
}

export const prerender = true;

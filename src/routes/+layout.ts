import { apiPlugin, storyblokInit, useStoryblokApi } from '@storyblok/svelte';
import { PUBLIC_STORYBLOK_TOKEN } from '$env/static/public';
import { browser } from '$app/environment';

import type { ISbStoryData } from '@storyblok/svelte';
import type {
	CategoryNameStoryblok,
	HomePageStoryblok,
	PostStoryblok,
	IdeaStoryblok
} from '../../component-types-sb';

import CardBigText from '../components/CardBigText.svelte';
import Post from '../components/Post.svelte';

interface CategoriesStories {
	stories: ISbStoryData<PostStoryblok | IdeaStoryblok>[];
}

export async function load({ url: { pathname }, url, data }) {
	storyblokInit({
		accessToken: PUBLIC_STORYBLOK_TOKEN,
		use: [apiPlugin],
		components: {
			post: Post,
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
				const {
					data: { story: homeStoryData }
				}: { data: { story: ISbStoryData<HomePageStoryblok> } } = await storyblokApi.get(
					'cdn/stories/home',
					{
						version: 'draft'
					}
				);

				// selecting categories listed in home page
				const foldersData = {
					categories: homeStoryData.content.listOfMessages.filter(
						(item) => item.component === 'categoryName'
					)
				} as { categories: CategoryNameStoryblok[] };

				const categoriesStoriesObj: { [k: string]: CategoriesStories } = {};

				// fetching post stories by category
				await Promise.all(
					foldersData.categories.map(async (folder) => {
						const { data: categoryData } = await storyblokApi.get('cdn/stories', {
							version: 'draft',
							starts_with: `${folder.slug}/`,
							// @TODO find out about sorting
							sort_by: 'first_published_at:desc'
						});

						// if folder (category) has stories - add
						if (categoryData.stories.length) {
							categoriesStoriesObj[folder.slug] = categoryData;
						}
					})
				);

				const categories = foldersData.categories
					.filter(({ slug }) => !!categoriesStoriesObj[slug])
					.map(({ slug, title: name }) => ({ name, slug }));

				const categoriesStories = categories.map(({ name, slug }) => ({
					name,
					slug,
					data: categoriesStoriesObj[slug]
				}));

				return {
					...data, // from +layout.server.ts
					...extraData,
					homeStory: homeStoryData,
					categories,
					categoriesStories,
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

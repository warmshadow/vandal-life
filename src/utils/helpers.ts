/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ISbStoryData } from '@storyblok/svelte';

import { DATA_DIR } from './constants';

import type {
	CategoryNameStoryblok,
	PostStoryblok,
	HomePageStoryblok,
	IdeaStoryblok
} from '../../component-types-sb';

export const getStoryData = async ({
	slug,
	storyblokApi,
	params,
	fsp,
	path
}: {
	slug?: string;
	storyblokApi?: any;
	params?: any;
	fsp?: any;
	path?: any;
}) => {
	if (storyblokApi) {
		return await storyblokApi.get(`cdn/stories/${params?.startsWith ? '' : slug}`, {
			version: 'draft',
			...params
		});
	} else if (path && fsp) {
		const filePath = path.join(DATA_DIR, `${slug}.json`);
		const data = await fsp.readFile(filePath, 'utf-8');
		const storyData = JSON.parse(data);

		return storyData;
	} else {
		throw new Error('Bad arguments for getStoryData function');
	}
};

interface CategoriesStories {
	stories: ISbStoryData<PostStoryblok | IdeaStoryblok>[];
}

export const fetchLayoutData = async ({
	path,
	fsp,
	storyblokApi
}: {
	path?: any;
	fsp?: any;
	storyblokApi?: any;
}) => {
	let environment;
	if (storyblokApi) {
		environment = 'client';
	} else if (path && fsp) {
		environment = 'server';
	} else {
		throw new Error('Wrong arguments for fetchLayoutData function');
	}

	const fetchProps = environment === 'server' ? { path, fsp } : { storyblokApi };

	let ideaStories: { data: { stories: ISbStoryData<IdeaStoryblok>[] } };
	if (environment === 'server') {
		ideaStories = await getStoryData({ slug: 'ideaStories', ...fetchProps });
	} else {
		ideaStories = await getStoryData({
			params: {
				filter_query: {
					component: {
						in: 'idea'
					}
				}
			},
			...fetchProps
		});
	}
	const IDEA_PAGES = ideaStories.data.stories.map(({ slug }) => slug);

	const {
		data: { story: homeStoryData }
	}: { data: { story: ISbStoryData<HomePageStoryblok> } } = await getStoryData({
		slug: 'home',
		...fetchProps
	});

	// selecting categories listed in home page
	const foldersData = {
		categories: homeStoryData.content.listOfBlocks.filter(
			(item) => item.component === 'categoryName'
		)
	} as { categories: CategoryNameStoryblok[] };

	const categoriesStoriesObj: { [k: string]: CategoriesStories } = {};

	// fetching post stories by category
	await Promise.all(
		foldersData.categories.map(async (folder) => {
			const isIdeaPage = IDEA_PAGES.includes(folder.slug);

			const { data: categoryData } = await getStoryData({
				slug: folder.slug,
				...(!isIdeaPage && {
					params: {
						starts_with: `${folder.slug}/`
					}
				}),
				...fetchProps
			});

			// if folder (category) has stories - add
			if (categoryData.stories?.length) {
				categoriesStoriesObj[folder.slug] = categoryData;
			} else if (categoryData.story?.content?.ads?.length) {
				categoriesStoriesObj[folder.slug] = { stories: [categoryData.story] };
			}
		})
	);

	const categories = foldersData.categories
		.filter(({ slug }) => !!categoriesStoriesObj[slug])
		.map(({ slug, title: name, metaDescription }) => ({
			type: IDEA_PAGES.includes(slug) ? 'idea' : 'post',
			name,
			slug,
			metaDescription
		}));

	const categoriesStories = categories.map(({ type, name, slug, metaDescription }) => ({
		type,
		name,
		slug,
		metaDescription,
		data: categoriesStoriesObj[slug]
	}));

	return {
		homeStory: homeStoryData,
		categories,
		categoriesStories
	};
};

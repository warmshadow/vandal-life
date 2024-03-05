/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ISbStoryData } from '@storyblok/svelte';

import { DATA_DIR } from './constants';

import type {
	CategoryNameStoryblok,
	PostStoryblok,
	HomePageStoryblok,
	IdeaStoryblok
} from '../../component-types-sb';

const getStoryData = async ({
	slug,
	startsWith,
	storyblokApi,
	fsp,
	path
}: {
	slug: string;
	startsWith?: boolean;
	storyblokApi?: any;
	fsp?: any;
	path?: any;
}) => {
	if (storyblokApi) {
		if (startsWith) {
			return await storyblokApi.get(`cdn/stories`, { starts_with: `${slug}/`, version: 'draft' });
		} else {
			return await storyblokApi.get(`cdn/stories/${slug}`, { version: 'draft' });
		}
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
			const { data: categoryData } = await getStoryData({
				slug: folder.slug,
				startsWith: folder.slug !== 'anything-goes',
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
		.map(({ slug, title: name }) => ({ name, slug }));

	const categoriesStories = categories.map(({ name, slug }) => ({
		name,
		slug,
		data: categoriesStoriesObj[slug]
	}));

	return {
		homeStory: homeStoryData,
		categories,
		categoriesStories
	};
};

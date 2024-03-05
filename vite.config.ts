import { defineConfig } from 'vite';
import StoryblokClient from 'storyblok-js-client';
import fs from 'fs';
import { sveltekit } from '@sveltejs/kit/vite';
import basicSsl from '@vitejs/plugin-basic-ssl';
import dotenv from 'dotenv';

import type { ISbStoryData } from '@storyblok/svelte';

import { DATA_DIR, CATEGORIES_DIR } from './src/utils/constants';
import type { CategoryNameStoryblok, HomePageStoryblok } from './component-types-sb';

export default defineConfig(() => {
	dotenv.config({ path: `.env` });

	return {
		plugins: [sveltekit(), basicSsl(), getStories()],
		server: {
			https: true
		}
	};
});

function getStories() {
	return {
		name: 'getStories',
		buildStart: async () => {
			const Storyblok = new StoryblokClient({
				accessToken: process.env.PUBLIC_STORYBLOK_TOKEN,
				cache: {
					clear: 'auto',
					type: 'memory'
				}
				// @TODO delete oauth token from CF
			});

			// create directory for data and categories
			if (!fs.existsSync(CATEGORIES_DIR)) {
				fs.mkdirSync(CATEGORIES_DIR, { recursive: true });
			}

			// fetching home story
			const {
				data: { story: homeStoryData }
			}: { data: { story: ISbStoryData<HomePageStoryblok> } } = await Storyblok.get(
				'cdn/stories/home',
				{
					version: 'draft' // @TODO update when live and use other access key only for published
				}
			);
			const homeJson = JSON.stringify(homeStoryData, null, 2);
			fs.writeFileSync(`${DATA_DIR}/home.json`, homeJson);

			// selecting categories listed in home page
			const foldersData = {
				categories: homeStoryData.content.listOfMessages.filter(
					(item) => item.component === 'categoryName'
				)
			} as { categories: CategoryNameStoryblok[] };
			const foldersJson = JSON.stringify(foldersData, null, 2);
			fs.writeFileSync(`${DATA_DIR}/folders.json`, foldersJson);

			// fetching post stories by category
			foldersData.categories.forEach(async (folder) => {
				// @TODO implement fetching all stories using per_page as default is 25, and max received in one call is 100
				const { data: categoryData } = await Storyblok.get('cdn/stories', {
					version: 'draft', // @TODO update when live and use other access key only for published
					starts_with: `${folder.slug}/`,
					// @TODO find out about sorting
					sort_by: 'first_published_at:desc'
				});

				// if folder (category) has stories - create file for category data
				if (categoryData.stories.length) {
					const categoryJson = JSON.stringify(categoryData, null, 2);
					fs.writeFileSync(`${CATEGORIES_DIR}/${folder.slug}.json`, categoryJson);
				}
			});

			// fetching anything goes page
			const {
				data: { story: anythingGoesStoryData }
			} = await Storyblok.get('cdn/stories/anything-goes', {
				version: 'draft' // @TODO update when live and use other access key only for published
			});

			const anythingGoesJson = JSON.stringify(anythingGoesStoryData, null, 2);
			fs.writeFileSync(`${DATA_DIR}/anything-goes.json`, anythingGoesJson);
		}
	};
}

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
			const homeData = (await Storyblok.get('cdn/stories/home', {
				version: 'draft' // @TODO update when live and use other access key only for published
			})) as { data: { story: ISbStoryData<HomePageStoryblok> } };
			const homeJson = JSON.stringify(homeData, null, 2);
			fs.writeFileSync(`${DATA_DIR}/home.json`, homeJson);

			// selecting categories listed in home page
			const foldersData = {
				categories: homeData.data.story.content.listOfBlocks.filter(
					(item) => item.component === 'categoryName'
				)
			} as { categories: CategoryNameStoryblok[] };

			// this file only for test
			const foldersJson = JSON.stringify(foldersData, null, 2);
			fs.writeFileSync(`${DATA_DIR}/folders.json`, foldersJson);

			// fetching post stories by category
			foldersData.categories.forEach(async (folder) => {
				// @TODO implement fetching all stories using per_page as default is 25, and max received in one call is 100
				const categoryData = await Storyblok.get(
					`cdn/stories${folder.slug === 'anything-goes' ? '/anything-goes' : ''}`,
					{
						version: 'draft', // @TODO update when live and use other access key only for published
						...(folder.slug !== 'anything-goes' && {
							starts_with: `${folder.slug}/`
						})
					}
				);

				// if folder (category) has stories - create file for category data
				if (categoryData.data.stories?.length || categoryData.data.story?.content.ads?.length) {
					const categoryJson = JSON.stringify(categoryData, null, 2);
					fs.writeFileSync(`${DATA_DIR}/${folder.slug}.json`, categoryJson);
				}
			});
		}
	};
}

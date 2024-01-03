import { defineConfig } from 'vite';
import StoryblokClient from 'storyblok-js-client';
import fs from 'fs';
import { sveltekit } from '@sveltejs/kit/vite';
import basicSsl from '@vitejs/plugin-basic-ssl';
import dotenv from 'dotenv';

import { DATA_DIR, CATEGORIES_DIR } from './src/utils/constants';

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
				},
				oauthToken: process.env.STORYBLOK_OAUTH_TOKEN
			});

			// create directory for data and categories
			if (!fs.existsSync(CATEGORIES_DIR)) {
				fs.mkdirSync(CATEGORIES_DIR, { recursive: true });
			}

			const { data: foldersData } = await Storyblok.get('spaces/267541/stories/', {
				folder_only: true
			});
			const foldersJson = JSON.stringify(foldersData, null, 2);
			fs.writeFileSync(`${DATA_DIR}/folders.json`, foldersJson);

			foldersData.stories.forEach(async (folder: { slug: string }) => {
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
		}
	};
}

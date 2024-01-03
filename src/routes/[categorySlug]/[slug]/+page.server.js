import fs from 'fs';

export async function load({ url: { pathname }, params }) {
	const filePath = `data/categories/${params.categorySlug}.json`;
	const jsonContent = fs.readFileSync(filePath, 'utf-8');
	const jsonObject = JSON.parse(jsonContent);

	// @TODO fix typing error
	const story = jsonObject.stories.find(({ full_slug }) => `/${full_slug}` === pathname);

	return {
		story
	};
}

export async function load({ url: { pathname }, parent }) {
	const { categoriesStories } = await parent();

	return {
		categoryStories: categoriesStories.find((category) => `/${category.slug}` === pathname)
	};
}

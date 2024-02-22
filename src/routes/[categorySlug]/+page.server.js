export async function load({ url: { pathname }, parent }) {
	const { categoriesStories } = await parent();

	const categoryStories = categoriesStories.find((category) => `/${category.slug}` === pathname);

	return {
		categoryStories
	};
}

export async function load({ parent }) {
	const data = await parent();

	return {
		...data,
		story: data.homeStory,
		metaData: { title: 'Vandal Life', description: data.homeStory.content.metaDescription }
	};
}

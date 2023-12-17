export async function load({ url: { search }, parent }) {
	const { storyblokApi } = await parent();

	const searchParams = new URLSearchParams(search);
	const storyId = searchParams.get('_storyblok');

	const dataStory = await storyblokApi.get(`cdn/stories/${storyId}`, {
		version: 'draft'
	});

	return {
		story: dataStory.data.story
	};
}

export const ssr = false;

<script lang="ts">
	import CardBigText from '$lib/CardBigText.svelte';
	import ArticlesSection from '$lib/sections/ArticlesSection.svelte';

	import placeholder from '$lib/placeholder.png';

	export let data;
</script>

<CardBigText
	content={[{ component: 'bigText', leftText: data.categoryStories.name }]}
	isCategoryName
/>
<ArticlesSection
	data={data.categoryStories.data.stories.map((story) => ({
		src: placeholder,
		title: story.content.title,
		description: story.content.subtitle,
		link: { to: `/${story.full_slug}` }
	}))}
/>

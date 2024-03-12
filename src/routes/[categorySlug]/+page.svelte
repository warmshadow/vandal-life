<script lang="ts">
	import CardBigText from '$lib/CardBigText.svelte';
	import ArticlesSection from '$lib/sections/ArticlesSection.svelte';

	import placeholder from '$lib/placeholder.png';
	import { optimizeImage } from '../../utils/image-helpers';

	export let data;
</script>

{#if data.categoryStories}
	<CardBigText content={[{ component: 'bigText', leftText: data.categoryStories.name }]} />
	<ArticlesSection
		data={data.categoryStories.data.stories.map((story) => ({
			// @TODO handle without this placeholder
			src: optimizeImage(story.content.featuredImage, '1068x392') ?? placeholder,
			title: story.content.title,
			description: story.content.subtitle,
			link: { to: `/${story.full_slug}` }
		}))}
	/>
{/if}

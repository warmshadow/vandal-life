<script lang="ts">
	import CardBigText from '$lib/CardBigText.svelte';
	import ArticlesSection from '$lib/sections/ArticlesSection.svelte';

	import placeholder from '$lib/placeholder.png';

	export let data;
</script>

{#if data.categoryStories}
	<CardBigText content={[{ component: 'bigText', leftText: data.categoryStories.name }]} />
	<ArticlesSection
		data={data.categoryStories.data.stories.map((story) => ({
			src: placeholder,
			title: story.content.title,
			description: story.content.subtitle,
			link: { to: `/${story.full_slug}` }
		}))}
	/>
{/if}

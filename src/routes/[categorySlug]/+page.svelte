<script lang="ts">
	import { StoryblokComponent } from '@storyblok/svelte';

	import CardBigText from '$lib/CardBigText.svelte';
	import ArticlesSection from '$lib/sections/ArticlesSection.svelte';

	import { optimizeImage } from '../../utils/image-helpers';

	export let data;
</script>

{#if !!data.postStories}
	<CardBigText content={[{ component: 'bigText', leftText: data.postStories.name }]} />
	<ArticlesSection
		data={data.postStories.data.stories.map((story) => ({
			src: optimizeImage(story.content.featuredImage, '1068x392') ?? undefined,
			title: story.content.title,
			description: story.content.subtitle,
			link: { to: `/${story.full_slug}` }
		}))}
	/>
{:else if !!data.ideaStory}
	<StoryblokComponent blok={data.ideaStory.content} />
{/if}

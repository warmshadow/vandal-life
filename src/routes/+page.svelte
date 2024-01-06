<script lang="ts">
	import CardBigText from '$lib/CardBigText.svelte';
	import CategorySection from '$lib/sections/CategorySection.svelte';

	import placeholder from '$lib/placeholder.png';

	import { onMount } from 'svelte';
	import { useStoryblokBridge, StoryblokComponent } from '@storyblok/svelte';

	export let data: any; // @TODO add typing so it covers both client side story and server side categories

	onMount(() => {
		useStoryblokBridge(data.story.id, (newStory) => (data.story = newStory));
	});

	const categorySectionData = {
		categoryCard: { content: [{ component: 'bigText', leftText: 'new\nnews.\non\nculture.' }] }
	};
</script>

{#if data.homeStory}
	{#each data.homeStory.content.listOfMessages as { cards }}
		{#each cards as { content, variant }}
			<CardBigText {content} {variant} />
		{/each}
	{/each}
{/if}

<!-- {#if data.story}
	<StoryblokComponent blok={data.story.content} />
{/if} -->

<a href="/new-news-on-culture/cultural-shifts-unveiled">Test Postas</a>

{#if data.categories}
	{#each Object.keys(data.categories) as category}
		<!-- @TODO add custom red block here -->
		<CategorySection
			data={{
				...categorySectionData,
				// @TODO remove slice here when amount of stories are handled in +page.server.js
				// @TODO fix story argument typing error
				cards: data.categories[category].stories.slice(0, 3).map((story) => ({
					src: placeholder,
					title: story.content.title,
					description: story.content.subtitle,
					link: { to: `/${story.full_slug}` }
				}))
			}}
		/>
	{/each}
{/if}

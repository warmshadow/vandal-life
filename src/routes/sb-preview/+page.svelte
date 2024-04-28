<script lang="ts">
	import { onMount } from 'svelte';
	import { useStoryblokBridge, StoryblokComponent } from '@storyblok/svelte';

	import type {
		IdeaStoryblok,
		PostStoryblok,
		HomePageStoryblok
	} from '../../../component-types-sb'; // @TODO better import?

	export let data;

	// for storyblok live editor
	if (data.ideaStoryClient) {
		onMount(() => {
			useStoryblokBridge<IdeaStoryblok>(
				data.ideaStoryClient!.id,
				(newStory) => (data.ideaStoryClient = newStory)
			);
		});
	} else if (data.postStoryClient) {
		onMount(() => {
			useStoryblokBridge<PostStoryblok>(
				data.postStoryClient!.id,
				(newStory) => (data.postStoryClient = newStory)
			);
		});
	} else if (data.homeStoryClient) {
		onMount(() => {
			useStoryblokBridge<HomePageStoryblok>(
				data.homeStoryClient!.id,
				(newStory) => (data.homeStoryClient = newStory)
			);
		});
	}
</script>

<svelte:head>
	<title>Preview page</title>
	<meta name="robots" content="noindex nofollow" />
</svelte:head>

{#if !!data.postStoryClient}
	<StoryblokComponent
		blok={data.postStoryClient.content}
		date={data.postStoryClient.published_at}
	/>
{:else if !!data.ideaStoryClient}
	<StoryblokComponent blok={data.ideaStoryClient.content} />
{:else if !!data.homeStoryClient}
	<StoryblokComponent
		blok={data.homeStoryClient.content}
		categoriesStories={data.categoriesStories}
	/>
{/if}

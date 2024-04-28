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
	if (data.ideaStory) {
		onMount(() => {
			useStoryblokBridge<IdeaStoryblok>(
				data.ideaStory!.id,
				(newStory) => (data.ideaStory = newStory)
			);
		});
	} else if (data.postStory) {
		onMount(() => {
			useStoryblokBridge<PostStoryblok>(
				data.postStory!.id,
				(newStory) => (data.postStory = newStory)
			);
		});
	} else if (data.homeStory) {
		onMount(() => {
			useStoryblokBridge<HomePageStoryblok>(
				data.homeStory!.id,
				(newStory) => (data.homeStory = newStory)
			);
		});
	}
</script>

<svelte:head>
	<title>Preview page</title>
	<meta name="robots" content="noindex nofollow" />
</svelte:head>

{#if !!data.postStory}
	<StoryblokComponent blok={data.postStory.content} date={data.postStory.published_at} />
{:else if !!data.ideaStory}
	<StoryblokComponent blok={data.ideaStory.content} />
{:else if !!data.homeStory}
	<StoryblokComponent blok={data.homeStory.content} categoriesStories={data.categoriesStories} />
{/if}

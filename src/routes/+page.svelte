<script lang="ts">
	import { onMount } from 'svelte';
	import { useStoryblokBridge, StoryblokComponent } from '@storyblok/svelte';

	import type { HomePageStoryblok } from '../../component-types-sb'; // @TODO better import?

	export let data;

	// for storyblok live editor
	if (data.story.id && data.previewMode) {
		onMount(() => {
			useStoryblokBridge<HomePageStoryblok>(data.story.id, (newStory) => (data.story = newStory));
		});
	}
</script>

<StoryblokComponent blok={data.story.content} categoriesStories={data.categoriesStories} />

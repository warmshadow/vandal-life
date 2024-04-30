<script lang="ts">
	import { onMount } from 'svelte';
	import { useStoryblokBridge, StoryblokComponent } from '@storyblok/svelte';

	import type { PostStoryblok } from '../../../../component-types-sb';

	export let data;

	// for storyblok live editor
	if (data.story?.id && data.previewMode) {
		onMount(() => {
			useStoryblokBridge<PostStoryblok>(data.story!.id, (newStory) => (data.story = newStory));
		});
	}
</script>

{#if data.story}
	<StoryblokComponent
		blok={data.story.content}
		date={data.story.published_at}
		nextStories={data.nextStories}
	/>
{/if}

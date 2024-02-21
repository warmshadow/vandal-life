<script lang="ts">
	import { onMount } from 'svelte';
	import { useStoryblokBridge, StoryblokComponent } from '@storyblok/svelte';

	export let data;

	// for storyblok live editor
	if (data.story?.id && data.previewMode) {
		onMount(() => {
			useStoryblokBridge(data.story!.id, (newStory) => (data.story = newStory));
		});
	}
</script>

{#if data.story}
	<StoryblokComponent blok={data.story.content} date={data.story.published_at} />
{/if}

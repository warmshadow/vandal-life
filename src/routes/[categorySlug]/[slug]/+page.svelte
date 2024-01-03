<script lang="ts">
	import { StoryblokComponent } from '@storyblok/svelte';

	export let data;
</script>

{#if data.story}
	<StoryblokComponent blok={data.story.content} />
{/if}

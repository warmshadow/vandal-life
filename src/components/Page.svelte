<script>
	// @ts-nocheck

	import { storyblokEditable, StoryblokComponent } from '@storyblok/svelte';

	export let blok;
</script>

{#key blok}
	<div use:storyblokEditable={blok}>
		{#each blok.body as item}
			<StoryblokComponent blok={item} />
		{/each}
	</div>
{/key}

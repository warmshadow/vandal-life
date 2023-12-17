<script>
	// @ts-nocheck
	import { marked } from 'marked';

	import { storyblokEditable } from '@storyblok/svelte';

	import Text from '$lib/Text.svelte';

	export let blok;
</script>

{#key blok}
	<div use:storyblokEditable={blok} class="container">
		<Text tag="h2">{blok.title}</Text>
		<Text tag="p">{blok.subtitle}</Text>
		<Text tag="p" color="grey">{blok.authors}</Text>
		<Text tag="p">{@html marked(blok.content)}</Text>
	</div>
{/key}

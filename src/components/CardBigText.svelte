<script>
	// @ts-nocheck

	import { storyblokEditable } from '@storyblok/svelte';
	import CardBigText from '$lib/CardBigText.svelte';

	export let blok;
</script>

<div use:storyblokEditable={blok}>
	<CardBigText content={blok.content} variant={blok.variant} />
</div>

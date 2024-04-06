<script lang="ts">
	import type { ComponentProps } from 'svelte';
	import { storyblokEditable } from '@storyblok/svelte';

	import Card from '$lib/Card.svelte';

	export let data: ComponentProps<Card>[];
</script>

<div class="container">
	<div class="grid-container">
		{#each data as card}
			<div use:storyblokEditable={card}>
				<Card {...card} />
			</div>
		{/each}
	</div>
</div>

<style>
	.container {
		padding: 0;
	}

	@media (min-width: 1180px) {
		.container {
			padding: 0 106px;
		}
	}

	@media (min-width: 1460px) {
		.container {
			padding: 0 128px;
		}
	}

	.grid-container {
		display: grid;
		grid-auto-rows: 1fr;
		grid-template-columns: minmax(0, 1fr);
		gap: 24px;
	}

	@media (min-width: 701px) {
		.grid-container {
			grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
		}
	}
</style>

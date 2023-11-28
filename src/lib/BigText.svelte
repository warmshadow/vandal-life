<script lang="ts">
	import Text from '$lib/Text.svelte';

	export let lines: string[];
</script>

<div class="fancy">
	{#each lines as line}
		<Text tag="h1" color="white">{line}</Text>
	{/each}
</div>

<style>
	.fancy {
		display: flex;
		flex-direction: column;
		align-items: flex-start;

		padding: 20px 0;
	}

	.fancy :global(h1) {
		font-family: 'Folio', sans-serif;
		line-height: 35px;
		-webkit-text-stroke: 0.7px #000;
	}

	@media (max-width: 1460px) {
		.fancy {
			padding: 10px 0;
		}

		.fancy :global(h1) {
			font-size: 48px;
			line-height: 23px;
		}
	}
</style>

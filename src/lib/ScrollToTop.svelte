<script lang="ts">
	import ArrowTop from '$lib/icons/ArrowTop.svelte';

	let innerWidth: number;
	let scrollY: number;
</script>

<svelte:window bind:innerWidth bind:scrollY />

{#if innerWidth < 1180}
	<button
		class:visible={scrollY >= 300}
		on:click={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><ArrowTop /></button
	>
{/if}

<style>
	button {
		width: 48px;
		height: 48px;
		padding: 10px;
		border-radius: 100px;
		border: 1px solid var(--black);
		color: var(--black);

		cursor: pointer;
		background-color: var(--light-grey);

		position: fixed;
		right: 32px;
		top: 20%;

		transition: all 0.3s ease-in-out;

		opacity: 0;
		visibility: hidden;
	}

	button.visible {
		opacity: 1;
		visibility: visible;
	}

	@media (min-width: 700px) {
		button {
			right: 48px;
		}
	}
</style>

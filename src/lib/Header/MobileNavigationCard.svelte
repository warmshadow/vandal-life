<script lang="ts">
	import type { ComponentProps } from 'svelte';

	import Button from '$lib/Button.svelte';

	export let links: ComponentProps<Button>[];
</script>

<div class="container">
	{#each links as { label, link, isActive }}
		<Button {label} {link} {isActive} on:click />
	{/each}
</div>

<style>
	.container {
		position: absolute;
		top: 101%;
		left: 0;

		width: 100%;
		padding: 24px;
		background-color: var(--primary);
		border-radius: 12px;

		display: flex;
		flex-direction: column;
		align-items: start;
		gap: 24px;

		transition: all 0.5s;
	}
</style>

<script lang="ts">
	import Text from '$lib/Text.svelte';
	import Link from '$lib/Link.svelte';
	import type { ComponentProps } from 'svelte';

	export let src: string | undefined = undefined;
	export let title: string;
	export let description: string | undefined = undefined;
	export let link: ComponentProps<Link>;
</script>

<div class="container">
	{#if !!src}
		<div class="img-container" style="background-image: url({src})" />
	{/if}
	<div class="content">
		<div class="text-block">
			<Text tag="h6" type="bold">{title}</Text>
			{#if !!description}
				<Text tag="p">{description}</Text>
			{/if}
		</div>
		<Link {...link} />
	</div>
</div>

<style>
	.container {
		max-width: 100%;
		padding: 16px;

		flex-basis: 350px;
		flex-shrink: 0;

		display: flex;
		flex-direction: column;
		row-gap: 16px;
		max-height: 464px;

		border-radius: 20px;
		border: 1px solid var(--black);
	}

	.img-container {
		border-radius: 12px;
		height: 196px;
		flex-shrink: 0;

		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
	}

	.content {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		row-gap: 24px;
	}

	.text-block {
		display: flex;
		flex-direction: column;
		row-gap: 8px;
	}

	@media (min-width: 1460px) {
		.container {
			padding: 24px;
			row-gap: 24px;
		}

		.text-block {
			row-gap: 16px;
		}
	}
</style>

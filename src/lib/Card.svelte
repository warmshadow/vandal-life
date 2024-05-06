<script lang="ts">
	import Text from '$lib/Text.svelte';
	import Link from '$lib/Link.svelte';
	import type { ComponentProps } from 'svelte';
	import { shortenString } from '../utils/shortenString';

	export let src: string | undefined = undefined;
	export let title: string;
	export let description: string | undefined = undefined;
	export let link: ComponentProps<Link>;
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<svelte:element
	this={link.to ? 'a' : 'div'}
	class="link-wrapper"
	href={link.to}
	on:click={link.onClick}
>
	<div class="container">
		{#if !!src}
			<div class="img-container" style="background-image: url('{src}')" />
		{/if}
		<div class="content">
			<div class="text-block">
				{#if !!title}
					<Text tag="h6" type="bold">{shortenString(title, 115)}</Text>
				{/if}
				{#if !!description}
					<Text tag="p">{shortenString(description, 100)}</Text>
				{/if}
			</div>
			<!-- overriding to and onClick prop here to make link a div, as that logic is used on card wrapper -->
			<Link variant="animated-line" {...link} to={undefined} onClick={undefined} />
		</div>
	</div>
</svelte:element>

<style>
	.link-wrapper {
		height: 100%;
		cursor: pointer;
	}
	.link-wrapper:hover :global(.link.animated-line::after) {
		transform: scaleX(0);
		transform-origin: bottom left;
	}

	.container {
		max-width: 100%;
		padding: 16px;

		flex-basis: 350px;
		flex-shrink: 0;

		display: flex;
		flex-direction: column;
		row-gap: 16px;

		border-radius: 20px;
		border: 1px solid var(--black);

		height: 100%;
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

		height: 100%;
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

<script lang="ts">
	import BigText from '$lib/BigText.svelte';
	import Text from '$lib/Text.svelte';
	import type { ComponentProps } from 'svelte';

	export let title: string | undefined = undefined;
	export let subtitle: string | undefined = undefined;
	export let bigTextBlocks: {
		block1: ComponentProps<BigText>;
		block2?: ComponentProps<BigText>;
	};
	export let isCentered: boolean | undefined = false;
	export let variant: 'primary' | 'black' = 'primary';
</script>

<div class={`container ${variant}`}>
	<div class="content">
		{#if !!title}
			<Text tag="p" type="medium" color="white">{title}</Text>
		{/if}
		<div class={`text-block ${isCentered && 'centered'}`}>
			<BigText {...bigTextBlocks.block1} />
			{#if !!bigTextBlocks.block2?.lines.length}
				<BigText lines={['Love', 'friends.']} />
			{/if}
		</div>
		{#if !!subtitle}
			<Text tag="p" type="medium" color="white">{subtitle}</Text>
		{/if}
	</div>
</div>

<style>
	.container {
		max-width: 100%;
		padding: 48px 16px;

		display: flex;
		flex-direction: column;

		border-radius: 12px;
		background-color: var(--primary);

		height: 100%;
	}

	.container.black {
		background-color: var(--black);
	}

	.content {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		row-gap: 32px;

		height: 100%;
	}

	.text-block {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		gap: 32px;

		/* @TODO to break text earlier, look for better logic */
		padding-right: 48px;

		height: 100%;
	}

	.text-block.centered {
		justify-content: center;
		align-items: center;
	}

	@media (min-width: 1180px) {
		.container {
			padding: 48px 40px;
		}
	}

	@media (min-width: 1460px) {
		.container {
			padding: 48px 128px;
		}

		.content :global(p) {
			font-size: 24px;
			line-height: 32px;
		}
	}
</style>

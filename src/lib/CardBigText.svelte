<script lang="ts">
	import BigText from '$lib/BigText.svelte';
	import Text from '$lib/Text.svelte';

	export let content: any; // @TODO add typing
	export let variant: 'primary' | 'secondary' = 'primary';
	export let isCentered: boolean | undefined = false;
</script>

<div class={`container ${variant}`}>
	<div class="content">
		{#each content as { component, text, leftText, rightText }}
			{#if component === 'smallText'}
				<Text tag="p" type="medium" color="white">{text}</Text>
			{/if}
			{#if component === 'bigText'}
				<div class={`text-block ${isCentered && 'centered'}`}>
					<div>
						<BigText text={leftText} />
					</div>
					{#if rightText}
						<BigText text={rightText} />
					{/if}
				</div>
			{/if}
		{/each}
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

	/* .category-name-wrapper :global(h1) {
		width: min-content;
	} */

	.container.secondary {
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

		height: 100%;
	}

	@media (min-width: 1181px) {
		.text-block.centered {
			justify-content: center;
			align-items: center;
		}
	}

	@media (min-width: 1180px) {
		/* .container {
			padding: 48px 40px;
		} */
	}

	@media (min-width: 1460px) {
		/* .container {
			padding: 48px 128px;
		} */

		.content :global(p) {
			font-size: 24px;
			line-height: 32px;
		}
	}
</style>

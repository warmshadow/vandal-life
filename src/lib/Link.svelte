<script lang="ts">
	import ArrowRight from '$lib/icons/ArrowRight.svelte';

	export let to: string | undefined = undefined;
	export let label: string = 'Read more';
	export let variant: 'default' | 'animated-line' = 'default';
	export let size: 'large' | 'small' = 'large';
	export let withArrow: boolean = false;

	export let onClick: (() => void) | undefined = undefined;

	let tag = 'a';
	if (!to && !!onClick) {
		tag = 'button';
	}
	const hrefProp = tag === 'button' ? { href: to } : {}; // to bypass typing error when passing href directly
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<svelte:element
	this={tag}
	{...hrefProp}
	on:click={onClick}
	class:link={true}
	class={variant === 'default'
		? `${size === 'large' ? 'heading6' : 'body'} medium default`
		: 'body animated-line'}
	>{#if withArrow}
		<span class="flex-content">
			{label}
			<span class="arrow-wrapper"><ArrowRight /></span>
		</span>
	{:else}
		{label}
	{/if}
</svelte:element>

<style>
	.link {
		display: inline-block;
		position: relative;
		width: fit-content;

		background-color: transparent;
		border: none;

		color: var(--black);

		cursor: pointer;
	}

	.link.default:hover {
		color: #616161;
		transition: all 0.25s;
	}

	.link.animated-line::after {
		content: '';
		position: absolute;
		width: 100%;
		height: 1px;
		bottom: 0;
		left: 0;
		background-color: var(--black);
		transform: scaleX(1);
		transform-origin: bottom left;
		transition: transform 0.25s ease-out;
	}

	.link.animated-line:hover::after {
		transform: scaleX(0);
		transform-origin: bottom left;
	}

	.flex-content {
		display: flex;
		justify-content: center;
		gap: 16px;
	}

	.arrow-wrapper {
		width: 32px;
		height: 32px;
	}
</style>

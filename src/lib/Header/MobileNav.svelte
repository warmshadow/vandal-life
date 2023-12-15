<script lang="ts">
	import HamburgerIcon from '$lib/icons/Hamburger.svelte';

	import ScrollingText from './ScrollingText.svelte';
	import MobileNavigationCard from './MobileNavigationCard.svelte';

	export let categoryName: string;

	$: showNavigation = false;
</script>

<ScrollingText {categoryName} />
<button
	class="hamburger-wrapper"
	class:active={showNavigation}
	on:click={() => (showNavigation = !showNavigation)}
>
	<HamburgerIcon />
</button>
{#if showNavigation}
	<MobileNavigationCard links={$$restProps.links} on:click={() => (showNavigation = false)} />
{/if}

<style>
	.hamburger-wrapper {
		width: 40px;
		height: 40px;

		cursor: pointer;

		border: none;
		background-color: transparent;
	}

	.hamburger-wrapper:hover :global(#border),
	.hamburger-wrapper.active :global(#border) {
		stroke: var(--black);
		transition: all 0.3s;
	}
	.hamburger-wrapper:hover :global(#background),
	.hamburger-wrapper.active :global(#background) {
		fill: var(--black);
		transition: all 0.3s;
	}
	.hamburger-wrapper:hover :global(#lines),
	.hamburger-wrapper.active :global(#lines) {
		stroke: var(--white);
		transition: all 0.3s;
	}
</style>

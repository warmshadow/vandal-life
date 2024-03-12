<script lang="ts">
	import HamburgerIcon from '$lib/icons/Hamburger.svelte';

	import ScrollingText from './ScrollingText.svelte';
	import MobileNavigationCard from './MobileNavigationCard.svelte';

	export let categoryName: string;

	$: showNavigation = false;

	function clickOutside(element: Element, callbackFunction: () => void) {
		function onClick(event: MouseEvent) {
			if (!element.contains(event.target as Node)) {
				callbackFunction();
			}
		}

		document.body.addEventListener('click', onClick);

		return {
			update(newCallbackFunction: () => void) {
				callbackFunction = newCallbackFunction;
			},
			destroy() {
				document.body.removeEventListener('click', onClick);
			}
		};
	}
</script>

<ScrollingText {categoryName} />
<button
	class="hamburger-wrapper"
	class:active={showNavigation}
	on:click={(e) => {
		if (!showNavigation) {
			e.stopPropagation();
		}
		showNavigation = !showNavigation;
	}}
>
	<HamburgerIcon />
</button>
{#if showNavigation}
	<div
		use:clickOutside={() => {
			showNavigation = !showNavigation;
		}}
		class="navigation-card-wrapper"
	>
		<MobileNavigationCard links={$$restProps.links} on:click={() => (showNavigation = false)} />
	</div>
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

	.navigation-card-wrapper {
		position: absolute;
		top: 101%;
		left: 0;

		width: 100%;
	}
</style>

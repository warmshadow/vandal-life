<script lang="ts">
	import Text from '$lib/Text.svelte';
	import MobileNavigation from '$lib/MobileNavigation.svelte';

	import Hamburger from '$lib/icons/Hamburger.svelte';

	export let categoryName: string;

	$: showMobileButtons = false;
</script>

<div class="animation-container">
	{#each Array.from({ length: 2 }) as _}
		<span class="scrolling-text">
			{#each Array.from({ length: 5 }) as _}
				<Text tag="p">{categoryName}</Text>
			{/each}
		</span>
	{/each}
</div>
<button
	class="hamburger-wrapper"
	class:active={showMobileButtons}
	on:click={() => (showMobileButtons = !showMobileButtons)}
>
	<Hamburger />
</button>
{#if showMobileButtons}
	<MobileNavigation links={$$restProps.links} />
{/if}

<style>
	.animation-container {
		position: relative;
		border: 1px solid var(--black);
		border-radius: 120px;
		padding: 8px 16px;
		overflow: hidden;

		display: flex;

		width: 166px;
		margin: 2px 0;
	}

	.animation-container:before {
		content: '';
		box-shadow: inset 10px 0 10px 5px white, inset -10px 0 10px 5px white;
		position: absolute;
		pointer-events: none;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 2;
	}

	@media (min-width: 1180px) {
		.animation-container {
			width: 320px;
		}
	}

	@media (min-width: 1460px) {
		.animation-container {
			width: 460px;
		}
	}

	.scrolling-text {
		padding-left: 16px;
		padding-right: 16px;
		display: flex;
		align-items: center;
		gap: 32px;

		-moz-animation: scroll-left 10s linear infinite;
		-webkit-animation: scroll-left 10s linear infinite;
		animation: scroll-left 10s linear infinite;
	}

	.scrolling-text > :global(p) {
		text-wrap: nowrap;
	}

	@-moz-keyframes scroll-left {
		0% {
			-moz-transform: translateX(0);
		}
		100% {
			-moz-transform: translateX(-100%);
		}
	}
	@-webkit-keyframes scroll-left {
		0% {
			-webkit-transform: translateX(0);
		}
		100% {
			-webkit-transform: translateX(-100%);
		}
	}
	@keyframes scroll-left {
		0% {
			-moz-transform: translateX(0);
			-webkit-transform: translateX(0);
			transform: translateX(0);
		}
		100% {
			-moz-transform: translateX(-100%);
			-webkit-transform: translateX(-100%);
			transform: translateX(-100%);
		}
	}

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

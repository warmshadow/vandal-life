<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import Text from '$lib/Text.svelte';

	export let categoryName: string;

	let animationDuration: number;
	let animationStyle: string | null;

	// $page.url.pathname check to force recalculation when page changes
	$: if (browser && $page.url.pathname) {
		// calculating duration so the animation speed is same for all lengths of text
		const scrollingElement = document?.getElementById('scrolling-text-id');

		if (scrollingElement) {
			animationDuration = scrollingElement.getBoundingClientRect().width / 50;
			animationStyle = animationDuration
				? `-moz-animation: scroll-left ${animationDuration}s linear infinite; -webkit-animation: scroll-left ${animationDuration}s linear infinite; animation: scroll-left ${animationDuration}s linear infinite;`
				: null;
		}
	}
</script>

<div class="animation-container">
	{#key $page.url.pathname}
		{#each Array.from({ length: 2 }) as _}
			<span class="scrolling-text" id="scrolling-text-id" style={animationStyle}>
				{#each Array.from({ length: 5 }) as _}
					<Text tag="p">{categoryName}</Text>
				{/each}
			</span>
		{/each}
	{/key}
</div>

<style>
	.animation-container {
		background-color: var(--white);
		position: relative;
		border: 1px solid var(--black);
		border-radius: 120px;
		padding: 7px 16px;
		overflow: hidden;

		display: flex;

		width: 166px;
	}

	.animation-container:before {
		content: '';
		box-shadow: inset 10px 0 10px 5px white, inset -10px 0 10px 5px white;
		border-radius: 120px;

		position: absolute;
		pointer-events: none;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 2;
	}

	@media (min-width: 700px) {
		.animation-container {
			width: 320px;
		}
	}

	@media (min-width: 1181px) {
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
	}

	.scrolling-text > :global(p) {
		white-space: nowrap;
	}

	/* making keyframes global so animation work in inline styles */
	@-moz-keyframes -global-scroll-left {
		0% {
			-moz-transform: translateX(0);
		}
		100% {
			-moz-transform: translateX(-100%);
		}
	}
	@-webkit-keyframes -global-scroll-left {
		0% {
			-webkit-transform: translateX(0);
		}
		100% {
			-webkit-transform: translateX(-100%);
		}
	}
	@keyframes -global-scroll-left {
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
</style>

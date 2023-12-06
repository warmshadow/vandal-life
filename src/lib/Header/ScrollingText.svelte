<script lang="ts">
	import Text from '$lib/Text.svelte';

	export let categoryName: string;
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

<style>
	.animation-container {
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
		white-space: nowrap;
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
</style>

<script lang="ts">
	import type { ComponentProps } from 'svelte';

	import Card from '$lib/Card.svelte';
	import Text from '$lib/Text.svelte';
	import ArrowLeft from '$lib/icons/ArrowLeft.svelte';
	import ArrowRight from '$lib/icons/ArrowRight.svelte';

	export let cards: ComponentProps<Card>[];

	const getMinimumPositive = (min: number, max: number) => Math.min(Math.max(0, min), max);

	let innerWidth: number;
	let maxSteps: number = 0;

	$: if (innerWidth <= 1180) {
		maxSteps = innerWidth <= 700 ? Math.max(0, cards.length - 1) : Math.max(0, cards.length - 2);
	} else {
		maxSteps = Math.max(0, cards.length - 3);
	}

	let currentStep = 0;
	$: currentStep = getMinimumPositive(currentStep, maxSteps); // updates step when screen size changes

	const scrollStep = (direction: 'forward' | 'backward') => {
		if (direction === 'forward') {
			currentStep = currentStep !== maxSteps ? currentStep + 1 : currentStep;
		} else {
			currentStep = currentStep !== 0 ? currentStep - 1 : currentStep;
		}
	};

	$: style = `transform: translateX(calc(${getMinimumPositive(
		currentStep,
		maxSteps
	)} * (-100% - var(--gap))))`;

	let startX = 0;
	let endX = 0;
</script>

<svelte:window bind:innerWidth />

<div class="container">
	<div class="info">
		<Text tag="p">Read Next</Text>
		<!-- @TODO move to separate component to avoid duplication -->
		<div
			class="buttons-wrapper desktop"
			class:hide-mobile={cards.length < 2}
			class:hide-tablet={cards.length < 3}
			class:hide-desktop={cards.length < 4}
		>
			<button
				class="icon-wrapper"
				on:click={() => scrollStep('backward')}
				disabled={currentStep <= 0}
			>
				<ArrowLeft />
			</button>
			<button
				class="icon-wrapper"
				on:click={() => scrollStep('forward')}
				disabled={currentStep >= maxSteps}
			>
				<ArrowRight />
			</button>
		</div>
	</div>
	<div
		class="grid-container"
		on:touchstart={(event) => {
			if (innerWidth <= 1180) {
				startX = event.touches[0].clientX;
			}
		}}
		on:touchend={(event) => {
			if (innerWidth <= 1180) {
				endX = event.changedTouches[0].clientX;
				const deltaX = endX - startX;
				const swipeThreshold = 50;

				if (Math.abs(deltaX) > swipeThreshold) {
					if (deltaX > 0) {
						scrollStep('backward');
					} else {
						scrollStep('forward');
					}
				}
			}
		}}
	>
		{#each cards as card}
			<div class="item" {style}>
				<Card {...card} />
			</div>
		{/each}
	</div>
	<div
		class="buttons-wrapper mobile"
		class:hide-mobile={cards.length < 2}
		class:hide-tablet={cards.length < 3}
		class:hide-desktop={cards.length < 4}
	>
		<button
			class="icon-wrapper"
			on:click={() => scrollStep('backward')}
			disabled={currentStep <= 0}
		>
			<ArrowLeft />
		</button>
		<button
			class="icon-wrapper"
			on:click={() => scrollStep('forward')}
			disabled={currentStep >= maxSteps}
		>
			<ArrowRight />
		</button>
	</div>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		gap: 12px;
		border-top: 1px solid black;
	}

	.info {
		padding-top: 16px;
		padding-bottom: 4px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.buttons-wrapper.desktop {
		display: none;
		margin-left: auto;
	}

	.grid-container {
		--gap: 16px;

		display: grid;
		gap: var(--gap);
		grid-template-rows: 1fr;
		grid-template-columns: repeat(6, 100%);
		overflow: hidden;
	}

	.item {
		grid-row: 1;
		grid-column: span 1;
		transition: all 0.3s;
	}

	.buttons-wrapper {
		display: flex;
		justify-content: space-between;
	}

	.buttons-wrapper.hide-mobile {
		display: none;
	}

	@media (min-width: 700px) {
		.grid-container {
			grid-template-columns: repeat(6, calc(50% - (var(--gap) / 2)));
		}

		.buttons-wrapper.hide-tablet {
			display: none;
		}
	}

	@media (min-width: 1181px) {
		.grid-container {
			grid-template-columns: repeat(6, calc(33% - (var(--gap) / 2)));
		}

		.buttons-wrapper.desktop {
			display: block;
		}

		.buttons-wrapper.mobile {
			display: none;
		}

		.buttons-wrapper.hide-desktop {
			display: none;
		}

		.info {
			padding-top: 24px;
			padding-bottom: 12px;
		}

		.info > :global(p) {
			font-size: 24px;
			line-height: 32px;
		}
	}

	.icon-wrapper {
		width: 28px;
		height: 28px;

		color: var(--black);
		cursor: pointer;

		border: none;
		background-color: transparent;
	}
	.icon-wrapper:hover,
	.icon-wrapper[disabled] {
		color: #616161;
	}
	.icon-wrapper[disabled] {
		pointer-events: none;
	}
</style>

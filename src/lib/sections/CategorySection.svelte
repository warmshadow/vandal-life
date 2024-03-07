<script lang="ts">
	import type { ComponentProps } from 'svelte';

	import CardBigText from '$lib/CardBigText.svelte';
	import Card from '$lib/Card.svelte';
	import Link from '$lib/Link.svelte';
	import ArrowLeft from '$lib/icons/ArrowLeft.svelte';
	import ArrowRight from '$lib/icons/ArrowRight.svelte';

	export let data: {
		categoryCard: ComponentProps<CardBigText>;
		cards: ComponentProps<Card>[];
		categoryLink: string;
	};
	export let altOrder = false;

	const getMinimumPositive = (min: number, max: number) => Math.min(Math.max(0, min), max);

	let innerWidth: number;
	let maxSteps: number = 0;

	$: if (innerWidth <= 1180) {
		maxSteps =
			innerWidth <= 700 ? Math.max(0, data.cards.length - 1) : Math.max(0, data.cards.length - 2);
	} else {
		maxSteps = 0;
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
</script>

<svelte:window bind:innerWidth />

<div class="container">
	<div class="grid-container">
		<div class="category-item" class:altOrder>
			<CardBigText {...data.categoryCard} variant="secondary" isCentered />
		</div>
		{#each data.cards as card}
			<div class="item" class:altOrder {style}>
				<Card {...card} />
			</div>
		{/each}
	</div>

	<div class="view-all-desktop">
		<Link label="VIEW ALL" to={data.categoryLink} withArrow />
	</div>
	<div
		class="view-all-mobile"
		class:hide-mobile={data.cards.length < 2}
		class:hide-tablet={data.cards.length < 3}
	>
		<button
			class="icon-wrapper"
			on:click={() => scrollStep('backward')}
			disabled={currentStep <= 0}
		>
			<ArrowLeft />
		</button>
		<Link label="VIEW ALL" to={data.categoryLink} size="small" />
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
		--gap: 24px;

		padding: 0;
	}
	@media (min-width: 1181px) {
		.container {
			padding: 0 106px;
		}
	}
	@media (min-width: 1460px) {
		.container {
			padding: 0 128px;
		}
	}

	.grid-container {
		display: grid;
		grid-template-rows: repeat(2, auto);
		grid-template-columns: repeat(3, 100%);

		gap: var(--gap);

		overflow: hidden;
	}
	@media (min-width: 701px) {
		.grid-container {
			grid-template-columns: repeat(3, calc(50% - (var(--gap) / 2)));
		}
	}
	@media (min-width: 1181px) {
		.grid-container {
			grid-template-rows: repeat(2, 1fr);
			grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
		}
	}

	@media (max-width: 1180px) {
		.category-item {
			grid-row: 1;
			grid-column: span 1;
		}
		.item {
			grid-row: 2;
			transition: all 0.3s;
		}

		@media (min-width: 701px) {
			.category-item {
				grid-column: span 2;
			}
		}
	}
	@media (min-width: 1181px) {
		.category-item.altOrder {
			order: 4;
		}
	}

	.view-all-desktop {
		display: none;
	}
	.view-all-mobile {
		margin-top: 16px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.view-all-mobile.hide-mobile {
		display: none;
	}
	@media (min-width: 701px) {
		.view-all-mobile.hide-tablet {
			display: none;
		}
	}
	@media (min-width: 1181px) {
		.view-all-mobile {
			display: none;
		}
		.view-all-desktop {
			margin-top: 40px;
			display: flex;
			justify-content: end;
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

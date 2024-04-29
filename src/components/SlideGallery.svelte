<script lang="ts">
	import { afterUpdate, onMount } from 'svelte';
	import { storyblokEditable } from '@storyblok/svelte';

	import { optimizeImage } from '../utils/image-helpers';
	import type { SlideGalleryStoryblok } from '../../component-types-sb';

	export let blok: SlideGalleryStoryblok;

	let elFlickity: any;

	onMount(() => {
		initiateFlickity();

		document.querySelector(
			'.flickity-button.next'
		)!.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 28 28"><path fill="currentColor" fill-rule="evenodd" d="M15.707 5.293 24.414 14l-8.707 8.707-1.414-1.414L20.586 15H5v-2h15.586l-6.293-6.293 1.414-1.414Z" clip-rule="evenodd"/></svg>`;
		document.querySelector(
			'.flickity-button.previous'
		)!.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 28 28"><path fill="currentColor" fill-rule="evenodd" d="M12.293 22.707 3.586 14l8.707-8.707 1.414 1.414L7.414 13H23v2H7.414l6.293 6.293-1.414 1.414Z" clip-rule="evenodd"/></svg>`;
	});

	// flickity fix
	afterUpdate(() => {
		(document.querySelector('.slider-container') as HTMLElement).style.visibility = 'hidden';

		setTimeout(function () {
			window.dispatchEvent(new Event('resize'));

			setTimeout(function () {
				(document.querySelector('.slider-container') as HTMLElement).style.visibility = 'visible';
			}, 200);
		}, 200);
	});

	function initiateFlickity() {
		//@ts-ignore
		new Flickity(elFlickity, {
			contain: true,
			pageDots: false
		});
	}
</script>

<div class="slider-container" use:storyblokEditable={blok}>
	<div
		style={`height: 475px; overflow: ${elFlickity ? 'visible' : 'hidden'}`}
		bind:this={elFlickity}
	>
		{#each blok.imageList as imageBlok}
			<img
				class="carousel-cell"
				src={optimizeImage(imageBlok.image, '0x950')}
				alt={imageBlok.image.alt}
				use:storyblokEditable={imageBlok}
			/>
		{/each}
	</div>
</div>

<style>
	.slider-container {
		padding: 40px 0;
		width: 100%;
	}

	.carousel-cell {
		height: 100%;
		margin-right: 10px;
		border-radius: 12px;
	}

	:global(.flickity-viewport) {
		height: 100% !important;
	}

	:global(.flickity-button) {
		width: 28px !important;
		height: 28px !important;

		color: var(--black) !important;
		cursor: pointer !important;

		border: none !important;
		background-color: transparent !important;

		bottom: -54px !important;
		top: unset !important;
		box-shadow: none !important;
		outline: none !important;
		left: unset !important;
	}

	:global(.flickity-button.next) {
		right: 0px;
	}

	@media (min-width: 1460px) {
		:global(.flickity-button) {
			bottom: unset !important;
			top: -32px !important;
		}

		:global(.flickity-button.next) {
			left: 40px !important;
		}
	}
</style>

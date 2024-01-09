<script>
	// @ts-nocheck
	import { marked } from 'marked';

	import { storyblokEditable } from '@storyblok/svelte';

	import Text from '$lib/Text.svelte';
	import Gallery from './Gallery.svelte';

	export let blok;
	export let date;

	const formatDate = (inputDate) => {
		const options = { year: 'numeric', month: 'long', day: 'numeric' };
		const date = new Date(inputDate);
		return date.toLocaleDateString('en-US', options);
	};

	let innerWidth;

	const optimizeImage = (image, imageSize) => {
		if (!image.filename) return null;

		let imageSource = image.filename + `/m/${imageSize ?? ''}`;

		if (image.focus) imageSource += `/filters:focal(${image.focus})`;

		return imageSource;
	};

	$: renderedFeatureImage = innerWidth
		? optimizeImage(blok.featuredImage, innerWidth >= 700 ? '1512x500' : '660x400')
		: undefined;
</script>

<svelte:window bind:innerWidth />

{#key blok}
	<div use:storyblokEditable={blok} class="container">
		{#if renderedFeatureImage}
			<div style="margin-bottom: 40px">
				<img src={renderedFeatureImage} alt={blok.alt} style="max-width: 100%;" />
			</div>
		{/if}
		{#if blok.title}
			<div class="title-wrapper">
				<Text tag="h5" type="bold">{blok.title}</Text>
			</div>
		{/if}
		{#if blok.subtitle}
			<div class="subtitle-wrapper">
				<Text tag="p">{blok.subtitle}</Text>
			</div>
		{/if}

		<div class="authors-and-content">
			{#if date || blok.authors}
				<div class="authors-wrapper">
					{#if !!date}
						<Text tag="p" color="grey">{formatDate(date)}</Text>
					{/if}
					{#if blok.authors}
						<Text tag="p" color="grey">{blok.authors}</Text>
					{/if}
				</div>
			{/if}

			{#if blok.content}
				<div class="body-wrapper">
					<Text tag="p">{@html marked(blok.content)}</Text>
				</div>
			{/if}
		</div>

		{#if blok.gallery?.length}
			<div class="gallery-wrapper">
				<Gallery
					images={blok.gallery[0]?.columns?.map(({ images }) =>
						images.map(({ image }) => ({
							src: optimizeImage(image, blok.gallery[0].columns.length > 1 ? '700x0' : '1400x0'),
							alt: image.alt
						}))
					)}
				/>
			</div>
		{/if}
	</div>
{/key}

<style>
	.title-wrapper {
		margin-bottom: 24px;
	}

	.authors-wrapper,
	.body-wrapper {
		margin-top: 80px;
	}

	.authors-wrapper {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	@media (min-width: 700px) {
		.title-wrapper :global(h5) {
			font-size: 40px;
			line-height: 48px;
		}
	}

	@media (min-width: 1180px) {
		.title-wrapper :global(h5) {
			font-size: 72px;
			line-height: 80px;
		}
	}

	@media (min-width: 1728px) {
		.title-wrapper {
			margin-bottom: 40px;
		}

		.authors-wrapper,
		.body-wrapper {
			margin-top: 104px;
		}

		.container {
			display: flex;
			flex-direction: column;
			align-items: flex-end;
		}

		.title-wrapper,
		.subtitle-wrapper,
		.body-wrapper {
			width: 1128px;
		}

		.authors-and-content {
			display: flex;
			justify-content: space-between;
			width: 100%;
		}
	}

	.gallery-wrapper {
		margin-top: 24px;
	}
</style>

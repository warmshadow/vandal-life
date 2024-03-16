<script>
	// @ts-nocheck
	import { marked } from 'marked';

	import { storyblokEditable } from '@storyblok/svelte';

	import Text from '$lib/Text.svelte';
	import Gallery from './Gallery.svelte';

	import { optimizeImage } from '../utils/image-helpers';

	export let blok;
	export let date;

	const formatDate = (inputDate) => {
		const options = { year: 'numeric', month: 'long', day: 'numeric' };
		const date = new Date(inputDate);
		return date.toLocaleDateString('en-US', options);
	};
</script>

{#key blok}
	<div use:storyblokEditable={blok} class="container">
		{#if blok?.featuredImage?.filename}
			<div style="margin-bottom: 40px;">
				<picture>
					<source
						media="(max-width: 699px)"
						srcset={optimizeImage(blok.featuredImage, '1320x800')}
					/>
					<source
						media="(min-width: 700px)"
						srcset={optimizeImage(blok.featuredImage, '2000x660')}
					/>
					<!-- TODO pass alt from asset -->
					<img
						src={optimizeImage(blok.featuredImage, '2000x660')}
						alt="featured"
						class="featured-image"
					/>
				</picture>
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

			{#if !!blok.content.length}
				<div class="body-wrapper">
					{#each blok.content as content}
						{#if content.component === 'body'}
							<Text tag="p">{@html marked(content.text)}</Text>
						{/if}
					{/each}
				</div>
			{/if}
		</div>

		{#if blok.gallery?.length}
			<div class="gallery-wrapper">
				<Gallery
					images={blok.gallery[0]?.columns?.map(({ images }) =>
						images.map(({ image }) => ({
							src: image
								? optimizeImage(image, blok.gallery[0].columns.length > 1 ? '700x0' : '1400x0')
								: '',
							alt: image.alt
						}))
					)}
				/>
			</div>
		{/if}
	</div>
{/key}

<style>
	.featured-image {
		width: 100%;
		max-width: 100%;
		border-radius: 12px;
	}

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

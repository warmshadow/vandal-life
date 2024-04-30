<script lang="ts">
	import { marked } from 'marked';

	import { type ISbStoryData, storyblokEditable, StoryblokComponent } from '@storyblok/svelte';

	import Text from '$lib/Text.svelte';
	import Gallery from './Gallery.svelte';
	import ReadNext from '$lib/ReadNext.svelte';

	import { optimizeImage } from '../utils/image-helpers';
	import type { PostStoryblok } from '../../component-types-sb';

	export let blok: ISbStoryData<PostStoryblok>['content'];
	export let date: string;
	export let nextStories: ISbStoryData<PostStoryblok>[];

	const formatDate = (inputDate: string) => {
		const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
		const date = new Date(inputDate);
		return date.toLocaleDateString('en-US', options);
	};
</script>

{#key blok}
	<div use:storyblokEditable={blok} class="container">
		{#if blok?.featuredImage?.filename}
			<div class="featured-image-wrapper">
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
						alt={blok.featuredImage.alt}
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

			{#if !!blok.content?.length}
				{#each blok.content as content}
					{#if content.component === 'body'}
						<div class="body-wrapper">
							<Text tag="p">{@html marked(content.text)}</Text>
						</div>
					{/if}

					{#if content.component === 'gallery'}
						<div class="gallery-wrapper" use:storyblokEditable={content}>
							<Gallery
								images={content.columns.map(({ images }) =>
									images.map((imageBlok) => ({
										...imageBlok,
										src:
											optimizeImage(
												imageBlok.image,
												content.columns.length > 1 ? '724x0' : '1448x0'
											) ?? '',
										alt: imageBlok.image.alt
									}))
								)}
								rowGap={content.rowGap}
								columnGap={content.columnGap}
							/>
						</div>
					{/if}

					{#if content.component === 'slideGallery'}
						<div class="slide-gallery-wrapper">
							<StoryblokComponent blok={content} />
						</div>
					{/if}
				{/each}
			{/if}
		</div>
	</div>
	{#if nextStories?.length}
		<ReadNext
			cards={nextStories.map((story) => ({
				src: optimizeImage(story.content.featuredImage, '1068x392') ?? undefined,
				title: story.content.title,
				description: story.content.subtitle,
				link: { to: `/${story.full_slug}` }
			}))}
		/>
	{/if}
{/key}

<style>
	.featured-image-wrapper {
		margin-bottom: 40px;
	}

	.featured-image {
		width: 100%;
		max-width: 100%;
		border-radius: 12px;
	}

	.subtitle-wrapper {
		margin-top: 24px;
	}

	.authors-and-content {
		margin-top: 80px;
	}

	.body-wrapper :global(img) {
		max-width: 100%;
	}

	.authors-wrapper {
		display: flex;
		flex-direction: column;
		gap: 16px;
		margin-bottom: 80px;
	}

	.body-wrapper {
		margin-left: auto;
	}

	.gallery-wrapper {
		width: 100%;
		margin-top: 80px;
		margin-bottom: 80px;
	}

	.slide-gallery-wrapper {
		width: 100%;
		padding-top: 16px;
		padding-bottom: 40px;
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
		.subtitle-wrapper {
			margin-top: 40px;
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
			flex-wrap: wrap;

			margin-top: 104px;
		}

		.authors-wrapper {
			margin-bottom: 0;
		}
	}
</style>

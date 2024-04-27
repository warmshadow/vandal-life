<script lang="ts">
	import { storyblokEditable } from '@storyblok/svelte';
	import type { GalleryStoryblok, ImageStoryblok } from '../../component-types-sb';

	export let images: ImageStoryblok[][];
	export let rowGap: GalleryStoryblok['rowGap'];
	export let columnGap: GalleryStoryblok['columnGap'];
</script>

<div class="gallery" style={`row-gap: ${rowGap ?? 0}vw; column-gap: ${columnGap ?? 0}vw;`}>
	{#each images as columnOfImages}
		<div class={`column cols-${images.length}`} style={`row-gap: ${rowGap ?? 0}vw;`}>
			{#each columnOfImages as image}
				<img
					src={image.src}
					alt={image.alt}
					style={`padding-left: ${image.paddingLeft ?? 0}%; padding-top: ${
						image.paddingTop ?? 0
					}%; padding-right: ${image.paddingRight ?? 0}%; padding-bottom: ${
						image.paddingBottom ?? 0
					}%`}
					use:storyblokEditable={image}
				/>
			{/each}
		</div>
	{/each}
</div>

<style>
	.gallery {
		display: flex;
	}

	.column {
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	.column img {
		width: 100%;
	}
	@media screen and (max-width: 500px) {
		.gallery {
			flex-direction: column;
		}

		.column img {
			padding: 0 !important;
		}
	}
</style>

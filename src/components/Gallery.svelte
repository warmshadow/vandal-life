<script lang="ts">
	export let images: { src: string; alt?: string }[][];
</script>

<div class="gallery">
	{#each images as columnOfImages}
		<div class={`column cols-${images.length}`}>
			{#each columnOfImages as image}
				<img src={image.src} alt={image.alt} />
			{/each}
		</div>
	{/each}
</div>

<style>
	.gallery {
		display: flex;
		flex-wrap: wrap;
		padding: 0 4px;
	}

	.column {
		padding: 0 4px;
	}

	.cols-4 {
		flex: 25%;
		max-width: 25%;
	}

	.cols-3 {
		flex: 33.3%;
		max-width: 33.3%;
	}

	.cols-2 {
		flex: 50%;
		max-width: 50%;
	}

	.column img {
		margin-top: 8px;
		vertical-align: middle;
		width: 100%;
	}

	@media screen and (max-width: 1000px) {
		.column {
			flex: 50%;
			max-width: 50%;
		}
	}

	@media screen and (max-width: 500px) {
		.column {
			flex: 100%;
			max-width: 100%;
		}
	}
</style>

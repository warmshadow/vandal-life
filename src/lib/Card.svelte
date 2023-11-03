<script lang="ts">
	export let src: string;
	export let title: string;
	export let description: string;
	export let link: string;
</script>

<div class="container">
	<div class="img-container" style="background-image: url({src})" />
	<div class="content">
		<div class="text-block">
			<h1>{title}</h1>
			<p>{description}</p>
		</div>
		<a href={link}>Read more</a>
	</div>
</div>

<style>
	.container {
		max-width: 100%;
		padding: 16px;

		flex-basis: 350px;
		flex-shrink: 0;

		display: flex;
		flex-direction: column;
		row-gap: 16px;
		max-height: 464px;

		border-radius: 20px;
		border: 1px solid #000000;
	}

	.img-container {
		border-radius: 12px;
		height: 196px;

		background-position: center;
		background-repeat: no-repeat;
		background-size: cover;
	}

	.content {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		row-gap: 8px;
	}

	.text-block {
		display: flex;
		flex-direction: column;
		row-gap: 8px;
	}
</style>

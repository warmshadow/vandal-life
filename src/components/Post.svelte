<script>
	// @ts-nocheck
	import { marked } from 'marked';

	import { storyblokEditable } from '@storyblok/svelte';

	import Text from '$lib/Text.svelte';

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
		<div class="title-wrapper">
			<Text tag="h5" type="bold">{blok.title}</Text>
		</div>
		<div class="subtitle-wrapper">
			<Text tag="p">{blok.subtitle}</Text>
		</div>
		<div class="authors-and-content">
			<div class="authors-wrapper">
				{#if !!date}
					<Text tag="p" color="grey">{formatDate(date)}</Text>
				{/if}
				<Text tag="p" color="grey">{blok.authors}</Text>
			</div>

			<div class="body-wrapper">
				<Text tag="p">{@html marked(blok.content)}</Text>
			</div>
		</div>
	</div>
{/key}

<style>
	.subtitle-wrapper {
		margin-top: 24px;
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
		.subtitle-wrapper {
			margin-top: 40px;
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
</style>

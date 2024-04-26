<script lang="ts">
	import '../styles/styles.css';

	import { page } from '$app/stores';

	import { Header } from '$lib';
	import CardBigText from '$lib/CardBigText.svelte';

	export let data;
</script>

<svelte:head>
	<title>{$page.data.metaData?.title || 'Vandal Life'}</title>
	{#if $page.data.metaData?.description}
		<meta name="description" content={$page.data.metaData.description} />
	{/if}
</svelte:head>

<div class="layout-wrapper">
	<Header
		links={[
			{ label: 'home', link: '/', isActive: $page.url.pathname === '/' },
			...data.homeStory.content.listOfBlocks
				.filter((item) => item.component === 'categoryName')
				.filter((item) => data.categories.some(({ slug }) => slug === item.slug))
				.map(({ linkLabel, slug }) => ({
					label: linkLabel,
					link: `/${slug}`,
					isActive: $page.url.pathname.startsWith(`/${slug}`)
				}))
		]}
		categoryName={data.currentCategory}
	/>
	<div class="page-content-wrapper">
		<slot />
	</div>
	<div class="footer-wrapper">
		<CardBigText
			content={[{ component: 'bigText', leftText: '\nvandal\nlife.\n\n' }]}
			variant="secondary"
		/>
	</div>
	<!-- uncomment if needed later -->
	<!-- <ScrollToTop />  -->
</div>

<style>
	.layout-wrapper {
		max-width: 1512px;
		margin: 32px auto;

		padding: 0 24px;
	}

	@media (min-width: 700px) {
		.layout-wrapper {
			padding: 0 32px;
		}
	}

	.page-content-wrapper {
		display: flex;
		flex-direction: column;
		row-gap: 24px;
	}

	@media (min-width: 1460px) {
		.page-content-wrapper {
			row-gap: 40px;
		}
	}

	.footer-wrapper {
		margin-top: 24px;
	}

	@media (min-width: 1181px) {
		.footer-wrapper {
			margin-top: 40px;
		}
	}
</style>
